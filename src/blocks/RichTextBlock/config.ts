import type { Block } from 'payload'
import { richText } from '@/fields/richText'

export const RichTextBlock: Block = {
  slug: 'richText',
  interfaceName: 'RichTextBlock',
  fields: [
    {
      name: 'content',
      type: 'richText',
      editor: richText(),
      label: 'Rich Text Content',
      required: false,
      admin: {
        description: 'Add formatted text, headings, lists, links, and more',
      },
    },
  ],
  labels: {
    singular: 'Rich Text',
    plural: 'Rich Text Blocks',
  },
}

