/**
 * AI Service
 * Main entry point for AI-powered content generation features
 */

export { generateAltTag, generateAltTagWithFallback } from './altTagGenerator'
export { createProvider, getAvailableProviders } from './providers'
export type {
  AiProvider,
  AltTagConfig,
  AltTagResult,
  ProviderConfig,
  AiServiceOptions,
  AiOperationLog,
} from './types'
export { AiServiceError } from './types'
