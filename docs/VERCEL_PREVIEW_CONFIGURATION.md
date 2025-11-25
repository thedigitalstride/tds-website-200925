# Vercel Preview Environment Configuration

This document outlines the required Vercel dashboard configuration changes to fix authentication issues on the preview deployment.

## Issues Fixed

1. Domain redirect from `tds-website-200925.vercel.app` to production
2. Authentication toast error on preview login page
3. Post-login redirect to production instead of staying on preview

## Required Vercel Configuration Changes

### 1. Remove/Modify Domain Redirect

**Location**: Vercel Dashboard → Project Settings → Domains

**Action Required**:
- Check if there's a redirect rule from `*.vercel.app` → `prod.thedigitalstride.co.uk`
- **Option A (Recommended)**: Modify redirect to only apply to production branch
- **Option B**: Remove the redirect entirely  
- **Option C**: Add exclusion for preview branches

**Why**: The redirect prevents preview deployments from functioning independently, causing all preview traffic to redirect to production.

**Alternative Locations to Check**:
- Project Settings → Environment Variables (look for `VERCEL_REDIRECT_URL` or similar)
- Check for custom middleware or edge config causing the redirect

---

### 2. Configure Environment Variables by Environment

**Location**: Vercel Dashboard → Project Settings → Environment Variables

#### NEXT_PUBLIC_SERVER_URL

**Current Issue**: Vercel's `VERCEL_URL` contains the unique deployment URL (e.g., `tds-website-200925-xyz123.vercel.app`), not the custom domain. This causes OAuth redirects and API calls to use the wrong URL.

**Required Configuration**:

| Environment | Value | Notes |
|-------------|-------|-------|
| **Production** | `https://prod.thedigitalstride.co.uk` | Explicit production domain |
| **Preview** | `https://preview.thedigitalstride.co.uk` | **MUST BE SET** - forces preview to use custom domain |
| **Development** | **Not Set** (remove if exists) | Uses `localhost:3000` fallback |

