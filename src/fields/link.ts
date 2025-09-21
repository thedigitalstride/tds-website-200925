import type { Field, GroupField } from 'payload'

import deepMerge from '@/utilities/deepMerge'

// UntitledUI Button Color Variants
export type UUIButtonColors =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'link-gray'
  | 'link-color'
  | 'primary-destructive'
  | 'secondary-destructive'
  | 'tertiary-destructive'
  | 'link-destructive'

// UntitledUI Button Size Variants
export type UUIButtonSizes = 'sm' | 'md' | 'lg' | 'xl'

// Legacy appearance types for backward compatibility
export type LinkAppearances = 'default' | 'outline'

export const appearanceOptions: Record<LinkAppearances, { label: string; value: string }> = {
  default: {
    label: 'Default',
    value: 'default',
  },
  outline: {
    label: 'Outline',
    value: 'outline',
  },
}

// UntitledUI Color Options
export const uuiColorOptions: Record<UUIButtonColors, { label: string; value: string; description?: string }> = {
  primary: {
    label: 'Primary',
    value: 'primary',
    description: 'Brand colored button with strong emphasis'
  },
  secondary: {
    label: 'Secondary',
    value: 'secondary',
    description: 'Subtle button with border and light background'
  },
  tertiary: {
    label: 'Tertiary',
    value: 'tertiary',
    description: 'Minimal button with no background'
  },
  'link-gray': {
    label: 'Text Link (Gray)',
    value: 'link-gray',
    description: 'Simple text link with gray color'
  },
  'link-color': {
    label: 'Text Link (Brand)',
    value: 'link-color',
    description: 'Simple text link with brand color'
  },
  'primary-destructive': {
    label: 'Primary Destructive',
    value: 'primary-destructive',
    description: 'Red button for destructive actions'
  },
  'secondary-destructive': {
    label: 'Secondary Destructive',
    value: 'secondary-destructive',
    description: 'Outlined red button for destructive actions'
  },
  'tertiary-destructive': {
    label: 'Tertiary Destructive',
    value: 'tertiary-destructive',
    description: 'Minimal red button for destructive actions'
  },
  'link-destructive': {
    label: 'Destructive Link',
    value: 'link-destructive',
    description: 'Red text link for destructive actions'
  },
}

// UntitledUI Size Options
export const uuiSizeOptions: Record<UUIButtonSizes, { label: string; value: string }> = {
  sm: {
    label: 'Small',
    value: 'sm',
  },
  md: {
    label: 'Medium',
    value: 'md',
  },
  lg: {
    label: 'Large',
    value: 'lg',
  },
  xl: {
    label: 'Extra Large',
    value: 'xl',
  },
}

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false
  disableLabel?: boolean
  overrides?: Partial<GroupField>
  // UUI Button styling options
  enableUUIButton?: boolean
  uuiColors?: UUIButtonColors[]
  uuiSizes?: UUIButtonSizes[]
  defaultUUIColor?: UUIButtonColors
  defaultUUISize?: UUIButtonSizes
}) => Field

export const link: LinkType = ({
  appearances,
  disableLabel = false,
  overrides = {},
  enableUUIButton = false,
  uuiColors,
  uuiSizes,
  defaultUUIColor = 'primary',
  defaultUUISize = 'md'
} = {}) => {
  const linkResult: GroupField = {
    name: 'link',
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            defaultValue: 'reference',
            options: [
              {
                label: 'Internal link',
                value: 'reference',
              },
              {
                label: 'Custom URL',
                value: 'custom',
              },
            ],
          },
          {
            name: 'newTab',
            type: 'checkbox',
            admin: {
              style: {
                alignSelf: 'flex-end',
              },
              width: '50%',
            },
            label: 'Open in new tab',
          },
        ],
      },
    ],
  }

  const linkTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
      label: 'Document to link to',
      relationTo: ['pages', 'posts'],
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
      label: 'Custom URL',
      required: true,
    },
  ]

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: '50%',
      },
    }))

    linkResult.fields.push({
      type: 'row',
      fields: [
        ...linkTypes,
        {
          name: 'label',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Label',
          required: true,
        },
      ],
    })
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes]
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [appearanceOptions.default, appearanceOptions.outline]

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance])
    }

    linkResult.fields.push({
      name: 'appearance',
      type: 'select',
      admin: {
        description: 'Choose how the link should be rendered.',
      },
      defaultValue: 'default',
      options: appearanceOptionsToUse,
    })
  }

  // Add UUI Button styling options if enabled
  if (enableUUIButton) {
    let colorOptionsToUse = Object.values(uuiColorOptions)
    let sizeOptionsToUse = Object.values(uuiSizeOptions)

    if (uuiColors) {
      colorOptionsToUse = uuiColors.map((color) => uuiColorOptions[color])
    }

    if (uuiSizes) {
      sizeOptionsToUse = uuiSizes.map((size) => uuiSizeOptions[size])
    }

    linkResult.fields.push({
      type: 'row',
      fields: [
        {
          name: 'uuiColor',
          type: 'select',
          admin: {
            description: 'Button color variant from UntitledUI design system',
            width: '50%',
          },
          defaultValue: defaultUUIColor,
          label: 'Button Style',
          options: colorOptionsToUse,
        },
        {
          name: 'uuiSize',
          type: 'select',
          admin: {
            description: 'Button size variant',
            width: '50%',
          },
          defaultValue: defaultUUISize,
          label: 'Button Size',
          options: sizeOptionsToUse,
        },
      ],
    })
  }

  return deepMerge(linkResult, overrides)
}
