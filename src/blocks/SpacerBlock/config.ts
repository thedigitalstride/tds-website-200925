import type { Block } from 'payload'

export const SpacerBlock: Block = {
  slug: 'spacer',
  interfaceName: 'SpacerBlock',
  fields: [
    {
      name: 'height',
      type: 'select',
      defaultValue: 'normal',
      label: 'Spacer Height',
      options: [
        { label: 'Extra Small (1rem / 16px)', value: 'xs' },
        { label: 'Small (1.5rem / 24px)', value: 'sm' },
        { label: 'Normal (2rem / 32px)', value: 'normal' },
        { label: 'Medium (3rem / 48px)', value: 'md' },
        { label: 'Large (4rem / 64px)', value: 'lg' },
        { label: 'Extra Large (6rem / 96px)', value: 'xl' },
        { label: '2XL (8rem / 128px)', value: '2xl' },
      ],
      admin: {
        description: 'Vertical spacing between content',
      },
    },
  ],
  labels: {
    singular: 'Spacer',
    plural: 'Spacers',
  },
}

