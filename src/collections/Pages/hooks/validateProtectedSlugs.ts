import type { CollectionBeforeChangeHook } from 'payload'
import type { Page } from '../../../payload-types'

// List of protected slugs that cannot be used for pages
const PROTECTED_SLUGS = ['news-insights', 'admin', 'api']

export const validateProtectedSlugs: CollectionBeforeChangeHook<Page> = async ({
  data,
  operation,
}) => {
  // Only validate slug on create and update operations
  if (operation !== 'create' && operation !== 'update') {
    return data
  }

  // Check if slug is being set
  if (data.slug) {
    const slug = data.slug.toLowerCase().trim()

    // Check if slug is in protected list
    if (PROTECTED_SLUGS.includes(slug)) {
      throw new Error(
        `The slug "${slug}" is protected and cannot be used. This slug is reserved for system routes. Please choose a different slug.`,
      )
    }
  }

  return data
}

