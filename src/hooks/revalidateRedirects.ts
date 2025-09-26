import type { CollectionAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateRedirects: CollectionAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating redirects`)

  try {
    revalidateTag('redirects')
  } catch (error) {
    payload.logger.error(`Failed to revalidate redirects: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }

  return doc
}
