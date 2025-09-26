import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'caption',
      type: 'group',
      label: 'Caption',
      fields: [
        {
          name: 'text',
          type: 'text',
          admin: {
            description: 'Caption text',
          },
        },
        {
          name: 'link',
          type: 'group',
          label: 'Optional Link',
          fields: [
            {
              name: 'url',
              type: 'text',
              admin: {
                description: 'Link URL (e.g., https://example.com)',
              },
            },
            {
              name: 'text',
              type: 'text',
              admin: {
                description: 'Link text',
              },
            },
          ],
        },
      ],
    },
  ],
}
