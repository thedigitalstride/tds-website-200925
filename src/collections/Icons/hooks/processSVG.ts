import type { CollectionBeforeChangeHook } from 'payload'
import { processSVG, validateSVG } from '@/utils/svg-processor'

export const processSVGHook: CollectionBeforeChangeHook = async ({ data, operation }) => {
  // Only process on create or when SVG code is updated
  if (data.svgCode) {
    // Validate SVG
    if (!validateSVG(data.svgCode)) {
      throw new Error('Invalid SVG code provided')
    }

    try {
      // Process the SVG
      const processed = await processSVG(data.svgCode)

      // Store original if it's a new icon
      if (operation === 'create' && !data.originalSvg) {
        data.originalSvg = processed.original
      }

      // Update with optimized SVG
      data.svgCode = processed.optimized

      // Update metadata
      if (!data.metadata) {
        data.metadata = {}
      }
      data.metadata = {
        ...data.metadata,
        ...processed.metadata,
      }

      return data
    } catch (error) {
      console.error('Error processing SVG:', error)
      throw new Error(`Failed to process SVG: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  return data
}