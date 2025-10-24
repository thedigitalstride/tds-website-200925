import type { Block } from 'payload'
import { link } from '@/fields/link'
import { lexicalEditor, HeadingFeature, UnorderedListFeature, OrderedListFeature, ChecklistFeature, BlocksFeature, FixedToolbarFeature, InlineToolbarFeature } from '@payloadcms/richtext-lexical'
import { ButtonBlock } from '@/blocks/ButtonBlock/config'

/**
 * Rich text editor for card descriptions with headings support
 * Includes: headings (h3, h4), lists, checkboxes, and buttons
 */
const richTextEditorWithHeadings = () => lexicalEditor({
  features: ({ rootFeatures }) => {
    return [
      ...rootFeatures,
      HeadingFeature({
        enabledHeadingSizes: ['h3', 'h4'], // Smaller headings appropriate for cards
      }),
      UnorderedListFeature(),
      OrderedListFeature(),
      ChecklistFeature(),
      BlocksFeature({ blocks: [ButtonBlock] }),
      // Add toolbar features last so they can detect all content features
      FixedToolbarFeature(),
      InlineToolbarFeature(),
    ]
  },
})

export const CardGridBlock: Block = {
  slug: 'cardGrid',
  interfaceName: 'CardGridBlock',
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
            description: 'Small text above heading (e.g., "Our Services", "What We Offer")',
            condition: (_, siblingData) => siblingData?.showHeader === true,
          },
        },
        {
          name: 'heading',
          type: 'text',
          label: 'Section Heading',
          admin: {
            description: 'Main heading for the card grid section',
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
        {
          name: 'headerAlignment',
          type: 'select',
          defaultValue: 'left',
          label: 'Header Alignment',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
          ],
          admin: {
            description: 'Alignment of the section header',
            condition: (_, siblingData) => siblingData?.showHeader === true,
          },
        },
      ],
    },
    {
      name: 'cards',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 12,
      label: 'Cards',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          label: 'Card Eyebrow',
          admin: {
            description: 'Small text above card title (e.g., "New", "Featured", "Step 01")',
            placeholder: 'Featured',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Card Title',
          admin: {
            description: 'Main heading for this card (e.g., "Fast Delivery", "Expert Support")',
          },
        },
        {
          name: 'description',
          type: 'richText',
          required: false,
          label: 'Card Description',
          editor: richTextEditorWithHeadings(),
          admin: {
            description: 'Rich description with headings, formatting, lists, and links',
          },
        },
        {
          name: 'icon',
          type: 'text',
          label: 'Icon Name',
          admin: {
            description:
              'Icon name from @untitledui/icons (e.g., "Zap", "MessageChatCircle", "ChartBreakoutSquare", "TrendUp01", "Users01"). Case-sensitive. Browse all icons at: https://icons.untitledui.com',
            placeholder: 'Zap',
          },
        },
        {
          name: 'enableLink',
          type: 'checkbox',
          label: 'Enable Link/Button',
          admin: {
            description: 'Add an optional call-to-action link or button',
          },
        },
        link({
          enableUUIButton: true,
          uuiColors: ['primary', 'accent', 'secondary', 'tertiary', 'link'],
          uuiSizes: ['sm', 'md', 'lg', 'xl'],
          defaultUUIColor: 'link',
          defaultUUISize: 'md',
          overrides: {
            admin: {
              condition: (_, siblingData) => siblingData?.enableLink === true,
            },
          },
        }),
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/blocks/CardGridBlock/CardRowLabel#CardRowLabel',
        },
      },
    },
    {
      label: 'Layout & Styling',
      type: 'collapsible',
      admin: {
        initCollapsed: true,
        description: 'Configure grid layout, card style, colors, and spacing',
      },
      fields: [
        {
          name: 'cardStyle',
          type: 'select',
          defaultValue: 'card',
          label: 'Card Layout',
          options: [
            {
              label: 'Icon Top (Default)',
              value: 'card',
            },
            {
              label: 'Icon Top Centered',
              value: 'centered-icon',
            },
            {
              label: 'Icon Left (Vertical)',
              value: 'left-icon',
            },
            {
              label: 'Icon Left (Horizontal)',
              value: 'horizontal-icon',
            },
            {
              label: 'Elevated Box',
              value: 'elevated-box',
            },
          ],
          admin: {
            description: 'Layout arrangement for cards (icon position and alignment)',
          },
        },
        {
          name: 'cardBackground',
          type: 'select',
          label: 'Card Background',
          defaultValue: 'primary',
          options: [
            {
              label: 'Primary',
              value: 'primary',
            },
            {
              label: 'Secondary',
              value: 'secondary',
            },
            {
              label: 'Accent',
              value: 'accent',
            },
            {
              label: 'Line (Top Border)',
              value: 'line',
            },
          ],
          admin: {
            description: 'Visual style for cards (background and borders)',
          },
        },
        {
          name: 'columns',
          type: 'select',
          defaultValue: '3',
          label: 'Grid Columns',
          options: [
            { label: '1 Column', value: '1' },
            { label: '2 Columns', value: '2' },
            { label: '3 Columns', value: '3' },
            { label: '4 Columns', value: '4' },
          ],
          admin: {
            description:
              'Number of columns in the grid (1-4). Single column layout allows natural card heights; multi-column layouts use equal heights.',
          },
        },
        {
          name: 'iconColor',
          type: 'select',
          defaultValue: 'primary',
          label: 'Icon Color',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Tertiary', value: 'tertiary' },
            { label: 'Accent', value: 'accent' },
          ],
          admin: {
            description: 'Icon color variant - matches button color system',
          },
        },
        {
          name: 'iconTheme',
          type: 'select',
          defaultValue: 'rounded-square',
          label: 'Icon Shape',
          options: [
            { label: 'Rounded Square', value: 'rounded-square' },
            { label: 'Round', value: 'round' },
          ],
          admin: {
            description: 'Shape of the icon container',
          },
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
    singular: 'Card Grid',
    plural: 'Card Grids',
  },
}
