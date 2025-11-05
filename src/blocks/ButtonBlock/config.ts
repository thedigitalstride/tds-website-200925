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
          uuiColors: ['primary', 'primary-reversed', 'accent', 'secondary', 'tertiary', 'outline', 'link'],
          uuiSizes: ['sm', 'md', 'lg', 'xl'],
          defaultUUIColor: 'primary',
          defaultUUISize: 'md',
          appearances: false,
        }),
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