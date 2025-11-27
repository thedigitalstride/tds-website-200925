import React from 'react'
import type { BackgroundSection as BackgroundSectionProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { OptimizedImage } from '@/components/OptimizedImage'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import type { Media } from '@/payload-types'
import { BackgroundSectionClient } from './BackgroundSectionClient'
import { SectionHeader } from '@/components/SectionHeader'

export const BackgroundSectionBlock: React.FC<BackgroundSectionProps> = ({
  header,
  backgroundType,
  solidColor,
  gradient,
  backgroundImage,
  imageOverlay,
  imagePosition,
  enableParallax,
  customClass,
  contentBlocks,
  spacing,
  contentWidth,
  colorMode,
}) => {
  // Spacing classes
  const spacingClasses: Record<string, string> = {
    none: '',
    compact: 'py-12 lg:py-16',
    normal: 'py-16 lg:py-24',
    spacious: 'py-24 lg:py-32',
    extra: 'py-32 lg:py-48',
  }

  // Content width classes
  const contentWidthClasses: Record<string, string> = {
    container: 'max-w-container',
    wide: 'max-w-[1440px]',
    full: 'max-w-full',
  }

  // Background color classes
  const solidColorClasses: Record<string, string> = {
    primary: 'bg-primary',
    'primary-reversed': 'bg-brand-solid dark:bg-white',
    secondary: 'bg-secondary',
    tertiary: 'bg-tertiary',
    accent: 'bg-accent-solid',
    white: 'bg-white',
    dark: 'bg-brand-500',
  }

  // Gradient classes
  const gradientClasses: Record<string, string> = {
    'brand-radial': 'bg-gradient-radial from-brand-500 via-brand-600 to-brand-700',
    'accent-gradient': 'bg-gradient-to-br from-accent-400 to-accent-600',
    'dark-light': 'bg-gradient-to-b from-brand-600 to-transparent',
    sunrise: 'bg-gradient-to-br from-orange-400 via-red-500 to-pink-500',
    ocean: 'bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-500',
    'purple-haze': 'bg-gradient-to-br from-purple-400 via-purple-600 to-indigo-700',
  }

  // Image overlay classes
  const overlayClasses: Record<string, string> = {
    none: '',
    'light-20': 'bg-white/20',
    'light-40': 'bg-white/40',
    'light-60': 'bg-white/60',
    'dark-20': 'bg-black/20',
    'dark-40': 'bg-black/40',
    'dark-60': 'bg-black/60',
    'dark-80': 'bg-black/80',
    'brand-40': 'bg-brand-500/40',
    'brand-60': 'bg-brand-500/60',
  }

  // Image position classes
  const imagePositionClasses: Record<string, string> = {
    center: 'object-center',
    top: 'object-top',
    bottom: 'object-bottom',
    left: 'object-left',
    right: 'object-right',
  }

  // Content color mode classes
  const getContentColorClasses = (mode: string, backgroundType: string) => {
    if (mode === 'light') return 'text-white'
    if (mode === 'dark') return 'text-primary'

    // Auto mode - adapt based on background
    if (backgroundType === 'solid') {
      if (solidColor === 'accent' || solidColor === 'dark' || solidColor === 'primary-reversed') {
        return 'text-white'
      }
    }
    if (backgroundType === 'gradient') {
      return 'text-white' // Most gradients need white text
    }
    if (backgroundType === 'image' && imageOverlay && imageOverlay.startsWith('dark-')) {
      return 'text-white'
    }

    return 'text-primary' // Default
  }

  const contentColorClass = getContentColorClasses(
    colorMode || 'auto',
    backgroundType || 'none'
  )

  // Determine SectionHeader colorMode based on background and content color
  const getSectionHeaderColorMode = (): 'default' | 'light' | 'dark' => {
    // If header has explicit textColor, use that
    if (header?.textColor === 'light') return 'light'
    if (header?.textColor === 'dark') return 'dark'

    // Otherwise derive from contentColorClass
    if (contentColorClass === 'text-white') return 'light'
    return 'default'
  }

  const sectionHeaderColorMode = getSectionHeaderColorMode()

  // Determine background classes
  let backgroundClasses = ''
  if (backgroundType === 'solid' && solidColor) {
    backgroundClasses = solidColorClasses[solidColor] || ''
  } else if (backgroundType === 'gradient' && gradient) {
    backgroundClasses = gradientClasses[gradient] || ''
  } else if (backgroundType === 'custom' && customClass) {
    backgroundClasses = customClass
  }

  // Build the section content
  const sectionContent = (
    <>
      {/* Background Image */}
      {backgroundType === 'image' && backgroundImage && (
        <>
          <div
            className={cn(
              'absolute inset-0 -z-10 overflow-hidden',
              enableParallax && 'parallax-bg'
            )}
          >
            <div className={cn(
              'relative w-full',
              enableParallax ? 'h-[120%] -top-[10%]' : 'h-full'
            )}>
              <OptimizedImage
                resource={backgroundImage as Media}
                alt=""
                className={cn(
                  '!h-full !w-full object-cover',
                  imagePositionClasses[imagePosition || 'center']
                )}
                priority={true}
                fill={true}
                sizes="100vw"
              />
            </div>
          </div>
          {/* Image Overlay */}
          {imageOverlay && imageOverlay !== 'none' && (
            <div
              className={cn(
                'absolute inset-0 -z-10',
                overlayClasses[imageOverlay]
              )}
            />
          )}
        </>
      )}

      {/* Content Container */}
      <div
        className={cn(
          'relative mx-auto px-4 md:px-8',
          contentWidthClasses[contentWidth || 'container']
        )}
      >
        {/* Section Header */}
        {header?.showHeader && (
          <SectionHeader
            eyebrow={header.eyebrow || undefined}
            heading={header.heading || undefined}
            description={header.description || undefined}
            alignment={header.headerAlignment || 'center'}
            colorMode={sectionHeaderColorMode}
            headingLevel="h2"
            className="mb-12 lg:mb-16"
          />
        )}

        {/* Nested Content Blocks */}
        {contentBlocks && contentBlocks.length > 0 && (
          <RenderBlocks blocks={contentBlocks} disableInnerContainer />
        )}
      </div>
    </>
  )

  // Inner section classes with background and rounded corners
  const sectionClasses = cn(
    'relative overflow-hidden',
    spacingClasses[spacing || 'normal'],
    backgroundClasses,
    contentColorClass,
    // For container width: max-width should account for the padding that other blocks use
    // Other blocks have max-w-container with px-4/px-8 inside, so visible width is narrower
    // We subtract padding from max-width so background aligns with visible content
    contentWidth === 'container'
      ? 'mx-auto rounded-2xl'
      : 'w-full'
  )

  // Calculate the actual max-width for container mode
  // max-w-container is 1280px, we subtract 64px (32px padding on each side) = 1216px
  const containerStyle = contentWidth === 'container'
    ? { maxWidth: 'calc(1280px - 64px)' }
    : undefined

  // If parallax is enabled, use client component for interactivity
  if (enableParallax && backgroundType === 'image') {
    // For container width, wrap with proper padding to show rounded corners
    if (contentWidth === 'container') {
      return (
        <div className="w-full px-4 md:px-8">
          <BackgroundSectionClient
            className={sectionClasses}
            style={containerStyle}
            enableParallax={true}
          >
            {sectionContent}
          </BackgroundSectionClient>
        </div>
      )
    }
    // For full width, no wrapper padding needed
    return (
      <BackgroundSectionClient
        className={sectionClasses}
        enableParallax={true}
      >
        {sectionContent}
      </BackgroundSectionClient>
    )
  }

  // Otherwise render as regular server component
  // For container width, wrap with proper padding to show rounded corners
  if (contentWidth === 'container') {
    return (
      <div className="w-full px-4 md:px-8">
        <section className={sectionClasses} style={containerStyle}>
          {sectionContent}
        </section>
      </div>
    )
  }

  // For full width, no wrapper needed
  return (
    <section className={sectionClasses}>
      {sectionContent}
    </section>
  )
}