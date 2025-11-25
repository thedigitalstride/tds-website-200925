'use client'

import { RowLabelProps, useRowLabel } from '@payloadcms/ui'
import type { LightboxBlock } from '@/payload-types'

export const LightboxRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<LightboxBlock['images']>[number]>()

  const rowNumber = data?.rowNumber !== undefined ? data.rowNumber + 1 : 1
  const name = data?.data?.name

  // Format: "Image [Number]: [Name or 'untitled']"
  // Directly referencing the name field enables Payload's inline editing
  return (
    <span>
      Image {rowNumber}: {name || 'untitled'}
    </span>
  )
}
