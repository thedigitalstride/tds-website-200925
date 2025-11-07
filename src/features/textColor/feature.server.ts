import { createServerFeature } from '@payloadcms/richtext-lexical'

export const TextColorFeature = createServerFeature({
  feature: {
    ClientFeature: '@/features/textColor/feature.client#TextColorFeatureClient',
  },
  key: 'textColor',
})