import React from 'react'
import type { BreadcrumbBlock as BreadcrumbBlockProps, Page } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { Breadcrumbs } from '@/components/Breadcrumbs'

type BreadcrumbItem = NonNullable<Page['breadcrumbs']>[number]

interface BreadcrumbBlockComponentProps extends BreadcrumbBlockProps {
  breadcrumbs?: BreadcrumbItem[] | null
}

export const BreadcrumbBlock: React.FC<BreadcrumbBlockComponentProps> = ({
  spacing,
  breadcrumbs
}) => {
  const spacingClasses: Record<string, string> = {
    none: '',
    compact: 'py-6 lg:py-6',      // Smaller spacing for breadcrumbs
    normal: 'py-12 lg:py-16',     // Medium spacing
    spacious: 'py-16 lg:py-20',   // Larger spacing
  }

  return (
    <section className={cn(spacingClasses[spacing || 'compact'])}>
      <div className="mx-auto max-w-container px-4 md:px-8">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
    </section>
  )
}
