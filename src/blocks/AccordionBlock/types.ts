import type { Faq, Category, Post, Page, Media } from '@/payload-types'

/**
 * FAQ with all relationships populated
 */
export interface PopulatedFAQ extends Omit<Faq, 'categories' | 'relatedContent' | 'resources'> {
  categories?: Category[]
  relatedContent?: Array<{
    relationTo: 'posts' | 'pages'
    value: Post | Page
  }>
  resources?: Array<{
    id: string
    title: string
    file: Media
    description?: string
  }>
}

/**
 * Accordion animation variants for motion
 */
export interface AccordionVariants {
  height: {
    open: { height: string | number; maskImage?: string }
    closed: { height: number; maskImage?: string }
  }
  content: {
    open: { opacity: number; filter: string }
    closed: { opacity: number; filter: string }
  }
  icon: {
    open: { rotate: number }
    closed: { rotate: number }
  }
}

/**
 * Props for AccordionItem component
 */
export interface AccordionItemProps {
  faq: PopulatedFAQ
  isOpen: boolean
  onToggle: () => void
  iconPosition: 'left' | 'right' | 'none'
  iconStyle: 'chevron' | 'plus-minus'
  showCategories: boolean
  animationSpeed: number
  index: number
  cardBackground?: 'primary' | 'secondary' | 'accent'
  dividerStyle?: 'line' | 'none' | 'card'
  isFirst?: boolean
  isLast?: boolean
  totalItems?: number
}

/**
 * Animation speed constants (in seconds)
 */
export const ANIMATION_SPEEDS = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.4,
} as const

/**
 * Icon styles for accordion toggle
 */
export type IconStyle = 'chevron' | 'plus-minus'

/**
 * Icon position in accordion header
 */
export type IconPosition = 'left' | 'right' | 'none'

/**
 * Default state for accordions
 */
export type DefaultState = 'all-collapsed' | 'first-open' | 'all-open'

/**
 * Sort options for FAQs
 */
export type FAQSortOption = 'order' | 'date' | 'question-asc' | 'question-desc'

/**
 * Card background options
 */
export type CardBackground = 'primary' | 'secondary' | 'accent'

/**
 * Divider style options
 */
export type DividerStyle = 'line' | 'none' | 'card'
