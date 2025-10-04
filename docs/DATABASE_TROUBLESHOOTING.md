# Database Troubleshooting Guide

This guide covers common database issues encountered during development and deployment.

## Table of Contents

- [Environment File Management](#environment-file-management)
- [Schema Changes and Migrations](#schema-changes-and-migrations)
- [Common Error Patterns](#common-error-patterns)

---

## Environment File Management

### Problem: Local Build Using Production Database

**Symptoms:**
- Local `pnpm build` connects to remote database instead of local Docker database
- Build queries show up in production database logs
- Unexpected data appears in production

**Root Cause:**
Next.js automatically loads `.env.production` during `next build`, even when running locally. If `.env.production` is committed with production credentials, local builds will connect to the production database.

**Key Insights:**
1. **Next.js automatically loads `.env.production` during `next build`** - This is default Next.js behavior
2. **`.env.production` should NOT be committed to the repository** - It contains production database credentials
3. **Local builds should use local database** - Development and builds should use the same database (local Docker)
4. **Production env vars belong on Vercel** - Set them in Vercel dashboard, not in committed files

**Solution:**
```bash
# 1. Remove .env.production from repository
git rm .env.production

# 2. Add to .gitignore
echo ".env.production" >> .gitignore
echo ".env.production.local" >> .gitignore

# 3. Commit changes
git add .gitignore
git commit -m "fix: remove production env file, add to gitignore"

# 4. Set production variables in Vercel dashboard
# Go to: Vercel Dashboard > Project > Settings > Environment Variables
```

**Environment Variable Priority (Next.js):**
1. `.env.production.local` (highest priority for production builds, gitignored)
2. `.env.production` (should NOT be committed)
3. `.env.local` (gitignored)
4. `.env` (can be committed for local development defaults)

**Best Practices:**
- ✅ Keep `.env` for local development defaults (safe to commit if no secrets)
- ✅ Use `.env.local` for local overrides (gitignored)
- ✅ Set production variables in Vercel dashboard
- ❌ Never commit `.env.production` or `.env.production.local`

---

## Schema Changes and Migrations

### Problem: Dev Works, Production Fails with "Column Does Not Exist"

**Symptoms:**
- Local development works perfectly
- Local build succeeds
- Production/preview deployment fails with database errors
- Error: "column xyz does not exist" in Vercel logs

**Root Cause:**
After adding new fields to your Payload collections, the local database was auto-synced but production/preview deployments failed because no migration was created.

**Key Insights:**
1. **Dev mode auto-syncs schema silently** - No prompts shown locally, columns added automatically to local database
2. **Production uses migrations** - Preview/production deployments run `payload migrate`, not auto-sync
3. **Schema changes after last migration are invisible to production** - If you add fields without creating a migration, production won't have them

**Required Workflow for Schema Changes:**
```bash
# 1. Make schema changes in code (add fields, change types, etc.)

# 2. Dev server auto-syncs to local database automatically
pnpm dev
# Watch console: "✓ Schema synchronized with database"

# 3. Test your changes locally
# Everything works? Great! Dev database is auto-synced

# 4. BEFORE deploying to preview/production:
pnpm payload migrate:create
# Name the migration descriptively, e.g., "add_button_icon_fields"

# 5. Review the generated migration
cat src/migrations/20251004_XXXXXX_your_name.ts

# 6. Commit and push the migration
git add src/migrations/
git commit -m "feat: add migration for button icon fields"
git push origin your-branch

# 7. Vercel will run the migration during deployment
# The "ci" script runs: payload migrate && pnpm build
```

**Warning Signs You Forgot to Create a Migration:**
- ✅ Local build works fine
- ❌ Preview/production deployment fails with "column does not exist"
- ❌ Error mentions columns that you recently added to your code

**Prevention:**
- Always run `pnpm payload migrate:create` before deploying schema changes
- The migration captures all schema differences between code and last migration
- Commit the migration files (both `.ts` and `.json`) to git

---

## Common Error Patterns

### Error: "Column Does Not Exist" in Local Build

**Solution:**
```bash
# Start dev server to auto-sync schema
pnpm dev
# Wait 5-10 seconds for auto-sync
# Ctrl+C to stop

# Try build again
pnpm build
```

### Error: "Invalid Input Value for Enum"

**Symptoms:**
```
Error: invalid input value for enum enum_table_column: "deprecated-value"
Failed query: ALTER TABLE "table" ALTER COLUMN "column" SET DATA TYPE...
```

**Root Cause:**
- Dev mode auto-syncs enum TYPE definition (removes deprecated values from enum)
- BUT does NOT update existing DATA that uses deprecated values
- Database has data with values that no longer exist in the enum type

**Solution for Development:**
```bash
# 1. Identify which tables have deprecated enum values
docker exec <postgres-container> psql -U postgres -d <database> -c \
  "SELECT enum_column, COUNT(*) FROM table_name GROUP BY enum_column"

# 2. Update deprecated values to new values
docker exec <postgres-container> psql -U postgres -d <database> -c \
  "UPDATE table_name SET enum_column = 'new-value'
   WHERE enum_column IN ('old-value-1', 'old-value-2')"

# 3. Don't forget version history tables (prefixed with _)
docker exec <postgres-container> psql -U postgres -d <database> -c \
  "UPDATE _table_name_v SET enum_column = 'new-value'
   WHERE enum_column IN ('old-value-1', 'old-value-2')"

# 4. Restart dev server - should start cleanly without errors
```

**Solution for Production:**
Create a data migration that:
1. Updates data first (transform deprecated values to new values)
2. Then alters enum type (remove deprecated values from type)

See `/src/migrations/20251004_update_button_colors.ts` for example pattern.

**Prevention:**
- When removing enum values from code, create migration BEFORE deploying
- Migration should handle both data transformation AND type changes
- Test locally by checking for deprecated data before pushing

### Error: Migration Failed in Production

**Solution:**
```bash
# Check Vercel function logs for error
# Common fixes:
# 1. If data transformation issue: Edit migration file
# 2. If timeout: Split into smaller migrations
# 3. If critical: May need database backup restore
```

### Forgot to Create Migration Before Deploying

**Symptoms:**
```
Error: column xyz does not exist (in Vercel logs)
```

**Solution:**
```bash
# Create migration locally
pnpm payload migrate:create

# Commit and push
git add src/migrations/
git commit -m "fix: add missing migration"
git push  # Triggers redeploy
```

---

## Quick Reference

### When to Create Migrations

**Always create a migration when:**
- ✅ Adding new fields to collections
- ✅ Removing fields from collections
- ✅ Changing field types
- ✅ Adding/removing enum values
- ✅ Changing relationships
- ✅ Modifying indexes

**Migration is automatic in dev for:**
- ✅ All schema changes (Payload auto-syncs)
- ✅ No manual intervention needed locally

**Migration is required for production:**
- ✅ All schema changes must have a migration file
- ✅ Created with `pnpm payload migrate:create`
- ✅ Committed to git before deploying

### Environment Setup Checklist

- [ ] `.env` contains local development config (safe to commit)
- [ ] `.env.local` contains local overrides (gitignored)
- [ ] `.env.production` is NOT committed (gitignored)
- [ ] Production variables set in Vercel dashboard
- [ ] Local Docker database running for development
- [ ] `POSTGRES_URL` in `.env` points to local Docker

### Migration Workflow Checklist

- [ ] Made schema changes in code
- [ ] Tested locally with dev server (auto-sync)
- [ ] Created migration with `pnpm payload migrate:create`
- [ ] Reviewed generated migration files
- [ ] Committed migration files to git
- [ ] Pushed to trigger deployment
- [ ] Verified deployment succeeded in Vercel