**Action Steps**:
1. Click on `NEXT_PUBLIC_SERVER_URL` variable (or create if doesn't exist)
2. Ensure it is checked for **both "Production" AND "Preview"** environments
3. Set value for Production: `https://prod.thedigitalstride.co.uk`
4. Set value for Preview: `https://preview.thedigitalstride.co.uk`
5. **Uncheck** "Development" environment if currently selected
6. Save changes

**Why**: Without setting `NEXT_PUBLIC_SERVER_URL` for preview, the system uses `VERCEL_URL` which contains the unique deployment URL. This breaks:
- OAuth redirect URIs (redirects to wrong domain)
- Payload CMS serverURL (uses wrong URL for API calls)
- CORS validation (origin mismatch)

---

### 3. Configure Google OAuth Redirect URIs

**Critical**: Google OAuth redirect URIs must match the exact domain being used.

**Location**: Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client IDs

**Action Required**:
Add the preview domain to authorized redirect URIs:

```
https://preview.thedigitalstride.co.uk/api/auth/google/callback
```

**Why**: When logging in via Google OAuth on the preview domain, Google redirects back to the `redirect_uri` parameter. The custom OAuth implementation uses `/api/auth/google/callback` as the callback endpoint. If the preview domain isn't in the authorized list, Google will reject the OAuth flow with a redirect_uri_mismatch error.

**Full List of Authorized Redirect URIs**:
```
https://prod.thedigitalstride.co.uk/api/auth/google/callback
https://preview.thedigitalstride.co.uk/api/auth/google/callback
http://localhost:3000/api/auth/google/callback (development)
```

**Note**: This project uses a **custom Google OAuth implementation** (not Payload's built-in OAuth). The callback route is defined in `/src/app/api/auth/google/callback/route.ts`.

---

#### MONGODB_URI

**Recommended Configuration**:

| Environment | Value | Notes |
|-------------|-------|-------|
| **Production** | Production MongoDB connection string | Live data |
| **Preview** | Preview DB or Production (read-only) | Use separate preview DB or read-only production access |
| **Development** | `mongodb://localhost:27017/tds-website` | Local Docker MongoDB |

#### PAYLOAD_SECRET

**Required Configuration**:

| Environment | Value | Notes |
|-------------|-------|-------|
| **Production** | Production secret (32+ chars) | Secure random string |
| **Preview** | Same as production OR separate preview secret | Can share with production or use separate |
| **Development** | Development secret | Local development secret |

---

## Code Changes Made

The following code changes have been implemented in `src/payload.config.ts`:

### CORS Configuration Update

Updated CORS to accept all origins (`'*'`) to support Vercel's unique preview deployment URLs:

```typescript
cors: '*',
```

**Why `'*'` (wildcard)?**
- Vercel preview deployments use **unique, unpredictable URLs** (e.g., `tds-website-200925-xyz123.vercel.app`)
- These URLs change with each deployment, making it impossible to whitelist them
- Payload CMS `cors` option only accepts:
  - String array of exact origins
  - `'*'` for all origins
  - It does NOT support functions or regex patterns

**Security Considerations**:
- CORS allows cross-origin **requests**, but authentication is still enforced
- Payload's JWT authentication system protects all authenticated endpoints
- Public endpoints are already accessible via REST API
- The `NEXT_PUBLIC_SERVER_URL` setting ensures redirects and OAuth use the correct custom domain

**Alternative** (if wildcard is unacceptable):
You could use an array with specific origins, but you'd need to manually add each preview URL:
```typescript
cors: [
  'https://prod.thedigitalstride.co.uk',
  'https://preview.thedigitalstride.co.uk',
  'https://tds-website-200925.vercel.app',
  'http://localhost:3000',
  // Add each new preview deployment URL here manually
],
```

---

## Testing Checklist

After making the Vercel configuration changes and deploying the code updates:

- [ ] Visit `https://tds-website-200925.vercel.app` - should NOT redirect to production
- [ ] Visit `https://preview.thedigitalstride.co.uk/admin` - should load admin login
- [ ] Check browser console - should NOT see CORS errors
- [ ] Open browser DevTools Network tab
- [ ] Observe the login page - should NOT see "Fetching user failed" toast error
- [ ] Check Network tab for `/api/users/me` request - should return 200 or 401, not CORS error
- [ ] Login with valid credentials
- [ ] After successful login, verify URL is still `https://preview.thedigitalstride.co.uk/*`
- [ ] Navigate to a page in preview mode
- [ ] Edit content in admin panel
- [ ] Click preview - should stay on preview domain

---

## How It Works

### Environment Detection Flow

```
1. Payload Config reads serverURL via getServerSideURL()
   ↓
2. getServerSideURL() checks environment variables in priority order:
   - NEXT_PUBLIC_SERVER_URL (if set) ← SET for both Production AND Preview
   - VERCEL_URL (if exists) ← Contains unique deployment URL, not custom domain
   - VERCEL_PROJECT_PRODUCTION_URL (fallback)
   - 'http://localhost:3000' (development)
   ↓
3. Preview Environment:
   - NEXT_PUBLIC_SERVER_URL = 'https://preview.thedigitalstride.co.uk' ✓
   - Result: Uses preview custom domain ✓
   ↓
4. Production Environment:
   - NEXT_PUBLIC_SERVER_URL = 'https://prod.thedigitalstride.co.uk' ✓
   - Result: Uses production domain ✓
```

### CORS Validation Flow

The CORS configuration now uses a function with wildcard support:

```
1. Client (browser) makes API request from preview.thedigitalstride.co.uk
   ↓
2. Request includes Origin header: 'https://preview.thedigitalstride.co.uk'
   ↓
3. Payload CORS function checks:
   - Is origin in allowedOrigins array? ✓
   - OR does origin end with '.vercel.app'? ✓
   ↓
4. Returns Access-Control-Allow-Origin: origin ✓
   ↓
5. Browser allows the request ✓
```

**Wildcard Support**: The CORS function also accepts any `*.vercel.app` domain, which allows the unique deployment URLs to work for initial API requests before the custom domain is fully applied.

---

## Troubleshooting

### Issue: Still seeing "Fetching user failed" error

**Check**:
1. Browser DevTools → Network tab
2. Find `/api/users/me` request
3. Look at response:
   - **CORS error**: CORS configuration not applied, redeploy needed
   - **404/500 error**: API route issue, check server logs
   - **Network error**: Server URL misconfigured

**Solution**:
- Clear browser cache and hard reload (Cmd+Shift+R)
- Verify deployment completed successfully
- Check Vercel deployment logs for errors

### Issue: Still redirecting to production after login

**Check**:
1. Verify `NEXT_PUBLIC_SERVER_URL` is NOT set for preview environment
2. Check Vercel deployment logs for actual serverURL being used
3. Look for custom redirect rules in Vercel dashboard

**Solution**:
- Redeploy after removing `NEXT_PUBLIC_SERVER_URL` from preview
- Check for domain-level redirects in Vercel Domains settings

### Issue: Vercel URL still redirects to production

**Check**:
1. Vercel Dashboard → Domains
2. Look for redirect rules
3. Check if redirect is branch-specific

**Solution**:
- Remove or modify redirect to exclude preview branches
- Contact Vercel support if redirect persists without configuration

---

## Rollback Plan

If issues occur after implementation:

1. **Revert code changes**:
   ```bash
   git revert <commit-hash>
   git push origin preview
   ```

2. **Restore Vercel settings**:
   - Re-enable domain redirect (if removed)
   - Set `NEXT_PUBLIC_SERVER_URL` to previous configuration
   - Redeploy from Vercel dashboard

3. **Verify rollback**:
   - Check that production still works
   - Verify preview returns to previous behavior

---

## Related Documentation

- [Environment Variables Guide](./ENVIRONMENT.md)
- [Deployment Checklist](./DEPLOYMENT_CHECKLIST.md)
- [CORS Configuration](./STYLING_SYSTEM.md)

---

## Questions?

If you encounter issues not covered in this guide, check:
1. Vercel deployment logs
2. Browser console for client-side errors
3. Network tab for failed requests
4. Vercel dashboard for configuration conflicts

