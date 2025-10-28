'use client'

import { Icon } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const KeywordRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Icon['keywords']>[number]>()

  const label = data?.data?.keyword
    ? data.data.keyword
    : 'Keyword'

  return <div>{label}</div>
}
