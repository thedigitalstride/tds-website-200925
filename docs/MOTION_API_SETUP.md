# Motion API Token Configuration

## Overview

The Motion Plus package requires authentication via an API token. This token is stored securely in environment variables (`.env.local`) and automatically injected into `package.json` during installation.

## Obtaining the Token

The Motion API token should be obtained from:
- Your team lead or project administrator
- Your organization's secure password manager (e.g., 1Password, LastPass)
- The Motion developer dashboard (if you have access)

**Never commit the actual token to version control.**

## Setup Instructions

### 1. Local Development

Add the following environment variable to your `.env.local` file:

```bash
MOTION_API_TOKEN=your-motion-api-token-here
```

Replace `your-motion-api-token-here` with the actual token obtained from your secure source.

**That's it!** The token will be automatically injected when you run `pnpm install`.

### 2. Vercel Deployment

Add the environment variable in your Vercel project settings:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add a new variable:
   - **Key**: `MOTION_API_TOKEN`
   - **Value**: `your-motion-api-token-here` (use the actual token)
   - **Environments**: Select all (Production, Preview, Development)

The build process will automatically inject the token during installation.

### 3. CI/CD Pipelines

If you're using GitHub Actions or other CI/CD tools, add the `MOTION_API_TOKEN` as a secret in your repository settings.

## How It Works

### Automatic Token Management

The system uses `preinstall` and `postinstall` hooks to manage the token:

1. **Before Install** (`preinstall`):
   - Script reads `MOTION_API_TOKEN` from environment (`.env.local` or CI env vars)
   - Replaces placeholder in `package.json` with real token
   - pnpm can now authenticate with Motion's registry

2. **After Install** (`postinstall`):
   - Script restores the placeholder in `package.json`
   - Your working directory stays clean

3. **Git Protection**:
   - Pre-commit hook verifies placeholder is present
   - Prevents accidentally committing real token

### Package.json State

In version control, `package.json` contains:
```json
"motion-plus": "https://api.motion.dev/registry?package=motion-plus&version=1.5.4&token=MOTION_TOKEN_PLACEHOLDER"
```

During installation, it temporarily becomes:
```json
"motion-plus": "https://api.motion.dev/registry?package=motion-plus&version=1.5.4&token=<real-token>"
```

Then immediately reverts to the placeholder after installation completes.

**Note**: Due to Motion's registry API design, the token must be in the URL. This automated approach keeps it out of version control while maintaining functionality.

## Files Modified

- `scripts/manage-motion-token.js` - Token injection and restoration logic
- `package.json` - Added preinstall/postinstall hooks, contains placeholder
- `.husky/pre-commit` - Git hook to prevent committing real token
- `.gitignore` - Ensures `.env.local` is not committed

## Workflow Examples

### Installing Dependencies
```bash
pnpm install
# ✅ Motion API token injected from environment
# ... installation proceeds ...
# ✅ Motion API token placeholder restored
```

### Committing Changes
```bash
git add package.json
git commit -m "Update dependencies"
# Pre-commit hook verifies placeholder is present
# ✅ Commit allowed
```

### If Token Accidentally Left in File
```bash
git commit -m "Update"
# ❌ Error: package.json contains a real Motion API token
#    Please ensure the placeholder is restored before committing
#    Run: node scripts/manage-motion-token.js restore
```

## Troubleshooting

If you encounter authentication errors when installing dependencies:

1. Verify the `MOTION_API_TOKEN` environment variable is set
2. Check that `.npmrc` exists and contains the correct configuration
3. Try clearing your package manager cache:
   ```bash
   pnpm store prune
   # or
   npm cache clean --force
   ```

## Security Notes

- Never commit the actual token value in documentation or code
- Always store the token in `.env.local` (which is gitignored)
- The pre-commit hook provides an extra safety layer
- Store the actual token in a secure password manager for team sharing
- Rotate the API token periodically for security
- Use different tokens for different environments if possible
- If a token is accidentally exposed in git history, rotate it immediately

## Lock File Considerations

The `pnpm-lock.yaml` file will contain the full URL with the real token. This is:
- **Expected behavior** - lockfiles ensure reproducible builds
- **Standard practice** - many projects have registry tokens in lockfiles
- **Low risk** - the token is read-only for a package registry
- **Committed to git** - for build reproducibility

If you need to rotate the token, update it in `.env.local` and run `pnpm install` to update the lockfile.

