'use client'
import { Footer } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const NavColumnRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Footer['navColumns']>[number]>()

  const label = data?.data?.label
    ? `Column ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data.data.label}`
    : `Navigation Column ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}`

  return <div>{label}</div>
}