/**
 * AI Service Type Definitions
 * Provides type-safe interfaces for AI providers and content generation
 */

/**
 * Configuration for ALT tag generation
 */
export interface AltTagConfig {
  systemPrimer: string
  maxLength: number
  includeContext?: boolean
  context?: {
    pageTitle?: string
    category?: string
    tags?: string[]
  }
}

/**
 * Provider-specific configuration
 */
export interface ProviderConfig {
  provider: 'openai' | 'anthropic' | 'custom'
  apiKey: string
  model: string
  customEndpoint?: string
  temperature?: number
  maxTokens?: number
  timeout?: number
}

/**
 * Result from ALT tag generation
 */
export interface AltTagResult {
  altText: string
  success: boolean
  error?: string
  metadata?: {
    provider: string
    model: string
    tokensUsed?: number
    cost?: number
    duration?: number
    timestamp: string
  }
}

/**
 * Abstract interface for AI providers
 * All provider implementations must conform to this interface
 */
export interface AiProvider {
  name: string

  /**
   * Generate ALT text for an image
   * @param imageUrl - URL to the image (can be blob storage, public URL, or base64)
   * @param config - Configuration for ALT tag generation
   * @returns Promise resolving to generated ALT text result
   */
  generateAltTag(imageUrl: string, config: AltTagConfig): Promise<AltTagResult>

  /**
   * Validate provider configuration
   * @param config - Provider configuration to validate
   * @returns True if configuration is valid
   */
  validateConfig(config: ProviderConfig): boolean

  /**
   * Estimate cost of operation (optional)
   * @param operation - Type of operation ('alt-tag', 'blog-post', etc.)
   * @returns Estimated cost in USD
   */
  estimateCost?(operation: string): number
}

/**
 * Options for the AI service
 */
export interface AiServiceOptions {
  providerConfig: ProviderConfig
  altTagConfig?: AltTagConfig
  enableLogging?: boolean
  enableCostTracking?: boolean
}

/**
 * Configuration for SEO meta title generation
 */
export interface SeoTitleConfig {
  systemPrimer: string
  maxLength: number
  includeBrand?: boolean
  keywords?: string[]
  guidance?: string
  contentContext?: ContentContext
}

/**
 * Configuration for SEO meta description generation
 */
export interface SeoDescriptionConfig {
  systemPrimer: string
  minLength: number
  maxLength: number
  keywords?: string[]
  guidance?: string
  contentContext?: ContentContext
}

/**
 * Content context for SEO generation
 */
export interface ContentContext {
  title?: string
  subtitle?: string
  contentBlocks?: any[] // eslint-disable-line @typescript-eslint/no-explicit-any -- Layout blocks for Pages
  richText?: any // eslint-disable-line @typescript-eslint/no-explicit-any -- Lexical content for Posts
  categories?: string[]
  heroImage?: {
    alt?: string
    url?: string
  }
  tableOfContents?: Array<{ title: string; href: string }>
  extractedThemes?: string[]
  contentSummary?: string
}

/**
 * Result from SEO meta generation
 */
export interface SeoMetaResult {
  text: string
  success: boolean
  error?: string
  metadata?: {
    provider: string
    model: string
    tokensUsed?: number
    cost?: number
    characterCount: number
    keywordsUsed?: string[]
    contentThemes?: string[]
    timestamp: string
    duration?: number
  }
}

/**
 * Log entry for AI operations
 */
export interface AiOperationLog {
  id: string
  operation: 'alt-tag' | 'blog-post' | 'seo-title' | 'seo-description'
  provider: string
  model: string
  input: string // URL or content snippet
  output: string
  tokensUsed?: number
  cost?: number
  duration: number
  success: boolean
  error?: string
  timestamp: string
  userId?: string
}

/**
 * Error types for AI operations
 */
export class AiServiceError extends Error {
  constructor(
    message: string,
    public code: 'INVALID_CONFIG' | 'API_ERROR' | 'TIMEOUT' | 'RATE_LIMIT' | 'UNKNOWN',
    public provider?: string,
    public originalError?: Error,
  ) {
    super(message)
    this.name = 'AiServiceError'
  }
}
