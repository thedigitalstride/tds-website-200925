import type { Block } from 'payload'
import { richTextStandard } from '@/fields/richTextWithButtons'

export const Conclusion: Block = {
  slug: 'conclusion',
  interfaceName: 'ConclusionBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Conclusion',
      admin: {
        description: 'Heading for the conclusion section',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: richTextStandard({ enableButtons: true }),
      admin: {
        description: 'Conclusion content (supports multiple paragraphs)',
      },
    },
  ],
}