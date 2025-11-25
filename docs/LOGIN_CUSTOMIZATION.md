# Login Form Customization

## Overview

The Payload admin login page has been customized to **only show Google OAuth login** by default. The email/password login fields are hidden via CSS.

## Current State

✅ **Google OAuth login** - Visible and functional  
❌ **Email/password login** - Hidden (can be restored)

## Restoring Email/Password Login

To restore the traditional email/password login alongside Google OAuth:

### Step 1: Restore CSS (payloadStyles.css)

Edit `/src/styles/payloadStyles.css` and comment out lines 14-39 (the login hiding rules):

```css
/* HIDE EMAIL/PASSWORD LOGIN - Comment out to restore */
/*
.login__form,
form.login__form {
  display: none !important;
}

.login__form__inputWrap {
  display: none !important;
}

.template-default .login__wrapper form[action="/api/users/login"] {
  display: none !important;
}

.template-default .login__wrapper button[type="submit"] {
  display: none !important;
}

.template-default .login__wrapper .forgot-password,
.template-default .login__wrapper a[href*="forgot-password"] {
  display: none !important;
}
*/
/* END HIDE EMAIL/PASSWORD LOGIN */
```

### Step 2: Restore Divider (BeforeLogin component)

Edit `/src/components/BeforeLogin/index.tsx` and uncomment the divider section (lines 62-86):

```tsx
{/* Divider - Comment out when email/password is hidden */}
<div style={{
  position: 'relative',
  marginBottom: '16px',
  textAlign: 'center',
}}>
  <div style={{
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: '1px',
    backgroundColor: '#dadce0',
  }} />
  <span style={{
    position: 'relative',
    padding: '0 12px',
    backgroundColor: '#fff',
    fontSize: '12px',
    color: '#5f6368',
  }}>
    Or continue with email
  </span>
</div>
```

### Step 3: Restart Development Server

```bash
pnpm dev
```

## Files Modified

1. **`/src/styles/payloadStyles.css`** - CSS rules to hide email/password fields
2. **`/src/components/BeforeLogin/index.tsx`** - Divider between OAuth and email/password (commented out)

## How It Works

### CSS Targeting

The CSS rules target Payload's default login form structure with multiple selectors for comprehensive coverage:

- `.login__form` and `form.login__form` - Hides the entire login form element
- `.login__form__inputWrap` - Hides the wrapper containing Email/Password inputs
- `form[action="/api/users/login"]` - Targets the form by its action attribute
- `button[type="submit"]` - Hides the submit button
- `.forgot-password` and `a[href*="forgot-password"]` - Hides forgot password links

### BeforeLogin Component

The `BeforeLogin` component is a Payload admin customization that renders **above** the default login form. It displays:

1. Welcome message
2. Google OAuth button (always visible)
3. "Or continue with email" divider (commented out when email/password is hidden)

## Authentication Flow

### Google OAuth Only (Current)
1. User lands on `/admin`
2. Sees Google OAuth button
3. Clicks "Sign in with Google"
4. Redirected to `/api/auth/google`
5. OAuth flow completes
6. User logged in and redirected to dashboard

### With Email/Password (When Restored)
1. User lands on `/admin`
2. Sees Google OAuth button
3. Sees divider: "Or continue with email"
4. Sees email/password fields below
5. Can choose either authentication method

## Security Considerations

- Google OAuth is restricted to `@thedigitalstride.co.uk` domain (configured in OAuth settings)
- Email/password authentication still works in the backend, just hidden in the UI
- Admin users can still be created programmatically via Payload API
- This is a UI-only change and doesn't affect authentication functionality

## Related Documentation

- [CUSTOM_GOOGLE_OAUTH_IMPLEMENTATION.md](/docs/CUSTOM_GOOGLE_OAUTH_IMPLEMENTATION.md) - Google OAuth setup and configuration
- [GOOGLE_OAUTH_SUMMARY.md](/docs/GOOGLE_OAUTH_SUMMARY.md) - OAuth implementation summary

