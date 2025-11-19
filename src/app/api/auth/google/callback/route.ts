import { NextRequest, NextResponse } from 'next/server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { getGoogleOAuthClient, getGoogleUserInfo, GoogleUserInfo } from '@/lib/google-oauth'
import crypto from 'crypto'

/**
 * Google OAuth Callback Handler
 *
 * This endpoint handles the OAuth callback from Google after the user grants permission.
 * Flow:
 * 1. Exchange authorization code for access token
 * 2. Fetch user profile from Google
 * 3. Find or create user in Payload
 * 4. Use Payload's login endpoint to create proper session
 * 5. Redirect to admin panel
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const error = searchParams.get('error')

    // Handle OAuth errors (user denied access, etc.)
    if (error) {
      console.error('Google OAuth error:', error)
      return NextResponse.redirect(
        new URL(`/admin/login?error=${encodeURIComponent(error)}`, request.url)
      )
    }

    // Validate authorization code
    if (!code) {
      return NextResponse.redirect(
        new URL('/admin/login?error=missing_code', request.url)
      )
    }

    // Validate state parameter for CSRF protection
    const storedState = request.cookies.get('oauth_state')?.value
    if (!state || !storedState || state !== storedState) {
      console.error('OAuth state mismatch - possible CSRF attack')
      return NextResponse.redirect(
        new URL('/admin/login?error=invalid_state', request.url)
      )
    }

    // Exchange code for tokens
    const oauth2Client = getGoogleOAuthClient()
    const { tokens } = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens)

    if (!tokens.access_token) {
      throw new Error('No access token received from Google')
    }

    // Fetch user info from Google
    const googleUser: GoogleUserInfo = await getGoogleUserInfo(tokens.access_token)

    // Get Payload instance
    const payload = await getPayloadHMR({ config })

    // Find or create account in Accounts collection
    const account = await payload.find({
      collection: 'accounts' as any,
      where: {
        sub: { equals: googleUser.sub }
      },
      limit: 1
    })

    let userId: string | number
    let userPassword: string | null = null

    if (account.docs.length > 0) {
      // Existing account found - get the linked user
      const existingAccount = account.docs[0]
      userId = typeof existingAccount.user === 'object'
        ? existingAccount.user.id
        : existingAccount.user

      // Retrieve the stored OAuth password
      userPassword = existingAccount.oauth_password as string
      console.log('[OAuth Debug] Existing account found:', {
        userId,
        hasPassword: !!userPassword,
        passwordLength: userPassword?.length || 0
      })

      // If no password is stored (from previous failed attempts), regenerate it
      if (!userPassword) {
        console.log('[OAuth Debug] Regenerating password for existing account')
        userPassword = crypto.randomBytes(32).toString('hex')

        // Update user password
        await payload.update({
          collection: 'users',
          id: userId,
          data: {
            password: userPassword,
          } as any
        })
      }

      // Update account tokens (and password if regenerated)
      await payload.update({
        collection: 'accounts' as any,
        id: existingAccount.id,
        data: {
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          expires_at: tokens.expiry_date,
          token_type: tokens.token_type,
          scope: tokens.scope,
          id_token: tokens.id_token,
          oauth_password: userPassword, // Update password
        } as any
      })
    } else {
      // No existing account - check if user exists by email
      const existingUser = await payload.find({
        collection: 'users',
        where: {
          email: { equals: googleUser.email }
        },
        limit: 1
      })

      if (existingUser.docs.length > 0) {
        // User exists with this email - link the account
        const user = existingUser.docs[0]
        userId = user.id

        // Generate password for linking (existing email/password users)
        userPassword = crypto.randomBytes(32).toString('hex')

        // Update user with Google info AND new password
        await payload.update({
          collection: 'users',
          id: userId,
          data: {
            sub: googleUser.sub,
            googleId: googleUser.sub,
            picture: googleUser.picture,
            emailVerified: googleUser.email_verified,
            authProvider: 'google',
            password: userPassword, // Update password for OAuth login
          } as any
        })

        // Create new account record with the password
        await payload.create({
          collection: 'accounts' as any,
          data: {
            sub: googleUser.sub,
            user: userId,
            provider: 'google',
            providerAccountId: googleUser.sub,
            name: googleUser.name,
            email: googleUser.email,
            picture: googleUser.picture,
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expires_at: tokens.expiry_date,
            token_type: tokens.token_type,
            scope: tokens.scope,
            id_token: tokens.id_token,
            oauth_password: userPassword, // Store plain password
          } as any
        })
      } else {
        // Create new user WITH random password for OAuth users
        userPassword = crypto.randomBytes(32).toString('hex')
        console.log('[OAuth Debug] Creating new user:', {
          email: googleUser.email,
          passwordLength: userPassword.length,
          passwordSample: userPassword.substring(0, 8) + '...'
        })

        const newUser = await payload.create({
          collection: 'users',
          data: {
            email: googleUser.email,
            name: googleUser.name,
            sub: googleUser.sub,
            googleId: googleUser.sub,
            picture: googleUser.picture,
            emailVerified: googleUser.email_verified,
            authProvider: 'google',
            approvalStatus: 'approved', // Auto-approve (change to 'pending' for manual approval)
            password: userPassword, // Payload will hash this
          } as any
        })

        userId = newUser.id
        console.log('[OAuth Debug] New user created:', {
          userId,
          email: newUser.email
        })

        // Create account record with the plain password for future logins
        await payload.create({
          collection: 'accounts' as any,
          data: {
            sub: googleUser.sub,
            user: userId,
            provider: 'google',
            providerAccountId: googleUser.sub,
            name: googleUser.name,
            email: googleUser.email,
            picture: googleUser.picture,
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expires_at: tokens.expiry_date,
            token_type: tokens.token_type,
            scope: tokens.scope,
            id_token: tokens.id_token,
            oauth_password: userPassword, // Store plain password for retrieval
          } as any
        })
      }
    }

    // If we don't have a password, it's an error state
    if (!userPassword) {
      console.error('[OAuth Debug] ERROR: No OAuth password found for user')
      return NextResponse.redirect(
        new URL('/admin/login?error=oauth_failed', request.url)
      )
    }

    // Get the user document
    const user = await payload.findByID({
      collection: 'users',
      id: userId
    })

    console.log('[OAuth Debug] Attempting Payload login:', {
      email: user.email,
      hasPassword: !!userPassword,
      passwordLength: userPassword.length
    })

    // Use Payload's login to create proper session
    const loginResult = await payload.login({
      collection: 'users',
      data: {
        email: user.email,
        password: userPassword,
      },
    })

    console.log('[OAuth Debug] Login successful:', {
      hasToken: !!loginResult.token,
      tokenLength: loginResult.token?.length || 0,
      exp: loginResult.exp,
      userId: loginResult.user?.id
    })

    // Verify token exists
    if (!loginResult.token) {
      console.error('[OAuth Debug] ERROR: No token returned from Payload login')
      return NextResponse.redirect(
        new URL('/admin/login?error=login_failed', request.url)
      )
    }

    // Create response with redirect
    const response = NextResponse.redirect(new URL('/admin', request.url))

    // Set the authentication cookie with the token from Payload
    const cookiePrefix = payload.config.cookiePrefix || 'payload'
    const isProduction = process.env.NODE_ENV === 'production'
    const maxAge = loginResult.exp ? (loginResult.exp - Math.floor(Date.now() / 1000)) : 7200

    console.log('[OAuth Debug] Setting cookie:', {
      cookieName: `${cookiePrefix}-token`,
      maxAge,
      isProduction,
      path: '/',
    })

    response.cookies.set(`${cookiePrefix}-token`, loginResult.token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge,
      path: '/',
    })

    // Clear the OAuth state cookie (no longer needed)
    response.cookies.delete('oauth_state')

    console.log('[OAuth Debug] ✅ OAuth login complete for:', user.email)
    return response

  } catch (error) {
    console.error('OAuth callback error:', error)

    // Redirect to login with error message
    return NextResponse.redirect(
      new URL(
        `/admin/login?error=${encodeURIComponent('oauth_failed')}`,
        request.url
      )
    )
  }
}
