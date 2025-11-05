# Migration CSS Error Investigation - Oct 29, 2025

## Problem Statement

When attempting to create Payload CMS migrations with `pnpm payload migrate:create`, the command fails with:

```
TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".css" for
/Users/ianhancock/My Repos/tds-website-200925/tds-website-200925/node_modules/.pnpm/react-image-crop@10.1.8_react@19.1.0/node_modules/react-image-crop/dist/ReactCrop.css
```

## Timeline

- **Last Successful Migration**: Oct 28, 2025 21:52 (`20251028_215241.ts`)
- **Issue Discovered**: Oct 29, 2025
- **Payload Version at Last Success**: 3.59.1
- **Current Payload Version**: 3.61.1 (upgraded during troubleshooting)

## Investigation Steps Taken

### 1. Initial Hypothesis: Node.js Version Issue
- **Tested**: Downgraded from Node v22.17.1 to v20.19.4
- **Result**: ❌ Same error persisted
- **Conclusion**: Node version is NOT the cause

### 2. Second Hypothesis: tsx Version Conflict
- **Found**: Two tsx versions in pnpm-lock.yaml
  - tsx@4.20.3 (used by Payload 3.61.1)
  - tsx@4.20.6 (used by Vite/Vitest)
- **Tested**: Added pnpm override to force tsx@4.20.3
- **Result**: ❌ Not tested fully (user stopped before completion)
- **Note**: Issue existed BEFORE Payload upgrade when only tsx@4.20.3 was present

### 3. Third Hypothesis: Recent Code Changes
- **Checked**: TypeScript files modified Oct 27-29
- **Found**: Minor TypeScript errors in `src/utilities/debug.ts` (unrelated)
- **Checked**: Import statements in recently modified files
- **Result**: ❌ No problematic imports found

### 4. Root Cause Identified: focalPoint Feature

**Discovery**: `focalPoint: true` in `src/collections/Media.ts` (line 49)

**How it causes the error**:
1. Media collection has `focalPoint: true` enabled since Sept 20, 2025
2. This feature uses `react-image-crop` package for the admin UI
3. `react-image-crop` includes a CSS file: `ReactCrop.css`
4. Payload's migration system uses `tsx` to load TypeScript config files
5. When loading configs, it registers field components including focal point picker
6. `tsx` with ESM mode cannot handle CSS imports → migration fails

**Verification**:
- Temporarily disabled `focalPoint: false`
- Migration command proceeded past CSS error
- Reached user confirmation prompt successfully
- ✅ **Confirmed**: focalPoint is the root cause

## Why This Worked Before

**Question**: Why were migrations successful on Oct 28 with the same configuration?

**Possible Explanations**:
1. **Different dev server state**: Previous migration may have been created when:
   - Dev server wasn't running
   - Different modules were cached
   - Different tsx resolution path

2. **Package manager state**: Node modules may have been in different state
   - Different symlink resolution
   - Different hoisting configuration

3. **Environment difference**: Something in the environment changed between Oct 28-29
   - Different shell session
   - Different environment variables
   - Different Node path resolution

**Note**: This requires further investigation to understand why it suddenly started failing.

## Solution

### Workaround Script Created

`scripts/create-migration.sh`:
```bash
#!/bin/bash
# Temporarily disable focalPoint → Create migration → Re-enable focalPoint
```

**How it works**:
1. Backs up `Media.ts`
2. Changes `focalPoint: true` to `focalPoint: false`
3. Runs migration creation
4. Restores original `Media.ts`

**Usage**:
```bash
bash scripts/create-migration.sh
```

### Alternative Solutions (Not Implemented)

1. **Lazy-load field components**: Refactor to load client components only when needed
2. **Disable focal point permanently**: Remove if feature not needed
3. **Custom tsx loader**: Create loader that ignores CSS imports
4. **Use --disable-transpile flag**: Doesn't work (requires built JS, but config is TS)

## Technical Details

### Package Versions
- Payload CMS: 3.59.1 → 3.61.1
- tsx: 4.20.3 (Payload dependency)
- tsx: 4.20.6 (Vite peer dependency)
- react-image-crop: 10.1.8
- Node.js: v20.19.4 / v22.17.1 (both tested)

### Files Involved
- `src/collections/Media.ts` - Contains `focalPoint: true`
- `node_modules/@payloadcms/ui` - Contains focal point component
- `node_modules/react-image-crop/dist/ReactCrop.css` - Problematic CSS file
- `node_modules/payload/bin.js` - Uses tsx to load configs

### Payload Migration Flow
```
payload migrate:create
  ↓
bin.js loads tsx
  ↓
tsx loads src/payload.config.ts
  ↓
Config registers Media collection
  ↓
Media collection has focalPoint: true
  ↓
Payload UI loads focal point component
  ↓
react-image-crop gets imported
  ↓
CSS file import fails ❌
```

## Recommendations

1. **Short-term**: Use the workaround script for migrations
2. **Medium-term**: Investigate why this started failing (was working Oct 28)
3. **Long-term**: Consider if focal point feature is needed
   - If yes: Report to Payload CMS as bug
   - If no: Remove feature to simplify migrations

## Related Documentation

- [DATABASE_MIGRATIONS.md](./DATABASE_MIGRATIONS.md) - Migration workflow
- [Payload CMS Uploads](https://payloadcms.com/docs/upload/overview#focal-point-editing) - Focal Point docs

## Open Questions

1. **Why did this suddenly start failing?** Migrations worked Oct 28 with same config
2. **Is this a Payload CMS bug?** Should migrations handle client-side imports gracefully?
3. **Does tsx@4.20.6 vs 4.20.3 matter?** Not fully tested due to user stopping test

## Status

- ✅ Root cause identified
- ✅ Workaround created and tested
- ⚠️ Underlying reason for sudden failure unknown
- ⏳ Waiting for user to create migration using workaround
