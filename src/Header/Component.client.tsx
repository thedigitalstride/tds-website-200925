'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState, useMemo } from 'react'

import type { Header, Page } from '@/payload-types'

// Import UUI Header and CMS dropdown component
import { Header as UUIHeader } from './uui-components/header'
import { CMSDropdown } from './components/CMSDropdown'
import { getPageUrl } from '@/utilities/pageHelpers'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [logoVariant, setLogoVariant] = useState<'auto' | 'dark' | 'light'>('auto')
  const { headerTheme, ctaButton: pageCtaButton } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    // Compute logo variant from headerTheme
    if (!headerTheme) {
      setLogoVariant('auto')
    } else if (headerTheme === 'dark') {
      // Dark header theme = dark logo/text
      setLogoVariant('dark')
    } else {
      // Light header theme = white logo/text
      setLogoVariant('light')
    }
  }, [headerTheme, pathname])

  // Build navigation items from CMS data
  const navigationItems = useMemo(() => {
    if (!data?.navItems) return []

    return data.navItems.map((item) => {
      const linkData = item.link
      let href = '#'
      let label = 'Untitled'

      // Extract link information
      if (linkData?.label) {
        label = linkData.label
      }

      if (linkData?.type === 'reference' && linkData.reference) {
        // Handle internal references
        const { value, relationTo } = linkData.reference

        // Handle number ID references (not populated)
        if (typeof value === 'number') {
          href = `/${relationTo}/${value}`
        }
        // Handle populated object references
        else if (typeof value === 'object' && value?.slug) {
          // For pages, use the getPageUrl helper to support nested URLs with breadcrumbs
          if (relationTo === 'pages') {
            href = getPageUrl(value as Page)
          }
          // For posts, use the existing logic
          else {
            href = `/${relationTo}/${value.slug}`
          }
        }
      } else if (linkData?.type === 'custom' && linkData.url) {
        // Handle external URLs
        href = linkData.url
      }

      // Build navigation item
      const navItem: { label: string; href?: string; menu?: React.ReactNode } = {
        label,
        href,
      }

      // Add dropdown menu if enabled and has dropdown items
      if (item.hasDropdown && item.dropdownItems && item.dropdownItems.length > 0) {
        navItem.menu = <CMSDropdown items={item.dropdownItems} />
      }

      return navItem
    })
  }, [data?.navItems])

  // Determine which CTA button config to use: page override > global header
  const effectiveCtaButton = useMemo(() => {
    // If page has a CTA button override, use it
    if (pageCtaButton?.enabled) {
      return pageCtaButton
    }

    // Otherwise use global header CTA button
    if (data?.ctaButton?.enabled === true) {
      return {
        enabled: data.ctaButton.enabled,
        link: {
          type: data.ctaButton.link.type as 'reference' | 'custom',
          url: data.ctaButton.link.url ?? undefined,
          label: data.ctaButton.link.label ?? undefined,
          newTab: data.ctaButton.link.newTab ?? undefined,
          reference: data.ctaButton.link.reference ?? undefined,
          uuiColor: data.ctaButton.link.uuiColor ?? undefined,
          uuiSize: data.ctaButton.link.uuiSize ?? undefined,
          buttonIcon: data.ctaButton.link.buttonIcon ?? undefined,
          iconPos: data.ctaButton.link.iconPos ?? undefined,
        }
      }
    }

    return undefined
  }, [pageCtaButton, data?.ctaButton])

  return (
    <div
      className="sticky top-0 z-20"
      {...(logoVariant !== 'auto' ? { 'data-header-variant': logoVariant } : {})}
    >
      <UUIHeader
        isFloating={true}
        items={navigationItems}
        logoVariant={logoVariant}
        ctaButton={effectiveCtaButton}
      />
    </div>
  )
}
