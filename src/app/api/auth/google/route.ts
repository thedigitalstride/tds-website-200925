import { NextRequest, NextResponse } from 'next/server'
import { getAuthorizationUrl } from '@/lib/google-oauth'
import crypto from 'crypto'

/**
 * Google OAuth Authorization Endpoint
 *
 * This endpoint redirects the user to Google's OAuth consent screen.
 * After the user grants permission, Google will redirect back to the callback endpoint.
 *
 * CSRF Protection: A random state parameter is generated and stored in a cookie,
 * which will be validated in the callback to prevent CSRF attacks.
 */
export async function GET(_request: NextRequest) {
  try {
    // Generate random state for CSRF protection
    const state = crypto.randomBytes(32).toString('hex')

    // Get authorization URL with state parameter
    const authorizationUrl = getAuthorizationUrl(state)

    // Create response with redirect
    const response = NextResponse.redirect(authorizationUrl)

    // Store state in encrypted HTTP-only cookie for validation in callback
    response.cookies.set('oauth_state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 600, // 10 minutes (enough time for OAuth flow)
      path: '/api/auth/google',
    })

    return response
  } catch (error) {
    console.error('Error generating Google OAuth URL:', error)
    return NextResponse.json(
      { error: 'Failed to initiate Google OAuth flow' },
      { status: 500 }
    )
  }
}
