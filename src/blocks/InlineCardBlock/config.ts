import type { Block } from 'payload'
import { link } from '@/fields/link'
import { richText } from '@/fields/richText'
import { iconSelectorField } from '@/fields/IconSelector'

export const InlineCardBlock: Block = {
  slug: 'inlineCard',
  interfaceName: 'InlineCardBlock',
  fields: [
    iconSelectorField({
      name: 'icon',
      required: false,
      admin: {
        description: 'Select an icon from the Icons collection to display in the card',
      },
    }),
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
      required: false,
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
      editor: richText(),
      admin: {
        description: 'Rich description with headings, formatting, lists, and links',
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
    {
      label: 'Card Styling',
      type: 'collapsible',
      admin: {
        initCollapsed: true,
        description: 'Configure card appearance and icon styling',
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
            description: 'Layout arrangement for card (icon position and alignment)',
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
            description: 'Visual style for card (background and borders)',
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
      ],
    },
  ],
  labels: {
    singular: 'Inline Card',
    plural: 'Inline Cards',
  },
}

