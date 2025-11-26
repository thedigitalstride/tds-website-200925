import type { Block } from 'payload'
import { link } from '@/fields/link'
import { richText } from '@/fields/richText'
import { iconSelectorField } from '@/fields/IconSelector'

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
        iconSelectorField({
          name: 'icon',
          required: false,
          admin: {
            description: 'Select an icon from the Icons collection to display in the card',
          },
        }),
        {
          name: 'content',
          type: 'richText',
          required: false,
          label: 'Card Content',
          editor: richText(),
          admin: {
            description: 'Rich content with headings (H3 for titles), formatting, lists, and links',
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
          uuiColors: ['primary', 'primary-reversed', 'accent', 'secondary', 'tertiary', 'outline', 'link'],
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
          defaultValue: 'none',
          options: [
            {
              label: 'None (Transparent)',
              value: 'none',
            },
            {
              label: 'Primary',
              value: 'primary',
            },
            {
              label: 'Primary (Reversed)',
              value: 'primary-reversed',
            },
            {
              label: 'Secondary',
              value: 'secondary',
            },
            {
              label: 'Tertiary',
              value: 'tertiary',
            },
            {
              label: 'Accent',
              value: 'accent',
            },
            {
              label: 'Outline',
              value: 'outline',
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
          label: 'Icon Style',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Primary (Reversed)', value: 'primary-reversed' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Tertiary', value: 'tertiary' },
            { label: 'Accent', value: 'accent' },
            { label: 'Outline', value: 'outline' },
          ],
          admin: {
            description: 'Icon style variant - matches button and card background system',
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
            { label: 'None', value: 'none' },
            { label: 'Compact', value: 'compact' },
            { label: 'Normal', value: 'normal' },
            { label: 'Spacious', value: 'spacious' },
          ],
          admin: {
            description: 'Vertical spacing around this section',
          },
        },
        {
          name: 'gridSpacing',
          type: 'select',
          defaultValue: 'default',
          label: 'Grid Spacing',
          options: [
            { label: 'Default (Auto)', value: 'default' },
            { label: 'Compact (1rem)', value: 'compact' },
            { label: 'Normal (1.5rem)', value: 'normal' },
            { label: 'Large (2rem)', value: 'large' },
            { label: 'XL (3rem)', value: 'xl' },
          ],
          admin: {
            description: 'Spacing between cards in the grid. Default automatically adjusts for centered-icon and elevated-box layouts.',
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
