import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { AccordionBlock } from '../../blocks/AccordionBlock/config'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { HeroHeadingBlock } from '../../blocks/HeroHeadingBlock/config'
import { BreadcrumbBlock } from '../../blocks/BreadcrumbBlock/config'
import { CardGridBlock } from '../../blocks/CardGridBlock/config'
import { FeaturesBlock } from '../../blocks/FeaturesBlock/config'
import { LatestPostsBlock } from '../../blocks/LatestPostsBlock/config'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'
import { validateParent } from './hooks/validateParent'
import { syncAiSeoToMeta } from '../../hooks/syncAiSeoFields'

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
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'layout',
              type: 'blocks',
              blocks: [HeroHeadingBlock, BreadcrumbBlock, CallToAction, Content, MediaBlock, Archive, FormBlock, CardGridBlock, FeaturesBlock, LatestPostsBlock, AccordionBlock],
              admin: {
                initCollapsed: true,
              },
            },
          ],
        },
        {
          label: 'AI SEO',
          description: 'AI-powered SEO meta generation',
          fields: [
            {
              type: 'collapsible',
              label: 'SEO Keywords & Guidance',
              admin: {
                initCollapsed: false,
                description: 'Provide keywords and guidance for AI-powered SEO meta generation',
              },
              fields: [
                {
                  name: 'seoKeywords',
                  type: 'textarea',
                  label: 'SEO Target Keywords',
                  admin: {
                    description:
                      'Enter target keywords for this page (one per line or comma-separated). AI will use these to optimize the meta title and description.',
                    rows: 3,
                    placeholder: 'web design services\nresponsive websites\nUK web development',
                  },
                },
                {
                  name: 'seoGuidance',
                  type: 'textarea',
                  label: 'Page-Specific SEO Guidance',
                  admin: {
                    description:
                      'Optional: Provide specific guidance for AI generation (tone, focus areas, unique selling points, target audience, etc.)',
                    rows: 4,
                    placeholder:
                      'Focus on B2B audience, emphasize 10+ years experience, highlight local UK presence',
                  },
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'AI-Generated Meta Fields',
              admin: {
                initCollapsed: false,
                description:
                  'Generate SEO-optimized titles and descriptions using AI. These will automatically sync to the SEO tab.',
              },
              fields: [
                {
                  name: 'aiSeoTitle',
                  type: 'text',
                  label: 'SEO Meta Title (AI-Generated)',
                  hooks: {
                    beforeChange: [syncAiSeoToMeta],
                  },
                  admin: {
                    description:
                      'Click "Generate Title" to create an SEO-optimized title using AI based on page content and keywords. This will automatically populate the SEO tab.',
                    components: {
                      Field: '@/components/SEO/SeoTitleField',
                    },
                  },
                },
                {
                  name: 'aiSeoDescription',
                  type: 'textarea',
                  label: 'SEO Meta Description (AI-Generated)',
                  hooks: {
                    beforeChange: [syncAiSeoToMeta],
                  },
                  admin: {
                    description:
                      'Click "Generate Description" to create an SEO-optimized description using AI based on page content and keywords. This will automatically populate the SEO tab.',
                    rows: 3,
                    components: {
                      Field: '@/components/SEO/SeoDescriptionField',
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Meta',
          description: 'Page metadata and settings',
          fields: [
            {
              name: 'publishedAt',
              type: 'date',
            },
            ...slugField('title', {
              slugOverrides: {
                required: true,
              },
              checkboxOverrides: {
                defaultValue: false,
              },
            }),
          ],
        },
      ],
    },
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
