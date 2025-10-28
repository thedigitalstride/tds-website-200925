import type { Field } from 'payload'

export const iconSelectorField = (overrides?: Partial<Field>): Field => ({
  name: 'icon',
  type: 'relationship',
  relationTo: 'icons',
  required: false,
  admin: {
    description: 'Select an icon from the Icons collection',
  },
  ...overrides,
})
