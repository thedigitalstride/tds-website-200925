import type { ArrayField, Field } from 'payload'

import type { LinkAppearances, UUIButtonColors, UUIButtonSizes } from './link'

import deepMerge from '@/utilities/deepMerge'
import { link } from './link'

type LinkGroupType = (options?: {
  appearances?: LinkAppearances[] | false
  overrides?: Partial<ArrayField>
  // UUI Button styling options
  enableUUIButton?: boolean
  uuiColors?: UUIButtonColors[]
  uuiSizes?: UUIButtonSizes[]
  defaultUUIColor?: UUIButtonColors
  defaultUUISize?: UUIButtonSizes
}) => Field

export const linkGroup: LinkGroupType = ({
  appearances,
  overrides = {},
  enableUUIButton = false,
  uuiColors,
  uuiSizes,
  defaultUUIColor = 'primary',
  defaultUUISize = 'md'
} = {}) => {
  const generatedLinkGroup: Field = {
    name: 'links',
    type: 'array',
    fields: [
      link({
        appearances,
        enableUUIButton,
        uuiColors,
        uuiSizes,
        defaultUUIColor,
        defaultUUISize,
      }),
    ],
    admin: {
      initCollapsed: true,
    },
  }

  return deepMerge(generatedLinkGroup, overrides)
}
