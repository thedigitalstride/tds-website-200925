import React from 'react'
import { Button } from '@/components/uui/button'
import type { ButtonProps } from '@/components/uui/button'

/**
 * Payload-adapted UntitledUI Button component
 *
 * This component adapts UUI's Button for use in Payload CMS blocks.
 * It handles common Payload patterns like link objects and provides
 * a simpler API for content editors.
 */

export interface PayloadLinkObject {
  type?: 'reference' | 'custom' | null
  url?: string | null
  label?: string | null
  newTab?: boolean | null
  reference?: {
    value: string | { slug?: string }
    relationTo: string
  } | null
}

export interface UUIButtonProps extends Omit<ButtonProps, 'children' | 'href'> {
  /** Button text content */
  label?: string
  /** Payload link object or simple URL string */
  link?: PayloadLinkObject | string
  /** Icon from @untitledui/icons */
  icon?: React.ComponentType<{ className?: string }>
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

    if (typeof value === 'string') {
      return `/${relationTo}/${value}`
    }

    if (typeof value === 'object' && value?.slug) {
      return relationTo === 'pages' ? `/${value.slug}` : `/${relationTo}/${value.slug}`
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
  icon: Icon,
  iconPosition = 'leading',
  className,
  ...buttonProps
}) => {
  const href = getLinkHref(link)
  const target = getLinkTarget(link)

  // Determine if this should be a link or button
  const isLink = !!href

  const iconProps = Icon ? {
    [iconPosition === 'leading' ? 'iconLeading' : 'iconTrailing']: Icon
  } : {}

  return (
    <Button
      {...buttonProps}
      {...iconProps}
      {...(isLink ? { href, target } : {})}
      className={className}
    >
      {label}
    </Button>
  )
}

export default UUIButton