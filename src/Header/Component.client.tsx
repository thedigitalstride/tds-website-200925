'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

// Import UUI Header and TDS dropdowns
import { Header as UUIHeader } from '@/components/uui/marketing/header-navigation/header'
import { TDSServicesDropdown, TDSAboutDropdown } from './TDSDropdowns'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = () => {
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

  const tdsNavigationItems = [
    { label: "STRIDE Methodology™", href: "/methodology" },
    { label: "Services", href: "/services", menu: <TDSServicesDropdown /> },
    { label: "Case Studies", href: "/case-studies" },
    { label: "About", href: "/about", menu: <TDSAboutDropdown /> },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <div className="relative z-20" {...(theme ? { 'data-theme': theme } : {})}>
      <UUIHeader items={tdsNavigationItems} />
    </div>
  )
}
