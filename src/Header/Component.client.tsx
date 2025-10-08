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
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

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

  return (
    <div className="sticky top-0 z-20" {...(theme ? { 'data-theme': theme } : {})}>
      <UUIHeader
        isFloating={true}
        items={navigationItems}
        ctaButton={data?.ctaButton?.enabled === true ? {
          enabled: data.ctaButton.enabled,
          link: {
            type: data.ctaButton.link.type as 'reference' | 'custom',
            url: data.ctaButton.link.url ?? undefined,
            label: data.ctaButton.link.label ?? undefined,
            newTab: data.ctaButton.link.newTab ?? undefined,
            reference: data.ctaButton.link.reference ?? undefined,
            uuiColor: data.ctaButton.link.uuiColor ?? undefined,
            uuiSize: data.ctaButton.link.uuiSize ?? undefined,
          }
        } : undefined}
      />
    </div>
  )
}
