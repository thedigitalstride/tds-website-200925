import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Banner } from '../../blocks/Banner/config'
import { Code } from '../../blocks/Code/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { Quote } from '../../blocks/Quote/config'
import { Conclusion } from '../../blocks/Conclusion/config'
import { LatestPostsBlock } from '../../blocks/LatestPostsBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { BreadcrumbBlock } from '../../blocks/BreadcrumbBlock/config'
import { richTextEditorFull } from '@/fields/richTextWithButtons'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { populateAuthors } from './hooks/populateAuthors'
import { revalidateDelete, revalidatePost } from './hooks/revalidatePost'
import { syncAiSeoToMeta } from '../../hooks/syncAiSeoFields'

import { slugField } from '@/fields/slug'

export const Posts: CollectionConfig<'posts'> = {
  slug: 'posts',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a post is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'posts'>
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'posts',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'posts',
        req,
      }),
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
              name: 'subtitle',
              type: 'text',
              admin: {
                description: 'Lead paragraph that appears under the title',
              },
            },
            {
              name: 'beforeContent',
              type: 'blocks',
              label: 'Before Content Blocks',
              blocks: [BreadcrumbBlock],
              defaultValue: [
                {
                  blockType: 'breadcrumb',
                  spacing: 'compact',
                },
              ],
              admin: {
                description: 'Blocks displayed before the post content (breadcrumbs always included by default)',
                initCollapsed: true,
              },
            },
            {
              name: 'tableOfContents',
              type: 'array',
              label: 'Table of Contents',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'href',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Link to section (e.g., #introduction)',
                  },
                },
              ],
              admin: {
                description: 'Optional table of contents for the sidebar',
                initCollapsed: true,
              },
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'content',
              type: 'richText',
              editor: richTextEditorFull([Banner, Code, MediaBlock, Quote, Conclusion]),
              label: false,
              required: true,
            },
            {
              name: 'afterContent',
              type: 'blocks',
              label: 'After Content Blocks',
              blocks: [LatestPostsBlock, CallToAction, MediaBlock],
              admin: {
                description: 'Optional blocks to display after the main post content',
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
                      'Enter target keywords for this post (one per line or comma-separated). AI will use these to optimize the meta title and description.',
                    rows: 3,
                    placeholder: 'digital marketing tips\nSEO best practices\ncontent marketing strategy',
                  },
                },
                {
                  name: 'seoGuidance',
                  type: 'textarea',
                  label: 'Post-Specific SEO Guidance',
                  admin: {
                    description:
                      'Optional: Provide specific guidance for AI generation (tone, focus areas, unique selling points, target audience, etc.)',
                    rows: 4,
                    placeholder:
                      'Target marketers and business owners, focus on actionable insights, emphasize ROI',
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
                      'Click "Generate Title" to create an SEO-optimized title using AI based on post content and keywords. This will automatically populate the SEO tab.',
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
                      'Click "Generate Description" to create an SEO-optimized description using AI based on post content and keywords. This will automatically populate the SEO tab.',
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
          description: 'Post metadata and settings',
          fields: [
            {
              name: 'relatedPosts',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                }
              },
              hasMany: true,
              relationTo: 'posts',
            },
            {
              name: 'categories',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              hasMany: true,
              relationTo: 'categories',
            },
            {
              name: 'contributors',
              type: 'relationship',
              label: 'Contributors',
              admin: {
                position: 'sidebar',
                description: 'People who contributed to this post (separate from authors)',
              },
              hasMany: true,
              relationTo: 'users',
            },
            {
              name: 'publishedAt',
              type: 'date',
              admin: {
                date: {
                  pickerAppearance: 'dayAndTime',
                },
                position: 'sidebar',
              },
              hooks: {
                beforeChange: [
                  ({ siblingData, value }) => {
                    if (siblingData._status === 'published' && !value) {
                      return new Date()
                    }
                    return value
                  },
                ],
              },
            },
            {
              name: 'authors',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              hasMany: true,
              relationTo: 'users',
            },
            ...slugField(),
          ],
        },
      ],
    },
    // This field is only used to populate the user data via the `populateAuthors` hook
    // This is because the `user` collection has access control locked to protect user privacy
    // GraphQL will also not return mutated user data that differs from the underlying schema
    {
      name: 'populatedAuthors',
      type: 'array',
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'nickname',
          type: 'text',
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    // This field is populated via the populateAuthors hook for contributors
    {
      name: 'populatedContributors',
      type: 'array',
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'nickname',
          type: 'text',
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidatePost],
    afterRead: [populateAuthors],
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
