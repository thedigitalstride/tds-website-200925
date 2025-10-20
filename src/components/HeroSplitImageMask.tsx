'use client'

import { cn } from '@/utilities/ui'
import type { BackgroundVariant } from '@/utilities/backgroundVariants'

/**
 * HeroSplitImageMask Component
 *
 * Creates a gradient overlay with 3 diagonal blocks matching the uploaded hero-mask.svg design.
 * Uses accent blue (#1689FF) with varying opacity (0.25, 0.5, 0.75) to create a tint effect.
 * Left side matches the background variant color dynamically.
 *
 * ViewBox: 3486 x 1897 (matches design file dimensions)
 * preserveAspectRatio: xMidYMid slice - keeps diagonal slashes centered, maintains aspect ratio
 */

interface HeroSplitImageMaskProps {
  className?: string
  backgroundVariant?: BackgroundVariant | 'white'
}

export const HeroSplitImageMask = ({ className, backgroundVariant = 'white' }: HeroSplitImageMaskProps) => {
  // Map background variants to their corresponding text color classes for the SVG fill
  // IMPORTANT: SVG mask needs OPAQUE colors, not transparent ones, or the image shows through
  // Uses custom --color-mask-* variables that match the visual appearance of transparent backgrounds
  const getMaskColorClasses = (variant: BackgroundVariant | 'white'): string => {
    switch (variant) {
      case 'primary':
        // 'primary' uses bg at 30% opacity, mask uses calculated opaque equivalent rgb(247 248 252)
        return 'text-[rgb(247_248_252)] dark:text-brand-700'
      case 'white':
        return 'text-brand-50 dark:text-brand-900'
      case 'accent':
        return 'text-accent-500 dark:text-accent-600'
      case 'secondary':
        // 'secondary' uses transparent with border
        return 'text-transparent'
      case 'line':
        return 'text-transparent'
      default:
        return 'text-brand-50 dark:text-brand-900'
    }
  }

  return (
    <svg
      className={cn('pointer-events-none', getMaskColorClasses(backgroundVariant), className)}
      viewBox="0 0 3486 1897"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="heroMaskClip">
          <rect width="3486" height="1897" />
        </clipPath>
      </defs>

      <g clipPath="url(#heroMaskClip)">
        {/* Left side: uses currentColor which is now explicitly set to brand-50 (light) / brand-900 (dark) */}
        <path
          d="M-371 0L-371 948.5L-371 1897H1193.71L2289 0H-371Z"
          fill="currentColor"
        />

        {/* Block 3: Darkest tint (left diagonal, opacity 0.75) - starts where left side ends */}
        <path
          opacity="0.75"
          d="M2289 0L1193.71 1897H1640L2735 0H2289Z"
          fill="#1689FF"
        />

        {/* Block 2: Medium tint (middle, opacity 0.5) - starts where Block 3 ends */}
        <path
          opacity="0.5"
          d="M2735 0L1640 1897H2085L3180 0H2735Z"
          fill="#1689FF"
        />

        {/* Block 1: Lightest tint (rightmost, opacity 0.25) - starts where Block 2 ends */}
        <path
          opacity="0.25"
          d="M3180 0L2085 1897H2530L3626 0H3180Z"
          fill="#1689FF"
        />
      </g>
    </svg>
  )
}
