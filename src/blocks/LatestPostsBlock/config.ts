import type { Block } from 'payload'
import { link } from '@/fields/link'

export const LatestPostsBlock: Block = {
  slug: 'latestPosts',
  interfaceName: 'LatestPostsBlock',
  fields: [
    {
      name: 'header',
      type: 'group',
      label: 'Section Header',
      fields: [
        {
          name: 'showHeader',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show Section Header',
          admin: {
            description: 'Toggle to show/hide the header section',
          },
        },
        {
          name: 'eyebrow',
          type: 'text',
          label: 'Eyebrow Text',
          admin: {
            description: 'Small text above heading (e.g., "Our blog")',
            condition: (_, siblingData) => siblingData?.showHeader === true,
          },
        },
        {
          name: 'heading',
          type: 'text',
          label: 'Section Heading',
          defaultValue: 'Latest blog posts',
          admin: {
            description: 'Main heading for the blog section',
            condition: (_, siblingData) => siblingData?.showHeader === true,
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Section Description',
          admin: {
            description: 'Description text that appears below the heading',
            condition: (_, siblingData) => siblingData?.showHeader === true,
          },
        },
      ],
    },
    {
      name: 'contentSource',
      type: 'radio',
      label: 'Content Source',
      defaultValue: 'latest',
      options: [
        {
          label: 'Latest Posts (Dynamic)',
          value: 'latest',
        },
        {
          label: 'Manual Selection',
          value: 'manual',
        },
      ],
      admin: {
        description:
          'Choose between automatically showing latest posts or manually selecting specific posts',
        layout: 'horizontal',
      },
    },
    {
      name: 'opts',
      type: 'group',
      label: 'Latest Posts Options',
      admin: {
        condition: (_, siblingData) => siblingData?.contentSource === 'latest',
      },
      fields: [
        {
          name: 'numPosts',
          type: 'select',
          label: 'Number of Posts',
          defaultValue: '3',
          options: [
            { label: '3 Posts', value: '3' },
            { label: '6 Posts', value: '6' },
            { label: '9 Posts', value: '9' },
            { label: '12 Posts', value: '12' },
          ],
          admin: {
            description: 'How many latest posts to display',
          },
        },
        {
          name: 'categoryFilter',
          type: 'relationship',
          relationTo: 'categories',
          label: 'Filter by Category',
          admin: {
            description: 'Optional: Show only posts from a specific category',
          },
        },
      ],
    },
    {
      name: 'selectedPosts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      label: 'Selected Posts',
      admin: {
        description: 'Manually select which posts to display',
        condition: (_, siblingData) => siblingData?.contentSource === 'manual',
      },
      minRows: 1,
      maxRows: 12,
    },
    {
      name: 'buttonConfig',
      type: 'group',
      label: 'Button Configuration',
      fields: [
        {
          name: 'showButton',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show "View All" Button',
          admin: {
            description: 'Toggle to show/hide the button that links to all posts',
          },
        },
        link({
          enableUUIButton: true,
          uuiColors: ['primary', 'accent', 'secondary', 'tertiary', 'link'],
          uuiSizes: ['sm', 'md', 'lg', 'xl'],
          defaultUUIColor: 'primary',
          defaultUUISize: 'xl',
          overrides: {
            admin: {
              condition: (_, siblingData) => siblingData?.showButton === true,
            },
          },
        }),
      ],
    },
    {
      name: 'layoutOptions',
      type: 'group',
      label: 'Layout Options',
      admin: {
        description: 'Configure how the blog section is displayed',
      },
      fields: [
        {
          name: 'usePostsSettings',
          type: 'checkbox',
          label: 'Use Global Posts Settings',
          defaultValue: true,
          admin: {
            description:
              'Use column settings from Posts Settings global. Uncheck to customize columns for this block.',
          },
        },
        {
          name: 'gridColumns',
          type: 'group',
          label: 'Custom Grid Columns',
          admin: {
            description: 'Configure columns for different screen sizes',
            condition: (_, siblingData) => siblingData?.usePostsSettings !== true,
          },
          fields: [
            {
              name: 'desktop',
              type: 'select',
              label: 'Desktop Columns',
              defaultValue: '3',
              options: [
                { label: '2 Columns', value: '2' },
                { label: '3 Columns', value: '3' },
                { label: '4 Columns', value: '4' },
              ],
              admin: {
                description: 'Number of columns on large screens (1024px and above)',
              },
            },
            {
              name: 'tablet',
              type: 'select',
              label: 'Tablet Columns',
              defaultValue: '2',
              options: [
                { label: '2 Columns', value: '2' },
                { label: '3 Columns', value: '3' },
                { label: '4 Columns', value: '4' },
              ],
              admin: {
                description: 'Number of columns on medium screens (768px - 1023px)',
              },
            },
            {
              name: 'mobile',
              type: 'select',
              label: 'Mobile Columns',
              defaultValue: '1',
              options: [
                { label: '1 Column', value: '1' },
                { label: '2 Columns', value: '2' },
              ],
              admin: {
                description: 'Number of columns on small screens (below 768px)',
              },
            },
          ],
        },
        {
          name: 'spacing',
          type: 'select',
          defaultValue: 'normal',
          label: 'Section Spacing',
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
    },
  ],
  labels: {
    singular: 'Latest Posts',
    plural: 'Latest Posts',
  },
}
