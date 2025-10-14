import type { Media } from '@/payload-types'

/**
 * Payload image size names that match the Media collection configuration
 */
export type PayloadImageSize = 'thumbnail' | 'square' | 'small' | 'medium' | 'large' | 'xlarge' | 'og'

/**
 * Get the optimal Payload-generated image size based on the sizes attribute
 *
 * @param resource - The Payload Media resource
 * @param sizesAttribute - The sizes attribute (e.g., "(max-width: 768px) 90vw, 30vw")
 * @returns The optimal image URL from Payload's pre-generated sizes
 */
export function getOptimalPayloadImageUrl(
  resource: Media,
  sizesAttribute?: string | null
): string {
  // Fallback to main image if no sizes or not available
  if (!sizesAttribute || !resource.sizes) {
    return resource.url || ''
  }

  // Parse the sizes attribute to determine optimal size
  const optimalSize = parseOptimalSize(sizesAttribute)

  // Get the URL for the optimal size
  const sizeUrl = getPayloadSizeUrl(resource, optimalSize)

  // Fallback to main image if size not available
  return sizeUrl || resource.url || ''
}

/**
 * Parse sizes attribute and determine which Payload size to use
 *
 * Examples:
 * - "100vw" → 'large' (full viewport width)
 * - "50vw" → 'medium'
 * - "33vw" → 'small'
 * - "48px" → 'thumbnail'
 * - "(max-width: 768px) 90vw, 30vw" → 'small'
 */
function parseOptimalSize(sizesAttribute: string): PayloadImageSize {
  // Extract the smallest viewport width percentage or pixel value
  // This is a simplified heuristic - real-world usage should consider actual viewport

  // Check for fixed pixel values (avatars, icons)
  if (sizesAttribute.includes('px')) {
    const pixels = parseInt(sizesAttribute.match(/(\d+)px/)?.[1] || '0')
    if (pixels > 0 && pixels <= 300) return 'thumbnail'
    if (pixels <= 500) return 'square'
    if (pixels <= 600) return 'small'
    return 'medium'
  }

  // Extract viewport width percentages
  const vwMatches = sizesAttribute.match(/(\d+)vw/g)
  if (vwMatches && vwMatches.length > 0) {
    // Get the largest vw value (most conservative for quality)
    const vwValues = vwMatches.map(match => parseInt(match))
    const maxVw = Math.max(...vwValues)

    // Map viewport width to Payload sizes
    // These thresholds are based on common viewport sizes:
    // - Mobile: ~375px, Tablet: ~768px, Desktop: ~1440px
    if (maxVw >= 90) return 'large'    // Full width or nearly full
    if (maxVw >= 66) return 'medium'   // 2/3 width
    if (maxVw >= 45) return 'small'    // 1/2 width
    if (maxVw >= 30) return 'small'    // 1/3 width (grid of 3)
    return 'thumbnail'                  // Smaller thumbnails
  }

  // Fallback to medium for unparseable sizes
  return 'medium'
}

/**
 * Get the URL for a specific Payload size from the resource
 */
function getPayloadSizeUrl(resource: Media, sizeName: PayloadImageSize): string | null {
  if (!resource.sizes) return null

  const sizeData = resource.sizes[sizeName]
  if (!sizeData || typeof sizeData !== 'object') return null

  return sizeData.url || null
}

/**
 * Get all available Payload image sizes for a resource
 * Useful for debugging and understanding what sizes are available
 */
export function getAvailablePayloadSizes(resource: Media): PayloadImageSize[] {
  if (!resource.sizes) return []

  const sizes: PayloadImageSize[] = []
  const sizeKeys: PayloadImageSize[] = ['thumbnail', 'square', 'small', 'medium', 'large', 'xlarge', 'og']

  for (const key of sizeKeys) {
    if (resource.sizes[key] && typeof resource.sizes[key] === 'object') {
      const sizeData = resource.sizes[key] as { url?: string | null }
      if (sizeData.url) {
        sizes.push(key)
      }
    }
  }

  return sizes
}
