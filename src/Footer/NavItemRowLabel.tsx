'use client'
import { Footer } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const NavItemRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<NonNullable<Footer['navColumns']>[number]['items']>[number]>()

  const label = data?.data?.link?.label
    ? `Link ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data.data.link.label}`
    : `Navigation Link ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}`

  return <div>{label}</div>
}