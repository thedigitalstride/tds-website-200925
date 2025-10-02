import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Page } from '../../../payload-types'
import { buildFullPath, getRevalidationPaths, hasPathChanged } from '@/utilities/pageHelpers'
import { debugInfo } from '@/utilities/debug'

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      // Get all paths that need revalidation (current and previous if changed)
      const pathsToRevalidate = getRevalidationPaths(doc, previousDoc)

      pathsToRevalidate.forEach(path => {
        debugInfo(payload, `Revalidating page at path: ${path}`)
        try {
          revalidatePath(path)
        } catch (error) {
          payload.logger.error(`Failed to revalidate page ${path}: ${error instanceof Error ? error.message : 'Unknown error'}`)
        }
      })

      try {
        revalidateTag('pages-sitemap')
      } catch (error) {
        payload.logger.error(`Failed to revalidate pages sitemap: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }

    // If the page was previously published but is now unpublished
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = buildFullPath(previousDoc)

      debugInfo(payload, `Revalidating unpublished page at path: ${oldPath}`)

      try {
        revalidatePath(oldPath)
        revalidateTag('pages-sitemap')
      } catch (error) {
        payload.logger.error(`Failed to revalidate unpublished page ${oldPath}: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }

    // If this is a parent page and its path changed, we need to revalidate all descendants
    if (previousDoc && hasPathChanged(doc, previousDoc)) {
      // Note: In a production app, you might want to query and revalidate all descendant pages
      // For now, we rely on the nested-docs plugin to handle breadcrumb updates
      debugInfo(payload, `Page path changed, descendants will be updated by nested-docs plugin`)
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    const path = buildFullPath(doc)

    debugInfo(payload, `Revalidating deleted page at path: ${path}`)

    try {
      revalidatePath(path)
      revalidateTag('pages-sitemap')
    } catch (error) {
      payload.logger.error(`Failed to revalidate deleted page ${path}: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  return doc
}
