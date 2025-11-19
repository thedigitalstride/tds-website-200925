import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    // All authenticated users can access admin
    // Domain is locked to @thedigitalstride.co.uk via Google OAuth
    // Future: Implement role-based access control (admin/editor/user)
    admin: ({ req: { user } }) => {
      return Boolean(user) // Any authenticated user can access admin
    },
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
    // OAuth-specific fields
    {
      name: 'sub',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'OAuth subject identifier (provider user ID)',
      },
    },
    {
      name: 'googleId',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Google user ID (legacy/alias for sub)',
      },
    },
    {
      name: 'picture',
      type: 'text',
      admin: {
        readOnly: true,
        condition: (data) => Boolean(data?.googleId),
        description: 'Profile picture URL from Google',
      },
    },
    {
      name: 'emailVerified',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Email verification status',
      },
    },
    {
      name: 'authProvider',
      type: 'select',
      options: [
        { label: 'Email/Password', value: 'email' },
        { label: 'Google', value: 'google' },
      ],
      defaultValue: 'email',
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Authentication method used',
      },
    },
    {
      name: 'approvalStatus',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
      defaultValue: 'approved',
      admin: {
        position: 'sidebar',
        description: 'Account approval status',
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        // Set auth provider on creation
        if (operation === 'create') {
          if (data.sub || data.googleId) {
            data.authProvider = 'google'
            data.emailVerified = true
            // Sync sub and googleId fields
            if (data.sub && !data.googleId) {
              data.googleId = data.sub
            }
            if (data.googleId && !data.sub) {
              data.sub = data.googleId
            }
            // Auto-approve Google users (change to 'pending' if you want manual approval)
            data.approvalStatus = 'approved'
          } else {
            data.authProvider = 'email'
            // Email users are auto-approved
            data.approvalStatus = 'approved'
          }
        }
        return data
      },
    ],
    afterDelete: [
      async ({ doc, req }) => {
        // Clean up linked OAuth accounts when user is deleted
        try {
          await req.payload.delete({
            collection: 'accounts' as any, // Type assertion for dynamically added collection
            where: {
              user: { equals: doc.id },
            },
          })
        } catch (_error) {
          // Silently fail if accounts collection doesn't exist yet
          req.payload.logger.warn(`Failed to delete linked accounts for user ${doc.id}`)
        }
      },
    ],
  },
  timestamps: true,
}
