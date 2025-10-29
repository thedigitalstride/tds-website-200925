import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { richTextFull } from '@/fields/richTextWithButtons'
import { slugField } from '@/fields/slug'
import { revalidateFAQ, revalidateDeleteFAQ } from './hooks/revalidateFAQ'
import { Code } from '../../blocks/Code/config'
import { CallToAction } from '../../blocks/CallToAction/config'

export const FAQs: CollectionConfig<'faqs'> = {
  slug: 'faqs',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    question: true,
    slug: true,
    categories: true,
    featured: true,
    order: true,
  },
  admin: {
    defaultColumns: ['question', 'categories', 'featured', 'updatedAt'],
    useAsTitle: 'question',
    description:
      'Frequently Asked Questions that can be displayed in AccordionBlocks or inline in rich text',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'question',
              type: 'text',
              required: true,
              label: 'Question',
              admin: {
                description: 'The question text (e.g., "How do I get started?")',
              },
            },
            {
              name: 'answer',
              type: 'richText',
              label: 'Answer',
              required: true,
              editor: richTextFull({ additionalBlocks: [Code, CallToAction] }),
              admin: {
                description:
                  'Rich answer with images, code blocks, videos, and links to related content',
              },
            },
            {
              name: 'relatedContent',
              type: 'relationship',
              relationTo: ['posts', 'pages'],
              hasMany: true,
              label: 'Related Articles',
              admin: {
                description: 'Link to blog posts or pages that provide more detail on this topic',
              },
            },
            {
              name: 'resources',
              type: 'array',
              label: 'Downloadable Resources',
              admin: {
                description: 'PDFs, guides, templates that supplement this FAQ',
                initCollapsed: true,
                components: {
                  RowLabel: '@/collections/FAQs/ResourceRowLabel#ResourceRowLabel',
                },
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  label: 'Resource Title',
                },
                {
                  name: 'file',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  label: 'File',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Description',
                  admin: {
                    description: 'Brief description of what this resource contains',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Organization',
          fields: [
            {
              name: 'categories',
              type: 'relationship',
              relationTo: 'categories',
              hasMany: true,
              label: 'Categories',
              admin: {
                description: 'Tag FAQs with categories for filtering in AccordionBlocks',
              },
            },
            {
              name: 'featured',
              type: 'checkbox',
              label: 'Featured FAQ',
              defaultValue: false,
              admin: {
                description: 'Pin this FAQ to the top of filtered lists',
                position: 'sidebar',
              },
            },
            {
              name: 'order',
              type: 'number',
              label: 'Sort Order',
              defaultValue: 0,
              admin: {
                description:
                  'Manual ordering (lower numbers appear first). Featured FAQs always appear before non-featured.',
                position: 'sidebar',
              },
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            ...slugField('question'),
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta Description',
              maxLength: 160,
              admin: {
                description: 'SEO description for standalone FAQ pages (if using)',
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFAQ],
    afterDelete: [revalidateDeleteFAQ],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 375,
      },
    },
    maxPerDoc: 50,
  },
}
