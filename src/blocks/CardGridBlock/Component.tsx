'use client'

import React, { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import type { CardGridBlock as CardGridBlockProps } from '@/payload-types'
import { UUIButton } from '@/components/payload-ui'
import { cn } from '@/utilities/ui'
import type { BackgroundVariant } from '@/utilities/backgroundVariants'
import { InlineCard } from '@/components/cards/InlineCard'
import { SectionHeader } from '@/components/SectionHeader'

// Staggered animation variants
const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // 200ms gap between cards
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 32 }, // 2rem = 32px (slide up from below)
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  },
}

interface ExtendedCardGridBlockProps extends Omit<CardGridBlockProps, 'cardBackground' | 'iconColor' | 'gridSpacing'> {
  cardBackground?: 'none' | 'primary' | 'primary-reversed' | 'secondary' | 'tertiary' | 'accent' | 'outline' | 'line'
  iconColor?: 'primary' | 'primary-reversed' | 'secondary' | 'tertiary' | 'accent' | 'outline'
  gridSpacing?: 'default' | 'compact' | 'normal' | 'large' | 'xl'
  disableInnerContainer?: boolean
}

export const CardGridBlock: React.FC<ExtendedCardGridBlockProps> = ({
  header,
  cards,
  cardStyle,
  cardBackground,
  columns,
  iconColor,
  iconTheme,
  spacing,
  gridSpacing,
  disableInnerContainer,
  enableAnimation = true,
}) => {
  // Animation hooks
  const containerRef = useRef<HTMLUListElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-50px' })
  const prefersReducedMotion = useReducedMotion()

  // Determine if animation should be active
  const shouldAnimate = enableAnimation && !prefersReducedMotion

  // Extract values from collapsible fields (stored at root level)
  const spacingValue = spacing || 'normal'
  const cardLayout = cardStyle || 'card'
  const columnsValue = columns || '3'
  const iconColorValue = (iconColor || 'primary') as 'primary' | 'primary-reversed' | 'accent' | 'secondary' | 'tertiary' | 'outline'
  const iconShape = (iconTheme || 'rounded-square') as 'rounded-square' | 'round'
  const cardStyleValue = (cardBackground || 'none') as BackgroundVariant

  // Increase row gap for centered-icon and elevated-box layouts
  const needsExtraRowGap = cardLayout === 'centered-icon' || cardLayout === 'elevated-box'
  
  // Grid gap classes - configurable or fallback to old behavior
  const gridGapClasses: Record<string, string> = {
    default: needsExtraRowGap ? 'gap-x-6 gap-y-12 md:gap-y-16' : 'gap-6',
    compact: 'gap-4',
    normal: 'gap-6',
    large: 'gap-8',
    xl: 'gap-12',
  }
  
  const finalGridGap = gridSpacing ? gridGapClasses[gridSpacing] : gridGapClasses.default

  const spacingClasses: Record<string, string> = {
    none: '',
    compact: 'py-12 lg:py-16',
    normal: 'py-16 lg:py-24',
    spacious: 'py-24 lg:py-32',
  }

  // Smart column logic: Auto full-width for single card
  const cardCount = cards?.length || 0
  const columnClasses: Record<string, string> = {
    '1': 'grid-cols-1',
    '2': 'sm:grid-cols-2',
    '3': 'sm:grid-cols-2 lg:grid-cols-3',
    '4': 'sm:grid-cols-2 lg:grid-cols-4',
  }

  // Override column classes if only one card or explicitly set to 1 column
  const isFullWidth = cardCount === 1 || columnsValue === '1'
  const gridClasses = isFullWidth ? 'grid-cols-1' : cn('grid-cols-1', columnClasses[columnsValue])

  // Grid height: Let CSS Grid's default stretch behavior equalize heights within each row
  // (Removed auto-rows-fr which forced ALL rows to same height)
  const gridHeightClass = ''

  // Header alignment
  const headerAlignment = header?.headerAlignment || 'left'

  // Content to render (shared between container and no-container versions)
  const content = (
    <>
      {/* Optional Header Section */}
      {header?.showHeader && (
        <SectionHeader
          eyebrow={header.eyebrow || undefined}
          heading={header.heading || undefined}
          description={header.description || undefined}
          alignment={headerAlignment}
        />
      )}

      {/* Cards Grid */}
      <div className={cn(header?.showHeader && 'mt-12 md:mt-16')}>
        <motion.ul
          ref={containerRef}
          className={cn('grid w-full', gridHeightClass, finalGridGap, gridClasses)}
          variants={shouldAnimate ? containerVariants : undefined}
          initial={shouldAnimate ? 'hidden' : 'visible'}
          animate={isInView ? 'visible' : 'hidden'}
        >
          {cards?.map((card, index) => {
            const iconData = typeof card.icon === 'object' ? card.icon : null
            const hasIcon = !!iconData?.svgCode

            // Render footer button if link is enabled
            const footer =
              card.enableLink && card.link ? (
                <UUIButton
                  label={card.link.label || 'Learn more'}
                  link={card.link}
                  className={cn(
                    // Override link variant colors for special backgrounds
                    (cardStyleValue === 'tertiary' ||
                      cardStyleValue === 'primary-reversed' ||
                      cardStyleValue === 'accent') &&
                      typeof card.link === 'object' &&
                      card.link.uuiColor === 'link' && [
                        // Tertiary: dark text on light gray background (both modes)
                        cardStyleValue === 'tertiary' &&
                          '[&]:text-brand-700! [&_*[data-text]]:text-brand-700! [&_*[data-icon]]:text-brand-700! hover:[&]:text-brand-900! hover:[&_*[data-text]]:text-brand-900! hover:[&_*[data-icon]]:text-brand-900!',
                        // Primary-reversed: white text on dark bg (light mode), dark text on white bg (dark mode)
                        cardStyleValue === 'primary-reversed' &&
                          '[&]:text-white! dark:[&]:text-brand-700! [&_*[data-text]]:text-white! dark:[&_*[data-text]]:text-brand-700! [&_*[data-icon]]:text-white! dark:[&_*[data-icon]]:text-brand-700! hover:[&]:text-gray-200! dark:hover:[&]:text-brand-900! hover:[&_*[data-text]]:text-gray-200! dark:hover:[&_*[data-text]]:text-brand-900! hover:[&_*[data-icon]]:text-gray-200! dark:hover:[&_*[data-icon]]:text-brand-900!',
                        // Accent: white text on blue background (both modes)
                        cardStyleValue === 'accent' &&
                          '[&]:text-white! [&_*[data-text]]:text-white! [&_*[data-icon]]:text-white! hover:[&]:text-gray-200! hover:[&_*[data-text]]:text-gray-200! hover:[&_*[data-icon]]:text-gray-200!',
                      ],
                  )}
                />
              ) : undefined

            return (
              <motion.li
                key={index}
                className="flex w-full"
                variants={shouldAnimate ? itemVariants : undefined}
              >
                <InlineCard
                  svgCode={hasIcon ? iconData?.svgCode : undefined}
                  content={card.content || undefined}
                  footer={footer}
                  cardStyle={cardLayout}
                  cardBackground={cardStyleValue}
                  iconColor={iconColorValue}
                  iconTheme={iconShape}
                />
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </>
  )

  // If disableInnerContainer is true (when used inside BackgroundSection), render without container
  if (disableInnerContainer) {
    return content
  }

  // Otherwise, render with full section container (standalone usage)
  return (
    <section className={cn(spacingClasses[spacingValue])}>
      <div className="mx-auto w-full max-w-container px-4 md:px-8">{content}</div>
    </section>
  )
}
