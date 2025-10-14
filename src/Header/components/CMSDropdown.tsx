"use client";

import React from 'react'
import { motion } from 'motion/react'
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
function getDropdownLinkHref(linkData: { type?: 'reference' | 'custom' | null; url?: string | null; reference?: { value: number | Page; relationTo: string } | null }): string {
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
      return `/${relationTo}/${(value as { slug?: string }).slug}`
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
    <motion.nav
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{
        height: 0,
        opacity: 0,
        transition: {
          height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
          opacity: { duration: 0.2 }
        }
      }}
      transition={{
        height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
        opacity: { duration: 0.3 }
      }}
      className="overflow-hidden shadow-lg rounded-b-2xl bg-brand-solid"
    >
        <div className="py-4 px-4 md:px-5">
          <motion.ul
            className="flex flex-col gap-0.5"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.03,
                  delayChildren: 0.1
                }
              },
              hidden: {
                transition: {
                  staggerChildren: 0.02,
                  staggerDirection: -1
                }
              }
            }}
          >
            {items.map((item, index) => {
              const IconComponent = getIcon(item.icon ?? undefined)
              const href = getDropdownLinkHref(item.link)

              return (
                <motion.li
                  key={index}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: -10
                    },
                    visible: {
                      opacity: 1,
                      y: 0
                    }
                  }}
                  transition={{
                    duration: 0.2,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                >
                  <NavMenuItemLink
                    icon={IconComponent}
                    title={item.link?.label || 'Untitled'}
                    subtitle={item.description ?? undefined}
                    href={href}
                  />
                </motion.li>
              )
            })}
          </motion.ul>
        </div>
      </motion.nav>
  )
}