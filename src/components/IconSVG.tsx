import React from 'react'

interface IconSVGProps {
  svgCode: string
  className?: string
  'aria-label'?: string
}

/**
 * Renders inline SVG from svgCode string (server-side safe)
 * SVG must already be optimized with currentColor for color inheritance
 */
export const IconSVG: React.FC<IconSVGProps> = ({ svgCode, className, 'aria-label': ariaLabel }) => {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: svgCode }}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : undefined}
    />
  )
}
