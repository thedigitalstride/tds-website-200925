# Database Migration Workflow

## 🚨 CRITICAL: Two Different Strategies

This project uses **different database strategies** for development and production:

- **Development**: Payload auto-syncs schema (push strategy)
- **Production**: Explicit migrations (migrate strategy)

**⛔ Mixing these strategies causes database corruption.**

## 🚫 NEVER - Development Environment

### Commands to NEVER Run in Development

1. ❌ `pnpm payload migrate` - Production only
2. ❌ `pnpm payload migrate:create` - Only when preparing for production deployment
3. ❌ `pnpm payload migrate:down` - Causes corruption
4. ❌ `pnpm payload migrate:status` - Implies you might run migrations
5. ❌ `pnpm payload migrate:refresh` - Destructive
6. ❌ `pnpm payload migrate:reset` - Destructive
7. ❌ `pnpm payload migrate:fresh` - Deletes all data

### Never Attempt To

- ❌ "Fix" database schema errors by running migrations
- ❌ Assume migrations are the solution to build errors
- ❌ Use external database tools (pgAdmin, DataGrip, raw SQL) for schema changes

## ✅ ALWAYS - Development Environment

### Required Behavior

1. ✅ Let Payload's dev mode auto-sync schema changes (automatic, zero intervention)
2. ✅ Start dev server (`pnpm dev`) when schema is out of sync
3. ✅ Wait for dev server to complete auto-sync before testing builds
4. ✅ Ask user before touching ANY migration command

## 🔴 Critical Error Recognition

### Error Patterns During `pnpm build`

- ❌ "column [name] does not exist"
- ❌ "relation [name] does not exist"
- ❌ "type [name] does not exist"
- ❌ "Failed query: select..."

### ✅ CORRECT Response

```bash
# 1. Start dev server to auto-sync schema
pnpm dev

# 2. Wait for Payload to auto-sync (watch console output)
# Look for: "✓ Schema synchronized with database"

# 3. Stop dev server (Ctrl+C)

# 4. Try build again
pnpm build

# 5. NEVER run migration commands
```

### ❌ INCORRECT Response

```bash
# DO NOT DO THIS
pnpm payload migrate           # ❌
pnpm payload migrate:create    # ❌
pnpm payload migrate:status    # ❌
# Attempting to manually fix database  # ❌
```

## 🎯 Development Workflow (MANDATORY)

### Making Schema Changes

```bash
# 1. Make schema changes in code (collections, fields, etc.)
# Example: Add new field to Pages collection

# 2. Start dev server - Payload auto-syncs schema automatically
pnpm dev

# 3. Payload detects changes and applies them automatically
# Watch console: "✓ Schema synchronized with database"
# NO MANUAL INTERVENTION REQUIRED

# 4. Test your changes in the admin panel
# Navigate to /admin and verify new fields appear

# 5. Stop dev server (Ctrl+C)

# 6. Build to verify everything works
pnpm build

# IF BUILD FAILS WITH SCHEMA ERRORS:
# - Start dev server again (pnpm dev)
# - Let it complete auto-sync
# - Stop dev server
# - Try build again
# DO NOT RUN MIGRATIONS
```

## 📋 Production Deployment Workflow

**⚠️ This section is for the USER to follow manually, NOT for AI agents to execute.**

### Phase 1: Local Development (Daily Work)

```bash
# 1. Make your code changes (collections, fields, etc.)

# 2. Start dev server - it auto-syncs schema
pnpm dev
# Watch console: "✓ Schema synchronized with database"

# 3. Test your changes locally
# Everything works? Great! Dev database is auto-synced

# 4. Build to verify
pnpm build
# Should succeed if dev server synced properly
```

### Phase 2: Preparing for Production Deployment

```bash
# 1. STOP dev server completely (Ctrl+C)

# 2. Create migration for production
pnpm payload migrate:create

# 3. You'll see a prompt:
# "Name this migration (optional):"
# Enter descriptive name like: "add_blog_categories"
# Or press Enter for timestamp-based name

# 4. Check what was created
ls src/migrations/
# You'll see new files:
# - 20251004_XXXXXX_your_name.ts (migration code)
# - 20251004_XXXXXX_your_name.json (migration metadata)

# 5. Review the migration file
# Open the .ts file and check it captured your changes

# 6. Commit BOTH migration files
git add src/migrations/
git commit -m "feat: add migration for [your changes]"

# 7. Push to your branch
git push origin your-branch
```

### Phase 3: Vercel Deployment (Automatic)

When you push to GitHub, Vercel automatically runs:

```bash
# From package.json "ci" script
payload migrate && pnpm build

# This:
# 1. Applies your new migration to production database
# 2. Updates the schema
# 3. Builds the application
```

## 🛠️ Troubleshooting Common Issues

### Problem: "Column does not exist" in local build

**Solution**:
```bash
pnpm dev          # Start dev server
# Wait 5-10 seconds for auto-sync
# Watch for: "✓ Schema synchronized with database"
# Ctrl+C to stop
pnpm build       # Try build again
```

---

