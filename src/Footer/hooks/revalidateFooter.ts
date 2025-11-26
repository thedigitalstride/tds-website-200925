import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateFooter: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating footer`)

    try {
      revalidateTag('global_footer')
    } catch (error) {
      // Handle Next.js 15 revalidation context issue in development
      if (process.env.NODE_ENV === 'development') {
        payload.logger.warn(`Revalidation skipped in development: ${error instanceof Error ? error.message : String(error)}`)
      } else {
        // Re-throw in production as this should work
        throw error
      }
    }
  }

  return doc
}
