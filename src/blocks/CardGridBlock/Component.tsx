'use client'

import React from 'react'
import type { FC, ReactNode } from 'react'
import type { CardGridBlock as CardGridBlockProps } from '@/payload-types'
import { FeaturedIcon } from '@/components/uui/foundations/featured-icon/featured-icon'
import { UUIButton } from '@/components/payload-ui'
import { cn } from '@/utilities/ui'
import { getBackgroundClasses, type BackgroundVariant } from '@/utilities/backgroundVariants'
import RichText from '@/components/RichText'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

interface CardProps {
  eyebrow?: string
  icon?: FC<{ className?: string }>
  svgCode?: string
  title: string
  subtitle: DefaultTypedEditorState | string | undefined
  footer?: ReactNode
}

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
  const rawIconColor = iconColor || 'primary'
  // Map 'primary' to 'brand' and 'primary-reversed' to 'brand-reversed' for FeaturedIcon compatibility
  const mappedIconColor = (
    rawIconColor === 'primary' ? 'brand' :
    rawIconColor === 'primary-reversed' ? 'brand-reversed' :
    rawIconColor
  ) as 'brand' | 'brand-reversed' | 'accent' | 'secondary' | 'tertiary'
  const iconShape = (iconTheme || 'rounded-square') as 'rounded-square' | 'round'
  const cardStyleValue = cardBackground || 'none'

  // Use shared background variant system
  const cardBgClasses = getBackgroundClasses(cardStyleValue as BackgroundVariant)

  // Determine padding based on style variant
  const isLineVariant = cardStyleValue === 'line'
  const isNoneVariant = cardStyleValue === 'none'
  const getCardPaddingClasses = () => {
    if (isLineVariant) {
      return 'py-5 md:py-6' // No horizontal padding for line variant
    }
    if (isNoneVariant) {
      return 'p-5 md:p-6' // Standard padding but no background
    }
    return 'p-5 md:p-6' // Standard padding
  }

  // Text colors based on background variant
  const getTextClasses = () => {
    switch (cardStyleValue) {
      case 'accent':
        // White text on accent background
        return {
          eyebrow: 'text-white',
          heading: 'text-white',
          description: 'text-white'
        }
      case 'primary-reversed':
        // White text on dark bg (light mode), dark text on white bg (dark mode)
        return {
          eyebrow: 'text-white dark:text-brand-500',
          heading: 'text-white dark:text-brand-500',
          description: 'text-white dark:text-brand-500'
        }
      case 'tertiary':
        // Dark text on gray-solid background (both modes)
        return {
          eyebrow: 'text-brand-700',
          heading: 'text-brand-900',
          description: 'text-brand-900'
        }
      default:
        // Default semantic colors for primary, secondary, line
        return {
          eyebrow: 'text-brand-secondary',
          heading: 'text-primary',
          description: 'text-secondary'
        }
    }
  }

  const textClasses = getTextClasses()

  const cardPaddingClasses = getCardPaddingClasses()

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
  const gridClasses = isFullWidth
    ? 'grid-cols-1'
    : cn('grid-cols-1', columnClasses[columnsValue])

  // Smart grid height: Only use equal heights for multi-column layouts
  const gridHeightClass = isFullWidth ? '' : 'auto-rows-fr'

  // Wrapper components with dynamic icon color/shape support and eyebrow
  const CardWithIcon = ({ eyebrow, icon, svgCode, title, subtitle, footer }: CardProps) => (
    <div className={cn(
      "flex flex-col justify-between gap-4 h-full w-full",
      !isLineVariant && "rounded-xl",
      cardPaddingClasses,
      cardBgClasses
    )}>
      <div className="flex flex-col gap-4">
        <FeaturedIcon
          icon={icon}
          svgCode={svgCode}
          size="lg"
          color={mappedIconColor}
          shape={iconShape}
        />
        <div>
          {eyebrow && (
            <span className={cn("text-sm font-semibold md:text-md", textClasses.eyebrow)}>
              {eyebrow}
            </span>
          )}
          <h3 className={cn(
            "text-lg font-semibold",
            eyebrow && "mt-2",
            textClasses.heading
          )}>
            {title}
          </h3>
          {subtitle && (
            <div className={cn("mt-1 text-md", textClasses.description)}>
              {typeof subtitle === 'object' && 'root' in subtitle ? (
                <RichText
                  data={subtitle}
                  enableGutter={false}
                  enableProse={true}
                  className={cn(
                    "prose-compact",
                    cardStyleValue === 'tertiary' && "[&]:!text-brand-900 [&_*]:!text-brand-900",
                    cardStyleValue === 'primary-reversed' && "[&]:!text-white dark:[&]:!text-brand-900 [&_*]:!text-white dark:[&_*]:!text-brand-900",
                    cardStyleValue === 'accent' && "[&]:!text-white [&_*]:!text-white"
                  )}
                />
              ) : (
                <p>{subtitle}</p>
              )}
            </div>
          )}
        </div>
      </div>
      {footer}
    </div>
  )

  const CardLeftIconWithColors = ({ eyebrow, icon, svgCode, title, subtitle, footer }: CardProps) => (
    <div className={cn(
      "flex flex-col justify-between gap-4 h-full w-full",
      !isLineVariant && "rounded-xl",
      cardPaddingClasses,
      cardBgClasses
    )}>
      <div className="flex flex-col gap-4">
        <FeaturedIcon
          icon={icon}
          svgCode={svgCode}
          size="lg"
          color={mappedIconColor}
          shape={iconShape}
          className="hidden md:inline-flex"
        />
        <FeaturedIcon
          icon={icon}
          svgCode={svgCode}
          size="md"
          color={mappedIconColor}
          shape={iconShape}
          className="inline-flex md:hidden"
        />
        <div>
          {eyebrow && (
            <span className={cn("text-sm font-semibold md:text-md", textClasses.eyebrow)}>
              {eyebrow}
            </span>
          )}
          <h3 className={cn(
            "text-lg font-semibold",
            eyebrow && "mt-2",
            textClasses.heading
          )}>
            {title}
          </h3>
          {subtitle && (
            <div className={cn("mt-1 text-md", textClasses.description)}>
              {typeof subtitle === 'object' && 'root' in subtitle ? (
                <RichText
                  data={subtitle}
                  enableGutter={false}
                  enableProse={true}
                  className={cn(
                    "prose-compact",
                    cardStyleValue === 'tertiary' && "[&]:!text-brand-900 [&_*]:!text-brand-900",
                    cardStyleValue === 'primary-reversed' && "[&]:!text-white dark:[&]:!text-brand-900 [&_*]:!text-white dark:[&_*]:!text-brand-900",
                    cardStyleValue === 'accent' && "[&]:!text-white [&_*]:!text-white"
                  )}
                />
              ) : (
                <p>{subtitle}</p>
              )}
            </div>
          )}
        </div>
      </div>
      {footer}
    </div>
  )

  const CardHorizontalIconWithColors = ({ eyebrow, icon, svgCode, title, subtitle, footer }: CardProps) => (
    <div className={cn(
      "flex gap-4 h-full w-full",
      !isLineVariant && "rounded-xl",
      cardPaddingClasses,
      cardBgClasses
    )}>
      <FeaturedIcon
        icon={icon}
        svgCode={svgCode}
        size="lg"
        color={mappedIconColor}
        shape={iconShape}
        className="hidden md:inline-flex"
      />
      <FeaturedIcon
        icon={icon}
        svgCode={svgCode}
        size="md"
        color={mappedIconColor}
        shape={iconShape}
        className="inline-flex md:hidden"
      />
      <div className="flex flex-col justify-between items-start gap-4 flex-1">
        <div>
          {eyebrow && (
            <span className={cn("text-sm font-semibold md:text-md", textClasses.eyebrow)}>
              {eyebrow}
            </span>
          )}
          <h3 className={cn(
            "mt-1.5 text-lg font-semibold md:mt-2.5",
            eyebrow && "mt-2",
            textClasses.heading
          )}>
            {title}
          </h3>
          {subtitle && (
            <div className={cn("mt-1 text-md", textClasses.description)}>
              {typeof subtitle === 'object' && 'root' in subtitle ? (
                <RichText
                  data={subtitle}
                  enableGutter={false}
                  enableProse={true}
                  className={cn(
                    "prose-compact",
                    cardStyleValue === 'tertiary' && "[&]:!text-brand-900 [&_*]:!text-brand-900",
                    cardStyleValue === 'primary-reversed' && "[&]:!text-white dark:[&]:!text-brand-900 [&_*]:!text-white dark:[&_*]:!text-brand-900",
                    cardStyleValue === 'accent' && "[&]:!text-white [&_*]:!text-white"
                  )}
                />
              ) : (
                <p>{subtitle}</p>
              )}
            </div>
          )}
        </div>
        {footer}
      </div>
    </div>
  )

  const CardBoxWithIcon = ({ eyebrow, icon, svgCode, title, subtitle, footer }: CardProps) => (
    <div className={cn(
      "mt-6 flex flex-col justify-between items-center gap-4 text-center h-full w-full",
      !isLineVariant && "rounded-xl",
      isLineVariant ? 'px-0 pb-8' : 'px-6 pb-8',
      cardBgClasses
    )}>
      <div className="flex flex-col items-center gap-4">
        <FeaturedIcon
          icon={icon}
          svgCode={svgCode}
          size="lg"
          color={mappedIconColor}
          shape={iconShape}
          className="-mt-6"
        />
        <div>
          {eyebrow && (
            <span className={cn("text-sm font-semibold md:text-md", textClasses.eyebrow)}>
              {eyebrow}
            </span>
          )}
          <h3 className={cn(
            "text-lg font-semibold",
            eyebrow && "mt-2",
            textClasses.heading
          )}>
            {title}
          </h3>
          {subtitle && (
            <div className={cn("mt-1 text-md", textClasses.description)}>
              {typeof subtitle === 'object' && 'root' in subtitle ? (
                <RichText
                  data={subtitle}
                  enableGutter={false}
                  enableProse={true}
                  className={cn(
                    "prose-compact",
                    cardStyleValue === 'tertiary' && "[&]:!text-brand-900 [&_*]:!text-brand-900",
                    cardStyleValue === 'primary-reversed' && "[&]:!text-white dark:[&]:!text-brand-900 [&_*]:!text-white dark:[&_*]:!text-brand-900",
                    cardStyleValue === 'accent' && "[&]:!text-white [&_*]:!text-white"
                  )}
                />
              ) : (
                <p>{subtitle}</p>
              )}
            </div>
          )}
        </div>
      </div>
      {footer}
    </div>
  )

  // Centered icon component with rich text support
  const CardCenteredIconWithColors = ({ eyebrow, icon, svgCode, title, subtitle, footer }: CardProps) => (
    <div className={cn(
      "flex flex-col justify-between items-center gap-4 text-center h-full w-full",
      !isLineVariant && "rounded-xl",
      cardPaddingClasses,
      cardBgClasses
    )}>
      <div className="flex flex-col items-center gap-4">
        <FeaturedIcon
          icon={icon}
          svgCode={svgCode}
          size="lg"
          color={mappedIconColor}
          shape={iconShape}
          className="hidden md:inline-flex"
        />
        <FeaturedIcon
          icon={icon}
          svgCode={svgCode}
          size="md"
          color={mappedIconColor}
          shape={iconShape}
          className="inline-flex md:hidden"
        />
        <div>
          {eyebrow && (
            <span className={cn("text-sm font-semibold md:text-md", textClasses.eyebrow)}>
              {eyebrow}
            </span>
          )}
          <h3 className={cn(
            "text-lg font-semibold",
            eyebrow && "mt-2",
            textClasses.heading
          )}>
            {title}
          </h3>
          {subtitle && (
            <div className={cn("mt-1 text-md", textClasses.description)}>
              {typeof subtitle === 'object' && 'root' in subtitle ? (
                <RichText
                  data={subtitle}
                  enableGutter={false}
                  enableProse={true}
                  className={cn(
                    "prose-compact",
                    cardStyleValue === 'tertiary' && "[&]:!text-brand-900 [&_*]:!text-brand-900",
                    cardStyleValue === 'primary-reversed' && "[&]:!text-white dark:[&]:!text-brand-900 [&_*]:!text-white dark:[&_*]:!text-brand-900",
                    cardStyleValue === 'accent' && "[&]:!text-white [&_*]:!text-white"
                  )}
                />
              ) : (
                <p>{subtitle}</p>
              )}
            </div>
          )}
        </div>
      </div>
      {footer}
    </div>
  )

  // Map card layout to component (with icon variants)
  const cardComponentsWithIcon = {
    card: CardWithIcon,
    'centered-icon': CardCenteredIconWithColors,
    'left-icon': CardLeftIconWithColors,
    'horizontal-icon': CardHorizontalIconWithColors,
    'elevated-box': CardBoxWithIcon,
  }

  // Wrapper components that maintain card styling without icons (with eyebrow support)
  const CardText = ({ eyebrow, title, subtitle, footer }: { eyebrow?: string; title: string; subtitle: DefaultTypedEditorState | string | undefined; footer?: React.ReactNode }) => (
    <div className={cn(
      "flex flex-col justify-between gap-4 h-full w-full",
      !isLineVariant && "rounded-xl",
      cardPaddingClasses,
      cardBgClasses
    )}>
      <div>
        {eyebrow && (
          <span className={cn("text-sm font-semibold md:text-md", textClasses.eyebrow)}>
            {eyebrow}
          </span>
        )}
        <h3 className={cn(
          "text-lg font-semibold",
          eyebrow && "mt-2",
          textClasses.heading
        )}>
          {title}
        </h3>
        {subtitle && (
          <div className={cn("mt-1 text-md", textClasses.description)}>
            {typeof subtitle === 'object' && 'root' in subtitle ? (
              <RichText
                data={subtitle}
                enableGutter={false}
                enableProse={true}
                className={cn(
                  "text-md",
                  cardStyleValue === 'tertiary' && "[&]:!text-brand-900 [&_*]:!text-brand-900",
                  cardStyleValue === 'primary-reversed' && "[&]:!text-white dark:[&]:!text-brand-900 [&_*]:!text-white dark:[&_*]:!text-brand-900",
                  cardStyleValue === 'accent' && "[&]:!text-white [&_*]:!text-white"
                )}
              />
            ) : (
              <p>{subtitle}</p>
            )}
          </div>
        )}
      </div>
      {footer}
    </div>
  )

  // Custom wrapper for centered text layout with card styling
  const CardTextCenteredWithCard = ({ eyebrow, title, subtitle, footer }: { eyebrow?: string; title: string; subtitle: DefaultTypedEditorState | string | undefined; footer?: React.ReactNode }) => (
    <div className={cn(
      "flex flex-col justify-between items-center gap-4 text-center h-full w-full",
      !isLineVariant && "rounded-xl",
      cardPaddingClasses,
      cardBgClasses
    )}>
      <div>
        {eyebrow && (
          <span className={cn("text-sm font-semibold md:text-md", textClasses.eyebrow)}>
            {eyebrow}
          </span>
        )}
        <h3 className={cn(
          "text-lg font-semibold",
          eyebrow && "mt-2",
          textClasses.heading
        )}>
          {title}
        </h3>
        {subtitle && (
          <div className={cn("mt-1 text-md", textClasses.description)}>
            {typeof subtitle === 'object' && 'root' in subtitle ? (
              <RichText
                data={subtitle}
                enableGutter={false}
                enableProse={true}
                className={cn(
                  "text-md",
                  cardStyleValue === 'tertiary' && "[&]:!text-brand-900 [&_*]:!text-brand-900",
                  cardStyleValue === 'primary-reversed' && "[&]:!text-white dark:[&]:!text-brand-900 [&_*]:!text-white dark:[&_*]:!text-brand-900",
                  cardStyleValue === 'accent' && "[&]:!text-white [&_*]:!text-white"
                )}
              />
            ) : (
              <p>{subtitle}</p>
            )}
          </div>
        )}
      </div>
      {footer}
    </div>
  )

  // Custom wrapper for left-aligned text layout with card styling
  const CardTextLeftWithCard = ({ eyebrow, title, subtitle, footer }: { eyebrow?: string; title: string; subtitle: DefaultTypedEditorState | string | undefined; footer?: React.ReactNode }) => (
    <div className={cn(
      "flex flex-col justify-between gap-4 h-full w-full",
      !isLineVariant && "rounded-xl",
      cardPaddingClasses,
      cardBgClasses
    )}>
      <div>
        {eyebrow && (
          <span className={cn("text-sm font-semibold md:text-md", textClasses.eyebrow)}>
            {eyebrow}
          </span>
        )}
        <h3 className={cn(
          "text-lg font-semibold",
          eyebrow && "mt-2",
          textClasses.heading
        )}>
          {title}
        </h3>
        {subtitle && (
          <div className={cn("mt-1 text-md", textClasses.description)}>
            {typeof subtitle === 'object' && 'root' in subtitle ? (
              <RichText
                data={subtitle}
                enableGutter={false}
                enableProse={true}
                className={cn(
                  "text-md",
                  cardStyleValue === 'tertiary' && "[&]:!text-brand-900 [&_*]:!text-brand-900",
                  cardStyleValue === 'primary-reversed' && "[&]:!text-white dark:[&]:!text-brand-900 [&_*]:!text-white dark:[&_*]:!text-brand-900",
                  cardStyleValue === 'accent' && "[&]:!text-white [&_*]:!text-white"
                )}
              />
            ) : (
              <p>{subtitle}</p>
            )}
          </div>
        )}
      </div>
      {footer}
    </div>
  )

  const cardComponentsWithoutIcon = {
    card: CardText,
    'centered-icon': CardTextCenteredWithCard,
    'left-icon': CardTextLeftWithCard,
    'horizontal-icon': CardTextLeftWithCard,
    'elevated-box': CardText,
  }

  // Header alignment
  const headerAlignment = header?.headerAlignment || 'left'
  const isHeaderCentered = headerAlignment === 'center'

  // Content to render (shared between container and no-container versions)
  const content = (
    <>
      {/* Optional Header Section */}
      {header?.showHeader && (
        <div className={cn(
          "flex w-full max-w-3xl flex-col",
          isHeaderCentered && "mx-auto text-center"
        )}>
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
            <p className="mt-4 text-lg text-tertiary md:mt-5 md:text-xl">
              {header.description}
            </p>
          )}
        </div>
      )}

      {/* Cards Grid */}
      <div className={cn(header?.showHeader && 'mt-12 md:mt-16')}>
        <ul className={cn('grid w-full', gridHeightClass, gridGapClasses, gridClasses)}>
          {cards?.map((card, index) => {
              const iconData = typeof card.icon === 'object' ? card.icon : null
              const hasIcon = !!iconData?.svgCode

              // Select appropriate component based on whether icon exists
              const CardComponent = hasIcon
                ? cardComponentsWithIcon[cardLayout] || CardWithIcon
                : cardComponentsWithoutIcon[cardLayout] || CardText

              // Render footer button if link is enabled
              const footer =
                card.enableLink && card.link ? (
                  <UUIButton
                    label={card.link.label || 'Learn more'}
                    link={card.link}
                    className={cn(
                      // Override link variant colors for special backgrounds
                      (cardStyleValue === 'tertiary' || cardStyleValue === 'primary-reversed' || cardStyleValue === 'accent') &&
                      typeof card.link === 'object' &&
                      card.link.uuiColor === 'link' && [
                        // Tertiary: dark text on light gray background (both modes)
                        cardStyleValue === 'tertiary' && "[&]:!text-brand-700 [&_*[data-text]]:!text-brand-700 [&_*[data-icon]]:!text-brand-700 hover:[&]:!text-brand-900 hover:[&_*[data-text]]:!text-brand-900 hover:[&_*[data-icon]]:!text-brand-900",
                        // Primary-reversed: white text on dark bg (light mode), dark text on white bg (dark mode)
                        cardStyleValue === 'primary-reversed' && "[&]:!text-white dark:[&]:!text-brand-700 [&_*[data-text]]:!text-white dark:[&_*[data-text]]:!text-brand-700 [&_*[data-icon]]:!text-white dark:[&_*[data-icon]]:!text-brand-700 hover:[&]:!text-gray-200 dark:hover:[&]:!text-brand-900 hover:[&_*[data-text]]:!text-gray-200 dark:hover:[&_*[data-text]]:!text-brand-900 hover:[&_*[data-icon]]:!text-gray-200 dark:hover:[&_*[data-icon]]:!text-brand-900",
                        // Accent: white text on blue background (both modes)
                        cardStyleValue === 'accent' && "[&]:!text-white [&_*[data-text]]:!text-white [&_*[data-icon]]:!text-white hover:[&]:!text-gray-200 hover:[&_*[data-text]]:!text-gray-200 hover:[&_*[data-icon]]:!text-gray-200"
                      ]
                    )}
                  />
                ) : undefined

              // Prepare props
              const cardProps = hasIcon
                ? {
                    svgCode: iconData?.svgCode,
                    eyebrow: card.eyebrow || undefined,
                    title: card.title || '',
                    subtitle: card.description || undefined,
                    footer,
                  }
                : {
                    eyebrow: card.eyebrow || undefined,
                    title: card.title || '',
                    subtitle: card.description || undefined,
                    footer,
                  }

              return (
                <li
                  key={index}
                  className="flex w-full"
                >
                  <CardComponent
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    {...(cardProps as any)}
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
    <section className={cn('bg-primary', spacingClasses[spacingValue])}>
      <div className="mx-auto w-full max-w-container px-4 md:px-8">
        {content}
      </div>
    </section>
  )
}
