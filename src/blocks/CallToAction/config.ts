import type { Block } from 'payload'

import { linkGroup } from '../../fields/linkGroup'
import { richTextEditor } from '@/fields/richTextWithButtons'

export const CallToAction: Block = {
  slug: 'cta',
  interfaceName: 'CallToActionBlock',
  fields: [
    {
      name: 'richText',
      type: 'richText',
      editor: richTextEditor({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
      label: false,
    },
    linkGroup({
      enableUUIButton: true,
      uuiColors: ['primary', 'accent', 'secondary', 'tertiary', 'link'],
      uuiSizes: ['sm', 'md', 'lg', 'xl'],
      defaultUUIColor: 'primary',
      defaultUUISize: 'lg',
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'spacing',
      type: 'select',
      defaultValue: 'normal',
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
  labels: {
    plural: 'Calls to Action',
    singular: 'Call to Action',
  },
}
