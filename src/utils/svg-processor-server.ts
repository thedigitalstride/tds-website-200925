import 'server-only'
import { optimize, type Config as SVGOConfig } from 'svgo'
import type { ProcessedSVG } from './svg-processor-types'

/**
 * SVGO configuration for icon optimization (server-side only)
 */
const svgoConfig: SVGOConfig = {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
          removeTitle: true,
          removeDesc: true,
          cleanupIds: {
            minify: true,
          },
        },
      },
    } as any, // Type assertion needed due to SVGO v4 type definitions
    {
      name: 'convertColors',
      params: {
        currentColor: true,
      },
    } as any, // Type assertion needed due to SVGO v4 type definitions
    'removeStyleElement' as any,
    'removeXMLNS' as any,
    'removeDimensions' as any,
    'sortAttrs' as any,
  ],
}

/**
 * Process SVG with SVGO (server-side only)
 */
export async function optimizeSVG(svgString: string): Promise<string> {
  try {
    const result = optimize(svgString, svgoConfig)
    return result.data
  } catch (error) {
    console.error('SVGO optimization failed:', error)
    // Fallback to basic processing
    return svgString
      .replace(/fill="(?!none|currentColor|transparent)[^"]+"/g, 'fill="currentColor"')
      .replace(/stroke="(?!none|currentColor|transparent)[^"]+"/g, 'stroke="currentColor"')
  }
}
