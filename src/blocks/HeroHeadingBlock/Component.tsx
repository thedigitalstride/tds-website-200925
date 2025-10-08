'use client'
import React from 'react'
import type { HeroHeadingBlock as HeroHeadingBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { OptimizedImage } from '@/components/OptimizedImage'
import type { Media } from '@/payload-types'

export const HeroHeadingBlock: React.FC<HeroHeadingBlockProps> = ({
  headline,
  subtitle,
  headlineColor,
  subheadingColor,
  textAlignment,
  spacing,
  subtitleSize,
  bg,
}) => {
  // Use defaults for any undefined values
  const finalTextAlignment = textAlignment ?? 'left'
  const finalSpacing = spacing ?? 'normal'
  const finalHeadlineColor = headlineColor ?? 'primary'
  const finalSubtitleSize = subtitleSize ?? 'normal'
  const finalSubheadingColor = subheadingColor ?? 'default'

  // New structure: bg.enabled and bg.heightVariant instead of fullHeight
  const bgEnabled = bg?.enabled === true
  const heightVariant = bg?.heightVariant || 'default'
  const isFullHeight = bgEnabled && heightVariant === 'fullHeight'
  const backgroundType = bgEnabled ? (bg?.type || 'none') : 'none'

  // Don't render if no headline content
  if (!headline?.trim()) {
    return null
  }

  // Spacing classes - when background enabled, always needs top padding for header
  const spacingClasses: Record<string, string> = bgEnabled
    ? (isFullHeight
        ? {
            // Full height: large top padding + min-h-screen for full viewport coverage
            compact: 'pt-32 pb-12 lg:pt-40 lg:pb-16',
            normal: 'pt-32 pb-16 lg:pt-40 lg:pb-24',
            spacious: 'pt-40 pb-24 lg:pt-48 lg:pb-32',
          }
        : {
            // Default height: just enough top padding to clear header, normal bottom padding
            compact: 'pt-24 pb-12 md:pt-28 lg:pb-16',
            normal: 'pt-28 pb-16 md:pt-32 lg:pb-24',
            spacious: 'pt-32 pb-24 md:pt-40 lg:pb-32',
          })
    : {
        // No background: standard vertical padding
        compact: 'py-12 lg:py-16',
        normal: 'py-16 lg:py-24',
        spacious: 'py-24 lg:py-32',
      }

  const alignmentClasses: Record<string, string> = {
    left: 'items-start text-left',
    center: 'items-center text-center',
  }

  // Brand color uses text-brand-700 which is dark blue in light mode
  // and automatically switches to lighter brand color in dark mode via theme
  const headlineColorClasses: Record<string, string> = {
    primary: 'text-primary',
    brand: 'text-accent-500 dark:text-accent-500',
  }

  // Subheading color classes
  const subheadingColorClasses: Record<string, string> = {
    default: 'text-brand-500 dark:text-white',
    white: 'text-white',
  }

  // Subtitle size variants
  const subtitleSizeStyles: Record<string, React.CSSProperties> = {
    normal: {
      fontSize: 'clamp(1.26rem, 3vw + 0.6rem, 3.9rem)',
      lineHeight: '1.3',
    },
    small: {
      // 75% of normal size (25% reduction)
      fontSize: 'clamp(0.95rem, 2.25vw + 0.45rem, 2.925rem)',
      lineHeight: '1.35',
    },
  }

  // Gradient preset class mapping
  const gradientClasses: Record<string, string> = {
    'brand-radial': 'bg-gradient-hero-brand-radial',
    'accent-gradient': 'bg-gradient-hero-accent',
    'dark-light': 'bg-gradient-hero-dark-light',
  }

  return (
    <section
      className={cn(
        'relative lg:flex lg:items-center',
        // Always pull section behind header when background is enabled
        bgEnabled && '-mt-18 md:-mt-20',
        // Add min-h-screen only for full height variant
        isFullHeight && 'min-h-screen',
        spacingClasses[finalSpacing],
      )}
    >
      {/* Background Layer - rendered when custom background is enabled */}
      {bgEnabled && backgroundType !== 'none' && (
        <div className={cn(
          "absolute inset-0 -z-10",
          // Always extend background to cover header area (top-[-72px] accounted for by -mt-18)
          backgroundType === 'image' && "top-[-72px] md:top-[-80px]"
        )}>
          {/* Gradient Background */}
          {backgroundType === 'gradient' && (
            <div
              className={cn(
                'absolute inset-0',
                gradientClasses[bg?.gradient || 'brand-radial']
              )}
            />
          )}

          {/* Image Background */}
          {backgroundType === 'image' && bg?.image && (
            <>
              <OptimizedImage
                resource={bg.image as Media}
                alt=""
                fill
                priority
                quality={90}
                sizes="100vw"
                className="object-cover"
              />
              {/* Overlay for text readability */}
              <div
                className="absolute inset-0 bg-black"
                style={{
                  opacity: (bg?.imageOpacity || 40) / 100,
                }}
              />
            </>
          )}

          {/* Custom Class Background */}
          {backgroundType === 'custom' && bg?.customClass && (
            <div className={cn('absolute inset-0', bg.customClass)} />
          )}
        </div>
      )}

      {/* Content Layer */}
      <div className={cn(
        "mx-auto max-w-container px-4 md:px-8 flex w-full items-center",
        // Add top padding when background extends behind header (to compensate for negative margin)
        bgEnabled && backgroundType === 'image' && "pt-18 md:pt-20"
      )}>
        <div className={cn('flex flex-col w-full', alignmentClasses[finalTextAlignment])}>
          <h1
            className={cn(
              'mt-4 font-semibold',
              headlineColorClasses[finalHeadlineColor],
            )}
            style={{
              whiteSpace: 'pre-line',
              fontFamily: 'var(--font-poppins, Poppins)',
              fontSize: 'clamp(2.1rem, 5vw + 1rem, 6.5rem)',
              lineHeight: '1.2',
              fontWeight: '700',
            }}
          >
            {headline}
          </h1>
          {subtitle && (
            <h2
              className={cn("mt-10 font-normal", subheadingColorClasses[finalSubheadingColor])}
              style={subtitleSizeStyles[finalSubtitleSize]}
            >
              {subtitle}
            </h2>
          )}
        </div>
      </div>
    </section>
  )
}
