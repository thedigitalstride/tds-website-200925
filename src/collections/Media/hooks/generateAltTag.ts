/**
 * Generate ALT Tag Hook for Media Collection
 * Automatically generates ALT tags for images using AI when uploaded without ALT text
 */

import type { CollectionAfterChangeHook } from 'payload'
import { generateAltTagWithFallback } from '@/services/ai'
import { logger } from '@/utilities/logger'
import { convertMediaUrlToBlob } from '@/utilities/convertMediaUrlToBlob'

/**
 * After change hook that generates ALT tags for images
 * Only runs on create operations when ALT text is missing
 */
export const generateAltTagAfterChange: CollectionAfterChangeHook = async ({
  doc,
  req,
  context,
  operation,
}) => {
  try {
    // Skip if this hook already ran (prevent infinite loops)
    if (context.aiAltTagGenerated) {
      logger.log('[AI ALT Tag Hook] Skipping - already generated in this operation')
      return doc
    }

    // Only process on create operations
    if (operation !== 'create') {
      logger.log(`[AI ALT Tag Hook] Skipping - operation is "${operation}", not "create"`)
      return doc
    }

    // Only process if ALT text is missing
    if (doc.alt && doc.alt.trim() !== '') {
      logger.log('[AI ALT Tag Hook] Skipping - ALT text already exists:', doc.alt)
      return doc
    }

    // Verify it's an image
    if (!doc.mimeType || !doc.mimeType.startsWith('image/')) {
      logger.log('[AI ALT Tag Hook] Skipping - not an image, mimeType:', doc.mimeType)
      return doc
    }

    // Type guard for URL
    if (!doc.url || typeof doc.url !== 'string') {
      logger.warn(
        '[AI ALT Tag Hook] ⚠️  No URL available for image, skipping generation. This is normal during upload - image is still being processed.',
      )
      return doc
    }

    logger.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    logger.log('[AI ALT Tag Hook] 🚀 Starting automatic ALT generation')
    logger.log('[AI ALT Tag Hook] 📁 Filename:', doc.filename)
    logger.log('[AI ALT Tag Hook] 🔗 URL:', doc.url.substring(0, 100) + '...')

    // Fetch AI Settings to check if generation is enabled
    const aiSettings = await req.payload.findGlobal({
      slug: 'aiSettings',
    })

    if (!aiSettings) {
      logger.warn('[AI ALT Tag Hook] ⚠️  AI Settings not found')
      return doc
    }

    if (!aiSettings.altTag?.enabled) {
      logger.log('[AI ALT Tag Hook] ⏸️  AI generation is not enabled in settings')
      return doc
    }

    logger.log('[AI ALT Tag Hook] ✅ AI Settings enabled, proceeding with generation')
    logger.log('[AI ALT Tag Hook] 🤖 Provider:', aiSettings.provider || 'openai')
    logger.log('[AI ALT Tag Hook] 🎯 Model:', aiSettings.model || 'gpt-4o')

    // Convert URL to blob storage URL for OpenAI/external services
    // This handles localhost URLs, proxy routes, etc.
    const blobUrl = convertMediaUrlToBlob(doc.url)

    // Generate ALT tag with fallback to filename
    const generatedAlt = await generateAltTagWithFallback(blobUrl, doc.filename, req.payload)

    if (!generatedAlt || generatedAlt.trim() === '') {
      logger.error('[AI ALT Tag Hook] ❌ Generation failed and no fallback available')
      return doc
    }

    logger.log('[AI ALT Tag Hook] ✨ Generated ALT tag:', `"${generatedAlt}"`)
    logger.log('[AI ALT Tag Hook] 💾 Updating media document...')

    // Update the media document with generated ALT tag
    await req.payload.update({
      collection: 'media',
      id: doc.id,
      data: {
        alt: generatedAlt,
      },
      context: {
        // Set flag to prevent infinite loop
        aiAltTagGenerated: true,
      },
    })

    logger.log('[AI ALT Tag Hook] ✅ Successfully updated media document')
    logger.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

    // Return the doc with updated ALT text (for immediate use)
    return {
      ...doc,
      alt: generatedAlt,
    }
  } catch (error) {
    // Log error with details but don't throw - allow the media upload to succeed
    logger.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    logger.error('[AI ALT Tag Hook] ❌ ERROR generating ALT tag')
    logger.error('[AI ALT Tag Hook] Error details:', error)
    if (error instanceof Error) {
      logger.error('[AI ALT Tag Hook] Error message:', error.message)
      logger.error('[AI ALT Tag Hook] Error stack:', error.stack)
    }
    logger.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    return doc
  }
}
