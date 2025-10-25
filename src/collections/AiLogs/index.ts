/**
 * AI Logs Collection
 * Tracks all AI API calls for cost monitoring and auditing
 */

import type { CollectionConfig } from 'payload'

export const AiLogs: CollectionConfig = {
  slug: 'ai-logs',
  labels: {
    singular: 'AI Log',
    plural: 'AI Logs',
  },
  admin: {
    useAsTitle: 'operation',
    defaultColumns: ['operation', 'provider', 'model', 'cost', 'tokensUsed', 'success', 'createdAt'],
    description: 'Audit trail of AI API usage with cost tracking',
    group: 'Admin',
  },
  access: {
    read: ({ req: { user } }) => !!user, // Only logged-in users
    create: () => true, // Allow system to create logs
    update: () => false, // Never allow updates
    delete: ({ req: { user } }) => !!user, // Only admins can delete
  },
  fields: [
    {
      name: 'operation',
      type: 'select',
      required: true,
      options: [
        {
          label: 'ALT Tag Generation',
          value: 'alt-tag',
        },
        {
          label: 'SEO Title Generation',
          value: 'seo-title',
        },
        {
          label: 'SEO Description Generation',
          value: 'seo-description',
        },
        {
          label: 'Content Generation',
          value: 'content',
        },
        {
          label: 'Other',
          value: 'other',
        },
      ],
      admin: {
        description: 'Type of AI operation performed',
      },
    },
    {
      name: 'provider',
      type: 'text',
      required: true,
      admin: {
        description: 'AI provider used (OpenAI, Anthropic, etc.)',
      },
    },
    {
      name: 'model',
      type: 'text',
      required: true,
      admin: {
        description: 'Model used for generation',
      },
    },
    {
      name: 'success',
      type: 'checkbox',
      required: true,
      defaultValue: true,
      admin: {
        description: 'Whether the operation succeeded',
      },
    },
    {
      name: 'tokensUsed',
      type: 'number',
      admin: {
        description: 'Total tokens consumed',
      },
    },
    {
      name: 'cost',
      type: 'number',
      required: true,
      admin: {
        description: 'Estimated cost in USD',
        // Format as currency
        components: {
          Field: '@/components/AiLogs/CostField',
        },
      },
    },
    {
      name: 'duration',
      type: 'number',
      admin: {
        description: 'Operation duration in milliseconds',
      },
    },
    {
      name: 'imageUrl',
      type: 'text',
      admin: {
        description: 'Image URL (for ALT tag operations)',
        condition: (data) => data.operation === 'alt-tag',
      },
    },
    {
      name: 'altText',
      type: 'textarea',
      admin: {
        description: 'Generated ALT text',
        condition: (data) => data.operation === 'alt-tag',
      },
    },
    {
      name: 'seoTitle',
      type: 'text',
      admin: {
        description: 'Generated SEO title',
        condition: (data) => data.operation === 'seo-title',
      },
    },
    {
      name: 'seoDescription',
      type: 'textarea',
      admin: {
        description: 'Generated SEO description',
        condition: (data) => data.operation === 'seo-description',
      },
    },
    {
      name: 'keywords',
      type: 'array',
      admin: {
        description: 'Keywords used for SEO generation',
        condition: (data) => data.operation === 'seo-title' || data.operation === 'seo-description',
      },
      fields: [
        {
          name: 'keyword',
          type: 'text',
        },
      ],
    },
    {
      name: 'contentThemes',
      type: 'array',
      admin: {
        description: 'Key themes extracted from content',
        condition: (data) => data.operation === 'seo-title' || data.operation === 'seo-description',
      },
      fields: [
        {
          name: 'theme',
          type: 'text',
        },
      ],
    },
    {
      name: 'characterCount',
      type: 'number',
      admin: {
        description: 'Character count of generated text',
        condition: (data) => data.operation === 'seo-title' || data.operation === 'seo-description',
      },
    },
    {
      name: 'error',
      type: 'textarea',
      admin: {
        description: 'Error message if operation failed',
        condition: (data) => !data.success,
      },
    },
    {
      name: 'metadata',
      type: 'json',
      admin: {
        description: 'Additional metadata from the AI response',
      },
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        description: 'User who triggered the operation (if applicable)',
      },
    },
  ],
  timestamps: true,
}
