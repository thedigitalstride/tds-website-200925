'use client'

import React from 'react'
import type { Footer } from '@/payload-types'
import { Badge } from '@/components/uui/base/badges/badges'
import { UUIButton } from '@/components/payload-ui/UUIButton'
import { TDSLogo } from '@/components/Logo/tds-logo'
import { ThemeToggle } from '@/components/ThemeToggle'
import {
  X,
  LinkedIn,
  Facebook,
  GitHub,
  AngelList,
  Dribbble,
  Layers
} from '@/components/uui/foundations/social-icons'

interface FooterClientProps {
  data: Footer
}

// Map social platform names to icon components
const socialIconMap = {
  x: X,
  linkedin: LinkedIn,
  facebook: Facebook,
  github: GitHub,
  angellist: AngelList,
  dribbble: Dribbble,
  layers: Layers,
}

// Map social platform names to display names
const socialLabelMap = {
  x: 'X (formerly Twitter)',
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  github: 'GitHub',
  angellist: 'AngelList',
  dribbble: 'Dribbble',
  layers: 'Layers',
}

export const FooterClient: React.FC<FooterClientProps> = ({ data }) => {
  const {
    companyInfo,
    navColumns = [],
    socialLinks = [],
    copyrightText = '© 2024 Your Company. All rights reserved.'
  } = data

  return (
    <footer className="bg-primary py-12 md:pt-16">
      <div className="mx-auto max-w-container px-4 md:px-8">
        {/* Top Border */}
        <div className="mb-12 border-t border-gray-200 dark:border-gray-500 md:mb-16" />
        {/* Main Content */}
        <div className="flex flex-col gap-12 md:gap-16 lg:flex-row lg:justify-between">
          {/* Company Info */}
          <div className="flex flex-col gap-4 items-start lg:max-w-xs">
            <TDSLogo variant="auto" size="xl" className="h-12 w-min shrink-0" />
            {companyInfo?.description && (
              <p className="text-md text-tertiary">{companyInfo.description}</p>
            )}
          </div>

          {/* Navigation Columns */}
          {navColumns && navColumns.length > 0 && (
            <nav className="lg:ml-auto">
              <ul className="flex flex-wrap gap-x-8 gap-y-12 lg:gap-x-16">
                {navColumns.slice(0, 5).map((column, columnIndex) => (
                  <li key={columnIndex} className="min-w-[140px]">
                    <h4 className="text-sm font-semibold text-quaternary">
                      {column.label}
                    </h4>
                    <ul className="mt-4 flex flex-col gap-3">
                      {column.items?.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <div className="flex items-center gap-1">
                            <UUIButton
                              link={item.link}
                              label={item.link?.label || `Item ${itemIndex + 1}`}
                              className="gap-1"
                            />
                            {item.badge?.text && (
                              <Badge
                                color="gray"
                                type="modern"
                                size="sm"
                                className="ml-1"
                              >
                                {item.badge.text}
                              </Badge>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 flex flex-col-reverse justify-between gap-6 border-t border-gray-200 dark:border-gray-500 pt-8 md:mt-16 md:flex-row">
          <p className="text-md text-quaternary">{copyrightText}</p>

          <div className="flex items-center gap-6">
            {/* Social Links */}
            {socialLinks && socialLinks.length > 0 && (
              <ul className="flex gap-6">
                {socialLinks.map((social, index) => {
                  const IconComponent = socialIconMap[social.platform as keyof typeof socialIconMap]
                  const label = socialLabelMap[social.platform as keyof typeof socialLabelMap] || social.platform

                  if (!IconComponent || !social.url || !social.platform) return null

                  return (
                    <li key={index}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex rounded-xs text-fg-quaternary outline-focus-ring transition duration-100 ease-linear hover:text-fg-quaternary_hover focus-visible:outline-2 focus-visible:outline-offset-2"
                        aria-label={label || social.platform}
                      >
                        <IconComponent size={24} />
                      </a>
                    </li>
                  )
                })}
              </ul>
            )}

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  )
}