/**
 * API Route for SEO Title Generation
 * Allows users to manually trigger AI SEO title generation from the admin UI
 */

import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'
import {
  generateSeoTitle,
  logSeoGeneration,
  analyzeContent,
  parseKeywords,
} from '@/services/ai'
import { logger } from '@/utilities/logger'
import { aiRateLimiter } from '@/utilities/rateLimiter'
import type { SeoTitleConfig } from '@/services/ai/types'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })

    // Parse request body
    const body = await request.json()
    const { collectionSlug, documentId: rawDocumentId, keywords, guidance } = body

    // Validate required fields
    if (!collectionSlug || typeof collectionSlug !== 'string') {
      return NextResponse.json({ error: 'Collection slug is required' }, { status: 400 })
    }

    if (!rawDocumentId) {
      return NextResponse.json({ error: 'Document ID is required' }, { status: 400 })
    }

    // Convert documentId to string (it might be a number from Payload)
    const documentId = typeof rawDocumentId === 'string' ? rawDocumentId : String(rawDocumentId)

    // Validate collection
    if (collectionSlug !== 'pages' && collectionSlug !== 'posts') {
      return NextResponse.json(
        { error: 'Invalid collection. Must be "pages" or "posts"' },
        { status: 400 },
      )
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
    logger.log(`[API] 🎯 SEO title generation requested`)
    logger.log(`[API] 📄 Collection: ${collectionSlug}`)
    logger.log(`[API] 🆔 Document ID: ${documentId}`)
    logger.log(`[API] 🏷️  Keywords: ${keywords || '(none)'}`)

    // Fetch the document to access its content
    logger.log(`[API] 📖 Fetching document...`)
    const document = await payload.findByID({
      collection: collectionSlug as 'pages' | 'posts',
      id: documentId,
    })

    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    logger.log(`[API] ✅ Document found: "${document.title}"`)

    // Fetch AI Settings to get configuration
    const aiSettings = await payload.findGlobal({
      slug: 'aiSettings',
    })

    if (!aiSettings?.seoMeta?.enabled) {
      return NextResponse.json(
        { error: 'SEO meta generation is not enabled in AI Settings' },
        { status: 400 },
      )
    }

    // Parse keywords
    const keywordArray = keywords ? parseKeywords(keywords) : []

    // Analyze content if enabled
    let contentContext
    if (aiSettings.seoMeta.analyzeFullContent) {
      logger.log(`[API] 🔍 Analyzing document content...`)
      contentContext = await analyzeContent(
        document,
        aiSettings.seoMeta.maxContentTokens || 2000,
      )
      logger.log(`[API] ✅ Content analyzed`)
    }

    // Build title generation config
    const titleConfig: SeoTitleConfig = {
      systemPrimer: aiSettings.seoMeta.titleSystemPrimer || '',
      maxLength: aiSettings.seoMeta.titleMaxLength || 60,
      includeBrand: aiSettings.seoMeta.includeBrandInTitle ?? true,
      keywords: keywordArray,
      guidance: guidance || undefined,
      contentContext,
    }

    // Generate title
    logger.log(`[API] 🤖 Generating SEO title...`)
    const result = await generateSeoTitle(titleConfig, payload)

    if (!result.success || !result.text) {
      logger.error(`[API] ❌ Generation failed:`, result.error)
      return NextResponse.json(
        {
          error: result.error || 'Failed to generate SEO title',
        },
        { status: 500 },
      )
    }

    logger.log(`[API] ✅ Title generated successfully!`)
    logger.log(`[API] ✨ Generated: "${result.text}"`)
    logger.log(`[API] 📊 Character count: ${result.metadata?.characterCount}`)
    logger.log(`[API] 💰 Cost: $${result.metadata?.cost?.toFixed(4) || '0'}`)

    // Log the generation if enabled (fallback to altTag logging setting)
    const shouldLog = aiSettings.altTag?.logGenerations ?? true
    if (shouldLog) {
      await logSeoGeneration(payload, {
        operation: 'seo-title',
        text: result.text,
        keywords: keywordArray,
        contentThemes: result.metadata?.contentThemes,
        provider: result.metadata?.provider || 'openai',
        model: result.metadata?.model || 'gpt-4o',
        metadata: result.metadata,
      })
    }

    logger.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

    return NextResponse.json(
      {
        success: true,
        text: result.text,
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
  } catch (error) {
    logger.error('[API] Error generating SEO title:', error)

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      },
      { status: 500 },
    )
  }
}
