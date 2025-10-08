'use client'

import React from 'react'
import type { FeaturesBlock as FeaturesBlockProps } from '@/payload-types'
import { getIcon } from '@/Header/utils/IconMap'
import {
  FeatureTextFeaturedIconTopCentered,
} from '@/components/uui/marketing/features/base-components/feature-text'
import { FeaturedIcon } from '@/components/uui/foundations/featured-icon/featured-icon'
import { UUIButton } from '@/components/payload-ui'
import { cn } from '@/utilities/ui'

export const FeaturesBlock: React.FC<FeaturesBlockProps> = ({
  header,
  features,
  layoutOptions,
}) => {
  const spacing = layoutOptions?.spacing || 'normal'
  const cardLayout = layoutOptions?.cardStyle || 'card' // cardStyle field now controls layout
  const columns = layoutOptions?.columns || '3'
  const iconColor = (layoutOptions?.iconColor || 'brand') as 'brand' | 'accent' | 'secondary' | 'tertiary'
  const iconShape = (layoutOptions?.iconTheme || 'rounded-square') as 'rounded-square' | 'round'
  const cardStyle = layoutOptions?.cardBackground || 'accent' // cardBackground field now controls visual style

  // Dynamic background classes based on cardStyle variant
  const getCardBackgroundClasses = (style: string) => {
    switch (style) {
      case 'brand':
        default:
        return 'bg-brand-50/30 dark:bg-brand-700'
      case 'outline':
        return 'bg-transparent border border-gray-300'
      case 'line':
        return 'border-t-2 border-gray-300'
      case 'accent':
        return 'bg-accent-500'
      case 'grey':
        return 'bg-black/5 dark:bg-black/25'
    }
  }

  // Determine padding based on style variant
  const isLineVariant = cardStyle === 'line'
  const getCardPaddingClasses = () => {
    if (isLineVariant) {
      return 'py-5 md:py-6' // No horizontal padding for line variant
    }
    return 'p-5 md:p-6' // Standard padding
  }

  // Adjust text colors - white text for brand variant in light mode, brand text in dark mode
  const getTextClasses = () => {
    if (cardStyle === 'brand') {
      return {
        heading: 'text-primary dark:text-white',
        description: 'text-primary/80 dark:text-white/80'
      }
    }
    return {
      heading: 'text-primary dark:text-white',
      description: 'text-primary/80 dark:text-white/80'
    }
  }

  const textClasses = getTextClasses()
  const cardPaddingClasses = getCardPaddingClasses()
  const cardBgClasses = getCardBackgroundClasses(cardStyle)

  // Increase row gap for centered-icon and elevated-box layouts
  const needsExtraRowGap = cardLayout === 'centered-icon' || cardLayout === 'elevated-box'
  const gridGapClasses = needsExtraRowGap ? 'gap-x-6 gap-y-12 md:gap-y-16' : 'gap-6'

  const spacingClasses: Record<string, string> = {
    compact: 'py-12 lg:py-16',
    normal: 'py-16 lg:py-24',
    spacious: 'py-24 lg:py-32',
  }

  // Smart column logic: Auto full-width for single card
  const featureCount = features?.length || 0
  const columnClasses: Record<string, string> = {
    '1': 'grid-cols-1',
    '2': 'sm:grid-cols-2',
    '3': 'sm:grid-cols-2 lg:grid-cols-3',
    '4': 'sm:grid-cols-2 lg:grid-cols-4',
  }

  // Override column classes if only one feature or explicitly set to 1 column
  const isFullWidth = featureCount === 1 || columns === '1'
  const gridClasses = isFullWidth
    ? 'grid-cols-1'
    : cn('grid-cols-1', columnClasses[columns])

  // Wrapper components with dynamic icon color/shape support
  const FeatureCardWithIcon = ({ icon, title, subtitle, footer }: any) => (
    <div className={cn(
      "flex flex-col justify-between gap-4 h-full w-full",
      !isLineVariant && "rounded-md",
      cardPaddingClasses,
      cardBgClasses
    )}>
      <div className="flex flex-col gap-4">
        <FeaturedIcon
          icon={icon}
          size="lg"
          color={iconColor}
          shape={iconShape}
        />
        <div>
          <h3 className={cn("text-lg font-semibold", textClasses.heading)}>{title}</h3>
          <p className={cn("mt-1 text-md", textClasses.description)}>{subtitle}</p>
        </div>
      </div>
      {footer}
    </div>
  )

  const FeatureLeftIconWithColors = ({ icon, title, subtitle, footer }: any) => (
    <div className={cn(
      "flex flex-col justify-between gap-4 h-full w-full",
      !isLineVariant && "rounded-md",
      cardPaddingClasses,
      cardBgClasses
    )}>
      <div className="flex flex-col gap-4">
        <FeaturedIcon
          icon={icon}
          size="lg"
          color={iconColor}
          shape={iconShape}
          className="hidden md:inline-flex"
        />
        <FeaturedIcon
          icon={icon}
          size="md"
          color={iconColor}
          shape={iconShape}
          className="inline-flex md:hidden"
        />
        <div>
          <h3 className={cn("text-lg font-semibold", textClasses.heading)}>{title}</h3>
          <p className={cn("mt-1 text-md", textClasses.description)}>{subtitle}</p>
        </div>
      </div>
      {footer}
    </div>
  )

  const FeatureHorizontalIconWithColors = ({ icon, title, subtitle, footer }: any) => (
    <div className={cn(
      "flex gap-4 h-full w-full",
      !isLineVariant && "rounded-md",
      cardPaddingClasses,
      cardBgClasses
    )}>
      <FeaturedIcon
        icon={icon}
        size="lg"
        color={iconColor}
        shape={iconShape}
        className="hidden md:inline-flex"
      />
      <FeaturedIcon
        icon={icon}
        size="md"
        color={iconColor}
        shape={iconShape}
        className="inline-flex md:hidden"
      />
      <div className="flex flex-col justify-between items-start gap-4 flex-1">
        <div>
          <h3 className={cn("mt-1.5 text-lg font-semibold md:mt-2.5", textClasses.heading)}>{title}</h3>
          <p className={cn("mt-1 text-md", textClasses.description)}>{subtitle}</p>
        </div>
        {footer}
      </div>
    </div>
  )

  const FeatureBoxWithIcon = ({ icon, title, subtitle, footer }: any) => (
    <div className={cn(
      "mt-6 flex flex-col justify-between items-center gap-4 text-center h-full w-full",
      !isLineVariant && "rounded-md",
      isLineVariant ? 'px-0 pb-8' : 'px-6 pb-8',
      cardBgClasses
    )}>
      <div className="flex flex-col items-center gap-4">
        <FeaturedIcon
          icon={icon}
          size="lg"
          color={iconColor}
          shape={iconShape}
          className="-mt-6"
        />
        <div>
          <h3 className={cn("text-lg font-semibold", textClasses.heading)}>{title}</h3>
          <p className={cn("mt-1 text-md", textClasses.description)}>{subtitle}</p>
        </div>
      </div>
      {footer}
    </div>
  )

  // Map card layout to component (with and without icon variants)
  const cardComponentsWithIcon = {
    card: FeatureCardWithIcon,
    'centered-icon': FeatureTextFeaturedIconTopCentered,
    'left-icon': FeatureLeftIconWithColors,
    'horizontal-icon': FeatureHorizontalIconWithColors,
    'elevated-box': FeatureBoxWithIcon,
  }

  // Wrapper components that maintain card styling without icons
  const FeatureTextCard = ({ title, subtitle, footer }: { title: string; subtitle: string; footer?: React.ReactNode }) => (
    <div className={cn(
      "flex flex-col justify-between gap-4 h-full w-full",
      !isLineVariant && "rounded-md",
      cardPaddingClasses,
      cardBgClasses
    )}>
      <div>
        <h3 className={cn("text-lg font-semibold", textClasses.heading)}>{title}</h3>
        <p className={cn("mt-1 text-md", textClasses.description)}>{subtitle}</p>
      </div>
      {footer}
    </div>
  )

  // Custom wrapper for centered text layout with card styling
  const FeatureTextCenteredWithCard = ({ title, subtitle, footer }: { title: string; subtitle: string; footer?: React.ReactNode }) => (
    <div className={cn(
      "flex flex-col justify-between items-center gap-4 text-center h-full w-full",
      !isLineVariant && "rounded-md",
      cardPaddingClasses,
      cardBgClasses
    )}>
      <div>
        <h3 className={cn("text-lg font-semibold", textClasses.heading)}>{title}</h3>
        <p className={cn("mt-1 text-md", textClasses.description)}>{subtitle}</p>
      </div>
      {footer}
    </div>
  )

  // Custom wrapper for left-aligned text layout with card styling
  const FeatureTextLeftWithCard = ({ title, subtitle, footer }: { title: string; subtitle: string; footer?: React.ReactNode }) => (
    <div className={cn(
      "flex flex-col justify-between gap-4 h-full w-full",
      !isLineVariant && "rounded-md",
      cardPaddingClasses,
      cardBgClasses
    )}>
      <div>
        <h3 className={cn("text-lg font-semibold", textClasses.heading)}>{title}</h3>
        <p className={cn("mt-1 text-md", textClasses.description)}>{subtitle}</p>
      </div>
      {footer}
    </div>
  )

  const cardComponentsWithoutIcon = {
    card: FeatureTextCard,
    'centered-icon': FeatureTextCenteredWithCard,
    'left-icon': FeatureTextLeftWithCard,
    'horizontal-icon': FeatureTextLeftWithCard,
    'elevated-box': FeatureTextCard,
  }

  // Header alignment
  const headerAlignment = header?.headerAlignment || 'left'
  const isHeaderCentered = headerAlignment === 'center'

  return (
    <section className={cn('bg-primary', spacingClasses[spacing])}>
      <div className="mx-auto w-full max-w-container px-4 md:px-8">
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

        {/* Features Grid */}
        <div className={cn('mt-12 md:mt-16', !header?.showHeader && 'mt-0')}>
          <ul className={cn('grid w-full auto-rows-fr', gridGapClasses, gridClasses)}>
            {features?.map((feature, index) => {
              const IconComponent = getIcon(feature.icon ?? undefined)
              const hasIcon = !!IconComponent

              // Select appropriate component based on whether icon exists
              const CardComponent = hasIcon
                ? cardComponentsWithIcon[cardLayout] || FeatureCardWithIcon
                : cardComponentsWithoutIcon[cardLayout] || FeatureTextCard

              // Render footer button if link is enabled
              // No longer override link button colors - let them use their default styles
              const footer =
                feature.enableLink && feature.link ? (
                  <UUIButton
                    label={feature.link.label || 'Learn more'}
                    link={feature.link}
                  />
                ) : undefined

              // Prepare props for icon components
              const iconProps = hasIcon
                ? {
                    icon: IconComponent,
                    ...(cardLayout === 'centered-icon'
                      ? {
                          color: iconColor,
                          shape: iconShape,
                        }
                      : {}),
                  }
                : {}

              return (
                <li
                  key={index}
                  className="flex w-full"
                >
                  <CardComponent
                    {...(iconProps as any)}
                    title={feature.title || ''}
                    subtitle={feature.description || ''}
                    footer={footer}
                  />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
