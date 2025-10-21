import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'companyInfo',
      type: 'group',
      label: 'Company Information',
      fields: [
        {
          name: 'description',
          type: 'text',
          required: false,
          defaultValue: 'Happy Team, Happy Customers.',
          admin: {
            description: 'Brief company description that appears below the logo',
          },
        },
      ],
    },
    {
      name: 'navColumns',
      type: 'array',
      label: 'Navigation Columns',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: false,
          admin: {
            description: 'Column heading (e.g., "Product", "Company")',
          },
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            link({
              enableUUIButton: true,
              uuiColors: ['link'], // Link style only for footer navigation
              uuiSizes: ['sm', 'md', 'lg', 'xl'],
              defaultUUIColor: 'link',
              defaultUUISize: 'md',
              appearances: false,
            }),
            {
              name: 'badge',
              type: 'group',
              label: 'Optional Badge',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  admin: {
                    description: 'Badge text (e.g., "New", "Beta")',
                  },
                },
                {
                  name: 'color',
                  type: 'select',
                  options: [
                    { label: 'Gray', value: 'gray' },
                  ],
                  defaultValue: 'gray',
                  admin: {
                    description: 'Modern badges only support gray color',
                  },
                },
              ],
              admin: {
                description: 'Optional badge to highlight new or featured items',
              },
            },
          ],
          maxRows: 8,
          admin: {
            description: 'Links for this navigation column',
            initCollapsed: true,
            components: {
              RowLabel: '@/Footer/NavItemRowLabel#NavItemRowLabel',
            },
          },
        },
      ],
      maxRows: 5,
      admin: {
        description: 'Navigation columns (maximum 5 columns)',
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/NavColumnRowLabel#NavColumnRowLabel',
        },
      },
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Media Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: false,
          defaultValue: 'x',
          options: [
            { label: 'X (Twitter)', value: 'x' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'GitHub', value: 'github' },
            { label: 'AngelList', value: 'angellist' },
            { label: 'Dribbble', value: 'dribbble' },
            { label: 'Layers', value: 'layers' },
          ],
          admin: {
            description: 'Select the social media platform',
          },
        },
        {
          name: 'url',
          type: 'text',
          required: false,
          admin: {
            description: 'Full URL to your social media profile',
          },
        },
      ],
      maxRows: 10,
      admin: {
        description: 'Social media links that appear at the bottom',
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/SocialLinkRowLabel#SocialLinkRowLabel',
        },
      },
    },
    {
      name: 'copyrightText',
      type: 'text',
      label: 'Copyright Text',
      required: false,
      defaultValue: '© 2025 The Digital Stride, a trading name of Miromedia Limited. All rights reserved.',
      admin: {
        description: 'Copyright notice that appears at the bottom',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
