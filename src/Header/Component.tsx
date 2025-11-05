import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'

export async function Header() {
  // Depth 4: navItems (1) → dropdownItems (2) → icon (3)
  //          ctaButton (1) → link (2) → buttonIconConfig (3) → icon (4)
  const headerData = await getCachedGlobal('header', 4)() as Header

  return <HeaderClient data={headerData} />
}
