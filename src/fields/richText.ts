import type { Block } from 'payload'
import {
  lexicalEditor,
  // Text Formatting
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,
  InlineCodeFeature,
  SubscriptFeature,
  SuperscriptFeature,
  // Structure
  ParagraphFeature,
  HeadingFeature,
  // Lists
  OrderedListFeature,
  UnorderedListFeature,
  ChecklistFeature,
  // Block elements
  BlockquoteFeature,
  HorizontalRuleFeature,
  // Interactive
  LinkFeature,
  // Toolbars
  InlineToolbarFeature,
  FixedToolbarFeature,
  // Custom blocks
  BlocksFeature,
} from '@payloadcms/richtext-lexical'

import { ButtonBlock } from '@/blocks/ButtonBlock/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { TextSizeFeature } from '@/features/textSize/feature.server'

/**
 * Consolidated rich text editor with explicit feature configuration
 *
 * This is the single source of truth for all richText fields across the site.
 * Uses explicit feature list instead of defaultFeatures to ensure full control
 * and avoid circular dependency issues with payload.config.ts editor setting.
 *
 * Features included:
 * - Text formatting: Bold, Italic, Underline, Strikethrough, InlineCode, Subscript, Superscript
 * - Text sizing: Normal, Large Text, Small, Lead Paragraph (via custom TextSizeFeature)
 * - Structure: Paragraphs, Headings (H1-H6)
 * - Lists: Unordered, Ordered, Checklist
 * - Block elements: BlockQuote, HorizontalRule
 * - Links: Internal (pages, posts) and external
 * - Toolbars: Fixed (main) and Inline (on text selection)
 * - Custom blocks: MediaBlock, ButtonBlock, plus any additional
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
  features: () => [
    // Text Formatting
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    StrikethroughFeature(),
    InlineCodeFeature(),
    SubscriptFeature(),
    SuperscriptFeature(),

    // Structure
    ParagraphFeature(),
    HeadingFeature({
      enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    }),

    // Lists
    OrderedListFeature(),
    UnorderedListFeature(),
    ChecklistFeature(),

    // Block elements
    BlockquoteFeature(),
    HorizontalRuleFeature(),

    // Interactive
    LinkFeature({
      enabledCollections: ['pages', 'posts'],
    }),

    // Custom Features
    TextSizeFeature(),

    // Toolbars
    InlineToolbarFeature(),
    FixedToolbarFeature(),

    // Custom blocks (MediaBlock and ButtonBlock always included, plus any additional)
    BlocksFeature({
      blocks: [MediaBlock, ButtonBlock, ...(options?.additionalBlocks || [])],
    }),
  ],
})
