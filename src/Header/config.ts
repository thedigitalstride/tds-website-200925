import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { iconSelectorField } from '@/fields/IconSelector'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation Items',
      fields: [
        link({
          appearances: false,
          overrides: {
            admin: {
              description: 'Main navigation item. URL is optional when dropdown menu is enabled (label still required for dropdown trigger text).',
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
              {
                type: 'row',
                fields: [
                  {
                    name: 'reference',
                    type: 'relationship',
                    admin: {
                      condition: (_, siblingData) => siblingData?.type === 'reference',
                      width: '50%',
                    },
                    label: 'Document to link to',
                    relationTo: ['pages', 'posts'],
                    required: false, // Optional when dropdown exists
                  },
                  {
                    name: 'url',
                    type: 'text',
                    admin: {
                      condition: (_, siblingData) => siblingData?.type === 'custom',
                      width: '50%',
                    },
                    label: 'Custom URL',
                    required: false, // Optional when dropdown exists
                  },
                  {
                    name: 'label',
                    type: 'text',
                    admin: {
                      width: '50%',
                    },
                    label: 'Label',
                    required: true, // Always required for dropdown trigger text
                  },
                ],
              },
            ],
          },
        }),
        {
          name: 'hasDropdown',
          type: 'checkbox',
          label: 'Has Dropdown Menu',
          admin: {
            description: 'Enable to show dropdown menu for this navigation item',
          },
        },
        {
          name: 'dropdownItems',
          type: 'array',
          label: 'Dropdown Menu Items',
          fields: [
            link({
              appearances: false,
            }),
            {
              name: 'description',
              type: 'text',
              label: 'Description',
              admin: {
                description: 'Brief description that appears below the link text',
              },
            },
            iconSelectorField({
              name: 'icon',
              required: false,
              admin: {
                description: 'Select an icon to display next to the dropdown item',
              },
            }),
          ],
          maxRows: 10,
          admin: {
            condition: (_, siblingData) => siblingData?.hasDropdown === true,
            description: 'Links that appear in the dropdown menu',
            initCollapsed: true,
            components: {
              RowLabel: '@/Header/admin/DropdownRowLabel#DropdownRowLabel',
            },
          },
        },
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/admin/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'ctaButton',
      type: 'group',
      label: 'CTA Button',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Show CTA Button',
          defaultValue: true,
          admin: {
            description: 'Toggle to show/hide the call-to-action button',
          },
        },
        link({
          appearances: false,
          enableUUIButton: true,
          uuiColors: ['primary', 'primary-reversed', 'accent', 'secondary', 'tertiary', 'link'],
          uuiSizes: ['sm', 'md', 'lg', 'xl'],
          defaultUUIColor: 'primary',
          defaultUUISize: 'sm',
        }),
      ],
      admin: {
        description: 'Call-to-action button that appears on the right side of the header',
      },
    },
    {
      name: 'mobileCtaButton',
      type: 'group',
      label: 'Mobile CTA Button (Optional)',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Use Custom Mobile CTA',
          defaultValue: false,
          admin: {
            description: 'Enable to customize the mobile header button. If disabled, the desktop CTA button will be used on mobile.',
          },
        },
        link({
          appearances: false,
          enableUUIButton: true,
          uuiColors: ['primary', 'primary-reversed', 'accent', 'secondary', 'tertiary', 'link'],
          uuiSizes: ['sm', 'md', 'lg', 'xl'],
          defaultUUIColor: 'primary',
          defaultUUISize: 'sm',
          overrides: {
            admin: {
              condition: (_, siblingData) => siblingData?.enabled === true,
            },
          },
        }),
      ],
      admin: {
        description: 'Optional mobile-specific CTA button that appears in the mobile header bar (centered between logo and menu button). If not enabled, falls back to the desktop CTA button.',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
