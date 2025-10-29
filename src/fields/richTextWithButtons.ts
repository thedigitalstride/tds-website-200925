import type { Block } from 'payload'
import {
  lexicalEditor,
  BlocksFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  UnorderedListFeature,
  OrderedListFeature,
  ChecklistFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical'

import { ButtonBlock } from '@/blocks/ButtonBlock/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'

/**
 * Minimal rich text editor for captions and short text
 *
 * Features:
 * - Basic formatting (Bold, Italic, Link from rootFeatures)
 * - Lists (Unordered, Ordered, Checklist)
 * - Toolbars (Fixed, Inline)
 *
 * Use cases:
 * - Media captions
 * - Short descriptions
 * - Metadata fields
 */
export const richTextMinimal = () => lexicalEditor({
  features: ({ rootFeatures }) => {
    return [
      ...rootFeatures,
      UnorderedListFeature(),
      OrderedListFeature(),
      ChecklistFeature(),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
    ]
  },
})

/**
 * Standard rich text editor for most content areas
 *
 * Features:
 * - All features from richTextMinimal
 * - Headings (configurable sizes)
 * - MediaBlock (for embedding media)
 * - Optional ButtonBlock
 * - Optional additional custom blocks
 * - Optional horizontal rule
 *
 * Use cases:
 * - Content blocks
 * - Hero sections
 * - Feature descriptions
 * - Banner content
 *
 * @param options.headings - Array of enabled heading sizes (e.g., ['h2', 'h3', 'h4'])
 * @param options.enableButtons - Whether to include ButtonBlock (default: false)
 * @param options.enableHorizontalRule - Whether to include HorizontalRuleFeature (default: false)
 * @param options.additionalBlocks - Additional custom blocks to include
 */
export const richTextStandard = (options?: {
  headings?: ('h1' | 'h2' | 'h3' | 'h4')[]
  enableButtons?: boolean
  enableHorizontalRule?: boolean
  additionalBlocks?: Block[]
}) => lexicalEditor({
  features: ({ rootFeatures }) => {
    const features = [
      ...rootFeatures,
      UnorderedListFeature(),
      OrderedListFeature(),
      ChecklistFeature(),
    ]

    // Add headings if specified
    if (options?.headings && options.headings.length > 0) {
      features.push(HeadingFeature({
        enabledHeadingSizes: options.headings
      }))
    }

    // Build blocks array - MediaBlock is always included
    const blocks: Block[] = [MediaBlock]
    if (options?.enableButtons) {
      blocks.push(ButtonBlock)
    }
    if (options?.additionalBlocks && options.additionalBlocks.length > 0) {
      blocks.push(...options.additionalBlocks)
    }
    features.push(BlocksFeature({ blocks }))

    // Add horizontal rule if enabled
    if (options?.enableHorizontalRule) {
      features.push(HorizontalRuleFeature())
    }

    // Add toolbar features last so they can detect all content features
    features.push(FixedToolbarFeature())
    features.push(InlineToolbarFeature())

    return features
  },
})

/**
 * Full-featured rich text editor with inline uploads
 *
 * Features:
 * - All features from richTextStandard
 * - UploadFeature for inline image uploads with captions
 * - All heading sizes (h1-h4)
 * - ButtonBlock included
 * - HorizontalRule included
 * - Optional additional custom blocks
 *
 * Use cases:
 * - Blog post content
 * - FAQ answers
 * - Long-form content areas
 *
 * Note: This is the heaviest editor variant and should only be used
 * for main content areas that require inline image uploads.
 *
 * @param options.additionalBlocks - Additional custom blocks to include
 */
export const richTextFull = (options?: {
  additionalBlocks?: Block[]
}) => lexicalEditor({
  features: ({ rootFeatures }) => {
    return [
      ...rootFeatures,
      // UploadFeature for inline image uploads with captions
      UploadFeature({
        collections: {
          media: {
            fields: [
              {
                name: 'caption',
                type: 'richText',
                editor: lexicalEditor({
                  features: ({ rootFeatures }) => [...rootFeatures],
                }),
                label: 'Caption',
              },
              {
                name: 'alt',
                type: 'text',
                label: 'Alt Text',
                required: false,
              },
            ],
          },
        },
        maxDepth: 1, // Don't deeply populate upload relationships
      }),
      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
      UnorderedListFeature(),
      OrderedListFeature(),
      ChecklistFeature(),
      BlocksFeature({
        blocks: [ButtonBlock, MediaBlock, ...(options?.additionalBlocks || [])]
      }),
      HorizontalRuleFeature(),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
    ]
  },
})
