'use client'
import React, { useMemo } from 'react'

import type { Header, Page } from '@/payload-types'

// Import UUI Header, CMS dropdown
import { Header as UUIHeader } from './ui/Header'
import { CMSDropdown } from './components/CMSDropdown'
import { getPageUrl } from '@/utilities/pageHelpers'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {

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

  // Use global header CTA button
  const effectiveCtaButton = useMemo(() => {
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
        },
      }
    }

    return undefined
  }, [data?.ctaButton])

  return (
    <header className="fixed top-4 left-4 right-4 md:left-8 md:right-8 z-50">
      <div className="mx-auto max-w-container">
        {/* Use bg-brand-solid which automatically changes in dark mode */}
        <div className="bg-brand-solid rounded-2xl overflow-visible">
          <UUIHeader
            items={navigationItems}
            ctaButton={effectiveCtaButton}
          />
        </div>
      </div>
    </header>
  )
}
