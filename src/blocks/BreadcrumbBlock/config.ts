import type { Block } from 'payload'

export const BreadcrumbBlock: Block = {
  slug: 'breadcrumb',
  interfaceName: 'BreadcrumbBlock',
  fields: [
    {
      name: 'spacing',
      type: 'select',
      defaultValue: 'compact',
      options: [
        { label: 'Compact', value: 'compact' },
        { label: 'Normal', value: 'normal' },
        { label: 'Spacious', value: 'spacious' },
      ],
      admin: {
        description: 'Vertical spacing around the breadcrumb section. Breadcrumbs typically use compact spacing.',
      },
    },
  ],
  labels: {
    singular: 'Breadcrumb',
    plural: 'Breadcrumbs',
  },
}
