import type { GlobalConfig } from 'payload'
import { revalidatePostsSettings } from './hooks/revalidatePostsSettings'
import { CallToAction } from '../blocks/CallToAction/config'
import { Content } from '../blocks/Content/config'
import { MediaBlock } from '../blocks/MediaBlock/config'
import { FormBlock } from '../blocks/Form/config'
import { ButtonBlock } from '../blocks/ButtonBlock/config'
import { HeroHeadingBlock } from '../blocks/HeroHeadingBlock/config'
import { BreadcrumbBlock } from '../blocks/BreadcrumbBlock/config'
// Note: FeaturesBlock and AccordionBlock excluded due to database identifier length limits (PostgreSQL 63 char limit)

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
              name: 'beforeBlocks',
              type: 'blocks',
              label: 'Before Posts Blocks',
              admin: {
                description: 'Blocks to display before the posts grid on /news-insights (use HeroHeadingBlock for page header)',
                initCollapsed: true,
              },
              blocks: [
                HeroHeadingBlock,
                BreadcrumbBlock,
                CallToAction,
                Content,
                MediaBlock,
                FormBlock,
                ButtonBlock,
              ],
            },
            {
              name: 'afterBlocks',
              type: 'blocks',
              label: 'After Posts Blocks',
              admin: {
                description: 'Optional blocks to display after the posts grid on /news-insights',
                initCollapsed: true,
              },
              blocks: [
                CallToAction,
                Content,
                MediaBlock,
                FormBlock,
                ButtonBlock,
              ],
            },
          ],
        },
        {
          label: 'Display Settings',
          description: 'Global display settings for all blog posts site-wide',
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
                  'How posts are displayed site-wide. Auto automatically switches to carousel when posts exceed columns.',
              },
            },
            {
              name: 'carouselSettings',
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
              name: 'cardDisplay',
              type: 'group',
              label: 'Card Content Display',
              admin: {
                description: 'Customize what content is shown on each blog card site-wide',
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
