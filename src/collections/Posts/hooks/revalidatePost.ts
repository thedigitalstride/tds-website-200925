import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Post } from '../../../payload-types'

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/posts/${doc.slug}`

      payload.logger.info(`Revalidating post at path: ${path}`)

      try {
        revalidatePath(path)
        revalidateTag('posts-sitemap')
      } catch (error) {
        payload.logger.error(`Failed to revalidate ${path}: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/posts/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      try {
        revalidatePath(oldPath)
        revalidateTag('posts-sitemap')
      } catch (error) {
        payload.logger.error(`Failed to revalidate ${oldPath}: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    const path = `/posts/${doc?.slug}`

    payload.logger.info(`Revalidating deleted post at path: ${path}`)

    try {
      revalidatePath(path)
      revalidateTag('posts-sitemap')
    } catch (error) {
      payload.logger.error(`Failed to revalidate deleted post ${path}: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  return doc
}
