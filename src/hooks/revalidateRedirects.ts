import type { CollectionAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateRedirects: CollectionAfterChangeHook = ({ doc, req, req: { payload } }) => {
  // Prevent revalidation loops when updating programmatically
  if (req.context?.disableRevalidate) {
    return doc
  }

  payload.logger.info(`Revalidating redirects`)

  try {
    revalidateTag('redirects')
  } catch (error) {
    payload.logger.error(`Failed to revalidate redirects: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }

  return doc
}
