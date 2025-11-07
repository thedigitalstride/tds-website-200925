import type { Block } from 'payload'
import {
  lexicalEditor,
  ParagraphFeature,
  HeadingFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,
  InlineCodeFeature,
  SubscriptFeature,
  SuperscriptFeature,
  LinkFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  OrderedListFeature,
  UnorderedListFeature,
  ChecklistFeature,
  BlockquoteFeature,
  HorizontalRuleFeature,
  UploadFeature,
  BlocksFeature,
} from '@payloadcms/richtext-lexical'
import { TextSizeFeature } from '@/features/textSize/feature.server'
import { ButtonBlock } from '@/blocks/ButtonBlock/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'

/**
 * Complete rich text configuration with all standard features
 * Note: Text color feature via plugin is not compatible with current Payload version
 * Using TextSizeFeature which is working correctly
 */
export const richText = (options?: {
  additionalBlocks?: Block[]
}) => lexicalEditor({
  features: () => {
    return [
      // Structure
      ParagraphFeature(),
      HeadingFeature({
        enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      }),

      // Text formatting
      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      StrikethroughFeature(),
      InlineCodeFeature(),
      SubscriptFeature(),
      SuperscriptFeature(),

      // Lists
      OrderedListFeature(),
      UnorderedListFeature(),
      ChecklistFeature(),

      // Block elements
      BlockquoteFeature(),
      HorizontalRuleFeature(),

      // Links
      LinkFeature({
        enabledCollections: ['pages', 'posts'],
      }),

      // Upload
      UploadFeature(),

      // Toolbars
      FixedToolbarFeature(),
      InlineToolbarFeature(),

      // Custom features
      TextSizeFeature(),

      // Custom blocks
      BlocksFeature({
        blocks: [MediaBlock, ButtonBlock, ...(options?.additionalBlocks || [])],
      }),
    ]
  },
})
