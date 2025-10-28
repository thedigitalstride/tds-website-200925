import type { CollectionBeforeChangeHook } from 'payload'
import { IconIntelligence } from '@/services/ai/iconIntelligence'

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

  try {
    // Get AI settings
    const aiSettings = await req.payload.findGlobal({
      slug: 'aiSettings',
      depth: 0,
    })

    // Check if API key is configured (AI enhancement always runs when key is available)
    if (!aiSettings?.apiKey) {
      console.log('Icon AI enhancement skipped: No API key configured in AI Settings')
      return data
    }

    // Get the model to use (from icon settings or default)
    const modelToUse = aiSettings.iconEnhancement?.model || aiSettings.model || 'gpt-4o-mini'

    // Initialize AI service with API key and model
    const iconAI = new IconIntelligence(aiSettings.apiKey, modelToUse)

    // Generate metadata suggestions
    console.log(`Generating AI metadata for icon: ${data.name} using model: ${modelToUse}`)
    const response = await iconAI.suggestMetadata(data.name)

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

    // Log AI operation (don't await to avoid blocking)
    req.payload
      .create({
        collection: 'ai-logs',
        data: {
          operation: 'icon-enhancement',
          provider: 'openai',
          model: modelToUse,
          tokensUsed: 100, // Estimate
          cost: 0.0001, // Required field - estimate
          success: true,
          duration: 1000, // Estimate
          aiInput: response.prompt,
          aiOutput: response.rawResponse,
          metadata: {
            type: 'icon_enhancement',
            iconName: data.name,
            category: response.metadata.category,
            keywordCount: response.metadata.keywords.length,
          },
          user: req.user?.id,
        },
      })
      .catch((logError) => {
        console.error('Failed to log AI success:', logError)
      })

    console.log(`Successfully enhanced icon ${data.name} with AI metadata`)
    return enhancedData
  } catch (error) {
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
          cost: 0, // Required field
          success: false,
          duration: 0,
          error: error instanceof Error ? error.message : 'Unknown error',
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
