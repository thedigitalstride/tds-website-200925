/**
 * AI Provider Registry
 * Central registry for all AI provider implementations
 */

import type { AiProvider, ProviderConfig } from '../types'
import { OpenAiProvider } from './openai'

/**
 * Create an AI provider instance based on configuration
 */
export function createProvider(config: ProviderConfig): AiProvider {
  switch (config.provider) {
    case 'openai':
      return new OpenAiProvider(config)

    case 'anthropic':
      throw new Error('Anthropic provider not yet implemented. Coming soon!')

    case 'custom':
      throw new Error('Custom provider not yet implemented. Coming soon!')

    default:
      throw new Error(`Unknown provider: ${config.provider}`)
  }
}

/**
 * Get list of available providers
 */
export function getAvailableProviders(): Array<{
  value: string
  label: string
  status: 'available' | 'coming-soon'
}> {
  return [
    {
      value: 'openai',
      label: 'OpenAI (GPT-4o Vision)',
      status: 'available',
    },
    {
      value: 'anthropic',
      label: 'Anthropic (Claude 3.5 Sonnet)',
      status: 'coming-soon',
    },
    {
      value: 'custom',
      label: 'Custom Endpoint',
      status: 'coming-soon',
    },
  ]
}

export { OpenAiProvider } from './openai'
export { BaseAiProvider } from './base'
export { IconMetadataProvider } from './icon'
