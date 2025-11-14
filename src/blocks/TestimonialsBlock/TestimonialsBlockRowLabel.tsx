'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const TestimonialsBlockRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<any>() // Type will be available when payload-types is regenerated

  const count = Array.isArray(data?.data?.selectedTestimonials) 
    ? data.data.selectedTestimonials.length 
    : 0

  const label = count > 0
    ? `Testimonials Block: ${count} testimonial${count !== 1 ? 's' : ''} selected`
    : 'Testimonials Block'

  return <div>{label}</div>
}

