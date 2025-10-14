import type { Field, GroupField } from 'payload'

import deepMerge from '@/utilities/deepMerge'

// UntitledUI Button Color Variants
export type UUIButtonColors =
  | 'primary'
  | 'accent'
  | 'secondary'
  | 'tertiary'
  | 'link'
  | 'primary-destructive'
  | 'secondary-destructive'
  | 'tertiary-destructive'
  | 'link-destructive'

// UntitledUI Button Size Variants
export type UUIButtonSizes = 'sm' | 'md' | 'lg' | 'xl'

// Legacy appearance types - DEPRECATED (use UUI colors instead)
// Kept for backward compatibility but no longer rendered
export type LinkAppearances = 'default' | 'outline'

// UntitledUI Color Options
export const uuiColorOptions: Record<UUIButtonColors, { label: string; value: string; description?: string }> = {
  primary: {
    label: 'Brand',
    value: 'primary',
    description: 'Dark blue brand button for primary CTAs'
  },
  accent: {
    label: 'Accent',
    value: 'accent',
    description: 'Light blue accent button for secondary actions'
  },
  secondary: {
    label: 'Secondary',
    value: 'secondary',
    description: 'Subtle button with border and light background'
  },
  tertiary: {
    label: 'Tinted',
    value: 'tertiary',
    description: 'Minimal button with no background'
  },
  link: {
    label: 'Link',
    value: 'link',
    description: 'Text link with underline (brand blue in light mode, white in dark mode)'
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
  appearances?: LinkAppearances[] | false // DEPRECATED: Use UUI colors instead
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
  appearances, // DEPRECATED: Ignored when enableUUIButton is true
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

  // DEPRECATED: Appearance field removed in favor of UUI button colors
  // Only add appearance field for non-UUI buttons for backward compatibility
  if (appearances !== false && !enableUUIButton) {
    const legacyAppearanceOptions = [
      { label: 'Default', value: 'default' },
      { label: 'Outline', value: 'outline' }
    ]

    linkResult.fields.push({
      name: 'appearance',
      type: 'select',
      admin: {
        description: 'Choose how the link should be rendered. (Legacy - consider using UUI button styling)',
      },
      defaultValue: 'default',
      options: legacyAppearanceOptions,
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

    // Add icon configuration for buttons
    linkResult.fields.push({
      type: 'row',
      fields: [
        {
          name: 'buttonIcon',
          type: 'text',
          label: 'Button Icon',
          admin: {
            description: 'Optional icon name from @untitledui/icons (e.g., "ArrowRight", "Download01", "ExternalLink01"). Case-sensitive. Browse all icons at: https://icons.untitledui.com',
            placeholder: 'ArrowRight',
            width: '50%',
          },
        },
        {
          name: 'iconPos',
          type: 'select',
          label: 'Icon Position',
          defaultValue: 'trailing',
          options: [
            { label: 'Before Text (Leading)', value: 'leading' },
            { label: 'After Text (Trailing)', value: 'trailing' },
          ],
          admin: {
            description: 'Position of the icon relative to the button text',
            width: '50%',
            condition: (_, siblingData) => !!siblingData?.buttonIcon,
          },
        },
      ],
    })
  }

  return deepMerge(linkResult, overrides)
}
