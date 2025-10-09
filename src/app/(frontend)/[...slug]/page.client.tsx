'use client'
import React, { useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useHeaderTheme } from '@/providers/HeaderTheme'

interface PageClientProps {
  headerColor?: {
    lightMode?: 'auto' | 'dark' | 'light' | null
    darkMode?: 'auto' | 'dark' | 'light' | null
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

const PageClient: React.FC<PageClientProps> = ({ headerColor, ctaButton }) => {
  const { setHeaderTheme, setCtaButton } = useHeaderTheme()
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (!headerColor || !resolvedTheme) {
      // No page config, reset to auto behavior
      setHeaderTheme(null)
      return
    }

    const globalTheme = resolvedTheme as 'light' | 'dark'
    const setting = globalTheme === 'light'
      ? headerColor.lightMode
      : headerColor.darkMode

    let effectiveTheme: 'light' | 'dark'
    if (setting === 'auto' || !setting) {
      // Auto: dark header in light mode, light header in dark mode
      effectiveTheme = globalTheme === 'light' ? 'dark' : 'light'
    } else {
      // Explicit setting
      effectiveTheme = setting as 'light' | 'dark'
    }

    setHeaderTheme(effectiveTheme)
  }, [headerColor, resolvedTheme, setHeaderTheme])

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
