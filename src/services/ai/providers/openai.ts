/**
 * OpenAI Vision Provider
 * Implements AI provider interface for OpenAI's GPT-4o Vision API
 */

import { BaseAiProvider } from './base'
import type { AltTagConfig, AltTagResult, ProviderConfig } from '../types'
import { logger } from '@/utilities/logger'

export class OpenAiProvider extends BaseAiProvider {
  name = 'OpenAI'

  constructor(config: ProviderConfig) {
    super(config)

    // Validate OpenAI-specific configuration
    if (!this.validateConfig(config)) {
      throw new Error('Invalid OpenAI provider configuration')
    }
  }

  /**
   * Generate ALT text using OpenAI Vision API
   */
  async generateAltTag(imageUrl: string, config: AltTagConfig): Promise<AltTagResult> {
    const startTime = Date.now()

    try {
      // Validate image URL
      if (!this.validateImageUrl(imageUrl)) {
        throw new Error(`Invalid image URL: ${imageUrl}`)
      }

      // Build the prompt
      const prompt = this.buildPrompt(config)

      // Prepare the request payload
      const requestBody = {
        model: this.config.model || 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: prompt,
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageUrl,
                  // Use 'auto' for optimal quality/speed balance
                  detail: 'auto',
                },
              },
            ],
          },
        ],
        max_tokens: this.config.maxTokens || 150,
        temperature: this.config.temperature ?? 0.3,
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

      // Extract the generated text
      const generatedText = data.choices?.[0]?.message?.content?.trim()

      if (!generatedText) {
        throw new Error('No content returned from OpenAI API')
      }

      // Clean and enforce max length
      let altText = this.cleanAltText(generatedText)
      altText = this.enforceMaxLength(altText, config.maxLength)

      const duration = Date.now() - startTime

      // Calculate cost estimate (GPT-4o pricing as of 2024)
      const tokensUsed = data.usage?.total_tokens || 0
      const cost = this.calculateCost(tokensUsed, this.config.model || 'gpt-4o')

      return {
        altText,
        success: true,
        metadata: {
          provider: this.name,
          model: this.config.model || 'gpt-4o',
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

      return {
        altText: '',
        success: false,
        error: errorMessage,
        metadata: {
          provider: this.name,
          model: this.config.model || 'gpt-4o',
          duration,
          timestamp: new Date().toISOString(),
        },
      }
    }
  }

  /**
   * Validate OpenAI-specific configuration
   */
  validateConfig(config: ProviderConfig): boolean {
    if (!super.validateConfig(config)) {
      return false
    }

    // Check for OpenAI API key format (starts with sk-)
    if (!config.apiKey.startsWith('sk-')) {
      return false
    }

    // Validate model name
    const validModels = ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-4-vision-preview']
    if (!validModels.some((model) => config.model.includes(model))) {
      logger.warn(
        `Model ${config.model} may not support vision. Recommended: ${validModels.join(', ')}`,
      )
    }

    return true
  }

  /**
   * Calculate cost based on token usage and model
   * Pricing as of January 2025 (approximate)
   */
  private calculateCost(tokens: number, model: string): number {
    // GPT-4o pricing (per 1M tokens)
    const pricing: Record<string, { input: number; output: number }> = {
      'gpt-4o': { input: 2.5, output: 10.0 },
      'gpt-4o-mini': { input: 0.15, output: 0.6 },
      'gpt-4-turbo': { input: 10.0, output: 30.0 },
      'gpt-4-vision-preview': { input: 10.0, output: 30.0 },
    }

    // Find matching pricing
    let modelPricing = pricing['gpt-4o'] // default
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

  /**
   * Estimate cost of ALT tag generation
   */
  estimateCost(operation: string): number {
    if (operation === 'alt-tag') {
      // Typical ALT tag generation uses ~1000 tokens (image + prompt + response)
      return this.calculateCost(1000, this.config.model || 'gpt-4o')
    }
    return 0
  }
}
