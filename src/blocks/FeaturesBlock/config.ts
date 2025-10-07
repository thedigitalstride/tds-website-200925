import type { Block } from 'payload'
import { link } from '@/fields/link'

export const FeaturesBlock: Block = {
  slug: 'features',
  interfaceName: 'FeaturesBlock',
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
            description: 'Small text above heading (e.g., "Features")',
            condition: (_, siblingData) => siblingData?.showHeader === true,
          },
        },
        {
          name: 'heading',
          type: 'text',
          label: 'Section Heading',
          admin: {
            description: 'Main heading for the features section',
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
      name: 'features',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 12,
      label: 'Features',
      fields: [
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
          name: 'title',
          type: 'text',
          required: true,
          label: 'Feature Title',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Feature Description',
          admin: {
            description: 'Brief description of this feature',
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
          RowLabel: '@/blocks/FeaturesBlock/FeatureRowLabel#FeatureRowLabel',
        },
      },
    },
    {
      name: 'layoutOptions',
      type: 'group',
      label: 'Layout & Styling',
      admin: {
        description: 'Configure how the features section is displayed',
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
            description: 'Layout arrangement for feature cards (icon position and alignment)',
          },
        },
        {
          name: 'cardBackground',
          type: 'select',
          defaultValue: 'brand',
          label: 'Card Background',
          options: [
            { label: 'Brand', value: 'brand' },
            { label: 'Accent', value: 'accent' },
            { label: 'Outlined', value: 'outline' },
            { label: 'Top Line', value: 'line' },
            { label: 'Do not use', value: 'grey' },
          ],
          admin: {
            description: 'Visual style for feature cards (background and borders)',
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
              'Number of columns in the grid (1-4). Automatically switches to full-width if only one feature exists.',
          },
        },
        {
          name: 'iconColor',
          type: 'select',
          defaultValue: 'brand',
          label: 'Icon Color',
          options: [
            { label: 'Brand', value: 'brand' },
            { label: 'Accent', value: 'accent' },
            { label: 'Outlined', value: 'secondary' },
            { label: 'Tinted', value: 'tertiary' },
          ],
          admin: {
            description: 'Color scheme for icons - matches button system',
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
    plural: 'Cards Grids',
  },
}
