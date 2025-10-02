import React from 'react'

import { HighImpactHero } from '@/heros/HighImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
} as const

type HeroType = keyof typeof heroes | 'none'

interface RenderHeroProps {
  type?: HeroType
  [key: string]: unknown
}

// Hero field removed, this component is deprecated
export const RenderHero: React.FC<RenderHeroProps> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type as keyof typeof heroes]

  if (!HeroToRender) return null

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <HeroToRender {...(props as any)} />
}
