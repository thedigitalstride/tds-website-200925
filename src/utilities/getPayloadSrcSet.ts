import type { Media } from '@/payload-types'

/**
 * Payload image size configuration matching Media collection
 * Width values correspond to the imageSizes in src/collections/Media.ts
 */
const PAYLOAD_IMAGE_SIZES = {
  thumbnail: 300,
  'card-mobile': 400,
  small: 600,
  medium: 900,
  large: 1400,
  xlarge: 1920,
} as const

/**
 * Type for valid Payload image size names (excluding 'og' and 'square' which are special purpose)
 */
type ResponsiveImageSize = keyof typeof PAYLOAD_IMAGE_SIZES

/**
 * Parse sizes attribute to determine maximum needed image width
 * Returns the largest vw value converted to approximate pixels
 *
 * @param sizesAttr - The HTML sizes attribute (e.g., "(max-width: 768px) 90vw, 30vw")
 * @returns Maximum needed width in pixels, or undefined if unparseable
 */
function calculateMaxNeededWidth(sizesAttr?: string | null): number | undefined {
  if (!sizesAttr) return undefined

  const vwMatches = sizesAttr.match(/(\d+)vw/g)
  if (!vwMatches || vwMatches.length === 0) return undefined

  const vwValues = vwMatches.map((match) => parseInt(match))
  const maxVw = Math.max(...vwValues)

  // Convert to pixels assuming max viewport of 1920px
  // e.g., 30vw → 576px, 90vw → 1728px
  return Math.ceil((maxVw / 100) * 1920)
}

/**
 * Generate srcset string from Payload Media sizes with smart filtering
 *
 * This utility iterates over Payload's pre-generated image sizes and builds
 * a srcset attribute that allows browsers to select the optimal image based
 * on viewport width and device pixel ratio.
 *
 * Smart filtering: When a sizes attribute is provided, the srcset is capped
 * to only include sizes up to 2x the maximum needed width (for retina displays).
 * This prevents unnecessary large images from being included in the srcset
 * for contexts like card thumbnails.
 *
 * @param resource - The Payload Media resource containing sizes
 * @param sizesAttr - Optional sizes attribute to cap srcset appropriately
 * @returns srcset string (e.g., "url1.webp 300w, url2.webp 600w") or undefined if no sizes
 *
 * @example
 * ```tsx
 * // For blog cards with sizes="30vw", srcset will cap at ~1152px (excludes large/xlarge)
 * <img
 *   src={resource.sizes?.small?.url}
 *   srcSet={generatePayloadSrcSet(resource, "(max-width: 768px) 90vw, 30vw")}
 *   sizes="(max-width: 768px) 90vw, 30vw"
 * />
 * ```
 */
export function generatePayloadSrcSet(
  resource: Media,
  sizesAttr?: string | null,
): string | undefined {
  if (!resource.sizes) return undefined

  // Calculate max needed width from sizes attribute (with 2x DPR buffer)
  const maxNeededWidth = calculateMaxNeededWidth(sizesAttr)

  const srcsetEntries: string[] = []

  // Iterate through responsive sizes (excluding special-purpose sizes like 'og' and 'square')
  for (const [sizeName, configuredWidth] of Object.entries(PAYLOAD_IMAGE_SIZES)) {
    // Skip sizes larger than 2x the max needed (wasteful for the context)
    // This prevents blog cards from including large/xlarge in their srcset
    if (maxNeededWidth && configuredWidth > maxNeededWidth * 2) continue

    const sizeData = resource.sizes[sizeName as ResponsiveImageSize]

    // Only include sizes that have a valid URL and width
    if (sizeData?.url && sizeData.width) {
      // Use the actual width from the generated image (may differ from configured width for aspect ratio)
      srcsetEntries.push(`${sizeData.url} ${sizeData.width}w`)
    } else if (sizeData?.url) {
      // Fallback to configured width if actual width not available
      srcsetEntries.push(`${sizeData.url} ${configuredWidth}w`)
    }
  }

  // Include original image as largest option (only if no filtering or if original is within threshold)
  if (resource.url && resource.width && resource.width > PAYLOAD_IMAGE_SIZES.xlarge) {
    if (!maxNeededWidth || resource.width <= maxNeededWidth * 2) {
      srcsetEntries.push(`${resource.url} ${resource.width}w`)
    }
  }

  return srcsetEntries.length > 0 ? srcsetEntries.join(', ') : undefined
}

/**
 * Get the default/fallback image URL for src attribute
 *
 * When using srcset, the src attribute serves as a fallback for browsers
 * that don't support srcset. This function selects an appropriate default
 * size based on the sizes attribute hint.
 *
 * @param resource - The Payload Media resource
 * @param sizesHint - Optional sizes attribute to help select appropriate default
 * @returns URL string for the default image
 */
export function getDefaultSrcFromPayload(
  resource: Media,
  sizesHint?: string | null
): string {
  // If no sizes object, return main URL
  if (!resource.sizes) {
    return resource.url || ''
  }

  // Parse sizes hint to determine a reasonable default
  // Default to 'small' (600px) which works well as a fallback for most use cases
  let defaultSize: ResponsiveImageSize = 'small'

  if (sizesHint) {
    // Extract viewport width percentages to estimate needed size
    const vwMatches = sizesHint.match(/(\d+)vw/g)
    if (vwMatches && vwMatches.length > 0) {
      const vwValues = vwMatches.map((match) => parseInt(match))
      const minVw = Math.min(...vwValues)

      // Map viewport percentage to appropriate size
      if (minVw >= 80) defaultSize = 'large'
      else if (minVw >= 50) defaultSize = 'medium'
      else if (minVw >= 30) defaultSize = 'small'
      else defaultSize = 'card-mobile'
    }
  }

  // Return the selected size URL, falling back through larger sizes if not available
  const fallbackOrder: ResponsiveImageSize[] = [defaultSize, 'small', 'medium', 'large', 'xlarge']

  for (const size of fallbackOrder) {
    const sizeData = resource.sizes[size]
    if (sizeData?.url) {
      return sizeData.url
    }
  }

  // Ultimate fallback to main URL
  return resource.url || ''
}
