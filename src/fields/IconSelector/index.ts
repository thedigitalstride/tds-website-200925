import type { Field } from 'payload'
import { IconSelectorField } from './Field'

export const iconSelectorField = (overrides?: Partial<Field>): Field => ({
  name: 'icon',
  type: 'relationship',
  relationTo: 'icons',
  required: false,
  admin: {
    description: 'Select an icon from the Icons collection',
    components: {
      Field: IconSelectorField,
    },
  },
  ...overrides,
})

export { IconSelectorField }