### Problem: "invalid input value for enum" Error

**Symptoms**:
```
Error: invalid input value for enum enum_table_column: "deprecated-value"
Failed query: ALTER TABLE "table" ALTER COLUMN "column" SET DATA TYPE...
```

**Root Cause**:
- Dev mode auto-syncs enum TYPE definition (removes deprecated values)
- BUT does NOT update existing DATA using deprecated values
- Database has data with values that no longer exist in the enum type

**Solution for Development**:

1. Identify which tables have deprecated enum values

2. Update data directly using Docker/psql:

```bash
# Check what values exist in the data
docker exec <postgres-container> psql -U postgres -d <database> -c \
  "SELECT enum_column, COUNT(*) FROM table_name GROUP BY enum_column"

# Update deprecated values to new values
docker exec <postgres-container> psql -U postgres -d <database> -c \
  "UPDATE table_name SET enum_column = 'new-value'
   WHERE enum_column IN ('old-value-1', 'old-value-2')"

# Don't forget version history tables (prefixed with _)
docker exec <postgres-container> psql -U postgres -d <database> -c \
  "UPDATE _table_name_v SET enum_column = 'new-value'
   WHERE enum_column IN ('old-value-1', 'old-value-2')"
```

3. Restart dev server - should start cleanly without errors

**Solution for Production**:

Create a data migration that:
1. Updates data first (transform deprecated values to new values)
2. Then alters enum type (remove deprecated values from type)

**Example**: See `/src/migrations/20251004_update_button_colors.ts`

**Prevention**:
- When removing enum values from code, create migration BEFORE deploying
- Migration should handle both data transformation AND type changes
- Test locally by checking for deprecated data before pushing

---

### Problem: Forgot to create migration before deploying

**Symptoms**:
```
# In Vercel logs:
Error: column xyz does not exist
```

**Solution**:
```bash
# Create migration locally
pnpm payload migrate:create

# Commit and push
git add src/migrations/
git commit -m "fix: add missing migration"
git push  # Triggers redeploy
```

---

### Problem: Migration failed in production

**Steps**:
1. Check Vercel function logs for error details
2. Common fixes:
   - **Data transformation issue**: Edit migration file locally, commit, push
   - **Timeout**: Split into smaller migrations
   - **Critical failure**: May need database backup restore

## 🚨 When Database is Corrupted

**If migrations were run incorrectly in development and database is corrupted:**

### Step 1: STOP

Do not run any more migration commands.

### Step 2: ASK USER

Explain situation:

> "I incorrectly ran migrations in development. Database may be corrupted. Options are:
> - Option A: `migrate:fresh` (DELETES ALL DATA, clean slate)
> - Option B: Restore from backup if available"

### Step 3: WAIT FOR USER DECISION

Do not proceed without explicit permission.

### Step 4: NEVER

Attempt to "fix" by running more migrations.

## 🎓 Why These Rules Exist

### Dev Mode: Push Strategy

Payload automatically syncs schema changes to database. No migration tracking.

### Production: Migrate Strategy

Explicit migrations track and apply changes safely. Full audit trail.

### Mixing Strategies = Corruption

Database gets stuck between auto-sync and migration tracking. Recovery requires dropping database or restoring backup.

### Recovery is Destructive

Once corrupted, only options are:
- Drop database and recreate (lose all data)
- Restore from backup (lose changes since backup)

## 📋 Migration Commands Reference

**⚠️ ALL OF THESE ARE PRODUCTION-ONLY COMMANDS**

**DO NOT USE IN DEVELOPMENT UNLESS USER EXPLICITLY REQUESTS**

```bash
pnpm payload migrate:create    # Create new migration (production prep only)
pnpm payload migrate          # Run pending migrations (production only)
pnpm payload migrate:status   # Check migration status (production only)
pnpm payload migrate:down     # Rollback last migration (production only)
pnpm payload migrate:refresh  # Rollback and re-run (production only)
pnpm payload migrate:reset    # Rollback all migrations (DESTRUCTIVE)
pnpm payload migrate:fresh    # Drop and recreate schema (DESTRUCTIVE)
```

## ⚠️ Summary for Claude Code Agents

### Your Job: Build Errors with "column does not exist"

1. Recognize this as schema out of sync
2. Start dev server to auto-sync schema
3. Wait for sync to complete
4. Try build again
5. **DO NOT TOUCH MIGRATION COMMANDS**

### Your Job is NOT

1. ❌ To run migrations
2. ❌ To "fix" the database
3. ❌ To check migration status
4. ❌ To create migrations (unless preparing for production deployment)
5. ❌ To assume migrations are needed

## Related Documentation

- **[DATABASE_TROUBLESHOOTING.md](/docs/DATABASE_TROUBLESHOOTING.md)** - Common error patterns and solutions
- **[DATABASE_PREVIEW_STRATEGY.md](/docs/DATABASE_PREVIEW_STRATEGY.md)** - Neon branching workflow for preview deployments
- **[ENVIRONMENT.md](/docs/ENVIRONMENT.md)** - Environment variable setup and configuration
