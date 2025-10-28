import React from 'react'

interface IconSVGProps {
  svgCode: string
  className?: string
  'aria-label'?: string
}

/**
 * Renders inline SVG from svgCode string (server-side safe)
 * SVG must already be optimized with currentColor for color inheritance
 * Removes fixed width/height and adds responsive classes
 */
export const IconSVG: React.FC<IconSVGProps> = ({ svgCode, className, 'aria-label': ariaLabel }) => {
  // Remove width/height attributes and add className to SVG element
  const processedSvg = svgCode
    .replace(/\s+width="[^"]*"/g, '')
    .replace(/\s+height="[^"]*"/g, '')
    .replace(/<svg/, `<svg class="${className || ''}"`)

  return (
    <div
      dangerouslySetInnerHTML={{ __html: processedSvg }}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : undefined}
    />
  )
}
