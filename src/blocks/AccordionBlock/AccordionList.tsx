'use client'

import React, { useState, useMemo, useRef, useEffect } from 'react'
import { AccordionItem } from './AccordionItem'
import { AccordionSearch } from './AccordionSearch'
import type { PopulatedFAQ, DefaultState } from './types'

interface AccordionListProps {
  faqs: PopulatedFAQ[]
  defaultState: DefaultState
  allowMultipleOpen: boolean
  enableSearch: boolean
  iconPosition: 'left' | 'right' | 'none'
  iconStyle: 'chevron' | 'plus-minus'
  animationSpeed: number
}

/**
 * AccordionList - Client component that manages accordion state
 *
 * Features:
 * - Multiple open mode (optional)
 * - Client-side search/filter
 * - Keyboard navigation (Arrow keys, Home, End)
 * - URL hash linking (opens specific FAQ on load)
 * - Screen reader announcements
 */
export const AccordionList: React.FC<AccordionListProps> = ({
  faqs,
  defaultState,
  allowMultipleOpen,
  enableSearch,
  iconPosition,
  iconStyle,
  animationSpeed,
}) => {
  // State for open items (array of FAQ IDs)
  const [openItems, setOpenItems] = useState<string[]>(() => {
    // Initialize based on defaultState
    switch (defaultState) {
      case 'all-open':
        return faqs.map((faq) => faq.id)
      case 'first-open':
        return faqs.length > 0 ? [faqs[0].id] : []
      default:
        return []
    }
  })

  // State for search query
  const [searchQuery, setSearchQuery] = useState('')

  // State for screen reader announcements
  const [announcement, setAnnouncement] = useState('')

  // Refs for keyboard navigation
  const accordionRefs = useRef<(HTMLElement | null)[]>([])

  // Filter FAQs based on search query
  const filteredFAQs = useMemo(() => {
    if (!searchQuery.trim()) {
      return faqs
    }

    const query = searchQuery.toLowerCase()
    return faqs.filter((faq) => {
      // Search in question
      if (faq.question.toLowerCase().includes(query)) {
        return true
      }

      // Search in answer (basic text search in rich text)
      const answerText = JSON.stringify(faq.answer).toLowerCase()
      if (answerText.includes(query)) {
        return true
      }

      // Search in categories
      if (faq.categories?.some((cat) => cat.title.toLowerCase().includes(query))) {
        return true
      }

      return false
    })
  }, [faqs, searchQuery])

  // Handle URL hash on mount (open specific FAQ if hash matches)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.slice(1) // Remove #
      const faq = faqs.find((f) => f.slug === hash)
      if (faq) {
        setOpenItems([faq.id])
        // Scroll to the FAQ
        setTimeout(() => {
          const element = document.getElementById(`faq-${faq.id}`)
          element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
  }, [faqs])

  // Toggle accordion item
  const toggleItem = (faqId: string) => {
    setOpenItems((prev) => {
      const isOpen = prev.includes(faqId)

      let newOpenItems: string[]

      if (allowMultipleOpen) {
        // Multi-select mode
        newOpenItems = isOpen ? prev.filter((id) => id !== faqId) : [...prev, faqId]
      } else {
        // Single-select mode
        newOpenItems = isOpen ? [] : [faqId]
      }

      // Announce to screen readers
      const faq = faqs.find((f) => f.id === faqId)
      if (faq) {
        const newState = !isOpen
        setAnnouncement(newState ? `Expanded ${faq.question}` : `Collapsed ${faq.question}`)
        setTimeout(() => setAnnouncement(''), 100)
      }

      return newOpenItems
    })
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        // Focus next accordion button
        if (index < filteredFAQs.length - 1) {
          const nextButton = accordionRefs.current[index + 1]?.querySelector('button')
          nextButton?.focus()
        }
        break

      case 'ArrowUp':
        e.preventDefault()
        // Focus previous accordion button
        if (index > 0) {
          const prevButton = accordionRefs.current[index - 1]?.querySelector('button')
          prevButton?.focus()
        }
        break

      case 'Home':
        e.preventDefault()
        // Focus first accordion button
        const firstButton = accordionRefs.current[0]?.querySelector('button')
        firstButton?.focus()
        break

      case 'End':
        e.preventDefault()
        // Focus last accordion button
        const lastButton = accordionRefs.current[filteredFAQs.length - 1]?.querySelector('button')
        lastButton?.focus()
        break
    }
  }

  return (
    <div>
      {/* Search Box */}
      {enableSearch && (
        <div className="mb-8">
          <AccordionSearch
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            resultCount={filteredFAQs.length}
            totalCount={faqs.length}
          />
        </div>
      )}

      {/* Skip Link for Long Lists */}
      {filteredFAQs.length > 10 && (
        <a
          href="#end-of-faqs"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-brand-solid focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to end of FAQs
        </a>
      )}

      {/* Accordion Items */}
      {filteredFAQs.length > 0 ? (
        <div
          className="accordion-list"
          role="region"
          aria-label="Frequently Asked Questions"
        >
          {filteredFAQs.map((faq, index) => (
            <div
              key={faq.id}
              ref={(el) => {
                accordionRefs.current[index] = el
              }}
              onKeyDown={(e) => handleKeyDown(e, index)}
              id={`faq-${faq.id}`}
            >
              <AccordionItem
                faq={faq}
                isOpen={openItems.includes(faq.id)}
                onToggle={() => toggleItem(faq.id)}
                iconPosition={iconPosition}
                iconStyle={iconStyle}
                animationSpeed={animationSpeed}
                index={index}
                isFirst={index === 0}
                isLast={index === filteredFAQs.length - 1}
                totalItems={filteredFAQs.length}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-tertiary p-8 text-center">
          <p className="text-secondary">
            {searchQuery
              ? `No FAQs found matching "${searchQuery}"`
              : 'No FAQs available at this time.'}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 text-brand-secondary hover:text-brand-primary hover:underline"
            >
              Clear search
            </button>
          )}
        </div>
      )}

      {/* Skip Link Target */}
      {filteredFAQs.length > 10 && <div id="end-of-faqs" tabIndex={-1} />}

      {/* Screen Reader Announcements */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>
    </div>
  )
}
