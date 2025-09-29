import type { Block } from 'payload'
import { link } from '@/fields/link'

export const ButtonBlock: Block = {
  slug: 'buttonBlock',
  fields: [
    {
      name: 'buttons',
      type: 'array',
      admin: {
        description: 'Add one or more buttons with different styles and links',
      },
      fields: [
        link({
          enableUUIButton: true,
          defaultUUIColor: 'primary',
          defaultUUISize: 'md',
          appearances: false, // Disable legacy appearance options for buttons
        }),
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Optional icon name from @untitledui/icons (e.g., "ArrowRight", "Download01")',
          },
          label: 'Icon Name',
        },
        {
          name: 'iconPosition',
          type: 'radio',
          admin: {
            layout: 'horizontal',
          },
          defaultValue: 'leading',
          options: [
            { label: 'Leading', value: 'leading' },
            { label: 'Trailing', value: 'trailing' },
          ],
        },
      ],
      label: 'Buttons',
      maxRows: 4,
      minRows: 1,
    },
    {
      name: 'layout',
      type: 'radio',
      admin: {
        layout: 'horizontal',
      },
      defaultValue: 'horizontal',
      options: [
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Vertical', value: 'vertical' },
      ],
    },
    {
      name: 'alignment',
      type: 'radio',
      admin: {
        layout: 'horizontal',
      },
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
  ],
  interfaceName: 'ButtonBlock',
}