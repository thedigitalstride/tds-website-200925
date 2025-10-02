import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateFooter: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating footer`)

    try {
      revalidateTag('global_footer')
    } catch (error) {
      payload.logger.error(`Failed to revalidate footer: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  return doc
}
