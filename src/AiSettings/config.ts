import type { GlobalConfig } from 'payload'

export const AiSettings: GlobalConfig = {
  slug: 'aiSettings',
  label: 'AI Settings',
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Provider Configuration',
          description: 'Configure your AI/LLM provider credentials and settings',
          fields: [
            {
              name: 'provider',
              type: 'select',
              label: 'AI Provider',
              defaultValue: 'openai',
              required: true,
              options: [
                {
                  label: 'OpenAI (GPT-4o Vision)',
                  value: 'openai',
                },
                {
                  label: 'Anthropic (Claude - Coming Soon)',
                  value: 'anthropic',
                },
                {
                  label: 'Custom Endpoint',
                  value: 'custom',
                },
              ],
              admin: {
                description: 'Select your preferred AI provider for content generation',
              },
            },
            {
              name: 'apiKey',
              type: 'text',
              label: 'API Key',
              required: true,
              admin: {
                description:
                  'Your API key for the selected provider. This will be stored securely.',
                placeholder: 'sk-...',
                components: {
                  Field: {
                    path: '@/components/AiSettings/EncryptedField',
                  },
                },
              },
            },
            {
              name: 'model',
              type: 'text',
              label: 'Model Name',
              defaultValue: 'gpt-4o',
              admin: {
                description:
                  'The specific model to use (e.g., gpt-4o, gpt-4o-mini, claude-3-5-sonnet)',
                condition: (_, siblingData) => siblingData?.provider !== 'custom',
              },
            },
            {
              name: 'customEndpoint',
              type: 'text',
              label: 'Custom API Endpoint',
              admin: {
                description:
                  'Full URL to your custom API endpoint (for self-hosted or alternative providers)',
                placeholder: 'https://api.example.com/v1/vision',
                condition: (_, siblingData) => siblingData?.provider === 'custom',
              },
            },
            {
              type: 'collapsible',
              label: 'Advanced Settings',
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'temperature',
                  type: 'number',
                  label: 'Temperature',
                  defaultValue: 0.3,
                  min: 0,
                  max: 2,
                  admin: {
                    description:
                      'Controls randomness. Lower values (0.0-0.5) are more focused and deterministic, higher values (0.5-2.0) are more creative.',
                    step: 0.1,
                  },
                },
                {
                  name: 'maxTokens',
                  type: 'number',
                  label: 'Max Tokens',
                  defaultValue: 150,
                  min: 50,
                  max: 500,
                  admin: {
                    description: 'Maximum length of AI responses in tokens',
                  },
                },
                {
                  name: 'timeout',
                  type: 'number',
                  label: 'Request Timeout (seconds)',
                  defaultValue: 30,
                  min: 10,
                  max: 120,
                  admin: {
                    description: 'How long to wait for AI responses before timing out',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'ALT Tag Generator',
          description: 'Configure automatic ALT tag generation for images',
          fields: [
            {
              name: 'altTag',
              type: 'group',
              label: 'ALT Tag Settings',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  label: 'Enable Automatic ALT Tag Generation',
                  defaultValue: false,
                  admin: {
                    description:
                      'Automatically generate ALT tags for images when uploaded without ALT text',
                  },
                },
                {
                  name: 'systemPrimer',
                  type: 'textarea',
                  label: 'System Primer',
                  defaultValue:
                    'Generate concise, SEO-optimized alt text under 125 characters. Describe key visual elements, context, and relevant details for accessibility and search engines. Focus on what is important, avoid phrases like "image of" or "picture of". Be specific and descriptive.',
                  required: true,
                  admin: {
                    description:
                      'The instruction prompt sent to the AI. Customize this to fine-tune ALT tag generation style and format.',
                    rows: 6,
                    condition: (_, siblingData) => siblingData?.enabled === true,
                  },
                },
                {
                  name: 'maxLength',
                  type: 'number',
                  label: 'Maximum ALT Text Length',
                  defaultValue: 125,
                  min: 50,
                  max: 300,
                  admin: {
                    description:
                      'Maximum character length for generated ALT text. 125 is recommended for SEO and accessibility.',
                    condition: (_, siblingData) => siblingData?.enabled === true,
                  },
                },
                {
                  name: 'includeContext',
                  type: 'checkbox',
                  label: 'Include Page Context',
                  defaultValue: false,
                  admin: {
                    description:
                      'When generating ALT tags, include context about where the image is used (page title, category, etc.)',
                    condition: (_, siblingData) => siblingData?.enabled === true,
                  },
                },
                {
                  type: 'collapsible',
                  label: 'Quality Controls',
                  admin: {
                    initCollapsed: true,
                    condition: (_, siblingData) => siblingData?.enabled === true,
                  },
                  fields: [
                    {
                      name: 'requireReview',
                      type: 'checkbox',
                      label: 'Require Human Review',
                      defaultValue: false,
                      admin: {
                        description:
                          'Mark AI-generated ALT tags for review before they are used in production',
                      },
                    },
                    {
                      name: 'fallbackToFilename',
                      type: 'checkbox',
                      label: 'Fallback to Filename',
                      defaultValue: true,
                      admin: {
                        description:
                          'Use cleaned filename as ALT text if AI generation fails',
                      },
                    },
                    {
                      name: 'logGenerations',
                      type: 'checkbox',
                      label: 'Log All Generations',
                      defaultValue: true,
                      admin: {
                        description:
                          'Keep a record of all AI-generated ALT tags for auditing and quality control',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Future AI Features',
          description: 'Placeholder for upcoming AI-powered content generation features',
          fields: [
            {
              type: 'ui',
              name: 'placeholder',
              admin: {
                components: {
                  Field: {
                    path: '@/components/AiSettings/FutureFeaturesPlaceholder',
                  },
                },
              },
            },
            {
              name: 'blogPostGeneration',
              type: 'group',
              label: 'Blog Post Generation (Coming Soon)',
              admin: {
                description: 'AI-assisted blog post creation and content generation',
              },
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  label: 'Enable (Coming Soon)',
                  defaultValue: false,
                  admin: {
                    disabled: true,
                  },
                },
              ],
            },
            {
              name: 'metaOptimization',
              type: 'group',
              label: 'Meta Description Optimization (Coming Soon)',
              admin: {
                description: 'Automatic SEO meta description generation',
              },
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  label: 'Enable (Coming Soon)',
                  defaultValue: false,
                  admin: {
                    disabled: true,
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Usage & Monitoring',
          description: 'Track AI usage, costs, and performance',
          fields: [
            {
              type: 'ui',
              name: 'usageStats',
              admin: {
                components: {
                  Field: {
                    path: '@/components/AiSettings/UsageStats',
                  },
                },
              },
            },
            {
              name: 'costTracking',
              type: 'group',
              label: 'Cost Tracking',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  label: 'Enable Cost Tracking',
                  defaultValue: false,
                  admin: {
                    description: 'Track estimated costs of AI API calls',
                  },
                },
                {
                  name: 'monthlyBudget',
                  type: 'number',
                  label: 'Monthly Budget Alert ($)',
                  admin: {
                    description:
                      'Send an alert when monthly AI costs exceed this amount',
                    condition: (_, siblingData) => siblingData?.enabled === true,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  admin: {
    group: 'Settings',
    description: 'Configure AI-powered content generation features',
  },
}
