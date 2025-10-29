import type { Block } from 'payload'

import { richTextStandard } from '@/fields/richTextWithButtons'

export const Banner: Block = {
  slug: 'banner',
  fields: [
    {
      name: 'style',
      type: 'select',
      defaultValue: 'info',
      options: [
        { label: 'Info', value: 'info' },
        { label: 'Warning', value: 'warning' },
        { label: 'Error', value: 'error' },
        { label: 'Success', value: 'success' },
      ],
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      editor: richTextStandard({ enableButtons: true }),
      label: false,
      required: true,
    },
  ],
  interfaceName: 'BannerBlock',
}
