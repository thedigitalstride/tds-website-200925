import type { CollectionConfig } from 'payload'

export const Accounts: CollectionConfig = {
  slug: 'accounts',
  admin: {
    useAsTitle: 'provider',
    defaultColumns: ['provider', 'user', 'createdAt'],
    group: 'Settings',
    hidden: ({ user }) => user?.role !== 'admin', // Only admins can see
  },
  fields: [
    {
      name: 'sub',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'OAuth subject identifier (unique across all providers)',
      },
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        description: 'The user this account belongs to',
      },
    },
    {
      name: 'provider',
      type: 'text',
      admin: {
        description: 'OAuth provider (e.g., "google", "github")',
      },
    },
    {
      name: 'providerAccountId',
      type: 'text',
      admin: {
        description: 'Unique ID from the OAuth provider',
      },
    },
    {
      name: 'issuerName',
      type: 'text',
      admin: {
        description: 'OAuth issuer name',
      },
    },
    {
      name: 'name',
      type: 'text',
      admin: {
        description: 'User name from OAuth provider',
      },
    },
    {
      name: 'email',
      type: 'text',
      admin: {
        description: 'Email from OAuth provider',
      },
    },
    {
      name: 'picture',
      type: 'text',
      admin: {
        description: 'Profile picture URL from OAuth provider',
      },
    },
    {
      name: 'access_token',
      type: 'text',
      admin: {
        description: 'OAuth access token (encrypted)',
        readOnly: true,
      },
    },
    {
      name: 'refresh_token',
      type: 'text',
      admin: {
        description: 'OAuth refresh token (encrypted)',
        readOnly: true,
      },
    },
    {
      name: 'expires_at',
      type: 'number',
      admin: {
        description: 'Token expiry timestamp',
        readOnly: true,
      },
    },
    {
      name: 'token_type',
      type: 'text',
      admin: {
        description: 'Token type (usually "Bearer")',
        readOnly: true,
      },
    },
    {
      name: 'scope',
      type: 'text',
      admin: {
        description: 'OAuth scopes granted',
        readOnly: true,
      },
    },
    {
      name: 'id_token',
      type: 'text',
      admin: {
        description: 'OpenID Connect ID token',
        readOnly: true,
      },
    },
    {
      name: 'oauth_password',
      type: 'text',
      admin: {
        description: 'Random password for OAuth users (internal use only)',
        readOnly: true,
        hidden: true, // Hidden from admin UI for security
      },
    },
  ],
  access: {
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      // Users can only read their own accounts
      return { user: { equals: user?.id } }
    },
    create: () => false, // Only created by auth system
    update: () => false, // Not editable
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  timestamps: true,
}
