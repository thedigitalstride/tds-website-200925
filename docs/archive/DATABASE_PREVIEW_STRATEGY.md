# Database Preview Strategy with Neon Branching

This document explains the three-tier database setup (local → preview → production) using Neon Postgres branching for safe schema migrations and testing.

## Overview

The project uses **Neon's automatic database branching** integrated with Vercel preview deployments. Every Git branch pushed to Vercel automatically gets its own isolated database branch with production data, allowing safe testing of migrations and schema changes before they reach production.

## Architecture

```
Local Development (Docker Postgres)
    ↓ (create migration)
Preview Environment (Neon Branch: preview/<branch-name>)
    ↓ (test & validate)
Production Environment (Neon Main Branch)
```

### Key Benefits

- **Instant database copies** - Copy-on-write clones are created in seconds
- **Safe migration testing** - Test with real production data without risk
- **Automatic cleanup** - Old preview branches are auto-deleted
- **Cost-effective** - Branches only consume storage for data changes
- **Isolated environments** - Each preview has its own database state

## Setup Configuration

### 1. Neon Vercel Integration

**Status**: ✅ Configured

The Neon Vercel Integration is installed and configured with:
- **Automatic branch creation**: Enabled
- **Branch naming pattern**: `preview/<git-branch-name>`
- **Auto-delete old branches**: Enabled
- **Database**: Connected to production Neon project

