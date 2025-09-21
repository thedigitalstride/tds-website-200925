import type { Block } from 'payload'
import type { TextFieldSingleValidation } from 'payload'
import {
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  lexicalEditor,
  UnderlineFeature,
  BlocksFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  type LinkFields,
} from '@payloadcms/richtext-lexical'

import { ButtonBlock } from '@/blocks/ButtonBlock/config'

/**
 * Standard rich text editor with ButtonBlock and common features
 * Suitable for most content areas like blog posts, content blocks, etc.
 */
export const richTextEditor = (options?: {
  enabledHeadingSizes?: ('h1' | 'h2' | 'h3' | 'h4')[]
  additionalBlocks?: Block[]
  enableHorizontalRule?: boolean
}) => lexicalEditor({
  features: ({ rootFeatures }) => {
    const features = [
      ...rootFeatures,
      HeadingFeature({
        enabledHeadingSizes: options?.enabledHeadingSizes || ['h2', 'h3', 'h4']
      }),
      BlocksFeature({
        blocks: [ButtonBlock, ...(options?.additionalBlocks || [])]
      }),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
    ]

    // Add horizontal rule if enabled
    if (options?.enableHorizontalRule) {
      features.push(HorizontalRuleFeature())
    }

    return features
  },
})

/**
 * Full-featured rich text editor with all blocks and features
 * Suitable for main content areas like blog posts
 */
export const richTextEditorFull = (additionalBlocks: Block[] = []) => lexicalEditor({
  features: ({ rootFeatures }) => {
    return [
      ...rootFeatures,
      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
      BlocksFeature({
        blocks: [ButtonBlock, ...additionalBlocks]
      }),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
      HorizontalRuleFeature(),
    ]
  },
})

/**
 * Simple rich text editor with minimal features but includes ButtonBlock
 * Suitable for captions, short descriptions, etc.
 */
export const richTextEditorSimple = () => lexicalEditor({
  features: ({ rootFeatures }) => {
    return [
      ...rootFeatures,
      BlocksFeature({ blocks: [ButtonBlock] }),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
    ]
  },
})

/**
 * Minimal rich text editor without ButtonBlock
 * For cases where buttons are not appropriate (e.g., meta descriptions)
 */
export const richTextEditorMinimal = () => lexicalEditor({
  features: ({ rootFeatures }) => {
    return [
      ...rootFeatures,
      FixedToolbarFeature(),
      InlineToolbarFeature(),
    ]
  },
})

/**
 * Enhanced default lexical editor that includes ButtonBlock
 * This replaces the original defaultLexical with button support
 */
export const defaultLexicalWithButtons = lexicalEditor({
  features: [
    ParagraphFeature(),
    UnderlineFeature(),
    BoldFeature(),
    ItalicFeature(),
    BlocksFeature({ blocks: [ButtonBlock] }),
    LinkFeature({
      enabledCollections: ['pages', 'posts'],
      fields: ({ defaultFields }) => {
        const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
          if ('name' in field && field.name === 'url') return false
          return true
        })

        return [
          ...defaultFieldsWithoutUrl,
          {
            name: 'url',
            type: 'text',
            admin: {
              condition: (_data, siblingData) => siblingData?.linkType !== 'internal',
            },
            label: ({ t }) => t('fields:enterURL'),
            required: true,
            validate: ((value, options) => {
              if ((options?.siblingData as LinkFields)?.linkType === 'internal') {
                return true // no validation needed, as no url should exist for internal links
              }
              return value ? true : 'URL is required'
            }) as TextFieldSingleValidation,
          },
        ]
      },
    }),
  ],
})