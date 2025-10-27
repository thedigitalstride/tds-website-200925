/**
 * Helper utilities for consistent rate limiting across API endpoints
 */

import { NextResponse } from 'next/server'
import { aiRateLimiter } from './rateLimiter'
import type { RateLimitResult } from './rateLimiter'

/**
 * Apply rate limiting to a request and return error response if limit exceeded
 * @param userId - The authenticated user's ID
 * @returns Object with rateLimitResult and optional errorResponse
 */
export function applyRateLimit(userId: string | number): {
  rateLimitResult: RateLimitResult
  errorResponse?: NextResponse
} {
  const rateLimitResult = aiRateLimiter.check(userId.toString())

  if (!rateLimitResult.success) {
    const retryAfter = rateLimitResult.reset - Math.floor(Date.now() / 1000)
    const errorResponse = NextResponse.json(
      {
        error: 'Rate limit exceeded',
        message: `You've reached the limit of ${rateLimitResult.limit} AI generations per hour. Please try again later.`,
        retryAfter,
        resetAt: new Date(rateLimitResult.reset * 1000).toISOString()
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': rateLimitResult.limit.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': rateLimitResult.reset.toString(),
          'Retry-After': retryAfter.toString()
        }
      }
    )
    return { rateLimitResult, errorResponse }
  }

  return { rateLimitResult }
}

/**
 * Add rate limit headers to a successful response
 * @param response - The response data to send
 * @param rateLimitResult - The rate limit result from the check
 * @returns NextResponse with rate limit headers
 */
export function withRateLimitHeaders(
  response: unknown,
  rateLimitResult: RateLimitResult
): NextResponse {
  return NextResponse.json(
    response,
    {
      headers: {
        'X-RateLimit-Limit': rateLimitResult.limit.toString(),
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': rateLimitResult.reset.toString(),
      }
    }
  )
}