import type { Block, Field } from 'payload'

import { link } from '@/fields/link'
import { richTextEditor } from '@/fields/richTextWithButtons'

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
    name: 'richText',
    type: 'richText',
    editor: richTextEditor({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
    label: false,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    enableUUIButton: true,
    uuiColors: ['primary', 'secondary', 'tertiary', 'link-color'],
    uuiSizes: ['sm', 'md', 'lg'],
    defaultUUIColor: 'primary',
    defaultUUISize: 'md',
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink)
        },
      },
    },
  }),
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
      },
      fields: columnFields,
    },
  ],
}
