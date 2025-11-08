'use client'

import React from 'react'
import type { CardGridBlock as CardGridBlockProps } from '@/payload-types'
import { UUIButton } from '@/components/payload-ui'
import { cn } from '@/utilities/ui'
import type { BackgroundVariant } from '@/utilities/backgroundVariants'
import { InlineCard } from '@/components/cards/InlineCard'

interface ExtendedCardGridBlockProps extends CardGridBlockProps {
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
  disableInnerContainer,
}) => {
  // Extract values from collapsible fields (stored at root level)
  const spacingValue = spacing || 'normal'
  const cardLayout = cardStyle || 'card'
  const columnsValue = columns || '3'
  const iconColorValue = (iconColor || 'primary') as 'primary' | 'primary-reversed' | 'accent' | 'secondary' | 'tertiary' | 'outline'
  const iconShape = (iconTheme || 'rounded-square') as 'rounded-square' | 'round'
  const cardStyleValue = (cardBackground || 'none') as BackgroundVariant

  // Increase row gap for centered-icon and elevated-box layouts
  const needsExtraRowGap = cardLayout === 'centered-icon' || cardLayout === 'elevated-box'
  const gridGapClasses = needsExtraRowGap ? 'gap-x-6 gap-y-12 md:gap-y-16' : 'gap-6'

  const spacingClasses: Record<string, string> = {
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

  // Smart grid height: Only use equal heights for multi-column layouts
  const gridHeightClass = isFullWidth ? '' : 'auto-rows-fr'

  // Header alignment
  const headerAlignment = header?.headerAlignment || 'left'
  const isHeaderCentered = headerAlignment === 'center'

  // Content to render (shared between container and no-container versions)
  const content = (
    <>
      {/* Optional Header Section */}
      {header?.showHeader && (
        <div
          className={cn(
            'flex w-full max-w-3xl flex-col',
            isHeaderCentered && 'mx-auto text-center',
          )}
        >
          {header.eyebrow && (
            <span className="text-sm font-semibold text-brand-secondary md:text-md">
              {header.eyebrow}
            </span>
          )}
          {header.heading && (
            <h2 className="mt-3 text-display-sm font-semibold text-primary md:text-display-md">
              {header.heading}
            </h2>
          )}
          {header.description && (
            <p className="mt-4 text-lg text-tertiary md:mt-5 md:text-xl">{header.description}</p>
          )}
        </div>
      )}

      {/* Cards Grid */}
      <div className={cn(header?.showHeader && 'mt-12 md:mt-16')}>
        <ul className={cn('grid w-full', gridHeightClass, gridGapClasses, gridClasses)}>
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
              <li key={index} className="flex w-full">
                <InlineCard
                  svgCode={hasIcon ? iconData?.svgCode : undefined}
                  eyebrow={card.eyebrow || undefined}
                  title={card.title || ''}
                  subtitle={card.description || undefined}
                  footer={footer}
                  cardStyle={cardLayout}
                  cardBackground={cardStyleValue}
                  iconColor={iconColorValue}
                  iconTheme={iconShape}
                />
              </li>
            )
          })}
        </ul>
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
