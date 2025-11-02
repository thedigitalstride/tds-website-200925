import type { Block, TextFieldSingleValidation } from 'payload'
import {
  lexicalEditor,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  LinkFeature,
  ParagraphFeature,
  UnorderedListFeature,
  OrderedListFeature,
  ChecklistFeature,
  HeadingFeature,
  AlignFeature,
  IndentFeature,
  BlockquoteFeature,
  HorizontalRuleFeature,
  BlocksFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  type LinkFields,
} from '@payloadcms/richtext-lexical'

import { ButtonBlock } from '@/blocks/ButtonBlock/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'

/**
 * Consolidated rich text editor with all official Payload features
 *
 * This is the single source of truth for all richText fields across the site.
 * It includes all official Payload features following best practices.
 *
 * Features:
 * - Basic formatting: Bold, Italic, Underline, Strikethrough, Subscript, Superscript
 * - Links with custom validation and enabledCollections
 * - Lists: Unordered, Ordered, Checklist
 * - Headings: H1-H6
 * - Alignment: Left, Center, Right, Justify
 * - Indentation: Indent/outdent
 * - Block elements: BlockQuote, HorizontalRule
 * - Custom blocks: MediaBlock, ButtonBlock (always included)
 * - Toolbars: Fixed and Inline
 *
 * Use cases:
 * - Blog post content
 * - Page content blocks
 * - FAQ answers
 * - Media captions
 * - All rich text content across the site
 *
 * @param options.additionalBlocks - Additional custom blocks to include beyond MediaBlock and ButtonBlock
 */
export const richText = (options?: {
  additionalBlocks?: Block[]
}) => lexicalEditor({
  features: ({ rootFeatures }) => {
    return [
      // Basic text formatting
      ParagraphFeature(),
      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      StrikethroughFeature(),
      SubscriptFeature(),
      SuperscriptFeature(),

      // Links with custom validation
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

      // Lists
      UnorderedListFeature(),
      OrderedListFeature(),
      ChecklistFeature(),

      // Headings (all sizes)
      HeadingFeature({
        enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      }),

      // Alignment
      AlignFeature(),

      // Indentation
      IndentFeature(),

      // Block elements
      BlockquoteFeature(),
      HorizontalRuleFeature(),

      // Custom blocks (MediaBlock and ButtonBlock always included, plus any additional)
      BlocksFeature({
        blocks: [MediaBlock, ButtonBlock, ...(options?.additionalBlocks || [])],
      }),

      // Toolbars (add last so they can detect all content features)
      FixedToolbarFeature(),
      InlineToolbarFeature(),
    ]
  },
})
