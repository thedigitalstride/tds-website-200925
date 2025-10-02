'use client'

import React from 'react'
import type { FeaturesBlock as FeaturesBlockProps } from '@/payload-types'
import { getIcon } from '@/Header/utils/IconMap'
import {
  FeatureTextFeaturedIconTopCentered,
  FeatureTextIconCard,
  FeatureTextCentered,
  FeatureTextLeft,
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
  const cardStyle = layoutOptions?.cardStyle || 'card'
  const columns = layoutOptions?.columns || '3'
  const rawIconColor = layoutOptions?.iconColor || 'brand'
  const iconTheme = layoutOptions?.iconTheme || 'dark'
  const cardBackground = layoutOptions?.cardBackground || 'grey'

  // Map "white" to "gray" since FeaturedIcon doesn't have a white variant
  const iconColor = rawIconColor === 'white' ? 'gray' : (rawIconColor as 'brand' | 'gray' | 'success' | 'warning' | 'error')

  // Dynamic background classes based on cardBackground variant
  const getCardBackgroundClasses = (background: string) => {
    switch (background) {
      case 'brand':
        return 'bg-brand-solid text-white'
      case 'outline':
        return 'bg-transparent border border-gray-300'
      case 'line':
        return 'border-t-2 border-gray-300'
      case 'grey':
      default:
        return rawIconColor === 'white' ? 'bg-white' : 'bg-secondary'
    }
  }

  // Determine padding based on background variant
  const isLineVariant = cardBackground === 'line'
  const getCardPaddingClasses = () => {
    if (isLineVariant) {
      return 'py-5 md:py-6' // No horizontal padding for line variant
    }
    return 'p-5 md:p-6' // Standard padding
  }

  // Adjust text colors for brand background
  const getTextClasses = () => {
    if (cardBackground === 'brand') {
      return {
        heading: 'text-white',
        description: 'text-white/90'
      }
    }
    return {
      heading: 'text-primary',
      description: 'text-tertiary'
    }
  }

  const textClasses = getTextClasses()
  const cardPaddingClasses = getCardPaddingClasses()
  const cardBgClasses = getCardBackgroundClasses(cardBackground)

  // Increase row gap for centered-icon and elevated-box styles
  const needsExtraRowGap = cardStyle === 'centered-icon' || cardStyle === 'elevated-box'
  const gridGapClasses = needsExtraRowGap ? 'gap-x-6 gap-y-12 md:gap-y-16' : 'gap-6'

  const spacingClasses: Record<string, string> = {
    compact: 'py-12 lg:py-16',
    normal: 'py-16 lg:py-24',
    spacious: 'py-24 lg:py-32',
  }

  // Smart column logic: Auto full-width for single card
  const featureCount = features?.length || 0
  const columnClasses: Record<string, string> = {
    '2': 'sm:grid-cols-2',
    '3': 'sm:grid-cols-2 lg:grid-cols-3',
    '4': 'sm:grid-cols-2 lg:grid-cols-4',
  }

  // Override column classes if only one feature - make it full width and centered
  const gridClasses =
    featureCount === 1
      ? 'grid-cols-1 place-items-center'
      : cn('grid-cols-1', columnClasses[columns])

  // Wrapper components with dynamic icon color/theme support
  const FeatureCardWithIcon = ({ icon, title, subtitle, footer }: any) => (
    <div className={cn(
      "flex flex-col gap-4 md:inline-flex h-full rounded-md",
      cardPaddingClasses,
      cardBgClasses
    )}>
      <FeaturedIcon
        icon={icon}
        size="lg"
        color={iconColor}
        theme={iconTheme}
        className={rawIconColor === 'white' ? 'bg-white ring-1 ring-inset ring-gray-200' : undefined}
      />
      <div className="flex flex-col gap-4">
        <div>
          <h3 className={cn("text-lg font-semibold", textClasses.heading)}>{title}</h3>
          <p className={cn("mt-1 text-md", textClasses.description)}>{subtitle}</p>
        </div>
        {footer}
      </div>
    </div>
  )

  const FeatureLeftIconWithColors = ({ icon, title, subtitle, footer }: any) => (
    <div className={cn(
      "flex max-w-sm flex-col gap-4 h-full rounded-md",
      cardPaddingClasses,
      cardBgClasses
    )}>
      <FeaturedIcon
        icon={icon}
        size="lg"
        color={iconColor}
        theme={iconTheme}
        className={cn("hidden md:inline-flex", rawIconColor === 'white' ? 'bg-white ring-1 ring-inset ring-gray-200' : undefined)}
      />
      <FeaturedIcon
        icon={icon}
        size="md"
        color={iconColor}
        theme={iconTheme}
        className={cn("inline-flex md:hidden", rawIconColor === 'white' ? 'bg-white ring-1 ring-inset ring-gray-200' : undefined)}
      />
      <div>
        <h3 className={cn("text-lg font-semibold", textClasses.heading)}>{title}</h3>
        <p className={cn("mt-1 text-md", textClasses.description)}>{subtitle}</p>
      </div>
      {footer}
    </div>
  )

  const FeatureHorizontalIconWithColors = ({ icon, title, subtitle, footer }: any) => (
    <div className={cn(
      "flex max-w-140 gap-4 h-full rounded-md",
      cardPaddingClasses,
      cardBgClasses
    )}>
      <FeaturedIcon
        icon={icon}
        size="lg"
        color={iconColor}
        theme={iconTheme}
        className={cn("hidden md:inline-flex", rawIconColor === 'white' ? 'bg-white ring-1 ring-inset ring-gray-200' : undefined)}
      />
      <FeaturedIcon
        icon={icon}
        size="md"
        color={iconColor}
        theme={iconTheme}
        className={cn("inline-flex md:hidden", rawIconColor === 'white' ? 'bg-white ring-1 ring-inset ring-gray-200' : undefined)}
      />
      <div className="flex flex-col items-start gap-4">
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
      "mt-6 flex max-w-sm flex-col items-center gap-4 rounded-md text-center h-full",
      isLineVariant ? 'px-0 pb-8' : 'px-6 pb-8',
      cardBgClasses
    )}>
      <FeaturedIcon
        icon={icon}
        size="lg"
        color={iconColor}
        theme={iconTheme}
        className={cn("-mt-6", rawIconColor === 'white' ? 'bg-white ring-1 ring-inset ring-gray-200' : undefined)}
      />
      <div>
        <h3 className={cn("text-lg font-semibold", textClasses.heading)}>{title}</h3>
        <p className={cn("mt-1 text-md", textClasses.description)}>{subtitle}</p>
      </div>
      {footer}
    </div>
  )

  // Map card style to component (with and without icon variants)
  const cardComponentsWithIcon = {
    card: FeatureCardWithIcon,
    'centered-icon': FeatureTextFeaturedIconTopCentered,
    'left-icon': FeatureLeftIconWithColors,
    'horizontal-icon': FeatureHorizontalIconWithColors,
    'simple-card': FeatureTextIconCard,
    'elevated-box': FeatureBoxWithIcon,
  }

  // Wrapper components that maintain card styling without icons
  const FeatureTextCard = ({ title, subtitle, footer }: { title: string; subtitle: string; footer?: React.ReactNode }) => (
    <div className={cn(
      "flex flex-col gap-4 md:inline-flex h-full rounded-md",
      cardPaddingClasses,
      cardBgClasses
    )}>
      <div className="flex flex-col gap-4">
        <div>
          <h3 className={cn("text-lg font-semibold", textClasses.heading)}>{title}</h3>
          <p className={cn("mt-1 text-md", textClasses.description)}>{subtitle}</p>
        </div>
        {footer}
      </div>
    </div>
  )

  const FeatureSimpleCard = ({ title, subtitle, footer }: { title: string; subtitle: string; footer?: React.ReactNode }) => (
    <div className={cn(
      "flex flex-col gap-4 md:max-w-71.5 h-full rounded-md",
      cardPaddingClasses,
      cardBgClasses
    )}>
      <div className="flex flex-col gap-4">
        <div>
          <h3 className={cn("text-lg font-semibold", textClasses.heading)}>{title}</h3>
          <p className={cn("mt-1 text-md", textClasses.description)}>{subtitle}</p>
        </div>
        {footer}
      </div>
    </div>
  )

  const cardComponentsWithoutIcon = {
    card: FeatureTextCard,
    'centered-icon': FeatureTextCentered,
    'left-icon': FeatureTextLeft,
    'horizontal-icon': FeatureTextLeft,
    'simple-card': FeatureSimpleCard,
    'elevated-box': FeatureTextCard,
  }

  return (
    <section className={cn('bg-primary', spacingClasses[spacing])}>
      <div className="mx-auto w-full max-w-container px-4 md:px-8">
        {/* Optional Header Section */}
        {header?.showHeader && (
          <div className="flex w-full max-w-3xl flex-col">
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
                ? cardComponentsWithIcon[cardStyle] || FeatureTextIconCard
                : cardComponentsWithoutIcon[cardStyle] || FeatureTextLeft

              // Render footer button if link is enabled
              // Override link button colors for brand background to ensure proper contrast
              const buttonColor = typeof feature.link === 'object' && feature.link?.uuiColor
                ? feature.link.uuiColor
                : 'link-color' // Default is link-color

              // Only override if it's a link-style button (link-gray or link-color) on brand background
              const isLinkVariant = buttonColor === 'link-gray' || buttonColor === 'link-color'
              const needsWhiteText = cardBackground === 'brand' && isLinkVariant

              const footer =
                feature.enableLink && feature.link ? (
                  <UUIButton
                    label={feature.link.label || 'Learn more'}
                    link={feature.link}
                    className={needsWhiteText ? 'text-white hover:text-white/90' : undefined}
                  />
                ) : undefined

              // Prepare props for icon components
              const iconProps = hasIcon
                ? {
                    icon: IconComponent,
                    ...(cardStyle === 'centered-icon'
                      ? {
                          color: iconColor,
                          theme: iconTheme,
                        }
                      : {}),
                  }
                : {}

              return (
                <li
                  key={index}
                  className={cn(
                    'flex',
                    featureCount === 1 ? 'w-full max-w-2xl' : undefined
                  )}
                >
                  <CardComponent
                    {...iconProps}
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
