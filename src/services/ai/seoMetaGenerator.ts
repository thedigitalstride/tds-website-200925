/**
 * SEO Meta Generator Service
 * Generates SEO-optimized titles and descriptions using AI
 */

import type { Payload } from 'payload'
import type { SeoTitleConfig, SeoDescriptionConfig, SeoMetaResult, ProviderConfig } from './types'
import { createProvider } from './providers'
import { logger } from '@/utilities/logger'
import { buildPromptContext } from './contentAnalyzer'

/**
 * Generate SEO meta title using AI
 *
 * @param config - Title generation configuration
 * @param payload - Payload CMS instance
 * @returns Promise resolving to generated title result
 */
export async function generateSeoTitle(
  config: SeoTitleConfig,
  payload: Payload,
): Promise<SeoMetaResult> {
  logger.log('[SEO Generator] ═══════════════════════════════════════')
  logger.log('[SEO Generator] 🚀 Starting SEO Title Generation')

  const startTime = Date.now()

  try {
    // Fetch AI Settings
    logger.log('[SEO Generator] 📖 Fetching AI Settings...')
    const aiSettings = await payload.findGlobal({
      slug: 'aiSettings',
    })

    if (!aiSettings) {
      return {
        text: '',
        success: false,
        error: 'AI Settings not found',
      }
    }

    // Check if SEO meta generation is enabled
    if (!aiSettings?.seoMeta?.enabled) {
      logger.error('[SEO Generator] ❌ SEO meta generation is DISABLED')
      return {
        text: '',
        success: false,
        error: 'SEO meta generation is not enabled in AI Settings',
      }
    }

    logger.log('[SEO Generator] ✅ SEO meta generation is enabled')

    // Build provider configuration
    const providerConfig: ProviderConfig = {
      provider: aiSettings.provider || 'openai',
      apiKey: aiSettings.apiKey || '',
      model: aiSettings.model || 'gpt-4o',
      customEndpoint: aiSettings.customEndpoint || undefined,
      temperature: aiSettings.temperature ?? 0.3,
      maxTokens: aiSettings.maxTokens || 150,
      timeout: aiSettings.timeout || 30,
    }

    logger.log('[SEO Generator] ⚙️  Provider:', providerConfig.provider)
    logger.log('[SEO Generator] ⚙️  Model:', providerConfig.model)

    // Create provider instance
    const provider = createProvider(providerConfig)

    // Validate configuration
    if (!provider.validateConfig(providerConfig)) {
      return {
        text: '',
        success: false,
        error: 'Invalid AI provider configuration',
      }
    }

    // Build the prompt
    const systemPrimer = config.systemPrimer
    const keywords = config.keywords || []
    const guidance = config.guidance || ''

    // Build context from content
    let contextString = ''
    if (config.contentContext) {
      contextString = buildPromptContext(
        config.contentContext,
        keywords,
        guidance,
        aiSettings.seoMeta.contentWeight || 'balanced',
      )
    }

    const fullPrompt = `${systemPrimer}\n\n${contextString}\n\nGenerate a compelling SEO meta title (max ${config.maxLength} characters).${config.includeBrand ? ' Include brand name at the end if appropriate.' : ''}`

    logger.log('[SEO Generator] 📝 Prompt length:', fullPrompt.length, 'characters')
    logger.log('[SEO Generator] 🎯 Target keywords:', keywords.length)

    // Call AI to generate title
    logger.log('[SEO Generator] 🤖 Calling AI provider...')
    const response = await callAiForText(provider, providerConfig, fullPrompt)

    if (!response.success || !response.text) {
      return {
        text: '',
        success: false,
        error: response.error || 'Failed to generate title',
      }
    }

    // Clean and truncate the response
    let generatedTitle = response.text.trim()

    // Remove quotes if AI wrapped the title
    if (generatedTitle.startsWith('"') && generatedTitle.endsWith('"')) {
      generatedTitle = generatedTitle.slice(1, -1)
    }
    if (generatedTitle.startsWith("'") && generatedTitle.endsWith("'")) {
      generatedTitle = generatedTitle.slice(1, -1)
    }

    // Enforce max length
    if (generatedTitle.length > config.maxLength) {
      logger.log('[SEO Generator] ⚠️  Title exceeds max length, truncating...')
      // Truncate at word boundary
      generatedTitle = truncateAtWord(generatedTitle, config.maxLength)
    }

    // Add brand name if configured
    if (config.includeBrand && !generatedTitle.includes('The Digital Stride')) {
      const brandSuffix = ' | The Digital Stride'
      const availableSpace = config.maxLength - brandSuffix.length

      if (generatedTitle.length > availableSpace) {
        generatedTitle = truncateAtWord(generatedTitle, availableSpace) + brandSuffix
      } else {
        generatedTitle = generatedTitle + brandSuffix
      }
    }

    const duration = Date.now() - startTime

    logger.log('[SEO Generator] ✅ Title generated successfully!')
    logger.log('[SEO Generator] ✨ Generated:', generatedTitle)
    logger.log('[SEO Generator] 📊 Character count:', generatedTitle.length)
    logger.log('[SEO Generator] ⏱️  Duration:', duration, 'ms')
    logger.log('[SEO Generator] ═══════════════════════════════════════')

    return {
      text: generatedTitle,
      success: true,
      metadata: {
        provider: providerConfig.provider,
        model: providerConfig.model,
        tokensUsed: response.tokensUsed,
        cost: response.cost,
        characterCount: generatedTitle.length,
        keywordsUsed: keywords,
        contentThemes: config.contentContext?.extractedThemes,
        timestamp: new Date().toISOString(),
        duration,
      },
    }
  } catch (error) {
    logger.error('[SEO Generator] ❌ EXCEPTION during title generation')
    logger.error('[SEO Generator] Error:', error)

    return {
      text: '',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

/**
 * Generate SEO meta description using AI
 *
 * @param config - Description generation configuration
 * @param payload - Payload CMS instance
 * @returns Promise resolving to generated description result
 */
export async function generateSeoDescription(
  config: SeoDescriptionConfig,
  payload: Payload,
): Promise<SeoMetaResult> {
  logger.log('[SEO Generator] ═══════════════════════════════════════')
  logger.log('[SEO Generator] 🚀 Starting SEO Description Generation')

  const startTime = Date.now()

  try {
    // Fetch AI Settings
    logger.log('[SEO Generator] 📖 Fetching AI Settings...')
    const aiSettings = await payload.findGlobal({
      slug: 'aiSettings',
    })

    if (!aiSettings) {
      return {
        text: '',
        success: false,
        error: 'AI Settings not found',
      }
    }

    // Check if SEO meta generation is enabled
    if (!aiSettings?.seoMeta?.enabled) {
      logger.error('[SEO Generator] ❌ SEO meta generation is DISABLED')
      return {
        text: '',
        success: false,
        error: 'SEO meta generation is not enabled in AI Settings',
      }
    }

    logger.log('[SEO Generator] ✅ SEO meta generation is enabled')

    // Build provider configuration
    const providerConfig: ProviderConfig = {
      provider: aiSettings.provider || 'openai',
      apiKey: aiSettings.apiKey || '',
      model: aiSettings.model || 'gpt-4o',
      customEndpoint: aiSettings.customEndpoint || undefined,
      temperature: aiSettings.temperature ?? 0.3,
      maxTokens: aiSettings.maxTokens || 150,
      timeout: aiSettings.timeout || 30,
    }

    logger.log('[SEO Generator] ⚙️  Provider:', providerConfig.provider)
    logger.log('[SEO Generator] ⚙️  Model:', providerConfig.model)

    // Create provider instance
    const provider = createProvider(providerConfig)

    // Validate configuration
    if (!provider.validateConfig(providerConfig)) {
      return {
        text: '',
        success: false,
        error: 'Invalid AI provider configuration',
      }
    }

    // Build the prompt
    const systemPrimer = config.systemPrimer
    const keywords = config.keywords || []
    const guidance = config.guidance || ''

    // Build context from content
    let contextString = ''
    if (config.contentContext) {
      contextString = buildPromptContext(
        config.contentContext,
        keywords,
        guidance,
        aiSettings.seoMeta.contentWeight || 'balanced',
      )
    }

    const fullPrompt = `${systemPrimer}\n\n${contextString}\n\nGenerate a compelling SEO meta description between ${config.minLength}-${config.maxLength} characters.`

    logger.log('[SEO Generator] 📝 Prompt length:', fullPrompt.length, 'characters')
    logger.log('[SEO Generator] 🎯 Target keywords:', keywords.length)

    // Call AI to generate description
    logger.log('[SEO Generator] 🤖 Calling AI provider...')
    const response = await callAiForText(provider, providerConfig, fullPrompt)

    if (!response.success || !response.text) {
      return {
        text: '',
        success: false,
        error: response.error || 'Failed to generate description',
      }
    }

    // Clean and validate the response
    let generatedDescription = response.text.trim()

    // Remove quotes if AI wrapped the description
    if (generatedDescription.startsWith('"') && generatedDescription.endsWith('"')) {
      generatedDescription = generatedDescription.slice(1, -1)
    }
    if (generatedDescription.startsWith("'") && generatedDescription.endsWith("'")) {
      generatedDescription = generatedDescription.slice(1, -1)
    }

    // Enforce max length
    if (generatedDescription.length > config.maxLength) {
      logger.log('[SEO Generator] ⚠️  Description exceeds max length, truncating...')
      generatedDescription = truncateAtWord(generatedDescription, config.maxLength)
    }

    // Warn if under min length
    if (generatedDescription.length < config.minLength) {
      logger.log('[SEO Generator] ⚠️  Description is under min length:', generatedDescription.length, '<', config.minLength)
    }

    const duration = Date.now() - startTime

    logger.log('[SEO Generator] ✅ Description generated successfully!')
    logger.log('[SEO Generator] ✨ Generated:', generatedDescription)
    logger.log('[SEO Generator] 📊 Character count:', generatedDescription.length)
    logger.log('[SEO Generator] ⏱️  Duration:', duration, 'ms')
    logger.log('[SEO Generator] ═══════════════════════════════════════')

    return {
      text: generatedDescription,
      success: true,
      metadata: {
        provider: providerConfig.provider,
        model: providerConfig.model,
        tokensUsed: response.tokensUsed,
        cost: response.cost,
        characterCount: generatedDescription.length,
        keywordsUsed: keywords,
        contentThemes: config.contentContext?.extractedThemes,
        timestamp: new Date().toISOString(),
        duration,
      },
    }
  } catch (error) {
    logger.error('[SEO Generator] ❌ EXCEPTION during description generation')
    logger.error('[SEO Generator] Error:', error)

    return {
      text: '',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

/**
 * Call AI provider for text generation (non-vision)
 *
 * @param provider - AI provider instance
 * @param config - Provider configuration
 * @param prompt - Full prompt text
 * @returns Response with generated text
 */
async function callAiForText(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  provider: any,
  config: ProviderConfig,
  prompt: string,
): Promise<{ success: boolean; text?: string; tokensUsed?: number; cost?: number; error?: string }> {
  try {
    // For OpenAI, we'll use the chat completion API (not vision) via fetch
    if (config.provider === 'openai') {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify({
          model: config.model || 'gpt-4o',
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: config.temperature ?? 0.3,
          max_tokens: config.maxTokens || 150,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error?.message || `OpenAI API error: ${response.status}`)
      }

      const data = await response.json()
      const generatedText = data.choices?.[0]?.message?.content?.trim() || ''
      const tokensUsed = data.usage?.total_tokens || 0

      // Estimate cost (OpenAI pricing as of January 2025)
      let cost = 0
      if (data.usage) {
        const inputCost = (data.usage.prompt_tokens / 1000000) * 2.5 // $2.50 per 1M input tokens
        const outputCost = (data.usage.completion_tokens / 1000000) * 10.0 // $10.00 per 1M output tokens
        cost = inputCost + outputCost
      }

      return {
        success: true,
        text: generatedText,
        tokensUsed,
        cost,
      }
    }

    return {
      success: false,
      error: `Provider ${config.provider} not yet supported for text generation`,
    }
  } catch (error) {
    logger.error('[SEO Generator] AI call failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Truncate text at word boundary
 *
 * @param text - Text to truncate
 * @param maxLength - Maximum character length
 * @returns Truncated text
 */
function truncateAtWord(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text
  }

  // Truncate at word boundary
  const truncated = text.substring(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')

  if (lastSpace > maxLength * 0.8) {
    return truncated.substring(0, lastSpace).trim()
  }

  return truncated.trim()
}

/**
 * Log SEO generation for auditing
 */
export async function logSeoGeneration(
  payload: Payload,
  data: {
    operation: 'seo-title' | 'seo-description'
    text: string
    keywords: string[]
    contentThemes?: string[]
    provider: string
    model: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    metadata?: any
  },
): Promise<void> {
  try {
    logger.log('[SEO Generator] 💾 Logging to ai-logs collection...')

    await payload.create({
      collection: 'ai-logs',
      data: {
        operation: data.operation,
        provider: data.provider,
        model: data.model,
        success: true,
        tokensUsed: data.metadata?.tokensUsed || 0,
        cost: data.metadata?.cost || 0,
        duration: data.metadata?.duration || 0,
        characterCount: data.text.length,
        [data.operation === 'seo-title' ? 'seoTitle' : 'seoDescription']: data.text,
        keywords: data.keywords.map((kw) => ({ keyword: kw })),
        contentThemes: data.contentThemes?.map((theme) => ({ theme })) || [],
        metadata: data.metadata,
      },
    })

    logger.log('[SEO Generator] ✅ Logged successfully')
  } catch (error) {
    // Silent fail - don't block generation if logging fails
    logger.error('[SEO Generator] Failed to log generation:', error)
  }
}
