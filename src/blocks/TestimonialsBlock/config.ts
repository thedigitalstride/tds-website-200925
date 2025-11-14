import type { Block } from 'payload'

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  fields: [
    {
      name: 'selectedTestimonials',
      type: 'relationship',
      relationTo: 'testimonials' as any, // Type will be available when payload-types is regenerated
      hasMany: true,
      required: true,
      minRows: 1,
      maxRows: 12,
      label: 'Select Testimonials',
      admin: {
        description: 'Choose which testimonials to display in this section',
      },
    },
    {
      name: 'rotationDelay',
      type: 'number',
      label: 'Rotation Delay (seconds)',
      defaultValue: 8,
      min: 3,
      max: 30,
      required: true,
      admin: {
        description: 'How long to display each testimonial before transitioning to the next (3-30 seconds)',
      },
    },
    {
      label: 'Layout & Styling',
      type: 'collapsible',
      admin: {
        initCollapsed: true,
        description: 'Configure card background and spacing',
      },
      fields: [
        {
          name: 'cardBackground',
          type: 'select',
          label: 'Card Background',
          defaultValue: 'none',
          options: [
            {
              label: 'None (Transparent)',
              value: 'none',
            },
            {
              label: 'Primary',
              value: 'primary',
            },
            {
              label: 'Primary (Reversed)',
              value: 'primary-reversed',
            },
            {
              label: 'Secondary',
              value: 'secondary',
            },
            {
              label: 'Tertiary',
              value: 'tertiary',
            },
            {
              label: 'Accent',
              value: 'accent',
            },
            {
              label: 'Outline',
              value: 'outline',
            },
          ],
          admin: {
            description: 'Visual style for the testimonial card',
          },
        },
        {
          name: 'spacing',
          type: 'select',
          defaultValue: 'normal',
          label: 'Section Spacing',
          options: [
            { label: 'Compact', value: 'compact' },
            { label: 'Normal', value: 'normal' },
            { label: 'Spacious', value: 'spacious' },
          ],
          admin: {
            description: 'Vertical spacing around this section',
          },
        },
      ],
    },
  ],
  labels: {
    singular: 'Testimonials',
    plural: 'Testimonials',
  },
}

