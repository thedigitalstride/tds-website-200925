import { Button, type ButtonProps } from '@/components/ui/button'
import { UUIButton } from '@/components/payload-ui/UUIButton'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import type { Page, Post } from '@/payload-types'
import { getPageUrl } from '@/utilities/pageHelpers'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant'] // DEPRECATED: Only used for fallback to legacy Button
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
  // UUI Button properties
  uuiColor?: 'primary' | 'secondary' | 'tertiary' | 'link-gray' | 'link-color' | 'primary-destructive' | 'secondary-destructive' | 'tertiary-destructive' | 'link-destructive' | null
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
    size: sizeFromProps,
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

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  // Check if UUI button properties are provided
  const hasUUIProps = uuiColor || uuiSize

  // Use UUIButton if UUI properties are provided (preferred approach - takes priority)
  if (hasUUIProps) {
    return (
      <UUIButton
        label={label || undefined}
        link={{
          type,
          url,
          newTab,
          reference: reference as ({ relationTo: 'pages'; value: number | Page } | { relationTo: 'posts'; value: number | Post } | null), // Type assertion needed due to different reference type constraints
          uuiColor,
          uuiSize,
          buttonIcon,
          iconPos,
        }}
        className={className}
      />
    )
  }

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  // Fallback to legacy Button component for backward compatibility
  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}
