/**
 * Content Analyzer Service
 * Extracts meaningful content from Pages (layout blocks) and Posts (Lexical richtext)
 * for AI-powered SEO meta generation
 */

import { logger } from '@/utilities/logger'
import type { ContentContext } from './types'

/**
 * Maximum content length to analyze (in characters)
 * Prevents sending too much content to AI
 */
const MAX_CONTENT_LENGTH = 10000

/**
 * Analyze page/post content and extract key information
 *
 * @param data - The page or post document data
 * @param maxTokens - Maximum tokens to include in analysis
 * @returns Content context for AI generation
 */
export async function analyzeContent(
   
  data: any,
  maxTokens: number = 2000,
): Promise<ContentContext> {
  logger.log('[Content Analyzer] Starting content analysis...')

  const context: ContentContext = {}

  // Extract title
  if (data.title) {
    context.title = data.title
    logger.log('[Content Analyzer] Title:', data.title)
  }

  // Extract subtitle (Posts only)
  if (data.subtitle) {
    context.subtitle = data.subtitle
    logger.log('[Content Analyzer] Subtitle:', data.subtitle)
  }

  // Extract categories (Posts only)
  if (data.categories && Array.isArray(data.categories)) {
     
    context.categories = data.categories.map((cat: any) => {
      if (typeof cat === 'string') return cat
      if (cat && typeof cat === 'object' && cat.title) return cat.title
      return ''
    }).filter(Boolean)
    logger.log('[Content Analyzer] Categories:', context.categories)
  }

  // Extract hero image (Posts only)
  if (data.heroImage) {
    const heroImage = typeof data.heroImage === 'object' ? data.heroImage : {}
    context.heroImage = {
      alt: heroImage.alt || '',
      url: heroImage.url || '',
    }
    logger.log('[Content Analyzer] Hero image ALT:', context.heroImage.alt)
  }

  // Extract table of contents (Posts only)
  if (data.tableOfContents && Array.isArray(data.tableOfContents)) {
     
    const toc = data.tableOfContents.map((item: any) => ({
      title: item.title || '',
      href: item.href || '',
    }))
    context.tableOfContents = toc
    logger.log('[Content Analyzer] Table of contents:', toc.length, 'items')
  }

  // Extract content based on type
  if (data.layout && Array.isArray(data.layout)) {
    // Pages: analyze layout blocks
    logger.log('[Content Analyzer] Analyzing', data.layout.length, 'layout blocks...')
    const blockContent = extractLayoutBlocks(data.layout)
    context.contentSummary = truncateContent(blockContent, maxTokens)
    context.contentBlocks = data.layout
  } else if (data.content) {
    // Posts: analyze Lexical richtext
    logger.log('[Content Analyzer] Analyzing Lexical richtext...')
    const richTextContent = extractLexicalContent(data.content)
    context.contentSummary = truncateContent(richTextContent, maxTokens)
    context.richText = data.content
  }

  logger.log('[Content Analyzer] Content summary length:', context.contentSummary?.length || 0, 'characters')
  logger.log('[Content Analyzer] Analysis complete')

  return context
}

/**
 * Extract text content from layout blocks (Pages)
 *
 * @param blocks - Array of layout blocks
 * @returns Extracted text content
 */
 
function extractLayoutBlocks(blocks: any[]): string {
  const extracted: string[] = []

  for (const block of blocks) {
    switch (block.blockType) {
      case 'heroHeading':
        if (block.heading) extracted.push(`HERO: ${block.heading}`)
        if (block.subheading) extracted.push(block.subheading)
        break

      case 'content':
        if (block.columns && Array.isArray(block.columns)) {
          for (const column of block.columns) {
            if (column.richText) {
              const text = extractLexicalContent(column.richText)
              if (text) extracted.push(text)
            }
          }
        }
        break

      case 'cta':
        if (block.heading) extracted.push(`CTA: ${block.heading}`)
        if (block.richText) {
          const text = extractLexicalContent(block.richText)
          if (text) extracted.push(text)
        }
        break

      case 'features':
        if (block.heading) extracted.push(`FEATURES: ${block.heading}`)
        if (block.cards && Array.isArray(block.cards)) {
          for (const card of block.cards) {
            if (card.title) extracted.push(card.title)
            if (card.description) extracted.push(card.description)
          }
        }
        break

      case 'cardGrid':
        if (block.heading) extracted.push(`CARDS: ${block.heading}`)
        if (block.cards && Array.isArray(block.cards)) {
          for (const card of block.cards) {
            if (card.title) extracted.push(card.title)
            if (card.description) extracted.push(card.description)
          }
        }
        break

      case 'accordion':
        if (block.heading) extracted.push(`FAQ: ${block.heading}`)
        if (block.items && Array.isArray(block.items)) {
          for (const item of block.items) {
            if (item.question) extracted.push(`Q: ${item.question}`)
            if (item.answer) {
              const text = extractLexicalContent(item.answer)
              if (text) extracted.push(`A: ${text}`)
            }
          }
        }
        break

      case 'latestPosts':
        // Less important for SEO generation, skip
        break

      case 'archive':
        // Less important for SEO generation, skip
        break

      default:
        // For any other blocks, try to extract any text fields
        if (block.heading) extracted.push(block.heading)
        if (block.text) extracted.push(block.text)
    }
  }

  return extracted.join('\n\n')
}

