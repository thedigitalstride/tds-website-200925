import type { Field } from 'payload'
import { IconSelectorField } from './Field'

export const iconSelectorField = (overrides?: Partial<Field>): Field => ({
  name: 'icon',
  type: 'relationship',
  relationTo: 'icons' as const,
  required: false,
  admin: {
    description: 'Select an icon from the Icons collection',
    components: {
      Field: IconSelectorField,
    },
  },
  ...overrides,
} as Field)

export { IconSelectorField }
