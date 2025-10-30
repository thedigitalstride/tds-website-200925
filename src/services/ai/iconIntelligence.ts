/**
 * AI service for enhancing icon metadata
 * Uses the IconMetadataProvider for consistent fetch-based implementation
 */

import { IconMetadataProvider } from './providers/icon'
import type {
  IconMetadata,
  IconMetadataConfig,
  IconMetadataResult,
  ProviderConfig,
} from './types'

export type { IconMetadata, IconMetadataResult }

/**
 * Icon Intelligence Service
 * Wrapper around IconMetadataProvider for backwards compatibility
 */
export class IconIntelligence {
  private provider: IconMetadataProvider

  constructor(config: ProviderConfig, _iconConfig?: IconMetadataConfig) {
    this.provider = new IconMetadataProvider(config)
  }

  /**
   * Generate metadata for an icon based on its name
   * @param iconName - The name of the icon
   * @param config - Optional configuration for metadata generation
   * @returns Promise resolving to icon metadata result
   */
  async suggestMetadata(
    iconName: string,
    config?: IconMetadataConfig,
  ): Promise<IconMetadataResult> {
    return this.provider.generateMetadata(iconName, config || {})
  }
}
