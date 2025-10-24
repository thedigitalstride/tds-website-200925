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
        formatOptions: {
          format: 'webp',
          options: {
            quality: 85,
            effort: 4,
          },
        },
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
        formatOptions: {
          format: 'webp',
          options: { quality: 85, effort: 4 },
        },
        admin: {
          disableGroupBy: true,
          disableListFilter: true,
        },
      },
      {
        name: 'card-mobile',
        width: 400,
        // Optimized for mobile carousel cards (typically ~160px displayed width at 2x DPR)
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: { quality: 85, effort: 4 },
        },
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
        formatOptions: {
          format: 'webp',
          options: { quality: 85, effort: 4 },
        },
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
        formatOptions: {
          format: 'webp',
          options: { quality: 85, effort: 4 },
        },
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
        formatOptions: {
          format: 'webp',
          options: { quality: 85, effort: 4 },
        },
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
        formatOptions: {
          format: 'webp',
          options: { quality: 85, effort: 4 },
        },
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
        formatOptions: {
          format: 'webp',
          options: { quality: 85, effort: 4 },
        },
        admin: {
          disableGroupBy: true,
          disableListColumn: true,
          disableListFilter: true,
        },
      },
    ],
    // Sharp processing options for optimal image delivery
    // IMPORTANT: These only work when clientUploads is FALSE in payload.config.ts
    // WebP conversion with quality optimization
    formatOptions: {
      format: 'webp',
      options: {
        quality: 85, // Good balance between quality and file size
        effort: 4, // WebP compression effort (0-6, higher = better compression but slower)
      },
    },
    // Resize options applied to original uploaded file
    resizeOptions: {
      fit: 'inside', // Preserve aspect ratio, fit within dimensions
      withoutEnlargement: true, // Don't upscale smaller images
    },
  },
  // Sanitize filenames
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
