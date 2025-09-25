'use client'
import { Header } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const DropdownRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<NonNullable<Header['navItems']>[number]['dropdownItems']>[number]>()

  const label = data?.data?.link?.label
    ? `Dropdown item ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data?.data?.link?.label}`
    : 'Dropdown item'

  return <div>{label}</div>
}