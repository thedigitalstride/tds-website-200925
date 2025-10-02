"use client";

import React from 'react'
import { NavMenuItemLink } from '../uui-components/base-components/nav-menu-item'
import { getIcon } from '../utils/IconMap'
import { getPageUrl } from '@/utilities/pageHelpers'
import type { Header, Page } from '@/payload-types'

interface CMSDropdownProps {
  items: NonNullable<Header['navItems']>[0]['dropdownItems']
}

/**
 * Convert dropdown item link to proper href string
 * Uses the same logic as CMSLink and UUIButton components
 */
function getDropdownLinkHref(linkData: any): string {
  if (!linkData) return '#'

  // Handle custom URLs
  if (linkData.type === 'custom' && linkData.url) {
    return linkData.url
  }

  // Handle reference links
  if (linkData.type === 'reference' && linkData.reference) {
    const { value, relationTo } = linkData.reference

    // Handle number ID references (not populated)
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
      return `/${relationTo}/${(value as any).slug}`
    }
  }

  // Fallback
  return '#'
}

export const CMSDropdown: React.FC<CMSDropdownProps> = ({ items }) => {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <div className="px-3 pb-2 md:max-w-84 md:p-0">
      <nav className="overflow-hidden rounded-2xl bg-primary py-2 shadow-xs ring-1 ring-secondary_alt md:p-2 md:shadow-lg">
        <ul className="flex flex-col gap-0.5">
          {items.map((item, index) => {
            const IconComponent = getIcon(item.icon ?? undefined)
            const href = getDropdownLinkHref(item.link)

            return (
              <li key={index}>
                <NavMenuItemLink
                  icon={IconComponent}
                  title={item.link?.label || 'Untitled'}
                  subtitle={item.description ?? undefined}
                  href={href}
                />
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}