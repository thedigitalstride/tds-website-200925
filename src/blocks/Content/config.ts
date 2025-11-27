import type { Block, Field } from 'payload'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  {
    name: 'verticalAlign',
    type: 'radio',
    defaultValue: 'top',
    admin: {
      layout: 'horizontal',
      description: 'Vertical alignment of all content in this column (text, images, buttons)',
    },
    options: [
      { label: 'Top', value: 'top' },
      { label: 'Middle', value: 'middle' },
      { label: 'Bottom', value: 'bottom' },
    ],
  },
  {
    name: 'sticky',
    type: 'checkbox',
    defaultValue: false,
    admin: {
      description:
        'Make this column sticky on tablet and desktop (remains visible while scrolling). Only works when columns are side-by-side. Mobile only: disabled. Not available for full-width columns.',
      condition: (data, siblingData) => {
        return siblingData?.size !== 'full'
      },
    },
  },
  {
    name: 'layout',
    type: 'blocks',
    label: 'Column Content',
    required: false,
    blockReferences: ['richText', 'inlineCard', 'mediaBlock', 'spacer', 'lightboxBlock'] as any,
    blocks: [], // Required to be empty when using blockReferences
    admin: {
      description: 'Add content blocks to this column (rich text, cards, images, spacers, etc.)',
    },
  },
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/blocks/Content/ColumnRowLabel#ColumnRowLabel',
        },
        description: 'Add and arrange columns by dragging to reorder',
      },
      fields: columnFields,
    },
    {
      name: 'contentAlignment',
      type: 'select',
      defaultValue: 'left',
      label: 'Content Alignment',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      admin: {
        description:
          'Horizontal alignment of columns. Only applies when total column width is less than full width (e.g., half + third = 10/12 columns can be centered). Full-width layouts (e.g., two half columns = 12/12) ignore this setting.',
      },
    },
    {
      name: 'spacing',
      type: 'select',
      defaultValue: 'normal',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Compact', value: 'compact' },
        { label: 'Normal', value: 'normal' },
        { label: 'Spacious', value: 'spacious' },
      ],
      admin: {
        description: 'Vertical spacing around this section',
      },
    },
    {
      name: 'cardSpacing',
      type: 'select',
      defaultValue: 'default',
      label: 'Grid Spacing',
      options: [
        { label: 'Default (2rem mobile / 3rem desktop)', value: 'default' },
        { label: 'Compact (1rem)', value: 'compact' },
        { label: 'Normal (1.5rem)', value: 'normal' },
        { label: 'Large (2rem)', value: 'large' },
        { label: 'XL (3rem)', value: 'xl' },
      ],
      admin: {
        description: 'Spacing between grid columns',
      },
    },
  ],
}
