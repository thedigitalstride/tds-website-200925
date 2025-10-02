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
  // Don't show breadcrumbs if there aren't enough items or if it's just the current page
  if (!breadcrumbs || breadcrumbs.length <= 1) {
    return null
  }

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center space-x-2 text-sm text-secondary">
        {/* Home link */}
        <li>
          <Link
            href="/"
            className="hover:text-secondary_hover transition-colors duration-200"
          >
            Home
          </Link>
        </li>

        {/* Breadcrumb items (excluding the last one which is current page) */}
        {breadcrumbs.slice(0, -1).map((crumb, _) => (
          <li key={crumb.id || crumb.label} className="flex items-center">
            <ChevronRight className="w-4 h-4 mx-2 text-tertiary" />
            {crumb.url ? (
              <Link
                href={crumb.url}
                className="hover:text-secondary_hover transition-colors duration-200"
              >
                {crumb.label}
              </Link>
            ) : (
              <span>{crumb.label}</span>
            )}
          </li>
        ))}

        {/* Current page (last breadcrumb) */}
        <li className="flex items-center">
          <ChevronRight className="w-4 h-4 mx-2 text-tertiary" />
          <span className="text-primary font-medium">
            {breadcrumbs[breadcrumbs.length - 1]?.label}
          </span>
        </li>
      </ol>
    </nav>
  )
}