import { createServerFeature } from '@payloadcms/richtext-lexical'

/**
 * Text Size Feature - Server Configuration
 *
 * Adds custom text sizing options to the Lexical editor.
 * Sizes: Normal, Large Text, Small, Lead Paragraph
 *
 * Uses inline styles with actual pixel/rem values for proper rendering
 */
export const TextSizeFeature = createServerFeature({
  feature: {
    // Link to client-side feature component
    ClientFeature: '@/features/textSize/feature.client#TextSizeFeatureClient',
  },
  key: 'textSize',
})