import React from 'react'
import RichText from '@/components/RichText'
import type { RichTextBlock as RichTextBlockProps } from '@/payload-types'
import type { TextColorContext } from '@/blocks/RenderBlocks'

interface ExtendedRichTextBlockProps extends RichTextBlockProps {
  textColorContext?: TextColorContext
}

export const RichTextBlock: React.FC<ExtendedRichTextBlockProps> = ({
  content,
  textColorContext,
}) => {
  if (!content) return null

  return (
    <RichText
      data={content}
      enableGutter={false}
      className={textColorContext?.richText}
    />
  )
}
