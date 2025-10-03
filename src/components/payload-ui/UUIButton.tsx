'use client'

import React from 'react'
import { Button } from '@/components/uui/button'
import type { ButtonProps } from '@/components/uui/button'
import { getPageUrl } from '@/utilities/pageHelpers'
import { getIcon } from '@/Header/utils/IconMap'

/**
 * Payload-adapted UntitledUI Button component
 *
 * This component adapts UUI's Button for use in Payload CMS blocks.
 * It handles common Payload patterns like link objects and provides
 * a simpler API for content editors.
 */

// Use the generated Payload link types directly
import type { Page, Post } from '@/payload-types'

export interface PayloadLinkObject {
  type?: 'reference' | 'custom' | null
  url?: string | null
  label?: string | null
  newTab?: boolean | null
  reference?:
    | ({ relationTo: 'pages'; value: number | Page } | null)
    | ({ relationTo: 'posts'; value: number | Post } | null)
  // UUI Button styling properties
  uuiColor?: 'primary' | 'accent' | 'secondary' | 'tertiary' | 'link' | 'primary-destructive' | 'secondary-destructive' | 'tertiary-destructive' | 'link-destructive' | null
  uuiSize?: 'sm' | 'md' | 'lg' | 'xl' | null
  // UUI Button icon properties
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

    // Handle number ID references
    if (typeof value === 'number') {
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
  const uuiColor = typeof link === 'object' && link?.uuiColor ? link.uuiColor : buttonProps.color || 'primary'
  const uuiSize = typeof link === 'object' && link?.uuiSize ? link.uuiSize : buttonProps.size || 'md'

  // Dynamic icon loading from link object (takes precedence over icon prop)
  let IconComponent: React.FC<{ className?: string }> | undefined = IconProp
  let effectiveIconPosition = iconPosition

  if (typeof link === 'object' && link?.buttonIcon) {
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