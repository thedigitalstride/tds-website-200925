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
      // Enable most common button styles for CTAs
      uuiColors: ['primary', 'secondary', 'tertiary', 'link-color'],
      uuiSizes: ['md', 'lg'],
      defaultUUIColor: 'primary',
      defaultUUISize: 'lg',
      overrides: {
        maxRows: 2,
      },
    }),
  ],
  labels: {
    plural: 'Calls to Action',
    singular: 'Call to Action',
  },
}
