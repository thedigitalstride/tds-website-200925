'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const TestimonialRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<any>() // Type will be available when payload-types is regenerated

  const label = data?.data?.person
    ? `Testimonial ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data.data.person}`
    : `Testimonial ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}`

  return <div>{label}</div>
}

