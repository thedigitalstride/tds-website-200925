/**
 * Convert Lexical rich text JSON to plain text
 *
 * Enhanced version for FAQ schema generation that preserves structure
 * and handles ordered lists, better line breaks, and nested content.
 *
 * @param lexicalData - Lexical editor content JSON
 * @returns Plain text content with preserved line breaks
 */
export function lexicalToPlainText(lexicalData: any): string {
  if (!lexicalData || !lexicalData.root) {
    return ''
  }

  const extracted: string[] = []

  /**
   * Recursively traverse Lexical node tree
   */
  function traverse(node: any, listContext?: { type: 'ordered' | 'unordered'; index: number }) {
    // Handle text nodes
    if (node.type === 'text' && node.text) {
      extracted.push(node.text)
    }

    // Handle paragraph nodes
    if (node.type === 'paragraph' && node.children) {
      const paraText: string[] = []
      extractTextFromChildren(node.children, paraText)
      if (paraText.length > 0) {
        extracted.push(paraText.join(''))
      }
      // Add line break after paragraph
      extracted.push('\n')
    }

    // Handle heading nodes
    if (node.type === 'heading' && node.children) {
      const headingText: string[] = []
      extractTextFromChildren(node.children, headingText)
      if (headingText.length > 0) {
        extracted.push(`\n${headingText.join('')}\n`)
      }
    }

    // Handle list nodes
    if (node.type === 'list' && node.children) {
      const listType = node.listType || 'bullet' // 'bullet' or 'number'
      const isOrdered = listType === 'number'

      for (let i = 0; i < node.children.length; i++) {
        const listItem = node.children[i]
        if (listItem.children) {
          const itemText: string[] = []
          extractTextFromChildren(listItem.children, itemText)
          if (itemText.length > 0) {
            const prefix = isOrdered ? `${i + 1}. ` : '• '
            extracted.push(`${prefix}${itemText.join('')}\n`)
          }
        }
      }
      // Add extra line break after list
      extracted.push('\n')
    }

    // Handle list item nodes (nested lists)
    if (node.type === 'listitem' && node.children) {
      const itemText: string[] = []
      extractTextFromChildren(node.children, itemText)
      if (itemText.length > 0) {
        extracted.push(itemText.join(''))
      }
    }

    // Handle quote nodes
    if (node.type === 'quote' && node.children) {
      const quoteText: string[] = []
      extractTextFromChildren(node.children, quoteText)
      if (quoteText.length > 0) {
        extracted.push(`\n"${quoteText.join('')}"\n`)
      }
    }

    // Recursively traverse children
    if (node.children && Array.isArray(node.children)) {
      for (const child of node.children) {
        traverse(child, listContext)
      }
    }
  }

  /**
   * Extract text from children nodes, handling nested structures
   */
  function extractTextFromChildren(children: any[], output: string[]) {
    for (const child of children) {
      if (child.type === 'text' && child.text) {
        output.push(child.text)
      } else if (child.type === 'linebreak') {
        output.push('\n')
      } else if (child.children && Array.isArray(child.children)) {
        // Recursively handle nested structures
        extractTextFromChildren(child.children, output)
      }
    }
  }

  traverse(lexicalData.root)

  // Join and clean up
  const result = extracted.join('')

  // Clean up excessive line breaks (more than 2 consecutive)
  const cleaned = result.replace(/\n{3,}/g, '\n\n')

  // Trim and return
  return cleaned.trim()
}

