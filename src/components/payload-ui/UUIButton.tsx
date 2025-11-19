'use client'

import React from 'react'
import { Button } from '@/components/uui/button'
import type { ButtonProps } from '@/components/uui/button'
import { getPageUrl } from '@/utilities/pageHelpers'
import { getIcon } from '@/Header/utils/IconMap'
import { IconSVG } from '@/components/IconSVG'

/**
 * Payload-adapted UntitledUI Button component
 *
 * This component adapts UUI's Button for use in Payload CMS blocks.
 * It handles common Payload patterns like link objects and provides
 * a simpler API for content editors.
 */

// Use the generated Payload link types directly
import type { Page, Post, Icon } from '@/payload-types'

export interface PayloadLinkObject {
  type?: 'reference' | 'custom' | null
  url?: string | null
  label?: string | null
  newTab?: boolean | null
  reference?:
    | ({ relationTo: 'pages'; value: string | number | Page } | null)
    | ({ relationTo: 'posts'; value: string | number | Post } | null)
  // UUI Button styling properties
  uuiColor?: 'primary' | 'primary-reversed' | 'accent' | 'secondary' | 'tertiary' | 'outline' | 'link' | 'link-gray' | 'link-color' | 'primary-destructive' | 'secondary-destructive' | 'tertiary-destructive' | 'link-destructive' | null
  uuiSize?: 'sm' | 'md' | 'lg' | 'xl' | null
  // Button icon properties (new system with visual selector)
  buttonIconConfig?: {
    icon?: string | number | Icon | null
    position?: 'leading' | 'trailing' | null
  } | null
  // Legacy button icon properties (for backward compatibility)
  buttonIcon?: string | null
  iconPos?: 'leading' | 'trailing' | null
}

export interface UUIButtonProps extends Omit<ButtonProps, 'children' | 'href'> {
  /** Button text content */
  label?: string
  /** Payload link object or simple URL string */
  link?: PayloadLinkObject | string
  /** Icon from @untitledui/icons */
  icon?: React.FC<{ className?: string }>
  /** Icon position */
  iconPosition?: 'leading' | 'trailing'
  /** Custom class names */
  className?: string
}

/**
 * Convert Payload link object to href string
 */
function getLinkHref(link?: PayloadLinkObject | string): string | undefined {
  if (typeof link === 'string') {
    return link
  }

  if (!link) return undefined

  if (link.type === 'custom' && link.url) {
    return link.url || undefined
  }

  if (link.type === 'reference' && link.reference) {
    const { value, relationTo } = link.reference

    // Handle string or number ID references (unpopulated)
    if (typeof value === 'string' || typeof value === 'number') {
      return `/${relationTo}/${value}`
    }

    // Handle populated object references
    if (typeof value === 'object' && value?.slug) {
      // For pages, use the getPageUrl helper to support nested URLs with breadcrumbs
      if (relationTo === 'pages') {
        return getPageUrl(value as Page)
      }
      // For posts, use the existing logic
      return `/${relationTo}/${value.slug}`
    }
  }

  return link.url || undefined
}

/**
 * Get target attribute for links
 */
function getLinkTarget(link?: PayloadLinkObject | string): string | undefined {
  if (typeof link === 'object' && link?.newTab) {
    return '_blank'
  }
  return undefined
}

export const UUIButton: React.FC<UUIButtonProps> = ({
  label,
  link,
  icon: IconProp,
  iconPosition = 'leading',
  className,
  ...buttonProps
}) => {
  const href = getLinkHref(link)
  const target = getLinkTarget(link)

  // Determine if this should be a link or button
  const isLink = !!href

  // Extract UUI styling from link object
  let uuiColor = typeof link === 'object' && link?.uuiColor ? link.uuiColor : buttonProps.color || 'primary'
  const uuiSize = typeof link === 'object' && link?.uuiSize ? link.uuiSize : buttonProps.size || 'md'

  // Map deprecated color variants to current ones
  if (uuiColor === 'link-gray' || uuiColor === 'link-color') {
    uuiColor = 'link'
  }

  // Dynamic icon loading from link object (takes precedence over icon prop)
  let IconComponent: React.FC<{ className?: string }> | React.ReactNode | undefined = IconProp
  let effectiveIconPosition = iconPosition

  // Priority 1: New icon selector with visual preview (buttonIconConfig)
  if (typeof link === 'object' && link?.buttonIconConfig) {
    const iconData = link.buttonIconConfig.icon

    // Check if icon is populated object (depth: 1)
    if (iconData && typeof iconData === 'object' && 'svgCode' in iconData) {
      const iconSvgCode = iconData.svgCode
      if (iconSvgCode) {
        // Determine size class based on button size
        const iconSizeClasses = {
          sm: 'size-4',
          md: 'size-5',
          lg: 'size-6',
          xl: 'size-7',
        }
        const sizeClass = iconSizeClasses[uuiSize] || 'size-5'

        // Render as SVG ReactNode
        IconComponent = <IconSVG svgCode={iconSvgCode} className={sizeClass} />
        effectiveIconPosition = link.buttonIconConfig.position || 'trailing'
      }
    }
  }
  // Priority 2: Legacy text-based icon (buttonIcon) for backward compatibility
  else if (typeof link === 'object' && link?.buttonIcon) {
    const DynamicIcon = getIcon(link.buttonIcon)
    if (DynamicIcon) {
      IconComponent = DynamicIcon
      effectiveIconPosition = link.iconPos || 'trailing'
    }
  }

  return (
    <Button
      {...buttonProps}
      {...(isLink ? { href, target } : {})}
      iconLeading={effectiveIconPosition === 'leading' ? IconComponent : undefined}
      iconTrailing={effectiveIconPosition === 'trailing' ? IconComponent : undefined}
      color={uuiColor}
      size={uuiSize}
      className={className}
    >
      {label}
    </Button>
  )
}

export default UUIButton