**Location**: [Neon Console](https://console.neon.tech) → Your Project → Integrations → Vercel

### 2. Environment Variables

**Production** (Vercel Production Environment):
```bash
POSTGRES_URL=<production-neon-connection-string>
```

**Preview** (Auto-injected by Neon Integration):
```bash
POSTGRES_URL=<branch-specific-connection-string>
POSTGRES_PRISMA_URL=<branch-specific-pooled-connection>
POSTGRES_URL_NON_POOLING=<branch-specific-direct-connection>
```

**Local Development** (`.env.local`):
```bash
POSTGRES_URL=postgres://postgres@localhost:54320/payload
```

### 3. Vercel Build Configuration

**Build Command**: `pnpm ci`

Defined in `package.json`:
```json
{
  "scripts": {
    "ci": "payload migrate && pnpm build"
  }
}
```

This ensures migrations run on **every** deployment (preview and production) before the build.

## Migration Workflow

### Local Development

1. **Make schema changes** in collections, blocks, or globals
2. **Test locally** with `pnpm dev` (uses automatic schema push)
3. **Create migration** when ready for preview:
   ```bash
   pnpm payload migrate:create
   ```
4. **Commit and push** to feature branch:
   ```bash
   git add src/migrations/
   git commit -m "feat(db): add new block schema"
   git push origin feature-branch
   ```

### Preview Deployment (Automatic)

When you push to a Git branch:

1. **Vercel** detects the push and starts preview deployment
2. **Neon Integration**:
   - Creates new branch: `preview/feature-branch`
   - Copies all data from `main` branch (instant, copy-on-write)
   - Injects branch-specific `POSTGRES_URL` into Vercel environment
3. **Vercel Build Process**:
   ```bash
   pnpm ci
   # → payload migrate    # Applies migration to preview branch
   # → pnpm build         # Builds Next.js application
   ```
4. **Preview URL** is deployed with isolated preview database
5. **Test thoroughly**:
   - Verify migrations applied successfully
   - Test new features with production-like data
   - Check Payload admin functionality
   - Validate frontend rendering

### Production Deployment

After successful preview testing:

```bash
git checkout main
git merge feature-branch
git push origin main
```

1. **Vercel** deploys to production environment
2. **Same migration** runs on production (`main`) Neon branch
3. **Production data** is updated with tested, validated migration
4. **Preview branch** is automatically deleted after merge (configurable retention)

## Best Practices

### ✅ DO

- **Always test migrations on preview first** - Never push directly to main with new migrations
- **Review migration files** - Ensure they use conditional logic (IF NOT EXISTS, DO $$ BEGIN...EXCEPTION)
- **Check Vercel logs** - Verify migrations complete successfully on preview
- **Test with admin panel** - Ensure collections load properly after migration
- **Use proper enum naming** - Version tables use `enum__pages_v_*` pattern (double underscore)
- **Commit migration files** - Never manually edit the database outside Payload migrations

### ❌ DON'T

- **Never use external database tools** for schema changes (pgAdmin, DataGrip, etc.)
- **Never mix dev mode with migrations** - Local uses auto-push, preview/production use migrations
- **Never skip preview testing** - Always validate migrations before production
- **Never manually edit production database** - All changes must go through migrations
- **Never push directly to main** with untested migrations

## Common Scenarios

### Adding a New Block

```bash
# 1. Create block locally
# src/blocks/MyNewBlock/index.ts

# 2. Register in collection
# src/collections/Pages/index.ts

# 3. Generate types
pnpm generate:types

# 4. Create migration
pnpm payload migrate:create

# 5. Push to preview
git add .
git commit -m "feat: add MyNewBlock"
git push origin feature/my-new-block

# 6. Neon creates: preview/feature/my-new-block
# 7. Test at preview URL
# 8. Merge to main when successful
```

### Fixing a Failed Migration

If a migration fails on preview:

```bash
# 1. Fix the migration file locally
# or create a new migration with corrections

# 2. Push new commit
git add src/migrations/
git commit -m "fix(db): correct migration enum types"
git push origin feature-branch

# 3. Neon automatically recreates preview branch
# 4. New migration runs on fresh preview database copy
```

### Rolling Back a Migration

**Preview Environment**:
- Simply push a new commit with corrected migration
- Neon will recreate the preview branch from production

**Production Environment** (if needed):
```bash
# Option 1: Use Neon point-in-time restore
# Neon Console → Branches → main → Restore

# Option 2: Create rollback migration
pnpm payload migrate:create  # Create migration with down() logic
```

## Troubleshooting

### Preview Deployment Not Getting Database Branch

**Symptoms**: Preview deployment fails with database connection errors

**Solution**:
1. Check Neon Console → Integrations → Vercel is active
2. Verify correct Vercel project is connected
3. Check Vercel deployment logs for `POSTGRES_URL` environment variable
4. Ensure integration has permission to create branches

### Migration Fails on Preview But Not Locally

**Symptoms**: Local dev works, preview build fails during migration

**Root Cause**: Local uses dev mode (automatic schema push), preview uses migrations

**Solution**:
1. Ensure all schema changes have corresponding migration files
2. Check for enum type mismatches (main vs version tables)
3. Review migration SQL for conditional logic (IF NOT EXISTS)
4. Test migration creation after schema changes: `pnpm payload migrate:create`

### Version Table Enum Type Errors

**Symptoms**: Error like `relation "_pages_v_blocks_*" does not exist` or `type "enum__pages_v_*" does not exist`

**Root Cause**: Version tables require separate enum types with different naming convention

**Solution**:
- Main tables use: `enum_pages_blocks_button_block_layout`
- Version tables need: `enum__pages_v_blocks_button_block_layout` (double underscore prefix)
- Create enum types BEFORE creating tables in migration
- See `src/migrations/20251002_095731.ts` for reference implementation

### Preview Branch Has Stale Data

**Symptoms**: Preview database doesn't reflect recent production changes

**Root Cause**: Preview branch was created before recent production updates

**Solution**:
1. Delete old preview branch in Neon Console
2. Push new commit to trigger fresh branch creation
3. New branch will have latest production data

## Migration File Best Practices

### Conditional Table Creation

Always use `IF NOT EXISTS` for tables:

```typescript
CREATE TABLE IF NOT EXISTS "pages_blocks_my_block" (
  "id" varchar PRIMARY KEY NOT NULL,
  -- columns...
);
```

### Conditional Enum Creation

Always wrap enum creation in exception handling:

```typescript
DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_my_block_layout" AS ENUM('option1', 'option2');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
```

### Version Table Enum Naming

Version tables need separate enums with `__` prefix:

```typescript
-- Main table enum
CREATE TYPE "enum_pages_blocks_button_block_layout" AS ENUM('horizontal', 'vertical');

-- Version table enum (different name!)
CREATE TYPE "enum__pages_v_blocks_button_block_layout" AS ENUM('horizontal', 'vertical');
```

### Foreign Key Constraints

Always use conditional constraint creation:

```typescript
DO $$ BEGIN
  ALTER TABLE "my_table" ADD CONSTRAINT "my_constraint_fk"
    FOREIGN KEY ("parent_id") REFERENCES "public"."parent_table"("id")
    ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
```

## Cost Considerations

### Neon Free Tier
- 1 project
- 10 branches (sufficient for most preview workflows)
- 3 GB storage
- Auto-delete old branches to stay within limits

### Neon Pro Tier
- Unlimited branches
- Pay per compute and storage usage
- Copy-on-write means branches are cost-effective
- Typical preview branch: <100 MB delta from production

### Optimization Tips
- Enable auto-delete for merged preview branches
- Set reasonable branch retention (24-48 hours)
- Monitor branch count in Neon Console
- Archive unused feature branches promptly

## Monitoring and Maintenance

### Regular Checks

**Weekly**:
- Review active Neon branches in Console
- Clean up abandoned preview branches
- Check Vercel deployment logs for migration errors

**Monthly**:
- Review Neon usage and costs
- Audit migration files for consistency
- Test production backup/restore process

### Neon Console Monitoring

**Location**: [Neon Console](https://console.neon.tech) → Your Project

**Key Metrics**:
- **Branches**: Number of active database branches
- **Storage**: Total storage usage across branches
- **Compute**: Database compute usage
- **Operations**: Recent database operations and queries

### Vercel Deployment Logs

**Check for**:
- Migration execution success/failure
- Database connection errors
- Build completion time
- Any schema-related warnings

## Related Documentation

- **[Neon Branching Documentation](https://neon.com/docs/introduction/branching)**
- **[Neon Vercel Integration](https://neon.com/docs/guides/vercel)**
- **[Payload Migration Commands](https://payloadcms.com/docs/database/migrations)**

## Support and Resources

**Neon Support**:
- [Neon Discord](https://discord.gg/neon)
- [Neon Documentation](https://neon.com/docs)

**Payload Support**:
- [Payload Discord](https://discord.gg/payload)
- [Payload Migration Docs](https://payloadcms.com/docs/database/migrations)

**Internal Resources**:
- See [CLAUDE.md](/CLAUDE.md) for full project documentation
- Migration files: [src/migrations/](/src/migrations/)
- Database configuration: [src/payload.config.ts](/src/payload.config.ts)
