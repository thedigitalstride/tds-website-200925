import type { Block } from 'payload'

export const LightboxBlock: Block = {
  slug: 'lightboxBlock',
  interfaceName: 'LightboxBlock',
  fields: [
    {
      name: 'images',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 50,
      label: 'Images',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Image Name',
          admin: {
            description: 'Name for this image (editable in row label)',
            placeholder: 'Enter image name...',
          },
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Select or upload an image',
          },
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Caption (Optional)',
          admin: {
            description: 'Optional caption text for this image',
          },
        },
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/blocks/LightboxBlock/RowLabel#LightboxRowLabel',
        },
      },
    },
    {
      name: 'thumbnailColumns',
      type: 'select',
      defaultValue: '3',
      label: 'Thumbnail Grid Columns',
      options: [
        { label: '1 Column', value: '1' },
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
      admin: {
        description: 'Number of columns for the thumbnail grid display',
      },
    },
    {
      name: 'thumbnailSpacing',
      type: 'select',
      defaultValue: 'normal',
      label: 'Thumbnail Spacing',
      options: [
        { label: 'Compact', value: 'compact' },
        { label: 'Normal', value: 'normal' },
        { label: 'Large', value: 'large' },
      ],
      admin: {
        description: 'Spacing between thumbnail images',
      },
    },
    {
      name: 'enableLightbox',
      type: 'checkbox',
      defaultValue: true,
      label: 'Enable Lightbox',
      admin: {
        description: 'Allow users to click images to open in full-screen lightbox',
      },
    },
    {
      name: 'enableAnimation',
      type: 'checkbox',
      defaultValue: true,
      label: 'Enable Entrance Animation',
      admin: {
        description: 'Images animate in with a staggered fade and slide effect when scrolled into view',
      },
    },
  ],
  labels: {
    singular: 'Lightbox Gallery',
    plural: 'Lightbox Galleries',
  },
}
