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
          uuiColors: ['primary', 'secondary', 'tertiary', 'link-color', 'link-gray'],
          uuiSizes: ['sm', 'md', 'lg'],
          defaultUUIColor: 'link-color',
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
          label: 'Card Style',
          options: [
            {
              label: 'Featured Icon Card (Default)',
              value: 'card',
            },
            {
              label: 'Centered with Icon',
              value: 'centered-icon',
            },
            {
              label: 'Left Aligned with Icon',
              value: 'left-icon',
            },
            {
              label: 'Horizontal Icon Left',
              value: 'horizontal-icon',
            },
            {
              label: 'Simple Icon Card',
              value: 'simple-card',
            },
            {
              label: 'Elevated Box',
              value: 'elevated-box',
            },
          ],
          admin: {
            description: 'Visual style for feature cards',
          },
        },
        {
          name: 'cardBackground',
          type: 'select',
          defaultValue: 'grey',
          label: 'Card Background',
          options: [
            { label: 'Grey (Default)', value: 'grey' },
            { label: 'Brand', value: 'brand' },
            { label: 'Outline', value: 'outline' },
            { label: 'Line', value: 'line' },
          ],
          admin: {
            description: 'Background style for feature cards',
          },
        },
        {
          name: 'columns',
          type: 'select',
          defaultValue: '3',
          label: 'Grid Columns',
          options: [
            { label: '2 Columns', value: '2' },
            { label: '3 Columns', value: '3' },
            { label: '4 Columns', value: '4' },
          ],
          admin: {
            description:
              'Number of columns in the grid. Automatically switches to full-width if only one feature exists.',
          },
        },
        {
          name: 'iconColor',
          type: 'select',
          defaultValue: 'brand',
          label: 'Icon Color',
          options: [
            { label: 'Brand', value: 'brand' },
            { label: 'Gray', value: 'gray' },
            { label: 'White', value: 'white' },
            { label: 'Success (Green)', value: 'success' },
            { label: 'Warning (Orange)', value: 'warning' },
            { label: 'Error (Red)', value: 'error' },
          ],
          admin: {
            description: 'Color scheme for the featured icons',
          },
        },
        {
          name: 'iconTheme',
          type: 'select',
          defaultValue: 'dark',
          label: 'Icon Theme',
          options: [
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
            { label: 'Gradient', value: 'gradient' },
            { label: 'Modern', value: 'modern' },
            { label: 'Outline', value: 'outline' },
          ],
          admin: {
            description: 'Visual theme for the featured icons',
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
    singular: 'Features Section',
    plural: 'Features Sections',
  },
}
