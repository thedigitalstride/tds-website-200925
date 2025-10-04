import { UUIButton } from '@/components/payload-ui/UUIButton'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import type { Page, Post } from '@/payload-types'
import { getPageUrl } from '@/utilities/pageHelpers'

type CMSLinkType = {
  appearance?: 'inline' | 'default' | 'outline' // Legacy appearance prop (not used for UUI buttons)
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: 'sm' | 'md' | 'lg' | 'xl' | null // Legacy size prop (not used for UUI buttons)
  type?: 'custom' | 'reference' | null
  url?: string | null
  // UUI Button properties
  uuiColor?: 'primary' | 'accent' | 'secondary' | 'tertiary' | 'link' | 'primary-destructive' | 'secondary-destructive' | 'tertiary-destructive' | 'link-destructive' | null
  uuiSize?: 'sm' | 'md' | 'lg' | 'xl' | null
  buttonIcon?: string | null
  iconPos?: 'leading' | 'trailing' | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    url,
    uuiColor,
    uuiSize,
    buttonIcon,
    iconPos,
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? reference?.relationTo === 'pages'
        ? getPageUrl(reference.value as Page) // Use helper for pages to support nested URLs
        : `/${reference?.relationTo}/${reference.value.slug}` // Keep existing logic for posts
      : url

  if (!href) return null

  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  // Always use UUIButton for button-styled links (with defaults if UUI props not provided)
  return (
    <UUIButton
      label={label || ''}
      link={{
        type,
        url,
        newTab,
        reference: reference as ({ relationTo: 'pages'; value: number | Page } | { relationTo: 'posts'; value: number | Post } | null),
        uuiColor: uuiColor || 'primary', // Default to primary if not specified
        uuiSize: uuiSize || 'md', // Default to md if not specified
        buttonIcon,
        iconPos,
      }}
      className={className}
    />
  )
}
