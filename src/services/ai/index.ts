/**
 * AI Service
 * Main entry point for AI-powered content generation features
 */

export { generateAltTag, generateAltTagWithFallback } from './altTagGenerator'
export { generateSeoTitle, generateSeoDescription, logSeoGeneration } from './seoMetaGenerator'
export { analyzeContent, parseKeywords, buildPromptContext } from './contentAnalyzer'
export { createProvider, getAvailableProviders } from './providers'
export type {
  AiProvider,
  AltTagConfig,
  AltTagResult,
  SeoTitleConfig,
  SeoDescriptionConfig,
  SeoMetaResult,
  ContentContext,
  ProviderConfig,
  AiServiceOptions,
  AiOperationLog,
} from './types'
export { AiServiceError } from './types'
