'use client'
import React, { useState } from 'react'
import type { HeroHeadingBlock as HeroHeadingBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { OptimizedImage } from '@/components/OptimizedImage'
import type { Media } from '@/payload-types'
import { Typewriter } from 'motion-plus/react'
import { UUIButton } from '@/components/payload-ui/UUIButton'
import { HeroSplitImageMask } from '@/components/HeroSplitImageMask'
import { getBackgroundClasses, type BackgroundVariant } from '@/utilities/backgroundVariants'

export const HeroHeadingBlock: React.FC<HeroHeadingBlockProps> = ({
  headline,
  subtitle,
  headlineColor,
  subheadingColor,
  textAlignment,
  spacing,
  subtitleSize,
  bg,
  enableTypewriter,
  heroLayout,
  splitImage,
  heroBackground,
  buttons,
}) => {
  // Use defaults for any undefined values
  const finalTextAlignment = textAlignment ?? 'left'
  const finalSpacing = spacing ?? 'normal'
  const finalHeadlineColor = headlineColor ?? 'primary'
  const finalSubtitleSize = subtitleSize ?? 'normal'
  const finalSubheadingColor = subheadingColor ?? 'default'

  // Track when headline typing completes to start subtitle
  const [headlineComplete, setHeadlineComplete] = useState(!enableTypewriter)
  const [subtitleComplete, setSubtitleComplete] = useState(false)
  const [startSubtitle, setStartSubtitle] = useState(false)
  const [startHeadline, setStartHeadline] = useState(!enableTypewriter)

  // Split headline by lines for sequential typing with pauses
  // Use regex to handle both Unix (\n) and Windows (\r\n) line endings
  const headlineLines = headline?.split(/\r?\n/) || []
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [startCurrentLine, setStartCurrentLine] = useState(false)

  // Add initial delay before starting headline animation
  React.useEffect(() => {
    if (enableTypewriter && !startHeadline) {
      const timer = setTimeout(() => {
        setStartHeadline(true)
        setStartCurrentLine(true)
      }, 3000) // 3 second pause with cursor before headline starts
      return () => clearTimeout(timer)
    }
  }, [enableTypewriter, startHeadline])

  // Handle line-by-line typing with pauses
  const handleLineComplete = React.useCallback(() => {
    if (currentLineIndex < headlineLines.length - 1) {
      // More lines to type - pause then start next line
      setStartCurrentLine(false)
      setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1)
        setStartCurrentLine(true)
      }, 600) // 600ms pause between lines
    } else {
      // All lines complete
      setHeadlineComplete(true)
    }
  }, [currentLineIndex, headlineLines.length])

  // Add delay before starting subtitle animation
  React.useEffect(() => {
    if (headlineComplete && enableTypewriter) {
      const timer = setTimeout(() => {
        setStartSubtitle(true)
      }, 800) // 800ms pause before subtitle starts
      return () => clearTimeout(timer)
    }
  }, [headlineComplete, enableTypewriter])

  // New structure: bg.enabled and bg.heightVariant instead of fullHeight
  const bgEnabled = bg?.enabled === true
  const heightVariant = bg?.heightVariant || 'default'
  const isFullHeight = bgEnabled && heightVariant === 'fullHeight'
  const backgroundType = bgEnabled ? (bg?.type || 'none') : 'none'

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
      whiteSpace: 'pre-line',
    },
    small: {
      // 75% of normal size (25% reduction)
      fontSize: 'clamp(0.95rem, 2.25vw + 0.45rem, 2.925rem)',
      lineHeight: '1.35',
      whiteSpace: 'pre-line',
    },
  }

  // Don't render if no headline content
  if (!headline?.trim()) {
    return null
  }

  // Spacing for contained layouts (splitImage and standardContained)
  const containedSpacingClasses: Record<string, string> = {
    compact: 'py-12 lg:py-16',
    normal: 'py-16 lg:py-24',
    spacious: 'py-24 lg:py-32',
  }

  // Check if split image layout is selected
  if (heroLayout === 'splitImage') {
    const hasSplitImage = splitImage && typeof splitImage === 'object'
    const bgVariant = (heroBackground || 'primary') as BackgroundVariant

    return (
      <section className={containedSpacingClasses[finalSpacing]}>
        <div className="mx-auto max-w-container px-4 md:px-8">
          <div className={cn(
            'relative overflow-hidden rounded-2xl',
            getBackgroundClasses(bgVariant)
          )}>
            {hasSplitImage ? (
              <>
                {/* SVG Mask - covers ENTIRE container, centered diagonal slashes */}
                <HeroSplitImageMask className="absolute inset-0 z-10" backgroundVariant={bgVariant} />

                {/* Image - positioned to cover tinted areas, centered vertically, BEHIND mask */}
                <div className="absolute top-1/2 left-[34%] right-0 z-0 hidden h-full w-auto -translate-y-1/2 lg:block">
                  <OptimizedImage
                    resource={splitImage as Media}
                    alt={(splitImage as Media)?.alt || ''}
                    fill
                    priority
                    quality={90}
                    className="object-cover object-center"
                    sizes="66vw"
                  />
                </div>

                {/* Content Grid - sits ABOVE mask */}
                <div className="relative z-20 lg:grid lg:grid-cols-2 lg:items-start">
                  {/* Content Column - aligned to top for more button space */}
                  <div className="flex flex-col justify-start py-8 px-6 lg:py-24 lg:px-12">
                  {/* Headline - further reduced max size for split layout */}
                  <h1
                    className={cn('font-semibold', headlineColorClasses[finalHeadlineColor])}
                    style={{
                      whiteSpace: 'pre-line',
                      fontFamily: 'var(--font-poppins, Poppins)',
                      fontSize: 'clamp(1.75rem, 3.5vw + 0.5rem, 3rem)',
                      lineHeight: '1.2',
                      fontWeight: '700',
                    }}
                  >
                    {headline}
                  </h1>

                  {/* Mobile Image - appears between headline and subtitle */}
                  {hasSplitImage && (
                    <div className="relative -mx-6 my-8 h-64 lg:hidden">
                      <OptimizedImage
                        resource={splitImage as Media}
                        alt={(splitImage as Media)?.alt || ''}
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                      />
                    </div>
                  )}

                  {/* Subtitle - much smaller for split layout */}
                  {subtitle && (
                    <p
                      className={cn('mt-10 font-normal', subheadingColorClasses[finalSubheadingColor])}
                      style={{
                        fontSize: finalSubtitleSize === 'small'
                          ? 'clamp(0.75rem, 1.5vw + 0.2rem, 1rem)'    // Small: max 1rem (16px)
                          : 'clamp(0.875rem, 1.75vw + 0.25rem, 1.25rem)', // Normal: max 1.25rem (20px)
                        lineHeight: '1.5',
                      }}
                    >
                      {subtitle}
                    </p>
                  )}

                  {/* Buttons */}
                  {buttons && buttons.length > 0 && (
                    <div className="mt-8 flex flex-row flex-wrap justify-start gap-3 md:mt-12">
                      {buttons.map((button, index) => {
                        const { link } = button
                        return (
                          <UUIButton
                            key={index}
                            label={link?.label || `Button ${index + 1}`}
                            link={link}
                          />
                        )
                      })}
                    </div>
                  )}
                </div>

                  {/* Empty right column for spacing */}
                  <div className="hidden lg:block lg:min-h-96" />
                </div>
              </>
            ) : (
              // Full-width content (no image)
              <div className="py-16 px-6 lg:py-24 lg:px-12">
                <div className="max-w-3xl">
                  {/* Headline - further reduced max size for split layout */}
                  <h1
                    className={cn('font-semibold', headlineColorClasses[finalHeadlineColor])}
                    style={{
                      whiteSpace: 'pre-line',
                      fontFamily: 'var(--font-poppins, Poppins)',
                      fontSize: 'clamp(1.75rem, 3.5vw + 0.5rem, 3rem)',
                      lineHeight: '1.2',
                      fontWeight: '700',
                    }}
                  >
                    {headline}
                  </h1>

                  {/* Subtitle - much smaller for split layout */}
                  {subtitle && (
                    <p
                      className={cn('mt-10 font-normal', subheadingColorClasses[finalSubheadingColor])}
                      style={{
                        fontSize: finalSubtitleSize === 'small'
                          ? 'clamp(0.75rem, 1.5vw + 0.2rem, 1rem)'    // Small: max 1rem (16px)
                          : 'clamp(0.875rem, 1.75vw + 0.25rem, 1.25rem)', // Normal: max 1.25rem (20px)
                        lineHeight: '1.5',
                      }}
                    >
                      {subtitle}
                    </p>
                  )}

                  {/* Buttons */}
                  {buttons && buttons.length > 0 && (
                    <div className="mt-8 flex flex-row flex-wrap justify-start gap-3 md:mt-12">
                      {buttons.map((button, index) => {
                        const { link } = button
                        return (
                          <UUIButton
                            key={index}
                            label={link?.label || `Button ${index + 1}`}
                            link={link}
                          />
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  // Check if standard contained layout is selected
  if (heroLayout === 'standardContained') {
    const bgVariant = (heroBackground || 'primary') as BackgroundVariant

    return (
      <section className={containedSpacingClasses[finalSpacing]}>
        <div className="mx-auto max-w-container px-4 md:px-8">
          <div className={cn(
            'relative overflow-hidden rounded-2xl',
            getBackgroundClasses(bgVariant)
          )}>
            {/* Contained content - 75% width on desktop, alignment based on textAlignment setting */}
            <div className="py-16 px-6 lg:py-24 lg:px-12">
              <div className={cn(
                'w-full lg:w-[75%]',
                finalTextAlignment === 'center' ? 'mx-auto text-center' : 'text-left'
              )}>
                {/* Headline */}
                <h1
                  className={cn('font-semibold', headlineColorClasses[finalHeadlineColor])}
                  style={{
                    whiteSpace: 'pre-line',
                    fontFamily: 'var(--font-poppins, Poppins)',
                    fontSize: 'clamp(1.75rem, 3.5vw + 0.5rem, 3rem)',
                    lineHeight: '1.2',
                    fontWeight: '700',
                  }}
                >
                  {headline}
                </h1>

                {/* Subtitle */}
                {subtitle && (
                  <p
                    className={cn('mt-10 font-normal', subheadingColorClasses[finalSubheadingColor])}
                    style={{
                      fontSize: finalSubtitleSize === 'small'
                        ? 'clamp(0.75rem, 1.5vw + 0.2rem, 1rem)'    // Small: max 1rem (16px)
                        : 'clamp(0.875rem, 1.75vw + 0.25rem, 1.25rem)', // Normal: max 1.25rem (20px)
                      lineHeight: '1.5',
                    }}
                  >
                    {subtitle}
                  </p>
                )}

                {/* Buttons */}
                {buttons && buttons.length > 0 && (
                  <div className={cn(
                    'mt-8 flex flex-row flex-wrap gap-3 md:mt-12',
                    finalTextAlignment === 'center' ? 'justify-center' : 'justify-start'
                  )}>
                    {buttons.map((button, index) => {
                      const { link } = button
                      return (
                        <UUIButton
                          key={index}
                          label={link?.label || `Button ${index + 1}`}
                          link={link}
                        />
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
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

  // Gradient preset class mapping
  const gradientClasses: Record<string, string> = {
    'brand-radial': 'bg-gradient-hero-brand-radial',
    'accent-gradient': 'bg-gradient-hero-accent',
    'dark-light': 'bg-gradient-hero-dark-light',
  }

  return (
    <section
      data-hero-section
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
        <div className={cn('flex flex-col w-full', alignmentClasses[finalTextAlignment], enableTypewriter && 'relative')}>
          {/* Invisible placeholder layer in document flow to reserve full space */}
          {enableTypewriter && (
            <div className="flex flex-col w-full lg:w-[70%]" aria-hidden="true">
              <h1
                className={cn(
                  'mt-4 font-semibold invisible',
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
                  className={cn("mt-10 font-normal invisible", subheadingColorClasses[finalSubheadingColor])}
                  style={subtitleSizeStyles[finalSubtitleSize]}
                >
                  {subtitle}
                </h2>
              )}
            </div>
          )}

          {/* Visible content layer positioned absolutely over placeholder */}
          <div className={cn(
            'flex flex-col w-full lg:w-[70%]',
            enableTypewriter && 'absolute inset-0'
          )}>
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
              {enableTypewriter ? (
                <>
                  {headlineLines.map((line, index) => (
                    index <= currentLineIndex && (
                      <span key={index} style={{ display: 'block' }}>
                        <Typewriter
                          speed="normal"
                          variance="natural"
                          play={index === currentLineIndex ? startCurrentLine : false}
                          onComplete={index === currentLineIndex ? handleLineComplete : undefined}
                          cursorStyle={
                            index < currentLineIndex || headlineComplete
                              ? { display: 'none' }
                              : undefined
                          }
                        >
                          {line}
                        </Typewriter>
                      </span>
                    )
                  ))}
                </>
              ) : (
                headline
              )}
            </h1>
            {subtitle && (
              <h2
                className={cn(
                  "mt-10 font-normal",
                  subheadingColorClasses[finalSubheadingColor],
                )}
                style={subtitleSizeStyles[finalSubtitleSize]}
              >
                {enableTypewriter ? (
                  startSubtitle ? (
                    <Typewriter
                      speed="normal"
                      variance="natural"
                      onComplete={() => setSubtitleComplete(true)}
                      cursorStyle={subtitleComplete ? { display: 'none' } : undefined}
                    >
                      {subtitle}
                    </Typewriter>
                  ) : null
                ) : (
                  subtitle
                )}
              </h2>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
