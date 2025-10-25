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
          label: 'SEO Meta Generation',
          description: 'Configure AI-powered SEO meta title and description generation',
          fields: [
            {
              name: 'seoMeta',
              type: 'group',
              label: 'SEO Meta Settings',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  label: 'Enable SEO Meta Generation',
                  defaultValue: false,
                  admin: {
                    description:
                      'Enable AI generation buttons for meta titles and descriptions in Pages and Posts',
                  },
                },
                {
                  type: 'collapsible',
                  label: 'Meta Title Settings',
                  admin: {
                    initCollapsed: false,
                    condition: (_, siblingData) => siblingData?.enabled === true,
                  },
                  fields: [
                    {
                      name: 'titleSystemPrimer',
                      type: 'textarea',
                      label: 'Title Generation Primer',
                      defaultValue:
                        'Generate an SEO-optimized page title under 60 characters that includes target keywords naturally near the beginning. Focus on user search intent, make it compelling for click-through, and ensure it accurately represents the page content. Use title case or sentence case consistently. Include brand name when appropriate (typically at the end after a separator). Avoid keyword stuffing and generic phrases.',
                      required: true,
                      admin: {
                        description:
                          'The instruction prompt for AI title generation. Customize to match your brand voice and SEO strategy.',
                        rows: 6,
                      },
                    },
                    {
                      name: 'titleMaxLength',
                      type: 'number',
                      label: 'Maximum Title Length',
                      defaultValue: 60,
                      min: 50,
                      max: 70,
                      admin: {
                        description:
                          'Maximum character length for meta titles. Google typically displays 50-60 characters.',
                      },
                    },
                    {
                      name: 'includeBrandInTitle',
                      type: 'checkbox',
                      label: 'Auto-append Brand Name',
                      defaultValue: true,
                      admin: {
                        description:
                          'Automatically include " | The Digital Stride" at the end of generated titles',
                      },
                    },
                  ],
                },
                {
                  type: 'collapsible',
                  label: 'Meta Description Settings',
                  admin: {
                    initCollapsed: false,
                    condition: (_, siblingData) => siblingData?.enabled === true,
                  },
                  fields: [
                    {
                      name: 'descriptionSystemPrimer',
                      type: 'textarea',
                      label: 'Description Generation Primer',
                      defaultValue:
                        'Generate an SEO-optimized meta description between 150-160 characters that includes target keywords naturally. Write compelling copy that encourages clicks and clearly communicates the page value. Include a call-to-action when appropriate. Focus on benefits and outcomes for the user. Be specific and accurate - avoid vague or generic descriptions. Make it readable and natural, not just a keyword list.',
                      required: true,
                      admin: {
                        description:
                          'The instruction prompt for AI description generation. Customize for your target audience and goals.',
                        rows: 6,
                      },
                    },
                    {
                      name: 'descriptionMinLength',
                      type: 'number',
                      label: 'Minimum Description Length',
                      defaultValue: 150,
                      min: 120,
                      max: 160,
                      admin: {
                        description:
                          'Minimum character length for optimal SERP display. 150 is recommended.',
                      },
                    },
                    {
                      name: 'descriptionMaxLength',
                      type: 'number',
                      label: 'Maximum Description Length',
                      defaultValue: 160,
                      min: 155,
                      max: 180,
                      admin: {
                        description:
                          'Maximum character length. Google typically displays up to 160 characters.',
                      },
                    },
                  ],
                },
                {
                  type: 'collapsible',
                  label: 'Content Analysis Settings',
                  admin: {
                    initCollapsed: true,
                    condition: (_, siblingData) => siblingData?.enabled === true,
                  },
                  fields: [
                    {
                      name: 'analyzeFullContent',
                      type: 'checkbox',
                      label: 'Analyze Full Page Content',
                      defaultValue: true,
                      admin: {
                        description:
                          'Read and analyze all page blocks or post content to extract key themes and topics',
                      },
                    },
                    {
                      name: 'contentWeight',
                      type: 'select',
                      label: 'Content vs Keywords Priority',
                      defaultValue: 'balanced',
                      options: [
                        {
                          label: 'Prioritize Keywords',
                          value: 'keywords',
                        },
                        {
                          label: 'Balanced',
                          value: 'balanced',
                        },
                        {
                          label: 'Prioritize Content',
                          value: 'content',
                        },
                      ],
                      admin: {
                        description:
                          'How to balance user-provided keywords vs content-extracted themes',
                      },
                    },
                    {
                      name: 'extractKeyThemes',
                      type: 'checkbox',
                      label: 'Extract Key Themes Automatically',
                      defaultValue: true,
                      admin: {
                        description:
                          'Use AI to identify and extract main themes from content automatically',
                      },
                    },
                    {
                      name: 'maxContentTokens',
                      type: 'number',
                      label: 'Max Content Analysis Tokens',
                      defaultValue: 2000,
                      min: 500,
                      max: 5000,
                      admin: {
                        description:
                          'Maximum tokens to send to AI for content analysis (higher = more context but higher cost)',
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
