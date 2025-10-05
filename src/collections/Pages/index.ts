import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { ButtonBlock } from '../../blocks/ButtonBlock/config'
import { HeroHeadingBlock } from '../../blocks/HeroHeadingBlock/config'
import { BreadcrumbBlock } from '../../blocks/BreadcrumbBlock/config'
import { FeaturesBlock } from '../../blocks/FeaturesBlock/config'
import { LatestPostsBlock } from '../../blocks/LatestPostsBlock/config'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'
import { validateParent } from './hooks/validateParent'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
    breadcrumbs: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        // Construct full path from breadcrumbs if available
        let slugPath = typeof data?.slug === 'string' ? data.slug : ''

        if (data?.breadcrumbs && Array.isArray(data.breadcrumbs) && data.breadcrumbs.length > 0) {
          const lastBreadcrumb = data.breadcrumbs[data.breadcrumbs.length - 1]
          if (lastBreadcrumb?.url) {
            slugPath = lastBreadcrumb.url.substring(1) // Remove leading /
          }
        }

        const path = generatePreviewPath({
          slug: slugPath,
          collection: 'pages',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) => {
      // Construct full path from breadcrumbs if available
      let slugPath = typeof data?.slug === 'string' ? data.slug : ''

      if (data?.breadcrumbs && Array.isArray(data.breadcrumbs) && data.breadcrumbs.length > 0) {
        const lastBreadcrumb = data.breadcrumbs[data.breadcrumbs.length - 1]
        if (lastBreadcrumb?.url) {
          slugPath = lastBreadcrumb.url.substring(1) // Remove leading /
        }
      }

      return generatePreviewPath({
        slug: slugPath,
        collection: 'pages',
        req,
      })
    },
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [HeroHeadingBlock, BreadcrumbBlock, CallToAction, Content, MediaBlock, Archive, FormBlock, ButtonBlock, FeaturesBlock, LatestPostsBlock],
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt, validateParent],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
