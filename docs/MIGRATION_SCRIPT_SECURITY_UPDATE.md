# MongoDB Migration Script Security Update

**Date:** November 21, 2025  
**Issue:** Hardcoded MongoDB Atlas credentials in migration script  
**Risk:** Credentials exposed in version control

## Changes Made

### 1. Updated Migration Script (`scripts/migrate-mongodb-to-local.js`)

**Before:**
```javascript
const ONLINE_URI = 'mongodb+srv://Vercel-Admin-tds-website-2025:hTy40QawOZQeK5qY@...';
```

**After:**
```javascript
import { config } from 'dotenv';
config();

const ONLINE_URI = process.env.MONGODB_ATLAS_URI;
const LOCAL_URI = process.env.MONGODB_LOCAL_URI || 'mongodb://localhost:27017';
const SOURCE_DB_NAME = process.env.MONGODB_SOURCE_DB || 'atlas-tds-website-2025';
const LOCAL_DB_NAME = process.env.MONGODB_LOCAL_DB || 'tds-website';
```

**Added validation:**
```javascript
if (!ONLINE_URI) {
  console.error('Error: MONGODB_ATLAS_URI environment variable is required');
  console.error('Please add it to your .env file:');
  console.error('MONGODB_ATLAS_URI=mongodb+srv://username:password@cluster.mongodb.net/');
  process.exit(1);
}
```

### 2. Environment Variables Added

**Required:**
- `MONGODB_ATLAS_URI` - MongoDB Atlas connection string (source database)

**Optional (with defaults):**
- `MONGODB_LOCAL_URI` - Local MongoDB URI (default: `mongodb://localhost:27017`)
- `MONGODB_SOURCE_DB` - Source database name (default: `atlas-tds-website-2025`)
- `MONGODB_LOCAL_DB` - Local database name (default: `tds-website`)
- `MONGODB_UPDATE_MODE` - Migration mode: `incremental` or `full` (default: `incremental`)

### 3. Documentation Updated

**Files Updated:**
- `docs/ENVIRONMENT.md` - Added MongoDB migration script section
- `docs/MONGODB_MIGRATION.md` - Updated migration instructions with security notes
- `README.md` - Updated prerequisites and environment setup
- `env.template` - Created template file for reference

### 4. Template File Created

Created `env.template` with all required environment variables and clear instructions.

## Usage

```bash
# 1. Add Atlas connection string to .env
MONGODB_ATLAS_URI=mongodb+srv://username:password@cluster.mongodb.net/

# 2. Run migration script
pnpm mongodb:pull

# Or directly:
node scripts/migrate-mongodb-to-local.js
```

## Security Improvements

1. ✅ **No Credentials in Code** - All credentials stored in `.env` file
2. ✅ **Validation** - Script exits with clear error if credentials missing
3. ✅ **Documentation** - Security notes added to all relevant docs
4. ✅ **Template File** - `env.template` provides safe reference
5. ✅ **Git Protection** - `.gitignore` already excludes `.env` files

## Dependencies

**Already Installed:**
- `dotenv@16.4.7` - Environment variable management
- `mongodb` - MongoDB driver (dev dependency)

No additional packages required.

## Impact

- **Security:** ⬆️ High - Credentials no longer in version control
- **Compatibility:** ✅ Backward compatible with defaults
- **Developer Experience:** ⬆️ Improved - Clear error messages and documentation

## Next Steps

**For Developers:**
1. Add `MONGODB_ATLAS_URI` to your local `.env` file
2. Use `env.template` as reference for all variables
3. Never commit `.env` files to version control

**For Production:**
- Add `MONGODB_ATLAS_URI` to Vercel environment variables if needed for migrations
- All other environment variables remain unchanged

## Related Documentation

- [ENVIRONMENT.md](/docs/ENVIRONMENT.md) - Complete environment variable guide
- [MONGODB_MIGRATION.md](/docs/MONGODB_MIGRATION.md) - MongoDB migration guide
- [README.md](/README.md) - Getting started guide

## Rollback

If issues occur, the script will fail safely with clear error messages. No destructive changes without valid credentials.


