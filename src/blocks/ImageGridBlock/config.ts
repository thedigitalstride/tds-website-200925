import type { Block } from 'payload'

export const ImageGridBlock: Block = {
  slug: 'imageGridBlock',
  interfaceName: 'ImageGridBlock',
  labels: {
    singular: 'Image Grid',
    plural: 'Image Grids',
  },
  fields: [
    // Images array
    {
      name: 'images',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 12,
      label: 'Images',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Image Name',
          admin: {
            description: 'Name for identification in admin',
            placeholder: 'Enter image name...',
          },
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/blocks/ImageGridBlock/RowLabel#ImageGridRowLabel',
        },
      },
    },

    // Aspect ratio
    {
      name: 'aspectRatio',
      type: 'select',
      defaultValue: 'auto',
      label: 'Aspect Ratio',
      options: [
        { label: 'Auto (Natural)', value: 'auto' },
        { label: 'Square (1:1)', value: '1/1' },
        { label: 'Landscape (3:2)', value: '3/2' },
        { label: 'Wide (16:9)', value: '16/9' },
        { label: 'Portrait (2:3)', value: '2/3' },
      ],
      admin: {
        description: 'Force images to this ratio, or use natural dimensions',
      },
    },

    // Columns
    {
      name: 'columns',
      type: 'select',
      defaultValue: '2',
      label: 'Columns',
      options: [
        { label: '1 Column', value: '1' },
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
      admin: {
        description: 'Number of columns (responsive on smaller screens)',
      },
    },

    // Spacing
    {
      name: 'spacing',
      type: 'select',
      defaultValue: 'normal',
      label: 'Spacing',
      options: [
        { label: 'Compact', value: 'compact' },
        { label: 'Normal', value: 'normal' },
        { label: 'Large', value: 'large' },
      ],
      admin: {
        description: 'Gap between images',
      },
    },

    // Lightbox toggle
    {
      name: 'enableLightbox',
      type: 'checkbox',
      defaultValue: false,
      label: 'Enable Lightbox',
      admin: {
        description: 'Allow clicking images to view full-size',
      },
    },
  ],
}
