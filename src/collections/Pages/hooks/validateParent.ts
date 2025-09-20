import type { CollectionBeforeChangeHook } from 'payload'
import type { Page } from '../../../payload-types'
import { validateParentChildRelationship } from '@/utilities/pageHelpers'
import { debugError } from '@/utilities/debug'

export const validateParent: CollectionBeforeChangeHook<Page> = async ({
  data,
  req: { payload },
  operation,
}) => {
  // Only validate if parent field is being set and it's a create or update operation
  if ((operation !== 'create' && operation !== 'update') || !data.parent) {
    return data
  }

  try {
    // Get all pages to check for circular references
    const allPages = await payload.find({
      collection: 'pages',
      limit: 1000, // Adjust based on your needs
      depth: 0, // We only need IDs and parent references
      select: {
        id: true,
        parent: true,
      },
    })

    // Create a mock page object for validation
    const pageForValidation: Page = {
      ...data,
      id: data.id || 'new', // Handle new pages
    } as Page

    const validation = validateParentChildRelationship(pageForValidation, allPages.docs)

    if (!validation.isValid) {
      throw new Error(validation.error)
    }

    return data
  } catch (error) {
    // If it's our validation error, re-throw it
    if (error instanceof Error && error.message.includes('circular') || error instanceof Error && error.message.includes('parent')) {
      throw error
    }

    // For other errors, log and allow the operation to continue
    debugError(payload, error, 'Error validating parent relationship')
    return data
  }
}