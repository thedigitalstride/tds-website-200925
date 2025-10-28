/**
 * Icon Metadata Provider
 * Generates metadata for icons using OpenAI's API via fetch
 */

import type { IconMetadataConfig, IconMetadataResult, ProviderConfig } from '../types'
import { logger } from '@/utilities/logger'

export class IconMetadataProvider {
  name = 'Icon Metadata Provider'

  constructor(protected config: ProviderConfig) {
    this.validateConfig(config)
  }

  /**
   * Generate metadata for an icon based on its name
   */
  async generateMetadata(
    iconName: string,
    config: IconMetadataConfig,
  ): Promise<IconMetadataResult> {
    const startTime = Date.now()

    try {
      // Build the prompt
      const prompt = this.buildPrompt(iconName, config)

      // Prepare the request payload
      const requestBody = {
        model: this.config.model || 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert in icon design and categorization. Always respond with valid JSON.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: this.config.maxTokens || 500,
        temperature: this.config.temperature ?? 0.3,
        response_format: { type: 'json_object' },
      }

      // Make API request
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify(requestBody),
        signal: AbortSignal.timeout((this.config.timeout || 30) * 1000),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(
          `OpenAI API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`,
        )
      }

      const data = await response.json()

      // Extract the generated content
      const content = data.choices?.[0]?.message?.content

      if (!content) {
        throw new Error('No content returned from OpenAI API')
      }

      // Parse JSON response
      const metadata = JSON.parse(content)

      // Validate response structure
      if (!metadata.keywords || !metadata.category || !metadata.description) {
        throw new Error('Invalid metadata structure from AI response')
      }

      const duration = Date.now() - startTime

      // Calculate cost estimate
      const tokensUsed = data.usage?.total_tokens || 0
      const cost = this.calculateCost(tokensUsed, this.config.model || 'gpt-4o-mini')

      return {
        metadata,
        success: true,
        rawResponse: content,
        prompt,
        metadata_internal: {
          provider: this.name,
          model: this.config.model || 'gpt-4o-mini',
          tokensUsed,
          cost,
          duration,
          timestamp: new Date().toISOString(),
        },
      }
    } catch (error) {
      const duration = Date.now() - startTime

      // Handle different error types
      let errorMessage = 'Unknown error occurred'
      if (error instanceof Error) {
        errorMessage = error.message
      }

      logger.error('[Icon AI] ❌ Error generating metadata:', errorMessage)

      // Return fallback metadata
      const fallbackMetadata = {
        keywords: [iconName.toLowerCase()],
        category: 'custom',
        description: `Icon: ${iconName}`,
        tags: [],
        confidence: 0,
      }

      return {
        metadata: fallbackMetadata,
        success: false,
        error: errorMessage,
        metadata_internal: {
          provider: this.name,
          model: this.config.model || 'gpt-4o-mini',
          duration,
          timestamp: new Date().toISOString(),
        },
      }
    }
  }

  /**
   * Build the prompt for icon metadata generation
   */
  protected buildPrompt(iconName: string, config: IconMetadataConfig): string {
    const systemPrimer =
      config.systemPrimer ||
      'Analyze this icon and provide metadata for search and organization.'

    const maxKeywords = config.maxKeywords || 10
    const maxTags = config.maxTags || 5
    const descriptionMaxWords = config.descriptionMaxWords || 50

    const categories =
      config.categories ||
      [
        'navigation',
        'action',
        'social',
        'communication',
        'interface',
        'file',
        'device',
        'commerce',
        'media',
        'custom',
      ]

    return `${systemPrimer}

Icon name: "${iconName}"

Based on the icon name and common icon usage patterns, provide:

1. Keywords (${maxKeywords} or fewer relevant search terms, including synonyms and related concepts)
2. Category (choose ONE from: ${categories.join(', ')})
3. Brief description (max ${descriptionMaxWords} words, describing what the icon represents and its common use cases)
4. Tags (${maxTags} or fewer additional categorization tags)

Respond in JSON format:
{
  "keywords": ["keyword1", "keyword2", ...],
  "category": "category_name",
  "description": "Brief description",
  "tags": ["tag1", "tag2", ...],
  "confidence": 85
}

The confidence score (0-100) indicates how certain you are about the categorization.`
  }

  /**
   * Validate provider configuration
   */
  protected validateConfig(config: ProviderConfig): boolean {
    if (!config.apiKey || config.apiKey.trim() === '') {
      throw new Error('API key is required for Icon Metadata Provider')
    }

    if (!config.apiKey.startsWith('sk-')) {
      throw new Error('Invalid OpenAI API key format')
    }

    return true
  }

  /**
   * Calculate cost based on token usage and model
   * Pricing as of January 2025 (approximate)
   */
  protected calculateCost(tokens: number, model: string): number {
    // OpenAI pricing (per 1M tokens)
    const pricing: Record<string, { input: number; output: number }> = {
      'gpt-4o': { input: 2.5, output: 10.0 },
      'gpt-4o-mini': { input: 0.15, output: 0.6 },
      'gpt-4-turbo': { input: 10.0, output: 30.0 },
    }

    // Find matching pricing
    let modelPricing = pricing['gpt-4o-mini'] // default for icons
    for (const [key, value] of Object.entries(pricing)) {
      if (model.includes(key)) {
        modelPricing = value
        break
      }
    }

    // Estimate 70% input tokens, 30% output tokens
    const inputTokens = tokens * 0.7
    const outputTokens = tokens * 0.3

    const cost =
      (inputTokens * modelPricing.input) / 1_000_000 +
      (outputTokens * modelPricing.output) / 1_000_000

    return cost
  }
}
