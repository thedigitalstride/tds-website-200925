/**
 * ALT Tag Generator Service
 * Main service for generating ALT tags using configured AI provider
 */

import type { Payload } from 'payload'
import type { AltTagConfig, AltTagResult, ProviderConfig } from './types'
import { createProvider } from './providers'
import { logger } from '@/utilities/logger'

/**
 * Generate ALT tag for an image using AI
 *
 * @param imageUrl - Full URL to the image (Vercel Blob, CDN, or public URL)
 * @param payload - Payload CMS instance
 * @param customConfig - Optional custom configuration (overrides global settings)
 * @returns Promise resolving to ALT tag result
 */
export async function generateAltTag(
  imageUrl: string,
  payload: Payload,
  customConfig?: Partial<AltTagConfig>,
): Promise<AltTagResult> {
  logger.log('[AI Service] ═══════════════════════════════════════')
  logger.log('[AI Service] 🚀 Starting ALT Tag Generation')
  logger.log('[AI Service] 🔗 Image URL:', imageUrl.substring(0, 100) + '...')

  try {
    // Fetch AI Settings from global
    logger.log('[AI Service] 📖 Fetching AI Settings...')
    const aiSettings = await payload.findGlobal({
      slug: 'aiSettings',
    })

    if (!aiSettings) {
      logger.error('[AI Service] ❌ AI Settings global not found!')
      return {
        altText: '',
        success: false,
        error: 'AI Settings not found in database',
      }
    }

    logger.log('[AI Service] ✅ AI Settings loaded')

    // Check if ALT tag generation is enabled
    if (!aiSettings?.altTag?.enabled) {
      logger.error('[AI Service] ❌ ALT tag generation is DISABLED')
      logger.error('[AI Service] 💡 Enable it at: /admin/globals/aiSettings')
      return {
        altText: '',
        success: false,
        error: 'ALT tag generation is not enabled in AI Settings',
      }
    }

    logger.log('[AI Service] ✅ ALT tag generation is enabled')

    // Build provider configuration
    // Use task-specific model if set, otherwise fall back to global model
    const taskModel = aiSettings.altTag.model
    const globalModel = aiSettings.model || 'gpt-4o'
    const selectedModel = taskModel || globalModel

    const providerConfig: ProviderConfig = {
      provider: aiSettings.provider || 'openai',
      apiKey: aiSettings.apiKey || '',
      model: selectedModel,
      customEndpoint: aiSettings.customEndpoint || undefined,
      temperature: aiSettings.temperature ?? 0.3,
      maxTokens: aiSettings.maxTokens || 150,
      timeout: aiSettings.timeout || 30,
    }

    logger.log('[AI Service] ⚙️  Configuration:')
    logger.log('[AI Service]    Provider:', providerConfig.provider)
    logger.log(
      '[AI Service]    Model:',
      providerConfig.model,
      taskModel ? '(task-specific override)' : '(global default)',
    )
    logger.log(
      '[AI Service]    API Key:',
      providerConfig.apiKey
        ? `${providerConfig.apiKey.substring(0, 7)}...${providerConfig.apiKey.substring(providerConfig.apiKey.length - 4)}`
        : 'NOT SET',
    )
    logger.log('[AI Service]    Temperature:', providerConfig.temperature)
    logger.log('[AI Service]    Max Tokens:', providerConfig.maxTokens)

    // Build ALT tag configuration
    const altTagConfig: AltTagConfig = {
      systemPrimer:
        customConfig?.systemPrimer ||
        aiSettings.altTag.systemPrimer ||
        'Generate concise, SEO-optimized alt text under 125 characters.',
      maxLength: customConfig?.maxLength || aiSettings.altTag.maxLength || 125,
      includeContext: customConfig?.includeContext ?? aiSettings.altTag.includeContext ?? false,
      context: customConfig?.context,
    }

    logger.log('[AI Service] 📝 ALT Config:')
    logger.log('[AI Service]    Max Length:', altTagConfig.maxLength)
    logger.log('[AI Service]    System Primer:', altTagConfig.systemPrimer.substring(0, 50) + '...')

    // Create provider instance
    logger.log('[AI Service] 🔧 Creating provider instance...')
    const provider = createProvider(providerConfig)

    // Validate configuration
    logger.log('[AI Service] ✔️  Validating configuration...')
    if (!provider.validateConfig(providerConfig)) {
      logger.error('[AI Service] ❌ Configuration validation FAILED')
      logger.error('[AI Service] 💡 Check your API key format (should start with sk-)')
      return {
        altText: '',
        success: false,
        error: 'Invalid AI provider configuration. Please check your API key and settings.',
      }
    }

    logger.log('[AI Service] ✅ Configuration valid')
    logger.log('[AI Service] 🤖 Calling AI provider...')

    // Generate ALT tag
    const result = await provider.generateAltTag(imageUrl, altTagConfig)

    if (result.success) {
      logger.log('[AI Service] ✅ AI provider returned success!')
      logger.log('[AI Service] ✨ Generated:', result.altText)
    } else {
      logger.error('[AI Service] ❌ AI provider returned failure')
      logger.error('[AI Service] 📋 Error:', result.error)
    }

    // Log the generation if enabled
    if (aiSettings.altTag.logGenerations && result.success) {
      await logAltTagGeneration(payload, {
        imageUrl,
        altText: result.altText,
        provider: providerConfig.provider,
        model: providerConfig.model,
        metadata: result.metadata,
      })
    }

    logger.log('[AI Service] ═══════════════════════════════════════')
    return result
  } catch (error) {
    logger.error('[AI Service] ═══════════════════════════════════════')
    logger.error('[AI Service] ❌ EXCEPTION during ALT generation')
    logger.error('[AI Service] Error:', error)
    logger.error('[AI Service] ═══════════════════════════════════════')

    return {
      altText: '',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

/**
 * Generate ALT tag with fallback strategies
 *
 * @param imageUrl - Full URL to the image
 * @param filename - Original filename (used as fallback)
 * @param payload - Payload CMS instance
 * @returns Promise resolving to ALT text (never empty if fallback is enabled)
 */
export async function generateAltTagWithFallback(
  imageUrl: string,
  filename: string,
  payload: Payload,
): Promise<string> {
  logger.log('[AI Service] 🔄 generateAltTagWithFallback called')
  logger.log('[AI Service] 📁 Filename:', filename)

  // Try AI generation first
  logger.log('[AI Service] 🤖 Attempting AI generation...')
  const result = await generateAltTag(imageUrl, payload)

  if (result.success && result.altText) {
    logger.log('[AI Service] ✅ AI generation successful, returning:', result.altText)
    return result.altText
  }

  // AI failed, log the error
  logger.error('[AI Service] ❌ AI generation failed:', result.error)
  logger.log('[AI Service] 🔍 Checking fallback settings...')

  // Check if fallback to filename is enabled
  const aiSettings = await payload.findGlobal({
    slug: 'aiSettings',
  })

  if (aiSettings?.altTag?.fallbackToFilename) {
    // Clean filename for use as ALT text
    const cleaned = cleanFilenameForAlt(filename)
    logger.log('[AI Service] ⚠️  Fallback enabled, using cleaned filename:', cleaned)
    return cleaned
  }

  // Return empty string if no fallback
  logger.log('[AI Service] ⚠️  Fallback disabled, returning empty string')
  return ''
}

/**
 * Clean filename to create a reasonable ALT text
 */
function cleanFilenameForAlt(filename: string): string {
  // Remove extension
  let cleaned = filename.replace(/\.[^/.]+$/, '')

  // Replace hyphens, underscores with spaces
  cleaned = cleaned.replace(/[-_]/g, ' ')

  // Remove numbers at start/end
  cleaned = cleaned.replace(/^\d+\s*/, '').replace(/\s*\d+$/, '')

  // Capitalize first letter of each word
  cleaned = cleaned
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')

  return cleaned.trim()
}

/**
 * Log ALT tag generation for auditing
 */
async function logAltTagGeneration(
  payload: Payload,
  data: {
    imageUrl: string
    altText: string
    provider: string
    model: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    metadata?: any
  },
): Promise<void> {
  try {
    // Log to console for immediate debugging (dev only)
    logger.log('[AI ALT Tag Generated]', {
      url: data.imageUrl.substring(0, 100), // Truncate long URLs
      alt: data.altText,
      provider: data.provider,
      model: data.model,
      cost: data.metadata?.cost || 0,
      tokensUsed: data.metadata?.tokensUsed || 0,
      timestamp: new Date().toISOString(),
    })

    // Log to database for persistent auditing and cost tracking
    await payload.create({
      collection: 'ai-logs',
      data: {
        operation: 'alt-tag',
        provider: data.provider,
        model: data.model,
        success: true,
        tokensUsed: data.metadata?.tokensUsed || 0,
        cost: data.metadata?.cost || 0,
        duration: data.metadata?.duration || 0,
        imageUrl: data.imageUrl,
        altText: data.altText,
        metadata: data.metadata,
      },
    })

    logger.log('[AI Service] 💾 Logged to ai-logs collection')
  } catch (error) {
    // Silent fail - don't block ALT generation if logging fails
    logger.error('Failed to log ALT tag generation:', error)
  }
}
