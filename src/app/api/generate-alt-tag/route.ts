/**
 * API Route for Manual ALT Tag Generation
 * Allows users to manually trigger AI ALT tag generation from the admin UI
 */

import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'
import { generateAltTag, generateAltTagWithFallback } from '@/services/ai'
import { logger } from '@/utilities/logger'
import { aiRateLimiter } from '@/utilities/rateLimiter'
import { convertMediaUrlToBlob } from '@/utilities/convertMediaUrlToBlob'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })

    // Parse request body
    const body = await request.json()
    const { imageUrl, filename } = body

    // Validate required fields
    if (!imageUrl || typeof imageUrl !== 'string') {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 })
    }

    if (!filename || typeof filename !== 'string') {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 })
    }

    // Check authentication (require logged in user)
    const { user } = await payload.auth({ headers: request.headers })

    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // Apply rate limiting
    const rateLimitResult = aiRateLimiter.check(user.id.toString())

    if (!rateLimitResult.success) {
      const retryAfter = rateLimitResult.reset - Math.floor(Date.now() / 1000)
      return NextResponse.json(
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
    }

    logger.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    logger.log(`[API] 🎯 Manual ALT tag generation requested`)
    logger.log(`[API] 📁 Filename: ${filename}`)
    // Convert URL to blob storage URL for OpenAI/external services
    // This handles localhost URLs, proxy routes, etc.
    const fullImageUrl = convertMediaUrlToBlob(imageUrl)

    // Try AI generation first to get detailed error
    const result = await generateAltTag(fullImageUrl, payload)

    if (result.success && result.altText) {
      // Success! AI generated the ALT tag
      logger.log(`[API] ✅ AI generation successful!`)
      logger.log(`[API] ✨ Generated: "${result.altText}"`)
      logger.log(`[API] 💰 Cost: $${result.metadata?.cost?.toFixed(4) || '0'}`)
      logger.log(`[API] ⏱️  Duration: ${result.metadata?.duration}ms`)
      logger.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

      return NextResponse.json(
        {
          success: true,
          altText: result.altText,
          metadata: result.metadata,
        },
        {
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
          }
        }
      )
    }

    // AI generation failed, log the error and use fallback
    logger.error(`[API] ❌ AI generation FAILED`)
    logger.error(`[API] 📋 Error: ${result.error}`)
    logger.log(`[API] 🔄 Attempting fallback to cleaned filename...`)

    const fallbackAlt = await generateAltTagWithFallback(fullImageUrl, filename, payload)

    if (!fallbackAlt || fallbackAlt.trim() === '') {
      logger.error(`[API] ❌ Fallback also failed - no ALT text generated`)
      logger.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      return NextResponse.json(
        {
          error:
            'Failed to generate ALT tag. Please check AI Settings and ensure your API key is valid.',
          details: result.error,
        },
        { status: 500 },
      )
    }

    logger.log(`[API] ⚠️  Using fallback: "${fallbackAlt}"`)
    logger.log(`[API] 💡 This is the cleaned filename, not AI-generated`)
    logger.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

    return NextResponse.json({
      success: true,
      altText: fallbackAlt,
      warning: `Using fallback (cleaned filename). AI generation failed: ${result.error}`,
      isFallback: true,
    })
  } catch (error) {
    logger.error('[API] Error generating ALT tag:', error)

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      },
      { status: 500 },
    )
  }
}
