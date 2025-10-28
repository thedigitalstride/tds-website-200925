import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'

export async function Header() {
  // Depth 3: navItems (1) → dropdownItems (2) → icon relationship (3)
  const headerData = await getCachedGlobal('header', 3)() as Header

  return <HeaderClient data={headerData} />
}
