import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { richText } from '@/fields/richText'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true, // Public read access for frontend
    update: authenticated,
  },
  admin: {
    defaultColumns: ['person', 'company', 'updatedAt'],
    useAsTitle: 'person',
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Testimonial Content',
      editor: richText(),
      admin: {
        description: 'The main testimonial quote or content',
      },
    },
    {
      name: 'person',
      type: 'text',
      label: 'Person Name',
      admin: {
        description: 'Name of the person giving the testimonial (optional)',
      },
    },
    {
      name: 'position',
      type: 'text',
      label: 'Position/Title',
      admin: {
        description: 'Job title or position of the person (optional)',
      },
    },
    {
      name: 'company',
      type: 'text',
      label: 'Company Name',
      admin: {
        description: 'Company or organization name (optional)',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Company Logo',
      admin: {
        description: 'Company logo displayed in subtle grey under the content (optional)',
      },
    },
  ],
  labels: {
    singular: 'Testimonial',
    plural: 'Testimonials',
  },
  timestamps: true,
}

