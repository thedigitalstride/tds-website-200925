# Google OAuth - Quick Reference

## ✅ Working Implementation

Google OAuth login with Payload CMS is **fully functional** with persistent sessions.

## How It Works

1. User clicks "Sign in with Google"
2. Google OAuth flow completes
3. Custom callback handler:
   - Creates/updates user with random password
   - Calls `payload.login()` with email + password
   - Payload creates session and JWT token
   - Cookie set, user redirected to `/admin`
4. **Sessions persist after refresh** ✅

## Key Files

- `/src/app/api/auth/google/route.ts` - OAuth initiation
- `/src/app/api/auth/google/callback/route.ts` - OAuth callback handler
- `/src/lib/google-oauth.ts` - Google OAuth client
- `/src/collections/Accounts/index.ts` - OAuth account storage
- `/src/collections/Users/index.ts` - User collection with OAuth fields

## Environment Variables

```bash
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

## Testing

1. Navigate to `http://localhost:3000/admin`
2. Click "Sign in with Google"
3. Complete OAuth flow
4. **Refresh page** - should stay logged in ✅

## Production Deployment

Add to Vercel environment variables:
- `GOOGLE_CLIENT_ID` (production credentials)
- `GOOGLE_CLIENT_SECRET` (production credentials)
- `NEXT_PUBLIC_SERVER_URL` (production domain)

Update Google Console with production callback URL:
- `https://yourdomain.com/api/auth/google/callback`

## Documentation

See [CUSTOM_GOOGLE_OAUTH_IMPLEMENTATION.md](./CUSTOM_GOOGLE_OAUTH_IMPLEMENTATION.md) for complete implementation details.
