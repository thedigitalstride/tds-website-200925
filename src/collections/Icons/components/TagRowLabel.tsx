'use client'

import { Icon } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const TagRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Icon['tags']>[number]>()

  const label = data?.data?.tag
    ? data.data.tag
    : 'Tag'

  return <div>{label}</div>
}
