import type { CollectionBeforeChangeHook } from 'payload'
import { IconIntelligence } from '@/services/ai/iconIntelligence'
import type { ProviderConfig } from '@/services/ai/types'

export const enhanceWithAIHook: CollectionBeforeChangeHook = async ({
  data,
  operation,
  req,
  context,
}) => {
  // Only enhance on create
  if (operation !== 'create') {
    return data
  }

  // Skip if this is an AI-triggered update or already has AI metadata
  if (context?.aiEnhanced || data.aiMetadata?.enhancedAt) {
    return data
  }

  const startTime = Date.now()

  try {
    // Get AI settings
    const aiSettings = await req.payload.findGlobal({
      slug: 'aiSettings',
      depth: 0,
    })

    // Check if icon enhancement is enabled
    if (!aiSettings?.iconEnhancement?.enabled) {
      console.log('Icon AI enhancement skipped: Feature is disabled in AI Settings')
      return data
    }

    // Check if API key is configured
    if (!aiSettings?.apiKey) {
      console.log('Icon AI enhancement skipped: No API key configured in AI Settings')
      return data
    }

    // Get the model to use (from icon settings or default)
    const modelToUse = aiSettings.iconEnhancement?.model || aiSettings.model || 'gpt-4o-mini'

    // Build provider config from global AI settings
    const providerConfig: ProviderConfig = {
      provider: aiSettings.provider || 'openai',
      apiKey: aiSettings.apiKey,
      model: modelToUse,
      temperature: aiSettings.temperature ?? 0.3,
      maxTokens: aiSettings.maxTokens || 500,
      timeout: aiSettings.timeout || 30,
    }

    // Initialize AI service with full config
    const iconAI = new IconIntelligence(providerConfig)

    // Generate metadata suggestions
    console.log(`Generating AI metadata for icon: ${data.name} using model: ${modelToUse}`)
    const response = await iconAI.suggestMetadata(data.name)

    if (!response.success) {
      throw new Error(response.error || 'AI metadata generation failed')
    }

    // Enhance the data with AI suggestions (before it's saved)
    const enhancedData = {
      ...data,
      // Only update if fields are empty
      category: data.category || response.metadata.category,
      description: data.description || response.metadata.description,
      keywords: data.keywords?.length
        ? data.keywords
        : response.metadata.keywords.map((keyword: string) => ({ keyword })),
      tags: data.tags?.length ? data.tags : response.metadata.tags.map((tag: string) => ({ tag })),
      aiMetadata: {
        enhancedAt: new Date().toISOString(),
        model: modelToUse,
        confidence: response.metadata.confidence || 0,
      },
    }

    const duration = Date.now() - startTime

    // Log AI operation (don't await to avoid blocking) with actual metrics
    req.payload
      .create({
        collection: 'ai-logs',
        data: {
          operation: 'icon-enhancement',
          provider: response.metadata_internal?.provider || 'openai',
          model: response.metadata_internal?.model || modelToUse,
          tokensUsed: response.metadata_internal?.tokensUsed || 0,
          cost: response.metadata_internal?.cost || 0,
          success: true,
          duration: response.metadata_internal?.duration || duration,
          aiInput: response.prompt || `Icon name: ${data.name}`,
          aiOutput: response.rawResponse || JSON.stringify(response.metadata),
          metadata: {
            type: 'icon_enhancement',
            iconName: data.name,
            category: response.metadata.category,
            keywordCount: response.metadata.keywords.length,
            confidence: response.metadata.confidence,
          },
          user: req.user?.id,
        },
      })
      .catch((logError) => {
        console.error('Failed to log AI success:', logError)
      })

    console.log(`Successfully enhanced icon ${data.name} with AI metadata (${duration}ms)`)
    return enhancedData
  } catch (error) {
    const duration = Date.now() - startTime
    console.error('Error enhancing icon with AI:', error)

    // Log failed AI operation (don't await to avoid blocking)
    req.payload
      .create({
        collection: 'ai-logs',
        data: {
          operation: 'icon-enhancement',
          provider: 'openai',
          model: 'gpt-4o-mini',
          tokensUsed: 0,
          cost: 0,
          success: false,
          duration,
          error: error instanceof Error ? error.message : 'Unknown error',
          aiInput: `Icon name: ${data.name}`,
          aiOutput: '',
          metadata: {
            type: 'icon_enhancement',
            iconName: data.name,
          },
          user: req.user?.id,
        },
      })
      .catch((logError) => {
        console.error('Failed to log AI error:', logError)
      })

    // Return original data if AI enhancement fails
    return data
  }
}
