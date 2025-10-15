import type { CollectionConfig } from 'payload'

import { richTextEditorMinimal } from '@/fields/richTextWithButtons'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  // Optimize relationship fields by only populating essential data
  defaultPopulate: {
    alt: true,
    url: true,
    filename: true,
    mimeType: true,
    width: true,
    height: true,
    sizes: true,
    updatedAt: true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      // Note: Not using required: true to allow existing media without alt text
      // Validation handled in admin field validation instead
      admin: {
        description: 'Alt text is required for accessibility. Describe the image for screen readers.',
      },
      validate: (value: string | null | undefined, options: { operation?: string }) => {
        // Only require alt text for new uploads (create operation)
        // Allow existing media without alt text to remain valid
        if (options?.operation === 'create' && !value) {
          return 'Alt text is required for accessibility'
        }
        return true
      },
    },
    {
      name: 'caption',
      type: 'richText',
      editor: richTextEditorMinimal(),
    },
  ],
  upload: {
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    // Restrict to image files only
    mimeTypes: ['image/*'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        // Preserve aspect ratio for thumbnails
        position: 'centre',
        admin: {
          // Keep thumbnail visible in admin for preview
        },
      },
      {
        name: 'square',
        width: 500,
        height: 500,
        fit: 'cover', // Crop to fit square dimensions
        position: 'centre',
        admin: {
          disableGroupBy: true,
          disableListFilter: true,
        },
      },
      {
        name: 'small',
        width: 600,
        // Preserve aspect ratio
        position: 'centre',
        admin: {
          disableGroupBy: true,
          disableListFilter: true,
        },
      },
      {
        name: 'medium',
        width: 900,
        // Preserve aspect ratio
        position: 'centre',
        admin: {
          disableGroupBy: true,
          disableListFilter: true,
        },
      },
      {
        name: 'large',
        width: 1400,
        // Preserve aspect ratio
        position: 'centre',
        admin: {
          disableGroupBy: true,
          disableListFilter: true,
        },
      },
      {
        name: 'xlarge',
        width: 1920,
        // Preserve aspect ratio
        position: 'centre',
        admin: {
          disableGroupBy: true,
          disableListFilter: true,
        },
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        fit: 'cover', // Crop to fit OG dimensions
        position: 'centre',
        admin: {
          disableGroupBy: true,
          disableListColumn: true,
          disableListFilter: true,
        },
      },
    ],
    // WebP format optimization for better performance
    formatOptions: {
      format: 'webp',
      options: {
        quality: 85,
      },
    },
  },
  // Sanitize filenames and add validation
  hooks: {
    beforeOperation: [
      ({ req, operation }) => {
        if ((operation === 'create' || operation === 'update') && req.file) {
          // Sanitize filename: remove special characters, replace spaces with hyphens
          const filename = req.file.name
          const sanitized = filename
            .toLowerCase()
            .replace(/[^a-z0-9.]/g, '-') // Replace non-alphanumeric with hyphens
            .replace(/-+/g, '-') // Replace multiple hyphens with single
            .replace(/^-|-$/g, '') // Remove leading/trailing hyphens

          req.file.name = sanitized
        }
      },
    ],
  },
}
