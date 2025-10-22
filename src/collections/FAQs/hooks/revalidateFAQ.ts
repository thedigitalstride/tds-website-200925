import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

/**
 * Revalidate pages that contain FAQs after creating/updating
 */
export const revalidateFAQ: CollectionAfterChangeHook = ({ doc, req: { payload, context } }) => {
  // Skip revalidation during seed operations or if context flag is set
  if (context.skipRevalidation) {
    return doc
  }

  payload.logger.info(`Revalidating FAQ: ${doc.question}`)

  try {
    // Revalidate common FAQ pages
    revalidatePath('/faqs', 'page')
    revalidatePath('/', 'page')

    // Revalidate by tag for pages that include AccordionBlocks
    revalidateTag('faqs')

    // If FAQ has a slug, revalidate its standalone page (if using)
    if (doc.slug) {
      revalidatePath(`/faqs/${doc.slug}`, 'page')
    }

    payload.logger.info(`Revalidation complete for FAQ: ${doc.question}`)
  } catch (error: unknown) {
    payload.logger.error(`Error revalidating FAQ ${doc.question}:`)
    payload.logger.error(error)
  }

  return doc
}

/**
 * Revalidate pages after FAQ deletion
 */
export const revalidateDeleteFAQ: CollectionAfterDeleteHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating after FAQ deletion: ${doc.question}`)

  try {
    // Revalidate common FAQ pages
    revalidatePath('/faqs', 'page')
    revalidatePath('/', 'page')

    // Revalidate by tag
    revalidateTag('faqs')

    // If FAQ had a slug, revalidate its standalone page
    if (doc.slug) {
      revalidatePath(`/faqs/${doc.slug}`, 'page')
    }

    payload.logger.info(`Revalidation complete after FAQ deletion: ${doc.question}`)
  } catch (error: unknown) {
    payload.logger.error(`Error revalidating after FAQ deletion ${doc.question}:`)
    payload.logger.error(error)
  }

  return doc
}
