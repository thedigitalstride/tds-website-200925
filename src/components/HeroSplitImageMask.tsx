'use client'

import { cn } from '@/utilities/ui'

/**
 * HeroSplitImageMask Component
 *
 * Provides two separate SVG elements:
 * 1. Image mask (heroImageMask) - defines where image is visible (white) vs hidden (black)
 * 2. Gradient overlays - blue diagonal blocks that tint the image
 *
 * ViewBox: 3486 x 1897 (matches design file dimensions)
 * preserveAspectRatio: xMidYMid slice - keeps diagonal slashes centered, maintains aspect ratio
 */

interface HeroSplitImageMaskProps {
  className?: string
  type: 'mask' | 'gradient'
}

export const HeroSplitImageMask = ({ className, type }: HeroSplitImageMaskProps) => {
  if (type === 'mask') {
    return (
      <svg
        className={cn('pointer-events-none', className)}
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
      </svg>
    )
  }

  // type === 'gradient'
  return (
    <svg
      className={cn('pointer-events-none', className)}
      viewBox="0 0 3486 1897"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Blue diagonal gradient blocks overlay - positioned on top of image */}
      {/* Block 3: Darkest tint (left diagonal, opacity 0.75) */}
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
    </svg>
  )
}
