import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'nickname',
      type: 'text',
      admin: {
        description: 'Display name for public content (e.g., blog posts)',
      },
    },
    {
      name: 'role',
      type: 'text',
      admin: {
        description: 'Job title or role (e.g., "Product Manager", "Frontend Engineer")',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Profile picture for contributor listings',
      },
    },
  ],
  timestamps: true,
}
