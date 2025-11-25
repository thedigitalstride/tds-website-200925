# Payload CMS CSS Import Error Fix

## Issue

When running `pnpm generate:types` or `pnpm build`, the following error occurred:

```
TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".css" for 
/Users/.../node_modules/.pnpm/react-image-crop@10.1.8_react@19.1.0/node_modules/react-image-crop/dist/ReactCrop.css
```

## Root Cause

Payload CMS uses `tsx` (TypeScript Execute) to load and process the Payload configuration file during type generation. The `@payloadcms/ui` package (and its dependencies like `react-image-crop`) import CSS files. Node.js in ESM mode doesn't natively handle `.css` file extensions, causing the error.

The issue occurs because:
1. Payload runs `payload generate:types` which uses `tsx` internally
2. `tsx` processes the payload config and all its imports
3. Admin UI components import CSS files (e.g., from `react-image-crop`)
4. Node.js ESM loader doesn't recognize `.css` extension
5. Error is thrown before type generation completes

## Solution

We implemented a custom Node.js module loader that intercepts CSS file imports and returns empty module stubs. The key insight was that `tsx` adds query parameters to URLs (like `?tsx-namespace=`), so we needed to strip these before checking file extensions.

### Files Added

**`preload-css-handler.mjs`** - Custom ESM loader that:
- Registers before `tsx` processes files
- Intercepts `.css`, `.scss`, `.sass`, and `.less` imports
- Returns empty module exports (`export default {}`)
- Strips query parameters from URLs for accurate extension detection

### Configuration Changes

**`package.json`** - Updated `generate:types` script:

```json
"generate:types": "cross-env NODE_OPTIONS='--no-deprecation --import ./preload-css-handler.mjs' payload generate:types"
```

**Added dev dependencies**:
- `@swc-node/register` - For potential alternative transpilation (not currently used)
- `@swc/core` - SWC compiler core (explored but tsx solution was simpler)

## How It Works

1. When `payload generate:types` runs, Node.js loads `preload-css-handler.mjs` via `--import` flag
2. The handler registers a custom `load()` hook in the module resolution chain
3. When any module tries to import a CSS file:
   - The hook checks if the URL (minus query params) ends with `.css`, `.scss`, `.sass`, or `.less`
   - If yes, returns `{ format: 'module', shortCircuit: true, source: 'export default {};' }`
   - If no, passes through to the next loader (tsx)
4. Type generation completes successfully without CSS parse errors

## Testing

```bash
# Generate types
pnpm generate:types
# ✓ CSS import handler registered
# ✓ Types written to src/payload-types.ts

# Build project
pnpm build
# ✓ Compiled successfully
```

## Alternative Solutions Considered

1. **Using `--use-swc` flag** - Payload supports SWC as an alternative to tsx, but SWC had stricter module resolution that couldn't find `next/cache` exports
2. **Modifying `.swcrc` config** - SWC configuration didn't solve the module resolution issues
3. **Custom wrapper scripts** - More complex than needed
4. **Inline data URL loaders** - Difficult to escape properly in package.json
5. **Patching `@payloadcms/ui`** - Would require forking the package

## Related Issues

- [AnswerOverflow Discussion](https://www.answeroverflow.com/m/1379469669546590378) - TanStack + Payload CMS CSS leaking issue
- [Payload GitHub Discussions](https://github.com/payloadcms/payload/discussions/10011) - CSS imports in server-side code

## Notes

- This fix only affects type generation and build processes
- The CSS imports are still properly loaded in the browser/admin panel
- The solution is non-invasive and doesn't modify any Payload or dependency code
- Works with Payload CMS 3.61.1 and tsx 4.20.3

## Maintenance

If upgrading Payload CMS or tsx in the future, verify that:
1. The `preload-css-handler.mjs` still intercepts CSS imports correctly
2. The `--import` flag syntax remains compatible
3. Type generation and builds complete successfully

## Troubleshooting

If the error reappears:

1. Check that `preload-css-handler.mjs` exists in the project root
2. Verify the `NODE_OPTIONS` in `package.json` includes `--import ./preload-css-handler.mjs`
3. Clear Next.js cache: `rm -rf .next && pnpm dev`
4. Reinstall dependencies: `rm -rf node_modules pnpm-lock.yaml && pnpm install`
5. Check tsx version hasn't changed significantly: `pnpm list tsx`

