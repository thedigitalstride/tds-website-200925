/**
 * Base AI Provider
 * Abstract class that all AI providers should extend
 */

import type { AiProvider, AltTagConfig, AltTagResult, ProviderConfig } from '../types'

export abstract class BaseAiProvider implements AiProvider {
  abstract name: string

  constructor(protected config: ProviderConfig) {}

  /**
   * Generate ALT text for an image
   * Must be implemented by each provider
   */
  abstract generateAltTag(imageUrl: string, config: AltTagConfig): Promise<AltTagResult>

  /**
   * Validate provider configuration
   * Can be overridden by specific providers for custom validation
   */
  validateConfig(config: ProviderConfig): boolean {
    if (!config.apiKey || config.apiKey.trim() === '') {
      return false
    }

    if (!config.model || config.model.trim() === '') {
      return false
    }

    if (config.provider === 'custom' && !config.customEndpoint) {
      return false
    }

    return true
  }

  /**
   * Estimate cost of operation
   * Can be overridden by providers with cost tracking
   */
  estimateCost?(operation: string): number

  /**
   * Sanitize and validate image URL
   * Helper method for providers
   */
  protected validateImageUrl(url: string): boolean {
    try {
      // Check for valid URL format
      if (url.startsWith('data:image')) {
        return true // Base64 encoded image
      }

      const parsedUrl = new URL(url)
      return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:'
    } catch {
      return false
    }
  }

  /**
   * Enforce character limit on generated text
   * Helper method for providers
   */
  protected enforceMaxLength(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text
    }

    // Trim to max length and try to end at a word boundary
    const trimmed = text.substring(0, maxLength)
    const lastSpace = trimmed.lastIndexOf(' ')

    if (lastSpace > maxLength * 0.8) {
      // Only use word boundary if it's not too far back
      return trimmed.substring(0, lastSpace).trim()
    }

    return trimmed.trim()
  }

  /**
   * Clean up ALT text to remove common issues
   * Helper method for providers
   */
  protected cleanAltText(text: string): string {
    let cleaned = text.trim()

    // Remove common redundant phrases
    const redundantPhrases = [
      /^(an? )?(image|picture|photo|photograph) (of|showing) /i,
      /^(an? )?(image|picture|photo|photograph) /i,
      /^(this is|here is|this shows) /i,
    ]

    for (const phrase of redundantPhrases) {
      cleaned = cleaned.replace(phrase, '')
    }

    // Capitalize first letter
    cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1)

    // Remove quotes if present
    cleaned = cleaned.replace(/^["']|["']$/g, '')

    // Ensure it doesn't end with a period (screen readers add pauses)
    cleaned = cleaned.replace(/\.+$/, '')

    return cleaned.trim()
  }

  /**
   * Build the prompt for ALT tag generation
   * Can be overridden by providers for custom prompt formatting
   */
  protected buildPrompt(config: AltTagConfig): string {
    let prompt = config.systemPrimer

    // Add max length constraint
    prompt += `\n\nIMPORTANT: Your response must be ${config.maxLength} characters or less.`

    // Add context if provided
    if (config.includeContext && config.context) {
      prompt += '\n\nContext:'
      if (config.context.pageTitle) {
        prompt += `\n- Page: ${config.context.pageTitle}`
      }
      if (config.context.category) {
        prompt += `\n- Category: ${config.context.category}`
      }
      if (config.context.tags && config.context.tags.length > 0) {
        prompt += `\n- Tags: ${config.context.tags.join(', ')}`
      }
    }

    prompt +=
      '\n\nRespond with ONLY the alt text, no explanations, no quotes, no prefix like "Alt text:".'

    return prompt
  }
}
