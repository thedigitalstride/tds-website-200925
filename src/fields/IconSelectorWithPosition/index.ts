import type { Field } from 'payload'
import { IconSelectorWithPositionField } from './Field'

export const iconSelectorWithPositionField = (overrides?: Partial<Field>): Field => ({
  name: 'buttonIconConfig',
  type: 'group',
  label: false, // Don't show group label, the field component handles labeling
  admin: {
    description: 'Select an icon from the Icons collection and configure its position',
    components: {
      Field: IconSelectorWithPositionField,
    },
  },
  fields: [
    {
      name: 'icon',
      type: 'relationship',
      relationTo: 'icons',
      required: false,
    },
    {
      name: 'position',
      type: 'select',
      defaultValue: 'trailing',
      dbName: 'btn_icon_pos', // Short DB name to avoid PostgreSQL 63-char limit
      options: [
        { label: 'Leading', value: 'leading' },
        { label: 'Trailing', value: 'trailing' },
      ],
    },
  ],
  ...overrides,
} as Field)

export { IconSelectorWithPositionField }
