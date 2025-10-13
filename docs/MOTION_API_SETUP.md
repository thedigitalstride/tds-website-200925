# Motion API Token Setup

## Overview

The Motion Plus package requires authentication via an API token. This token is stored in `.env.local` and automatically managed during package installation.

## Quick Setup

### Local Development

1. Create `.env.local` in the project root:
```bash
MOTION_API_TOKEN=your-actual-token-here
```

2. Run install:
```bash
pnpm install
```

The token is automatically injected during installation and restored to a placeholder afterward.

### Vercel Deployment

Add the environment variable in Vercel project settings:

1. Go to **Settings** → **Environment Variables**
2. Add:
   - **Key**: `MOTION_API_TOKEN`
   - **Value**: Your actual token
   - **Environments**: All (Production, Preview, Development)

## How It Works

### Automatic Token Management

The system uses package.json hooks to manage the token:

**Before Install** (`preinstall`):
- Reads `MOTION_API_TOKEN` from environment
- Injects real token into `package.json`
- Allows pnpm to authenticate with Motion's registry

**After Install** (`postinstall`):
- Restores placeholder in `package.json`
- Keeps working directory clean for git

### Package.json State

**In version control:**
```json
"motion-plus": "https://api.motion.dev/registry?package=motion-plus&version=1.5.4&token=MOTION_TOKEN_PLACEHOLDER"
```

**During installation (temporary):**
```json
"motion-plus": "https://api.motion.dev/registry?package=motion-plus&version=1.5.4&token=<real-token>"
```

## Implementation Files

- `scripts/manage-motion-token.js` - Token injection/restoration logic
- `package.json` - Contains preinstall/postinstall hooks and placeholder
- `vercel.json` - Custom install command for CI/CD
- `.env.local` - Local token storage (gitignored)

## Troubleshooting

**Authentication errors during install:**

1. Verify `MOTION_API_TOKEN` is set in `.env.local`
2. Clear package cache:
   ```bash
   pnpm store prune
   ```
3. Try fresh install:
   ```bash
   rm -rf node_modules pnpm-lock.yaml
   pnpm install
   ```

**Token accidentally committed:**

Run the restore script manually:
```bash
node scripts/manage-motion-token.js restore
```

## Security Notes

- Never commit the actual token value
- Store token in `.env.local` (gitignored)
- Use secure password manager for team sharing
- Rotate tokens periodically
- If exposed in git history, rotate immediately

## Lock File Considerations

The `pnpm-lock.yaml` contains the full URL with the real token. This is:
- **Expected** - ensures reproducible builds
- **Standard practice** - common for registry authentication
- **Low risk** - read-only token for package registry
- **Committed to git** - required for build reproducibility

To update the token, change it in `.env.local` and run `pnpm install`.
