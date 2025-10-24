'use client'

import React from 'react'
import { SearchMd, X } from '@untitledui/icons'
import { cn } from '@/utilities/ui'

interface AccordionSearchProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  resultCount: number
  totalCount: number
}

/**
 * AccordionSearch - Search/filter component for FAQ lists
 *
 * Features:
 * - Real-time search with debouncing (handled by parent)
 * - Clear button
 * - Result count display
 * - Accessible labels and ARIA attributes
 */
export const AccordionSearch: React.FC<AccordionSearchProps> = ({
  searchQuery,
  onSearchChange,
  resultCount,
  totalCount,
}) => {
  return (
    <div className="space-y-2">
      <div className="relative">
        <label htmlFor="faq-search" className="sr-only">
          Search FAQs
        </label>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchMd className="h-5 w-5 text-tertiary" aria-hidden="true" />
        </div>
        <input
          id="faq-search"
          type="search"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className={cn(
            'block w-full rounded-lg border border-primary bg-primary py-3 pl-10 pr-10',
            'text-md text-primary placeholder:text-placeholder',
            'focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary',
            'transition-colors duration-200',
          )}
          aria-describedby="search-results-count"
          autoComplete="off"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className={cn(
              'absolute inset-y-0 right-0 flex items-center pr-3',
              'text-tertiary hover:text-primary',
              'focus:outline-none focus-visible:text-primary',
            )}
            aria-label="Clear search"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Result Count */}
      {searchQuery && (
        <p id="search-results-count" className="text-sm text-secondary">
          {resultCount === 0 ? (
            'No results found'
          ) : resultCount === 1 ? (
            '1 result found'
          ) : (
            <>
              {resultCount} {resultCount === totalCount ? 'results' : `of ${totalCount} results`}
            </>
          )}
        </p>
      )}
    </div>
  )
}
