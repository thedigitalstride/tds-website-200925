import type { ProcessedSVG } from './svg-processor-types'
export type { ProcessedSVG }

/**
 * Convert fill and stroke colors to currentColor
 * This is a fallback if SVGO's convertColors doesn't catch everything
 */
export function convertToCurrentColor(svgString: string): string {
  // Replace common color attributes
  return svgString
    .replace(/fill="(?!none|currentColor|transparent)[^"]+"/g, 'fill="currentColor"')
    .replace(/stroke="(?!none|currentColor|transparent)[^"]+"/g, 'stroke="currentColor"')
    .replace(/stop-color="[^"]+"/g, 'stop-color="currentColor"') // For gradients
}

/**
 * Process an SVG string for use as an icon
 * - Basic SVG processing and optimization
 * - Converts colors to currentColor
 * - Extracts metadata
 */
export async function processSVG(svgString: string): Promise<ProcessedSVG> {
  try {
    // Store original for backup
    const original = svgString.trim()

    // Basic processing - convert colors to currentColor
    let optimized = convertToCurrentColor(original)

    // Clean up common unnecessary attributes
    optimized = optimized
      .replace(/\s+xmlns:xlink="[^"]+"/g, '')
      .replace(/\s+xml:space="[^"]+"/g, '')
      .replace(/\s+enable-background="[^"]+"/g, '')
      .replace(/\s+id="[^"]+"/g, '')
      .replace(/\s+class="[^"]+"/g, '')
      .replace(/\s+style="[^"]+"/g, '')
      .replace(/\s+data-name="[^"]+"/g, '')

    // Extract metadata
    const metadata = extractSVGMetadata(optimized)

    return {
      optimized,
      original,
      metadata,
    }
  } catch (error) {
    console.error('Error processing SVG:', error)
    throw new Error(`Failed to process SVG: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Extract metadata from an SVG string
 */
export function extractSVGMetadata(svgString: string): ProcessedSVG['metadata'] {
  const metadata: ProcessedSVG['metadata'] = {
    pathCount: 0,
    fileSize: new Blob([svgString]).size,
  }

  // Extract viewBox
  const viewBoxMatch = svgString.match(/viewBox="([^"]+)"/)
  if (viewBoxMatch) {
    metadata.viewBox = viewBoxMatch[1]
    const [, , width, height] = viewBoxMatch[1].split(' ').map(Number)
    if (width && height) {
      metadata.width = width
      metadata.height = height
    }
  }

  // Extract width/height if no viewBox
  if (!metadata.width) {
    const widthMatch = svgString.match(/width="(\d+)"/)
    if (widthMatch) {
      metadata.width = parseInt(widthMatch[1], 10)
    }
  }

  if (!metadata.height) {
    const heightMatch = svgString.match(/height="(\d+)"/)
    if (heightMatch) {
      metadata.height = parseInt(heightMatch[1], 10)
    }
  }

  // Count path elements (includes path, circle, rect, etc.)
  const pathMatches = svgString.match(/<(path|circle|rect|ellipse|line|polyline|polygon)[^>]*>/g)
  if (pathMatches) {
    metadata.pathCount = pathMatches.length
  }

  return metadata
}

/**
 * Validate that a string is valid SVG
 */
export function validateSVG(svgString: string): boolean {
  try {
    // Basic validation - check if it's an SVG element
    if (!svgString.includes('<svg') || !svgString.includes('</svg>')) {
      return false
    }

    // Try to parse as XML
    if (typeof DOMParser !== 'undefined') {
      const parser = new DOMParser()
      const doc = parser.parseFromString(svgString, 'image/svg+xml')
      const parserError = doc.querySelector('parsererror')
      return !parserError
    }

    // If DOMParser is not available (Node.js), do basic validation
    return true
  } catch {
    return false
  }
}

/**
 * Clean icon name for use as identifier
 */
export function cleanIconName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, '-') // Replace invalid chars with hyphen
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
}

/**
 * Generate a label from an icon name
 */
export function generateLabel(name: string): string {
  return name
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}