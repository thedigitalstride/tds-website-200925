import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { Page } from '@/payload-types'

// Use the actual breadcrumb type from Payload
type BreadcrumbItem = NonNullable<Page['breadcrumbs']>[number]

interface BreadcrumbsProps {
  breadcrumbs?: BreadcrumbItem[] | null
  className?: string
}

export function Breadcrumbs({ breadcrumbs, className = '' }: BreadcrumbsProps) {
  // Don't show breadcrumbs if the array is completely empty
  // Note: length === 1 means current page only, which still renders as "Home > Current Page"
  if (!breadcrumbs || breadcrumbs.length === 0) {
    return null
  }

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-nowrap items-center overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 space-x-1 text-md text-secondary">
        {/* Home link */}
        <li className="whitespace-nowrap">
          <Link
            href="/"
            className="hover:underline underline-offset-4 transition-all duration-100 ease-linear"
          >
            Home
          </Link>
        </li>

        {/* Breadcrumb items (excluding the last one which is current page) */}
        {breadcrumbs.slice(0, -1).map((crumb, _) => (
          <li key={crumb.id || crumb.label} className="flex items-center whitespace-nowrap">
            <ChevronRight className="w-4 h-4 mx-1 text-primary flex-shrink-0" />
            {crumb.url ? (
              <Link
                href={crumb.url}
                className="hover:underline underline-offset-4 transition-all duration-100 ease-linear"
              >
                {crumb.label}
              </Link>
            ) : (
              <span>{crumb.label}</span>
            )}
          </li>
        ))}

        {/* Current page (last breadcrumb) */}
        <li className="flex items-center whitespace-nowrap">
          <ChevronRight className="w-4 h-4 mx-1 text-primary flex-shrink-0" />
          <span className="text-primary font-medium">
            {breadcrumbs[breadcrumbs.length - 1]?.label}
          </span>
        </li>
      </ol>
    </nav>
  )
}