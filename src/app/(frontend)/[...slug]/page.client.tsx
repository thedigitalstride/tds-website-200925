'use client'
import React, { useEffect } from 'react'
import { useHeaderTheme } from '@/providers/HeaderTheme'

interface PageClientProps {
  headerColor?: {
    lightMode?: 'auto' | 'dark' | 'light' | null
    darkMode?: 'auto' | 'dark' | 'light' | null
  } | null
  scrolledHeaderColor?: {
    lightMode?: 'auto' | 'dark' | 'light' | 'inherit' | null
    darkMode?: 'auto' | 'dark' | 'light' | 'inherit' | null
  } | null
  ctaButton?: {
    enabled?: boolean | null
    link?: {
      label?: string | null
      type?: 'reference' | 'custom' | null
      reference?: { value: number | { slug?: string | null }; relationTo: string } | null
      url?: string | null
      newTab?: boolean | null
      uuiColor?: string | null
      uuiSize?: string | null
      buttonIcon?: string | null
      iconPos?: 'leading' | 'trailing' | null
    } | null
  } | null
}

const PageClient: React.FC<PageClientProps> = ({ headerColor, scrolledHeaderColor, ctaButton }) => {
  const { setCtaButton, setPageHeaderConfigs } = useHeaderTheme()

  // Set page-level header configs via data attributes (CSS handles theming)
  useEffect(() => {
    // Determine which header theme setting to use based on current global theme
    const isLightMode = document.documentElement.classList.contains('light-mode')

    // Set initial header theme
    if (headerColor) {
      const setting = isLightMode ? headerColor.lightMode : headerColor.darkMode
      if (setting && setting !== 'auto') {
        document.body.dataset.pageHeader = setting
      } else {
        delete document.body.dataset.pageHeader
      }
    }

    // Set scrolled header theme
    if (scrolledHeaderColor) {
      const setting = isLightMode ? scrolledHeaderColor.lightMode : scrolledHeaderColor.darkMode
      if (setting && setting !== 'auto' && setting !== 'inherit') {
        document.body.dataset.scrolledHeader = setting
      } else {
        delete document.body.dataset.scrolledHeader
      }
    }

    // Keep old provider-based system for backwards compatibility
    setPageHeaderConfigs(
      headerColor ? {
        lightMode: headerColor.lightMode ?? undefined,
        darkMode: headerColor.darkMode ?? undefined,
      } : undefined,
      scrolledHeaderColor ? {
        lightMode: scrolledHeaderColor.lightMode ?? undefined,
        darkMode: scrolledHeaderColor.darkMode ?? undefined,
      } : undefined
    )
  }, [headerColor, scrolledHeaderColor, setPageHeaderConfigs])

  // Set page-level CTA button override if enabled
  useEffect(() => {
    if (ctaButton?.enabled && ctaButton.link) {
      setCtaButton({
        enabled: true,
        link: {
          type: (ctaButton.link.type as 'reference' | 'custom') || 'custom',
          label: ctaButton.link.label ?? undefined,
          url: ctaButton.link.url ?? undefined,
          newTab: ctaButton.link.newTab ?? undefined,
          reference: ctaButton.link.reference ?? undefined,
          uuiColor: ctaButton.link.uuiColor ?? undefined,
          uuiSize: ctaButton.link.uuiSize ?? undefined,
          buttonIcon: ctaButton.link.buttonIcon ?? undefined,
          iconPos: (ctaButton.link.iconPos as 'leading' | 'trailing') ?? undefined,
        }
      })
    } else {
      // No page override, clear it
      setCtaButton(null)
    }
  }, [ctaButton, setCtaButton])

  return <React.Fragment />
}

export default PageClient
