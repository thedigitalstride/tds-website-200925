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
      admin: {
        description: 'Select or upload an image to display',
      },
    },
    {
      name: 'caption',
      type: 'group',
      label: 'Caption (Optional)',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Caption Text',
          admin: {
            description: 'Text caption for the image',
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
  labels: {
    singular: 'Media',
    plural: 'Media',
  },
}
