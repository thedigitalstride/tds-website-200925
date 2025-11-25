# Node.js CSS Import Issue with Migrations (ESM + tsx)

## Problem

When running `pnpm migrate:create` with Node.js (tested on 20 and 22) with ESM modules enabled, you get the following error:

```
TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".css" for
.../node_modules/react-image-crop/dist/ReactCrop.css
```

## Root Cause

1. The project has `"type": "module"` in package.json
2. The Media collection has `focalPoint: true` enabled
3. This causes Payload to import `react-image-crop`
4. `react-image-crop` imports CSS files directly at the module level
5. Node.js with ESM modules and tsx cannot handle CSS imports
6. The import happens before any loader hooks can intercept it

## Solutions

### Solution 1: Use Node.js 20 (Recommended)

```bash
# Install Node.js 20 with nvm
nvm install 20
nvm use 20

# Create migration
pnpm migrate:create your-migration-name
```

### Solution 2: Disable focalPoint (If not needed)

Edit `src/collections/Media.ts`:

```typescript
upload: {
  // focalPoint: true,  // Comment out or set to false
  focalPoint: false,
  // ... rest of config
}
```

### Solution 3: Use a separate environment for migrations

Create a `.nvmrc` file:
```
20
```

Then always use Node 20 for migrations:
```bash
nvm use
pnpm migrate:create your-migration-name
```

## What Doesn't Work

We attempted several solutions that don't work with Node.js 22:

1. **CSS loader hooks** - tsx loads before our hooks
2. **--experimental-loader** - Deprecated and doesn't intercept in time
3. **--import with register()** - Still loads after tsx
4. **--require with CommonJS** - Module loading order issue
5. **Temporarily modifying files** - Import happens at module level before config

## Long-term Fix

This needs to be fixed in either:
- Payload CMS (to handle CSS imports better)
- react-image-crop (to not import CSS at module level)
- tsx (to handle CSS imports)

## Workaround Script

If you must use Node.js 22, create migrations without focalPoint:

1. Temporarily set `focalPoint: false` in Media collection
2. Run `pnpm migrate:create`
3. Restore `focalPoint: true`

Note: This is manual and error-prone, using Node.js 20 is preferred.