/**
 * Extract plain text from Lexical richtext JSON
 *
 * @param lexicalData - Lexical editor content
 * @returns Plain text content
 */
 
function extractLexicalContent(lexicalData: any): string {
  if (!lexicalData || !lexicalData.root) {
    return ''
  }

  const extracted: string[] = []

   
  function traverse(node: any) {
    // Handle text nodes
    if (node.type === 'text' && node.text) {
      extracted.push(node.text)
    }

    // Handle heading nodes
    if (node.type === 'heading' && node.children) {
      const headingText = node.children
        .map((child: { text?: string }) => (child.text ? child.text : ''))
        .join('')
      if (headingText) {
        extracted.push(`\n${headingText}\n`)
      }
    }

    // Handle paragraph nodes
    if (node.type === 'paragraph' && node.children) {
      const paraText = node.children
        .map((child: { text?: string }) => (child.text ? child.text : ''))
        .join('')
      if (paraText) {
        extracted.push(paraText)
      }
    }

    // Handle list nodes
    if (node.type === 'list' && node.children) {
      for (const listItem of node.children) {
        if (listItem.children) {
          const itemText = listItem.children
            .map((child: { text?: string }) => (child.text ? child.text : ''))
            .join('')
          if (itemText) {
            extracted.push(`• ${itemText}`)
          }
        }
      }
    }

    // Handle quote nodes
    if (node.type === 'quote' && node.children) {
      const quoteText = node.children
        .map((child: { text?: string }) => (child.text ? child.text : ''))
        .join('')
      if (quoteText) {
        extracted.push(`"${quoteText}"`)
      }
    }

    // Recursively traverse children
    if (node.children && Array.isArray(node.children)) {
      for (const child of node.children) {
        traverse(child)
      }
    }
  }

  traverse(lexicalData.root)

  return extracted.join(' ').trim()
}

/**
 * Truncate content to fit within token/character limit
 *
 * @param content - Content to truncate
 * @param maxTokens - Maximum tokens (approximate)
 * @returns Truncated content
 */
function truncateContent(content: string, maxTokens: number): string {
  // Rough estimate: 1 token ≈ 4 characters
  const maxChars = Math.min(maxTokens * 4, MAX_CONTENT_LENGTH)

  if (content.length <= maxChars) {
    return content
  }

  // Truncate at word boundary
  const truncated = content.substring(0, maxChars)
  const lastSpace = truncated.lastIndexOf(' ')

  if (lastSpace > maxChars * 0.8) {
    return truncated.substring(0, lastSpace) + '...'
  }

  return truncated + '...'
}

/**
 * Parse keywords from textarea input
 * Supports newline-separated or comma-separated keywords
 *
 * @param keywordsText - Raw keywords text from form
 * @returns Array of cleaned keywords
 */
export function parseKeywords(keywordsText: string): string[] {
  if (!keywordsText || typeof keywordsText !== 'string') {
    return []
  }

  // Split by newlines first, then by commas
  const keywords = keywordsText
    .split(/[\n,]/)
    .map((kw) => kw.trim())
    .filter(Boolean)

  // Remove duplicates (case-insensitive)
  const unique = Array.from(
    new Set(keywords.map((kw) => kw.toLowerCase()))
  ).map((kw) => {
    // Find original casing
    return keywords.find((orig) => orig.toLowerCase() === kw) || kw
  })

  logger.log('[Content Analyzer] Parsed', unique.length, 'unique keywords:', unique)

  return unique
}

/**
 * Build AI prompt context from content and keywords
 *
 * @param context - Content context
 * @param keywords - User-provided keywords
 * @param guidance - Optional page-specific guidance
 * @param priority - Content vs keywords priority
 * @returns Formatted context string for AI
 */
export function buildPromptContext(
  context: ContentContext,
  keywords: string[],
  guidance?: string,
  priority: 'keywords' | 'balanced' | 'content' = 'balanced',
): string {
  const parts: string[] = []

  // Add page title
  if (context.title) {
    parts.push(`Page Title: ${context.title}`)
  }

  // Add subtitle if available
  if (context.subtitle) {
    parts.push(`Subtitle: ${context.subtitle}`)
  }

  // Add categories if available
  if (context.categories && context.categories.length > 0) {
    parts.push(`Categories: ${context.categories.join(', ')}`)
  }

  // Add keywords based on priority
  if (keywords.length > 0) {
    const keywordList = keywords.join(', ')
    if (priority === 'keywords') {
      parts.unshift(`PRIMARY TARGET KEYWORDS: ${keywordList}`) // Front
    } else {
      parts.push(`Target Keywords: ${keywordList}`)
    }
  }

  // Add page-specific guidance if provided
  if (guidance && guidance.trim()) {
    parts.push(`\nSpecific Guidance: ${guidance}`)
  }

  // Add content summary
  if (context.contentSummary) {
    parts.push(`\nPage Content:\n${context.contentSummary}`)
  }

  // Add extracted themes if available
  if (context.extractedThemes && context.extractedThemes.length > 0) {
    parts.push(`\nKey Themes: ${context.extractedThemes.join(', ')}`)
  }

  return parts.join('\n')
}
