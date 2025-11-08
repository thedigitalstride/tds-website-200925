import React from 'react'
import RichText from '@/components/RichText'
import type { RichTextBlock as RichTextBlockProps } from '@/payload-types'

export const RichTextBlock: React.FC<RichTextBlockProps> = ({ content }) => {
  if (!content) return null

  return <RichText data={content} enableGutter={false} />
}

