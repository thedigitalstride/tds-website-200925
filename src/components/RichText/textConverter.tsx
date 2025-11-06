import type { SerializedTextNode } from '@payloadcms/richtext-lexical'
import React from 'react'

// Format bit constants from Lexical (used by Payload)
const IS_BOLD = 1
const IS_ITALIC = 2
const IS_STRIKETHROUGH = 4
const IS_UNDERLINE = 8
const IS_CODE = 16
const IS_SUBSCRIPT = 32
const IS_SUPERSCRIPT = 64
const IS_HIGHLIGHT = 128

/**
 * Parse inline style string into React CSSProperties object
 * Example: "font-size: 18px; line-height: 28px" -> { fontSize: '18px', lineHeight: '28px' }
 */
function parseInlineStyles(styleString: string): React.CSSProperties | null {
  if (!styleString || styleString.trim() === '') {
    return null
  }

  const styles: React.CSSProperties = {}

  // Split by semicolon and parse each style rule
  styleString.split(';').forEach(rule => {
    const trimmedRule = rule.trim()
    if (!trimmedRule) return

    const [property, value] = trimmedRule.split(':').map(s => s.trim())
    if (!property || !value) return

    // Convert kebab-case to camelCase for React
    const camelCaseProperty = property.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())

    // TypeScript doesn't like dynamic property assignment, so we use any
    ;(styles as any)[camelCaseProperty] = value
  })

  return Object.keys(styles).length > 0 ? styles : null
}

/**
 * Custom text converter that handles both format bits (bold, italic, etc.)
 * and inline styles (font-size, line-height from our TextSizeFeature)
 */
export const textConverter = {
  text: ({ node }: { node: SerializedTextNode }) => {
    let text: React.ReactNode = node.text || ''

    // First, check for inline styles from our TextSizeFeature
    if (node.style) {
      const inlineStyles = parseInlineStyles(node.style)
      if (inlineStyles) {
        text = <span style={inlineStyles}>{text}</span>
      }
    }

    // Then apply format bits (these wrap around the styled text)
    // This ensures proper nesting: <strong><span style="...">text</span></strong>
    if (node.format & IS_CODE) {
      text = <code>{text}</code>
    }
    if (node.format & IS_BOLD) {
      text = <strong>{text}</strong>
    }
    if (node.format & IS_ITALIC) {
      text = <em>{text}</em>
    }
    if (node.format & IS_STRIKETHROUGH) {
      text = <span style={{ textDecoration: 'line-through' }}>{text}</span>
    }
    if (node.format & IS_UNDERLINE) {
      text = <span style={{ textDecoration: 'underline' }}>{text}</span>
    }
    if (node.format & IS_SUBSCRIPT) {
      text = <sub>{text}</sub>
    }
    if (node.format & IS_SUPERSCRIPT) {
      text = <sup>{text}</sup>
    }
    if (node.format & IS_HIGHLIGHT) {
      text = <span className="bg-accent/20 px-1 rounded">{text}</span>
    }

    return text
  }
}