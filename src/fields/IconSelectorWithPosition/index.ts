import type { Field } from 'payload'
import { iconSelectorField } from '../IconSelector'

export const iconSelectorWithPositionField = (overrides?: Partial<Field>): Field => ({
  name: 'buttonIconConfig',
  type: 'group',
  label: 'Button Icon',
  admin: {
    description: 'Configure icon for the button',
  },
  fields: [
    iconSelectorField({
      name: 'icon',
      required: false,
      admin: {
        description: 'Select an icon to display in the button',
      },
    }),
    {
      name: 'position',
      type: 'select',
      label: 'Icon Position',
      defaultValue: 'trailing',
      dbName: 'btn_icon_pos', // Short DB name to avoid PostgreSQL 63-char limit
      options: [
        { label: 'Leading (before text)', value: 'leading' },
        { label: 'Trailing (after text)', value: 'trailing' },
      ],
      admin: {
        description: 'Position of the icon relative to button text',
      },
    },
  ],
  ...overrides,
} as Field)

export { IconSelectorWithPositionField } from './Field'
