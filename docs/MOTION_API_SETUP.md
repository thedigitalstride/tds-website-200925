# Motion API Token Configuration

## Overview

The Motion Plus package requires authentication via an API token. This token is now stored securely in environment variables instead of being exposed in `package.json`.

## Obtaining the Token

The Motion API token should be obtained from:
- Your team lead or project administrator
- Your organization's secure password manager (e.g., 1Password, LastPass)
- The Motion developer dashboard (if you have access)

**Never commit the actual token to version control.**

## Setup Instructions

### 1. Local Development

Add the following environment variable to your `.env` or `.env.local` file:

```bash
MOTION_API_TOKEN=your-motion-api-token-here
```

Replace `your-motion-api-token-here` with the actual token obtained from your secure source.

### 2. Vercel Deployment

Add the environment variable in your Vercel project settings:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add a new variable:
   - **Key**: `MOTION_API_TOKEN`
   - **Value**: `your-motion-api-token-here` (use the actual token)
   - **Environments**: Select all (Production, Preview, Development)

### 3. CI/CD Pipelines

If you're using GitHub Actions or other CI/CD tools, add the `MOTION_API_TOKEN` as a secret in your repository settings.

## How It Works

The `.npmrc` file contains:

```
//api.motion.dev/:_authToken=${MOTION_API_TOKEN}
```

This configuration tells npm/pnpm to use the `MOTION_API_TOKEN` environment variable when authenticating with the Motion API registry.

The `package.json` dependency is now:

```json
"motion-plus": "https://api.motion.dev/registry?package=motion-plus&version=1.5.4"
```

Note: The token parameter has been removed from the URL.

## Files Modified

- `.npmrc` - Created (gitignored)
- `.npmrc.example` - Template for team members
- `package.json` - Removed token from URL
- `.gitignore` - Added `.npmrc` to prevent token exposure

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

- Never commit `.npmrc` with actual tokens to version control
- Never commit the actual token value in documentation or code
- The `.npmrc.example` file is safe to commit as it only contains the template
- Store the actual token in a secure password manager
- Rotate the API token periodically for security
- Use different tokens for different environments if possible
- If a token is accidentally exposed, rotate it immediately

