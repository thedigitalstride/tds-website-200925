import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
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
            {
              name: 'icon',
              type: 'select',
              label: 'Icon',
              options: [
                { label: 'Trend Up', value: 'TrendUp01' },
                { label: 'Users', value: 'Users01' },
                { label: 'Search', value: 'SearchLg' },
                { label: 'Mail', value: 'Mail01' },
                { label: 'Info Circle', value: 'InfoCircle' },
                { label: 'Briefcase', value: 'Briefcase01' },
                { label: 'File', value: 'File01' },
                { label: 'Chart', value: 'BarChart01' },
                { label: 'Globe', value: 'Globe01' },
                { label: 'Settings', value: 'Settings01' },
                { label: 'Target', value: 'Target01' },
                { label: 'Star', value: 'Star01' },
                { label: 'Shield', value: 'Shield01' },
                { label: 'Code', value: 'Code01' },
              ],
              admin: {
                description: 'Icon that appears next to the dropdown item',
              },
            },
          ],
          maxRows: 10,
          admin: {
            condition: (_, siblingData) => siblingData?.hasDropdown === true,
            description: 'Links that appear in the dropdown menu',
            initCollapsed: true,
            components: {
              RowLabel: '@/Header/DropdownRowLabel#DropdownRowLabel',
            },
          },
        },
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
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
          uuiColors: ['primary', 'secondary', 'tertiary'],
          uuiSizes: ['sm', 'md', 'lg'],
          defaultUUIColor: 'primary',
          defaultUUISize: 'sm',
        }),
      ],
      admin: {
        description: 'Call-to-action button that appears on the right side of the header',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
