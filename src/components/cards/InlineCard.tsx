'use client'

import React from 'react'
import type { FC, ReactNode } from 'react'
import { FeaturedIcon } from '@/components/uui/foundations/featured-icon/featured-icon'
import { cn } from '@/utilities/ui'
import { getBackgroundClasses, type BackgroundVariant } from '@/utilities/backgroundVariants'
import RichText from '@/components/RichText'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

interface InlineCardProps {
  eyebrow?: string
  icon?: FC<{ className?: string }>
  svgCode?: string
  title: string
  subtitle: DefaultTypedEditorState | string | undefined
  footer?: ReactNode
  cardStyle?: 'card' | 'centered-icon' | 'left-icon' | 'horizontal-icon' | 'elevated-box'
  cardBackground?: BackgroundVariant
  iconColor?: 'primary' | 'primary-reversed' | 'accent' | 'secondary' | 'tertiary' | 'outline'
  iconTheme?: 'rounded-square' | 'round'
}

export const InlineCard: React.FC<InlineCardProps> = ({
  eyebrow,
  icon,
  svgCode,
  title,
  subtitle,
  footer,
  cardStyle = 'card',
  cardBackground = 'none',
  iconColor = 'primary',
  iconTheme = 'rounded-square',
}) => {
  const cardStyleValue = cardBackground
  const iconColorValue = iconColor
  const iconShape = iconTheme

  // Use shared background variant system
  const cardBgClasses = getBackgroundClasses(cardStyleValue)

  // Determine padding based on style variant
  const isLineVariant = cardStyleValue === 'line'
  const isNoneVariant = cardStyleValue === 'none'
  const getCardPaddingClasses = () => {
    if (isLineVariant) {
      return 'py-5 md:py-6' // No horizontal padding for line variant
    }
    if (isNoneVariant) {
      return '' // No padding for none variant
    }
    return 'p-5 md:p-6' // Standard padding
  }

  // Text colors based on background variant
  const getTextClasses = () => {
    switch (cardStyleValue) {
      case 'primary':
        return {
          eyebrow: 'text-white dark:text-brand-500',
          heading: 'text-white dark:text-brand-500',
          description: 'text-white dark:text-brand-500',
        }
      case 'accent':
        return {
          eyebrow: 'text-white',
          heading: 'text-white',
          description: 'text-white',
        }
      case 'primary-reversed':
        return {
          eyebrow: 'text-brand-500 dark:text-white',
          heading: 'text-brand-500 dark:text-white',
          description: 'text-brand-500 dark:text-white',
        }
      case 'secondary':
        return {
          eyebrow: 'text-gray-900 dark:text-white',
          heading: 'text-gray-900 dark:text-white',
          description: 'text-gray-900 dark:text-white',
        }
      case 'tertiary':
        return {
          eyebrow: 'text-gray-900 dark:text-white',
          heading: 'text-gray-900 dark:text-white',
          description: 'text-gray-900 dark:text-white',
        }
      case 'outline':
        return {
          eyebrow: 'text-gray-900 dark:text-white',
          heading: 'text-gray-900 dark:text-white',
          description: 'text-gray-900 dark:text-white',
        }
      default:
        return {
          eyebrow: 'text-primary',
          heading: 'text-primary',
          description: 'text-secondary',
        }
    }
  }

  const textClasses = getTextClasses()
  const cardPaddingClasses = getCardPaddingClasses()
  const hasIcon = !!svgCode

  // Card variants with icon
  const CardWithIcon = () => (
    <div
      className={cn(
        'flex flex-col justify-between gap-4 h-full w-full',
        !isLineVariant && 'rounded-xl',
        cardPaddingClasses,
        cardBgClasses,
      )}
    >
      <div className="flex flex-col gap-4">
        <FeaturedIcon
          key="icon"
          icon={icon}
          svgCode={svgCode}
          size="lg"
          color={iconColorValue}
          shape={iconShape}
        />
        <div key="content">
          {eyebrow && (
            <span key="eyebrow" className={cn('text-lg font-semibold', textClasses.eyebrow)}>
              {eyebrow}
            </span>
          )}
          <h3
            key="title"
            className={cn('text-display-sm font-semibold', eyebrow && 'mt-2', textClasses.heading)}
          >
            {title}
          </h3>
          {subtitle && (
            <div key="subtitle" className={cn('mt-2 text-md', textClasses.description)}>
              {typeof subtitle === 'object' && 'root' in subtitle ? (
                <RichText
                  data={subtitle}
                  enableGutter={false}
                  enableProse={true}
                  className={cn(
                    cardStyleValue === 'primary' &&
                      '[&]:text-white! dark:[&]:text-brand-500! **:text-white! dark:**:text-brand-500!',
                    cardStyleValue === 'tertiary' &&
                      '[&]:text-brand-900! dark:[&]:text-white! **:text-brand-900! dark:**:text-white!',
                    cardStyleValue === 'outline' &&
                      '[&]:text-brand-900! dark:[&]:text-white! **:text-brand-900! dark:**:text-white!',
                    cardStyleValue === 'primary-reversed' &&
                      '[&]:text-brand-500! dark:[&]:text-white! **:text-brand-500! dark:**:text-white!',
                    cardStyleValue === 'secondary' &&
                      '[&]:text-brand-900! dark:[&]:text-white! **:text-brand-900! dark:**:text-white!',
                    cardStyleValue === 'accent' && '[&]:text-white! **:text-white!',
                  )}
                />
              ) : (
                <p>{subtitle}</p>
              )}
            </div>
          )}
        </div>
      </div>
      {footer && <div key="footer">{footer}</div>}
    </div>
  )

  const CardLeftIcon = () => (
    <div
      className={cn(
        'flex flex-col justify-between gap-4 h-full w-full',
        !isLineVariant && 'rounded-xl',
        cardPaddingClasses,
        cardBgClasses,
      )}
    >
      <div className="flex flex-col gap-4">
        <FeaturedIcon
          key="icon-desktop"
          icon={icon}
          svgCode={svgCode}
          size="lg"
          color={iconColorValue}
          shape={iconShape}
          className="hidden md:inline-flex"
        />
        <FeaturedIcon
          key="icon-mobile"
          icon={icon}
          svgCode={svgCode}
          size="md"
          color={iconColorValue}
          shape={iconShape}
          className="inline-flex md:hidden"
        />
        <div key="content">
          {eyebrow && (
            <span key="eyebrow" className={cn('text-lg font-semibold', textClasses.eyebrow)}>
              {eyebrow}
            </span>
          )}
          <h3
            key="title"
            className={cn('text-display-sm font-semibold', eyebrow && 'mt-2', textClasses.heading)}
          >
            {title}
          </h3>
          {subtitle && (
            <div key="subtitle" className={cn('mt-2 text-md', textClasses.description)}>
              {typeof subtitle === 'object' && 'root' in subtitle ? (
                <RichText
                  data={subtitle}
                  enableGutter={false}
                  enableProse={true}
                  className={cn(
                    cardStyleValue === 'primary' &&
                      '[&]:text-white! dark:[&]:text-brand-500! **:text-white! dark:**:text-brand-500!',
                    cardStyleValue === 'tertiary' &&
                      '[&]:text-brand-900! dark:[&]:text-white! **:text-brand-900! dark:**:text-white!',
                    cardStyleValue === 'outline' &&
                      '[&]:text-brand-900! dark:[&]:text-white! **:text-brand-900! dark:**:text-white!',
                    cardStyleValue === 'primary-reversed' &&
                      '[&]:text-brand-500! dark:[&]:text-white! **:text-brand-500! dark:**:text-white!',
                    cardStyleValue === 'secondary' &&
                      '[&]:text-brand-900! dark:[&]:text-white! **:text-brand-900! dark:**:text-white!',
                    cardStyleValue === 'accent' && '[&]:text-white! **:text-white!',
                  )}
                />
              ) : (
                <p>{subtitle}</p>
              )}
            </div>
          )}
        </div>
      </div>
      {footer && <div key="footer">{footer}</div>}
    </div>
  )

  const CardHorizontalIcon = () => (
    <div
      className={cn(
        'flex gap-4 h-full w-full',
        !isLineVariant && 'rounded-xl',
        cardPaddingClasses,
        cardBgClasses,
      )}
    >
      <FeaturedIcon
        key="icon-desktop"
        icon={icon}
        svgCode={svgCode}
        size="lg"
        color={iconColorValue}
        shape={iconShape}
        className="hidden md:inline-flex"
      />
      <FeaturedIcon
        key="icon-mobile"
        icon={icon}
        svgCode={svgCode}
        size="md"
        color={iconColorValue}
        shape={iconShape}
        className="inline-flex md:hidden"
      />
      <div key="content" className="flex flex-col justify-between items-start gap-4 flex-1">
        <div>
          {eyebrow && (
            <span key="eyebrow" className={cn('text-lg font-semibold', textClasses.eyebrow)}>
              {eyebrow}
            </span>
          )}
          <h3
            key="title"
            className={cn(
              'text-display-sm mt-1.5 font-semibold md:mt-2.5',
              eyebrow && 'mt-2',
              textClasses.heading,
            )}
          >
            {title}
          </h3>
          {subtitle && (
            <div key="subtitle" className={cn('mt-2 text-md', textClasses.description)}>
              {typeof subtitle === 'object' && 'root' in subtitle ? (
                <RichText
                  data={subtitle}
                  enableGutter={false}
                  enableProse={true}
                  className={cn(
                    cardStyleValue === 'primary' &&
                      '[&]:text-white! dark:[&]:text-brand-500! **:text-white! dark:**:text-brand-500!',
                    cardStyleValue === 'tertiary' &&
                      '[&]:text-brand-900! dark:[&]:text-white! **:text-brand-900! dark:**:text-white!',
                    cardStyleValue === 'outline' &&
                      '[&]:text-brand-900! dark:[&]:text-white! **:text-brand-900! dark:**:text-white!',
                    cardStyleValue === 'primary-reversed' &&
                      '[&]:text-brand-500! dark:[&]:text-white! **:text-brand-500! dark:**:text-white!',
                    cardStyleValue === 'secondary' &&
                      '[&]:text-brand-900! dark:[&]:text-white! **:text-brand-900! dark:**:text-white!',
                    cardStyleValue === 'accent' && '[&]:text-white! **:text-white!',
                  )}
                />
              ) : (
                <p>{subtitle}</p>
              )}
            </div>
          )}
        </div>
        {footer && <div key="footer">{footer}</div>}
      </div>
    </div>
  )

  const CardBoxWithIcon = () => (
    <div
      className={cn(
        'mt-6 flex flex-col justify-between items-center gap-4 text-center h-full w-full',
        !isLineVariant && 'rounded-xl',
        isLineVariant ? 'px-0 pb-2' : 'px-6 pb-2',
        cardBgClasses,
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <FeaturedIcon
          key="icon"
          icon={icon}
          svgCode={svgCode}
          size="lg"
          color={iconColorValue}
          shape={iconShape}
          className="-mt-6"
        />
        <div key="content">
          {eyebrow && (
            <span key="eyebrow" className={cn('text-lg font-semibold', textClasses.eyebrow)}>
              {eyebrow}
            </span>
          )}
          <h3
            key="title"
            className={cn('text-display-sm font-semibold', eyebrow && 'mt-2', textClasses.heading)}
          >
            {title}
          </h3>
          {subtitle && (
            <div key="subtitle" className={cn('mt-2 text-md', textClasses.description)}>
              {typeof subtitle === 'object' && 'root' in subtitle ? (
                <RichText
                  data={subtitle}
                  enableGutter={false}
                  enableProse={true}
                  className={cn(
                    cardStyleValue === 'primary' &&
                      '[&]:text-white! dark:[&]:text-brand-500! **:text-white! dark:**:text-brand-500!',
                    cardStyleValue === 'tertiary' &&
                      '[&]:text-brand-900! dark:[&]:text-white! **:text-brand-900! dark:**:text-white!',
                    cardStyleValue === 'outline' &&
                      '[&]:text-brand-900! dark:[&]:text-white! **:text-brand-900! dark:**:text-white!',
                    cardStyleValue === 'primary-reversed' &&
                      '[&]:text-brand-500! dark:[&]:text-white! **:text-brand-500! dark:**:text-white!',
                    cardStyleValue === 'secondary' &&
                      '[&]:text-brand-900! dark:[&]:text-white! **:text-brand-900! dark:**:text-white!',
                    cardStyleValue === 'accent' && '[&]:text-white! **:text-white!',
                  )}
                />
              ) : (
                <p>{subtitle}</p>
              )}
            </div>
          )}
        </div>
      </div>
      {footer && <div key="footer">{footer}</div>}
    </div>
  )

  const CardCenteredIcon = () => (
    <div
      className={cn(
        'flex flex-col justify-between items-center gap-4 text-center h-full w-full',
        !isLineVariant && 'rounded-xl',
        cardPaddingClasses,
        cardBgClasses,
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <FeaturedIcon
          key="icon-desktop"
          icon={icon}
          svgCode={svgCode}
          size="lg"
          color={iconColorValue}
          shape={iconShape}
          className="hidden md:inline-flex"
        />
        <FeaturedIcon
          key="icon-mobile"
          icon={icon}
          svgCode={svgCode}
          size="md"
          color={iconColorValue}
          shape={iconShape}
          className="inline-flex md:hidden"
        />
        <div key="content">
          {eyebrow && (
            <span key="eyebrow" className={cn('text-lg font-semibold', textClasses.eyebrow)}>
              {eyebrow}
            </span>
          )}
          <h3
            key="title"
            className={cn('text-display-sm font-semibold', eyebrow && 'mt-2', textClasses.heading)}
          >
            {title}
          </h3>
          {subtitle && (
            <div key="subtitle" className={cn('mt-2 text-md', textClasses.description)}>
              {typeof subtitle === 'object' && 'root' in subtitle ? (
                <RichText
                  data={subtitle}
                  enableGutter={false}
                  enableProse={true}
                  className={cn(
                    cardStyleValue === 'primary' &&
                      '[&]:text-white! dark:[&]:text-brand-500! **:text-white! dark:**:text-brand-500!',
                    cardStyleValue === 'tertiary' &&
                      '[&]:text-brand-900! dark:[&]:text-white! **:text-brand-900! dark:**:text-white!',
                    cardStyleValue === 'outline' &&
                      '[&]:text-brand-900! dark:[&]:text-white! **:text-brand-900! dark:**:text-white!',
                    cardStyleValue === 'primary-reversed' &&
                      '[&]:text-brand-500! dark:[&]:text-white! **:text-brand-500! dark:**:text-white!',
                    cardStyleValue === 'secondary' &&
                      '[&]:text-brand-900! dark:[&]:text-white! **:text-brand-900! dark:**:text-white!',
                    cardStyleValue === 'accent' && '[&]:text-white! **:text-white!',
                  )}
                />
              ) : (
                <p>{subtitle}</p>
              )}
            </div>
          )}
        </div>
      </div>
      {footer && <div key="footer">{footer}</div>}
    </div>
  )

  // Card variants without icon
  const CardText = () => (
    <div
      className={cn(
        'flex flex-col justify-between gap-4 h-full w-full',
        !isLineVariant && 'rounded-xl',
        cardPaddingClasses,
        cardBgClasses,
      )}
    >
      <div>
        {eyebrow && (
          <span key="eyebrow" className={cn('text-lg font-semibold', textClasses.eyebrow)}>
            {eyebrow}
          </span>
        )}
        <h3
          key="title"
          className={cn('text-display-sm font-semibold', eyebrow && 'mt-2', textClasses.heading)}
        >
          {title}
        </h3>
        {subtitle && (
          <div key="subtitle" className={cn('mt-1 text-md', textClasses.description)}>
            {typeof subtitle === 'object' && 'root' in subtitle ? (
              <RichText
                data={subtitle}
                enableGutter={false}
                enableProse={true}
                className={cn(
                  cardStyleValue === 'primary' &&
                    '[&]:text-white! dark:[&]:text-brand-500! **:text-white! dark:**:text-brand-500!',
                  cardStyleValue === 'tertiary' &&
                    '[&]:text-brand-900! dark:[&]:text-white! **:text-brand-900! dark:**:text-white!',
                  cardStyleValue === 'outline' &&
                    '[&]:text-brand-900! dark:[&]:text-white! **:text-brand-900! dark:**:text-white!',
                  cardStyleValue === 'primary-reversed' &&
                    '[&]:text-brand-500! dark:[&]:text-white! **:text-brand-500! dark:**:text-white!',
                  cardStyleValue === 'secondary' &&
                    '[&]:text-brand-900! dark:[&]:text-white! **:text-brand-900! dark:**:text-white!',
                  cardStyleValue === 'accent' && '[&]:text-white! **:text-white!',
                )}
              />
            ) : (
              <p>{subtitle}</p>
            )}
          </div>
        )}
      </div>
      {footer && <div key="footer">{footer}</div>}
    </div>
  )

  const CardTextCentered = () => (
    <div
      className={cn(
        'flex flex-col justify-between items-center gap-4 text-center h-full w-full',
        !isLineVariant && 'rounded-xl',
        cardPaddingClasses,
        cardBgClasses,
      )}
    >
      <div>
        {eyebrow && (
          <span key="eyebrow" className={cn('text-lg font-semibold', textClasses.eyebrow)}>
            {eyebrow}
          </span>
        )}
        <h3
          key="title"
          className={cn('text-display-sm font-semibold', eyebrow && 'mt-2', textClasses.heading)}
        >
          {title}
        </h3>
        {subtitle && (
          <div key="subtitle" className={cn('mt-1 text-md', textClasses.description)}>
            {typeof subtitle === 'object' && 'root' in subtitle ? (
              <RichText
                data={subtitle}
                enableGutter={false}
                enableProse={true}
                className={cn(
                  cardStyleValue === 'primary' &&
                    '[&]:text-white! dark:[&]:text-brand-500! **:text-white! dark:**:text-brand-500!',
                  cardStyleValue === 'tertiary' &&
                    '[&]:text-brand-900! dark:[&]:text-white! **:text-brand-900! dark:**:text-white!',
                  cardStyleValue === 'outline' &&
                    '[&]:text-brand-900! dark:[&]:text-white! **:text-brand-900! dark:**:text-white!',
                  cardStyleValue === 'primary-reversed' &&
                    '[&]:text-brand-500! dark:[&]:text-white! **:text-brand-500! dark:**:text-white!',
                  cardStyleValue === 'secondary' &&
                    '[&]:text-brand-900! dark:[&]:text-white! **:text-brand-900! dark:**:text-white!',
                  cardStyleValue === 'accent' && '[&]:text-white! **:text-white!',
                )}
              />
            ) : (
              <p>{subtitle}</p>
            )}
          </div>
        )}
      </div>
      {footer && <div key="footer">{footer}</div>}
    </div>
  )

  // Select appropriate variant
  const cardComponentsWithIcon = {
    card: CardWithIcon,
    'centered-icon': CardCenteredIcon,
    'left-icon': CardLeftIcon,
    'horizontal-icon': CardHorizontalIcon,
    'elevated-box': CardBoxWithIcon,
  }

  const cardComponentsWithoutIcon = {
    card: CardText,
    'centered-icon': CardTextCentered,
    'left-icon': CardText,
    'horizontal-icon': CardText,
    'elevated-box': CardText,
  }

  const Component = hasIcon
    ? cardComponentsWithIcon[cardStyle] || CardWithIcon
    : cardComponentsWithoutIcon[cardStyle] || CardText

  return <Component />
}
