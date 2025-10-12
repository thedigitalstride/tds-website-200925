import type { GlobalConfig } from 'payload'
import { revalidatePostsSettings } from './hooks/revalidatePostsSettings'

export const PostsSettings: GlobalConfig = {
  slug: 'postsSettings',
  label: 'Posts Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Page Content',
          fields: [
            {
              name: 'pageHeader',
              type: 'group',
              label: 'Page Header',
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  required: true,
                  defaultValue: 'News & insights',
                  admin: {
                    description: 'Main heading displayed at the top of the posts page',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: false,
                  defaultValue:
                    'The latest industry news, interviews, technologies, and resources.',
                  admin: {
                    description: 'Description text displayed below the main heading',
                    rows: 3,
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Layout Settings',
          fields: [
            {
              name: 'gridColumns',
              type: 'group',
              label: 'Grid Column Settings',
              admin: {
                description:
                  'Configure how many columns to display in the posts grid for different screen sizes',
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
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidatePostsSettings],
  },
  admin: {
    group: 'Settings',
  },
}
