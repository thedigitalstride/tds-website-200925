import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateNotFound } from './hooks/revalidateNotFound'

export const NotFound: GlobalConfig = {
  slug: 'notFound',
  label: '404 Page',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: '404',
      admin: {
        description: 'Main heading displayed on the 404 page',
      },
    },
    {
      name: 'subheading',
      type: 'textarea',
      required: false,
      defaultValue: 'This page could not be found.',
      admin: {
        description: 'Subheading text displayed below the main heading',
        rows: 3,
      },
    },
    link({
      enableUUIButton: true,
      uuiColors: ['primary', 'primary-reversed', 'accent', 'secondary', 'tertiary', 'outline', 'link'],
      uuiSizes: ['sm', 'md', 'lg', 'xl'],
      defaultUUIColor: 'primary',
      defaultUUISize: 'md',
      overrides: {
        admin: {
          description: 'Link to help users navigate back (typically to the home page)',
        },
      },
    }),
  ],
  hooks: {
    afterChange: [revalidateNotFound],
  },
  admin: {
    group: 'Settings',
  },
}
