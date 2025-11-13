'use client'
import React from 'react'
import type { HeroHeadingBlock as HeroHeadingBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { OptimizedImage } from '@/components/OptimizedImage'
import type { Media } from '@/payload-types'
import { UUIButton } from '@/components/payload-ui/UUIButton'
import { HeroSplitImageMask } from '@/components/HeroSplitImageMask'
import { getBackgroundClasses, type BackgroundVariant } from '@/utilities/backgroundVariants'

export const HeroHeadingBlock: React.FC<HeroHeadingBlockProps> = (props) => {
  const {
    headline,
    subtitle,
    headlineColor,
    textAlignment,
    spacing,
    bg,
    heroLayout,
    splitImage,
    heroBackground,
    buttons,
  } = props
  // @ts-expect-error - subheadingColor field exists in config but types need regeneration (CSS import issue prevents standalone type gen)
  const subheadingColor = props.subheadingColor

  // Use defaults for any undefined values
  const finalTextAlignment = textAlignment ?? 'left'
  const finalSpacing = spacing ?? 'normal'
  const finalHeadlineColor = headlineColor ?? 'primary'
  const finalSubheadingColor = subheadingColor ?? 'primary'

  // New structure: bg.enabled and bg.heightVariant instead of fullHeight
  const bgEnabled = bg?.enabled === true
  const heightVariant = bg?.heightVariant || 'default'
  const isFullHeight = bgEnabled && heightVariant === 'fullHeight'
  const backgroundType = bgEnabled ? (bg?.type || 'none') : 'none'

  // Headline color options - all maintain same color in both modes
  const headlineColorClasses: Record<string, string> = {
    primary: 'text-brand-500',   // Brand color (#031A43) in both modes
    white: 'text-white',         // White in both modes
    brand: 'text-accent-500',    // Accent blue in both modes
  }

  // Subheading color options - primary adapts to light/dark mode
  const subheadingColorClasses: Record<string, string> = {
    primary: 'text-brand-500 dark:text-white',           // Dark in light mode, white in dark mode
    'primary-reversed': 'text-white dark:text-brand-500', // White in light mode, dark in dark mode
    white: 'text-white',                                 // White in both modes
    brand: 'text-accent-500',                            // Accent blue in both modes
  }

  // Don't render if no headline content
  if (!headline?.trim()) {
    return null
  }

  // Spacing for contained layouts (splitImage and standardContained)
  const containedSpacingClasses: Record<string, string> = {
    minimal: 'py-6 lg:py-8',
    compact: 'py-12 lg:py-16',
    normal: 'py-16 lg:py-24',
    spacious: 'py-24 lg:py-32',
  }

  // Check if split image layout is selected
  if (heroLayout === 'splitImage') {
    const hasSplitImage = splitImage && typeof splitImage === 'object'
    const bgVariant = (heroBackground || 'primary') as BackgroundVariant

    const heroBgClasses = getBackgroundClasses(bgVariant)

    return (
      <section className={containedSpacingClasses[finalSpacing]}>
        <div className="mx-auto max-w-container px-4 md:px-8">
          <div className={cn(
            'relative overflow-hidden rounded-2xl',
            heroBgClasses
          )} style={{ border: 'none' }}>
            {hasSplitImage ? (
              <>
                {/* SVG with mask definition and image inside foreignObject */}
                <svg
                  className="absolute inset-[-2px] z-0 hidden lg:block"
                  viewBox="0 0 3486 1897"
                  preserveAspectRatio="xMidYMid slice"
                  aria-hidden="true"
                >
                  <defs>
                    <mask id="heroImageMask">
                      {/* White area on right - shows image (everything to the right of the diagonal) */}
                      <path
                        d="M1193.71 1897L2289 0H3486V1897H1193.71Z"
                        fill="white"
                      />
                    </mask>
                  </defs>

                  {/* Foreign object with image, mask applied */}
                  <foreignObject
                    width="3486"
                    height="1897"
                    mask="url(#heroImageMask)"
                  >
                    <div className="w-full h-full">
                      <OptimizedImage
                        resource={splitImage as Media}
                        alt={(splitImage as Media)?.alt || ''}
                        fill
                        priority
                        quality={90}
                        className="object-cover object-center"
                        sizes="(max-width: 1023px) 0vw, 66vw"
                      />
                    </div>
                  </foreignObject>
                </svg>

                {/* SVG Gradient Overlay - blue diagonal blocks on top */}
                <HeroSplitImageMask type="gradient" className="absolute inset-[-2px] z-10 hidden lg:block" />

                {/* Content Grid - sits ABOVE mask */}
                <div className="relative z-20 lg:grid lg:grid-cols-[3fr_1fr] lg:items-start">
                  {/* Content Column - aligned to top for more button space */}
                  <div className="flex flex-col justify-start py-8 px-6 lg:py-24 lg:px-12">
                  {/* Headline - further reduced max size for split layout */}
                      <h1
                      className={cn('font-semibold', headlineColorClasses[finalHeadlineColor])}
                      style={{
                        whiteSpace: 'pre-line',
                        fontFamily: 'var(--font-poppins, Poppins)',
                        fontSize: 'clamp(2rem, 3.5vw + 0.5rem, 3.2rem)',
                        lineHeight: '1.2',
                        fontWeight: '700',
                      }}>
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

                  {/* Subtitle */}
                  {subtitle && (
                      <h2
                      className={cn('mt-10 font-normal', subheadingColorClasses[finalSubheadingColor])}
                      style={{
                        whiteSpace: 'pre-line',
                        fontSize: 'var(--text-display-md)',
                        lineHeight: '1.2',
                      }}>
                      {subtitle}
                    </h2>
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
                    fontSize: 'clamp(2rem, 3.5vw + 0.5rem, 3.2rem)',
                    lineHeight: '1.2',
                    fontWeight: '700',
                  }}>
                  {headline}
                </h1>

                  {/* Subtitle */}
                  {subtitle && (
                      <h2
                      className={cn('mt-10 font-normal', subheadingColorClasses[finalSubheadingColor])}
                      style={{
                        whiteSpace: 'pre-line',
                        fontSize: 'var(--text-display-md)',
                        lineHeight: '1.2',
                      }}>
                      {subtitle}
                    </h2>
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

    const heroBgClasses = getBackgroundClasses(bgVariant)

    return (
      <section className={containedSpacingClasses[finalSpacing]}>
        <div className="mx-auto max-w-container px-4 md:px-8">
          <div className={cn(
            'relative overflow-hidden rounded-2xl',
            heroBgClasses
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
                    fontSize: 'clamp(2rem, 3.5vw + 0.5rem, 3.2rem)',
                    lineHeight: '1.2',
                    fontWeight: '700',
                  }}>
                  {headline}
                </h1>

                {/* Subtitle */}
                {subtitle && (
                  <h2
                    className={cn('mt-10 font-normal', subheadingColorClasses[finalSubheadingColor])}
                    style={{
                      whiteSpace: 'pre-line',
                      fontSize: 'var(--text-display-md)',
                      lineHeight: '1.2',
                    }}
                  >
                    {subtitle}
                  </h2>
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
  // MATHEMATICAL GUARANTEE: Top padding = Header height + Desired clearance
  // Mobile header: 72px (h-18), Desktop header: 80px (h-20)
  const spacingClasses: Record<string, string> = bgEnabled
    ? (isFullHeight
        ? {
            // Full height: Header clearance + extra visual breathing room
            // Mobile: calc(72px + 24px) = 96px, Desktop: calc(80px + 80px) = 160px
            minimal: 'pt-[calc(var(--header-height-mobile)+24px)] pb-6 lg:pt-[calc(var(--header-height-desktop)+80px)] lg:pb-8',
            compact: 'pt-[calc(var(--header-height-mobile)+56px)] pb-12 lg:pt-[calc(var(--header-height-desktop)+80px)] lg:pb-16',
            normal: 'pt-[calc(var(--header-height-mobile)+56px)] pb-16 lg:pt-[calc(var(--header-height-desktop)+80px)] lg:pb-24',
            spacious: 'pt-[calc(var(--header-height-mobile)+88px)] pb-24 lg:pt-[calc(var(--header-height-desktop)+112px)] lg:pb-32',
          }
        : {
            // Default height: Minimum clearance from header bottom
            // Mobile: calc(72px + 24px) = 96px, Desktop: calc(80px + 32px) = 112px
            minimal: 'pt-[calc(var(--header-height-mobile)+24px)] pb-6 md:pt-[calc(var(--header-height-desktop)+32px)] lg:pb-8',
            compact: 'pt-[calc(var(--header-height-mobile)+24px)] pb-12 md:pt-[calc(var(--header-height-desktop)+32px)] lg:pb-16',
            normal: 'pt-[calc(var(--header-height-mobile)+40px)] pb-16 md:pt-[calc(var(--header-height-desktop)+32px)] lg:pb-24',
            spacious: 'pt-[calc(var(--header-height-mobile)+56px)] pb-24 md:pt-[calc(var(--header-height-desktop)+80px)] lg:pb-32',
          })
    : {
        // No background: standard vertical padding (no header overlap)
        minimal: 'py-6 lg:py-8',
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
            <div
              className={cn(
                'max-w-[75%]',
                finalTextAlignment === 'center' && 'mx-auto'
              )}
            >
              <h2
                className={cn('mt-10 font-normal', subheadingColorClasses[finalSubheadingColor])}
                style={{
                  whiteSpace: 'pre-line',
                  fontSize: 'var(--text-display-md)',
                  lineHeight: '1.2',
                }}
              >
                {subtitle}
              </h2>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
