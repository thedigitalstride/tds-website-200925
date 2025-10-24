import type { GlobalAfterChangeHook } from 'payload'
import { revalidatePath } from 'next/cache'

export const revalidatePostsSettings: GlobalAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info('Revalidating posts page')

  try {
    revalidatePath('/news-insights', 'page')
  } catch (error) {
    // In development mode with Next.js 15, revalidatePath may fail during API requests
    // This is safe to ignore - the path will be revalidated on the next page request
    if (process.env.NODE_ENV === 'development') {
      payload.logger.warn('Failed to revalidate path (expected in development mode)')
    } else {
      throw error
    }
  }

  return doc
}
