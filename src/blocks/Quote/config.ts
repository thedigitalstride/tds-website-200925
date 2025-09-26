import type { Block } from 'payload'

export const Quote: Block = {
  slug: 'quote',
  interfaceName: 'QuoteBlock',
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      admin: {
        description: 'The quote text',
      },
    },
    {
      name: 'author',
      type: 'group',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
          admin: {
            description: 'Author title or role',
          },
        },
      ],
    },
  ],
}