'use client'

import { useRowLabel } from '@payloadcms/ui'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

// Helper to extract text from Lexical richtext content
const extractTextFromRichText = (content: DefaultTypedEditorState | undefined): string => {
  if (!content?.root?.children) return ''

  const extractText = (node: unknown): string => {
    if (!node || typeof node !== 'object') return ''

    const n = node as { type?: string; text?: string; children?: unknown[] }

    if (n.type === 'text' && typeof n.text === 'string') {
      return n.text
    }

    if (Array.isArray(n.children)) {
      return n.children.map(extractText).join('')
    }

    return ''
  }

  return content.root.children.map(extractText).join(' ').trim()
}

export const CardRowLabel = () => {
  const { data } = useRowLabel<{ content?: DefaultTypedEditorState }>()

  const text = extractTextFromRichText(data?.content)

  // Truncate to first 50 characters for display
  const displayText = text.length > 50 ? `${text.substring(0, 50)}...` : text

  return displayText || 'Card'
}
