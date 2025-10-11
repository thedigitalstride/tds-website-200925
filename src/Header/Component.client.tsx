'use client'
import React, { useMemo } from 'react'
import { motion } from 'motion/react'

import type { Header, Page } from '@/payload-types'

// Import UUI Header, CMS dropdown, and new hooks/components
import { Header as UUIHeader } from './uui-components/header'
import { CMSDropdown } from './components/CMSDropdown'
import { getPageUrl } from '@/utilities/pageHelpers'
import { useHeaderAutoHide } from './hooks/useHeaderAutoHide'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const { isCollapsed } = useHeaderAutoHide()

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
        }
      }
    }

    return undefined
  }, [data?.ctaButton])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-container md:px-8 flex justify-end">
        {/* Brand blue header with rounded bottom corners - shrinks from left to right */}
        <motion.div
          className="bg-brand-solid text-white md:rounded-b-2xl shadow-lg overflow-hidden"
          initial={false}
          animate={{
            width: isCollapsed ? "auto" : "100%"
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.8
          }}
        >
          <UUIHeader
            items={navigationItems}
            logoVariant="light"
            ctaButton={effectiveCtaButton}
            isCollapsed={isCollapsed}
          />
        </motion.div>
      </div>
    </header>
  )
}
