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
          hasMany: true,
          label: 'Filter by Categories',
          admin: {
            description: 'Optional: Show only posts from these categories (OR logic - matches any)',
          },
        },
        {
          name: 'excludePosts',
          type: 'relationship',
          relationTo: 'posts',
          hasMany: true,
          label: 'Exclude Specific Posts',
          admin: {
            description: 'Optional: Hide these posts even if they match other filters',
          },
        },
        {
          name: 'sortBy',
          type: 'select',
          label: 'Sort By',
          defaultValue: 'date-desc',
          options: [
            { label: 'Newest First', value: 'date-desc' },
            { label: 'Oldest First', value: 'date-asc' },
            { label: 'Title (A-Z)', value: 'title-asc' },
            { label: 'Title (Z-A)', value: 'title-desc' },
          ],
          admin: {
            description: 'How to sort the posts',
          },
        },
        {
          name: 'showFeaturedFirst',
          type: 'checkbox',
          label: 'Pin Featured Posts First',
          defaultValue: false,
          admin: {
            description: 'Show featured posts at the beginning, regardless of sort order',
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
      name: 'cardDisplay',
      type: 'group',
      label: 'Card Content Display',
      admin: {
        description: 'Customize what content is shown on each blog card',
      },
      fields: [
        {
          name: 'showCategories',
          type: 'checkbox',
          label: 'Show Categories',
          defaultValue: true,
          admin: {
            description: 'Display category badges on cards',
          },
        },
        {
          name: 'showAuthor',
          type: 'checkbox',
          label: 'Show Author',
          defaultValue: false,
          admin: {
            description: 'Display author name and avatar',
          },
        },
        {
          name: 'showDate',
          type: 'checkbox',
          label: 'Show Publication Date',
          defaultValue: false,
          admin: {
            description: 'Display the published date',
          },
        },
        {
          name: 'showReadingTime',
          type: 'checkbox',
          label: 'Show Reading Time',
          defaultValue: false,
          admin: {
            description: 'Display estimated reading time',
          },
        },
        {
          name: 'showExcerpt',
          type: 'checkbox',
          label: 'Show Excerpt',
          defaultValue: true,
          admin: {
            description: 'Display post summary/excerpt',
          },
        },
        {
          name: 'excerptLength',
          type: 'select',
          label: 'Excerpt Length',
          defaultValue: 'medium',
          options: [
            { label: '50 characters', value: 'short' },
            { label: '100 characters', value: 'medium' },
            { label: '150 characters', value: 'long' },
          ],
          admin: {
            condition: (_, siblingData) => siblingData?.showExcerpt === true,
            description: 'Maximum length for post excerpts',
          },
        },
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
          name: 'displayMode',
          type: 'select',
          label: 'Display Mode',
          defaultValue: 'auto',
          options: [
            {
              label: 'Auto (Grid → Carousel when overflow)',
              value: 'auto',
            },
            {
              label: 'Grid Only',
              value: 'grid',
            },
            {
              label: 'Carousel Only',
              value: 'carousel',
            },
          ],
          admin: {
            description:
              'How posts are displayed. Auto automatically switches to carousel when posts exceed columns.',
          },
        },
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
              dbName: 'cols_desktop',
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
              dbName: 'cols_tablet',
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
              dbName: 'cols_mobile',
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
          name: 'carouselOptions',
          type: 'group',
          label: 'Carousel Settings',
          admin: {
            description: 'Configure carousel behavior (only applies in carousel or auto mode)',
            condition: (_, siblingData) =>
              siblingData?.displayMode === 'carousel' || siblingData?.displayMode === 'auto',
          },
          fields: [
            {
              name: 'enableDrag',
              type: 'checkbox',
              label: 'Enable Drag/Swipe',
              defaultValue: true,
              admin: {
                description: 'Allow users to drag/swipe the carousel (recommended)',
              },
            },
            {
              name: 'showArrows',
              type: 'checkbox',
              label: 'Show Navigation Arrows',
              defaultValue: true,
              admin: {
                description: 'Display prev/next arrows on carousel',
              },
            },
            {
              name: 'showProgress',
              type: 'checkbox',
              label: 'Show Scroll Progress Bar',
              defaultValue: false,
              admin: {
                description: 'Display a progress indicator below carousel',
              },
            },
            {
              name: 'peekAmount',
              type: 'select',
              label: 'Peek Amount',
              defaultValue: 'medium',
              dbName: 'peek_amt',
              options: [
                { label: 'None - Full Cards', value: 'none' },
                { label: 'Small - 5%', value: 'small' },
                { label: 'Medium - 10%', value: 'medium' },
                { label: 'Large - 15%', value: 'large' },
              ],
              admin: {
                description:
                  'How much of adjacent cards to show. Peek improves discoverability by showing users there is more content.',
              },
            },
            {
              name: 'autoPlay',
              type: 'checkbox',
              label: 'Auto-Play Carousel',
              defaultValue: false,
              admin: {
                description: 'Automatically advance to next card (pauses on hover/interaction)',
              },
            },
            {
              name: 'autoPlayInterval',
              type: 'number',
              label: 'Auto-Play Interval (ms)',
              defaultValue: 5000,
              min: 2000,
              max: 10000,
              admin: {
                condition: (_, siblingData) => siblingData?.autoPlay === true,
                description: 'Milliseconds between auto-advance (2000-10000)',
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
