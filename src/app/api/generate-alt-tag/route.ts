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
    logger.log(`[API] 🔗 Original URL: ${imageUrl.substring(0, 100)}...`)

    // Convert relative URL to blob storage URL if needed
    let fullImageUrl = imageUrl

    if (imageUrl.startsWith('/api/media/file/')) {
      // Payload proxy URL - convert to direct blob storage URL
      // In production, Vercel Blob Storage URLs are public and accessible
      // In local development, use BLOB_BASE_URL env variable
      const blobBaseUrl =
        process.env.BLOB_BASE_URL || 'https://ov6vgo85vq4jfktd.public.blob.vercel-storage.com'

      const blobFilename = imageUrl.replace('/api/media/file/', '')
      fullImageUrl = `${blobBaseUrl}/${blobFilename}`

      logger.log(`[API] 🔄 Converted proxy URL to blob storage URL`)
      logger.log(`[API]    From: ${imageUrl}`)
      logger.log(`[API]    To:   ${fullImageUrl}`)
      logger.log(
        `[API]    Using: ${process.env.BLOB_BASE_URL ? 'env BLOB_BASE_URL' : 'default blob URL'}`,
      )
    } else if (imageUrl.startsWith('/')) {
      // Other relative URL - this shouldn't happen but handle it
      logger.error(`[API] ⚠️  Unexpected relative URL: ${imageUrl}`)
      logger.error(
        `[API] 💡 In production, Payload should return full blob URLs, not proxy URLs`,
      )
      return NextResponse.json(
        { error: 'Unexpected relative URL format. Please use blob storage URL.' },
        { status: 400 },
      )
    } else if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
      // Invalid URL format
      logger.error(`[API] ❌ Invalid URL format: ${imageUrl}`)
      return NextResponse.json(
        { error: 'Invalid image URL format. URL must be absolute or a Payload proxy URL.' },
        { status: 400 },
      )
    } else {
      // Already an absolute URL (production case - full blob URL)
      logger.log(`[API] ✅ Using absolute URL (production blob URL)`)
    }

    // Try AI generation first to get detailed error
    logger.log(`[API] 🤖 Attempting AI generation...`)
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
