'use client'

import React from 'react'
import type { FC, ReactNode } from 'react'
import { FeaturedIcon } from '@/components/uui/foundations/featured-icon/featured-icon'
import { cn } from '@/utilities/ui'
import { getBackgroundClasses, type BackgroundVariant } from '@/utilities/backgroundVariants'
import RichText from '@/components/RichText'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

interface InlineCardProps {
  icon?: FC<{ className?: string }>
  svgCode?: string
  content: DefaultTypedEditorState | string | undefined
  footer?: ReactNode
  cardStyle?: 'card' | 'centered-icon' | 'left-icon' | 'horizontal-icon' | 'elevated-box'
  cardBackground?: BackgroundVariant
  iconColor?: 'primary' | 'primary-reversed' | 'accent' | 'secondary' | 'tertiary' | 'outline'
  iconTheme?: 'rounded-square' | 'round'
}

export const InlineCard: React.FC<InlineCardProps> = ({
  icon,
  svgCode,
  content,
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
          content: 'text-white dark:text-brand-500',
        }
      case 'accent':
        return {
          content: 'text-white',
        }
      case 'primary-reversed':
        return {
          content: 'text-brand-500 dark:text-white',
        }
      case 'secondary':
        return {
          content: 'text-gray-900 dark:text-white',
        }
      case 'tertiary':
        return {
          content: 'text-gray-900 dark:text-white',
        }
      case 'outline':
        return {
          content: 'text-gray-900 dark:text-white',
        }
      default:
        return {
          content: 'text-secondary',
        }
    }
  }

  const textClasses = getTextClasses()
  const cardPaddingClasses = getCardPaddingClasses()
  const hasIcon = !!svgCode

  // Helper to render content (richtext or string)
  const renderContent = () => {
    if (!content) return null
    return (
      <div key="content" className={cn('text-md', textClasses.content)}>
        {typeof content === 'object' && 'root' in content ? (
          <RichText
            data={content}
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
          <p>{content}</p>
        )}
      </div>
    )
  }

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
        {renderContent()}
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
        {renderContent()}
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
      <div key="content-wrapper" className="flex flex-col justify-between items-start gap-4 flex-1">
        {renderContent()}
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
        {renderContent()}
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
        {renderContent()}
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
      {renderContent()}
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
      {renderContent()}
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
