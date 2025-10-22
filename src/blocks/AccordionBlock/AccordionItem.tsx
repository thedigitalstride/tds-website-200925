'use client'

import React, { useId, useState } from 'react'
import { motion, MotionConfig, useReducedMotion } from 'motion/react'
import { ChevronDown, Plus, X } from '@untitledui/icons'
import type { AccordionItemProps } from './types'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import { OptimizedImage } from '@/components/OptimizedImage'
import RichText from '@/components/RichText'

/**
 * Utility to detect keyboard-only focus (not mouse clicks)
 */
function onlyKeyboardFocus(callback: () => void) {
  return (e: React.FocusEvent<HTMLButtonElement>) => {
    if (e.type === 'focus' && e.target.matches(':focus-visible')) {
      callback()
    }
  }
}

/**
 * Accordion item component with smooth motion animations
 *
 * @component
 * @example
 * ```tsx
 * <AccordionItem
 *   faq={faqData}
 *   isOpen={isOpen}
 *   onToggle={() => setIsOpen(!isOpen)}
 *   iconPosition="right"
 *   iconStyle="chevron"
 *   showCategories={true}
 *   animationSpeed={0.3}
 *   index={0}
 * />
 * ```
 *
 * @accessibility
 * - Uses semantic HTML (section, h3, button)
 * - ARIA attributes: aria-expanded, aria-controls, aria-labelledby
 * - Keyboard support: Enter, Space
 * - Focus management with visible focus rings (keyboard only)
 * - Screen reader announcements for state changes
 *
 * @performance
 * - Respects prefers-reduced-motion
 * - Smooth height animations with motion
 */
export const AccordionItem: React.FC<AccordionItemProps> = ({
  faq,
  isOpen,
  onToggle,
  iconPosition = 'right',
  iconStyle = 'chevron',
  showCategories = true,
  animationSpeed = 0.3,
  index,
  cardBackground = 'primary',
  dividerStyle = 'line',
  isFirst = false,
  isLast = false,
  totalItems = 1,
}) => {
  const [hasFocus, setHasFocus] = useState(false)
  const id = useId()
  const prefersReducedMotion = useReducedMotion()

  // Animation duration - respect reduced motion
  const duration = prefersReducedMotion ? 0 : animationSpeed

  // Choose icon based on style
  const ToggleIcon = iconStyle === 'plus-minus' ? (isOpen ? X : Plus) : ChevronDown

  // Background classes
  const backgroundClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent-subtle',
  }

  // Divider classes
  const dividerClasses = {
    line: cn(
      'border-t border-black/20 dark:border-white/25',
      isLast && 'border-b'
    ),
    none: '',
    card: cn(
      'border border-black/20 dark:border-white/25',
      // Remove bottom border except on last item to avoid double borders when stacked
      !isLast && 'border-b-0',
      // Apply rounded corners based on position when in card mode
      totalItems === 1 ? 'rounded-xl' : // Single item: all corners rounded
      isFirst ? 'rounded-t-xl' :         // First item: top corners rounded
      isLast ? 'rounded-b-xl' :          // Last item: bottom corners rounded
      ''                                  // Middle items: no rounded corners (seamless connection)
    ),
  }

  // Build card classes
  const cardClasses = cn(
    'relative',
    backgroundClasses[cardBackground],
    dividerClasses[dividerStyle],
    dividerStyle === 'card' && 'p-6',
  )

  return (
    <MotionConfig transition={{ duration, ease: [0.4, 0, 0.2, 1] }}>
      <motion.section
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        className={cardClasses}
        aria-labelledby={`accordion-header-${id}`}
        aria-describedby={
          showCategories && faq.categories?.length ? `accordion-categories-${id}` : undefined
        }
      >
        <h3 className={cn('relative', dividerStyle !== 'card' && 'py-6')}>
          <motion.button
            id={`accordion-header-${id}`}
            aria-expanded={isOpen}
            aria-controls={`accordion-content-${id}`}
            onClick={onToggle}
            onFocus={onlyKeyboardFocus(() => setHasFocus(true))}
            onBlur={() => setHasFocus(false)}
            className={cn(
              'group flex w-full items-start gap-4 text-left transition-colors',
              'hover:text-brand-secondary focus-visible:outline-none',
              iconPosition === 'left' && 'flex-row',
              iconPosition === 'right' && 'flex-row',
              iconPosition === 'none' && 'flex-row',
            )}
          >
            {/* Icon - Left Position */}
            {iconPosition === 'left' && (
              <motion.span
                variants={{
                  open: { rotate: iconStyle === 'chevron' ? 0 : 0 },
                  closed: { rotate: iconStyle === 'chevron' ? -90 : 0 },
                }}
                className="flex-shrink-0 text-secondary group-hover:text-brand-secondary"
                aria-hidden="true"
              >
                <ToggleIcon className="h-6 w-6" />
              </motion.span>
            )}

            {/* Question Text */}
            <span className="flex-1">
              <span className="sr-only">{isOpen ? 'Collapse' : 'Expand'} question: </span>
              <span className="text-lg font-semibold text-primary group-hover:text-brand-secondary md:text-xl">
                {faq.question}
              </span>

              {/* Categories (shown below question if enabled) */}
              {showCategories && faq.categories && faq.categories.length > 0 && (
                <div id={`accordion-categories-${id}`} className="mt-2 flex flex-wrap gap-2">
                  {faq.categories.map((category) => (
                    <span
                      key={category.id}
                      className="inline-flex items-center rounded-full bg-accent-subtle px-2.5 py-0.5 text-xs font-medium text-accent"
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
              )}
            </span>

            {/* Icon - Right Position */}
            {iconPosition === 'right' && (
              <motion.span
                variants={{
                  open: { rotate: iconStyle === 'chevron' ? 0 : 0 },
                  closed: { rotate: iconStyle === 'chevron' ? -90 : 0 },
                }}
                className="flex-shrink-0 text-secondary group-hover:text-brand-secondary"
                aria-hidden="true"
              >
                <ToggleIcon className="h-6 w-6" />
              </motion.span>
            )}

            {/* Focus ring (keyboard only) */}
            {hasFocus && (
              <motion.div
                layoutId={`focus-ring-${index}`}
                className="pointer-events-none absolute -inset-2 rounded-lg ring-2 ring-brand-primary ring-offset-2 ring-offset-primary"
                transition={{ duration: 0.2 }}
              />
            )}
          </motion.button>
        </h3>

        {/* Answer Content */}
        <motion.div
          id={`accordion-content-${id}`}
          role="region"
          aria-labelledby={`accordion-header-${id}`}
          variants={{
            open: {
              height: 'auto',
              maskImage: 'linear-gradient(to bottom, black 100%, transparent 100%)',
              transition: {
                height: { duration, ease: [0.4, 0, 0.2, 1] },
                maskImage: { duration: duration * 0.8, ease: [0.4, 0, 0.2, 1] },
              },
            },
            closed: {
              height: 0,
              maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
              transition: {
                height: { duration: duration * 0.9, ease: [0.4, 0, 0.2, 1] },
                maskImage: { duration: duration * 0.7, ease: [0.4, 0, 0.2, 1] },
              },
            },
          }}
          className="overflow-hidden"
        >
          <motion.div
            variants={{
              open: {
                opacity: 1,
                filter: 'blur(0px)',
              },
              closed: {
                opacity: 0,
                filter: 'blur(2px)',
              },
            }}
            className={cn(
              dividerStyle === 'card' && 'pt-4',
              dividerStyle !== 'card' && 'pb-6',
              iconPosition === 'left' && 'pl-10'
            )}
          >
            {/* Rich Text Answer */}
            {faq.answer && typeof faq.answer === 'object' && 'root' in faq.answer && (
              <div className="lg:max-w-[80%]">
                <RichText
                  data={faq.answer}
                  enableGutter={false}
                  enableProse={true}
                />
              </div>
            )}

            {/* Related Content */}
            {faq.relatedContent && faq.relatedContent.length > 0 && (
              <div className="mt-6 border-t border-tertiary pt-6">
                <h4 className="text-sm font-semibold text-secondary">Related Articles</h4>
                <ul className="mt-3 space-y-2">
                  {faq.relatedContent.map((item) => {
                    const content = item.value
                    const slug = typeof content === 'object' && 'slug' in content ? content.slug : ''
                    const title = typeof content === 'object' && 'title' in content ? content.title : ''
                    const href =
                      item.relationTo === 'posts'
                        ? `/news-insights/${slug}`
                        : `/${slug}`

                    return (
                      <li key={content.id}>
                        <Link
                          href={href}
                          className="text-brand-secondary hover:text-brand-primary hover:underline"
                        >
                          {title}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {/* Downloadable Resources */}
            {faq.resources && faq.resources.length > 0 && (
              <div className="mt-6 border-t border-tertiary pt-6">
                <h4 className="text-sm font-semibold text-secondary">Downloads</h4>
                <ul className="mt-3 space-y-3">
                  {faq.resources.map((resource) => (
                    <li
                      key={resource.id}
                      className="flex items-start gap-3 rounded-lg border border-tertiary p-4 transition-colors hover:border-brand-secondary hover:bg-secondary"
                    >
                      <div className="flex-shrink-0">
                        {resource.file.mimeType?.startsWith('image/') && resource.file.url ? (
                          <OptimizedImage
                            resource={resource.file}
                            alt={resource.file.alt || resource.title}
                            width={48}
                            height={48}
                            className="h-12 w-12 rounded object-cover"
                          />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded bg-accent-subtle">
                            <span className="text-xs font-semibold text-accent">
                              {resource.file.filename?.split('.').pop()?.toUpperCase() || 'FILE'}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <a
                          href={resource.file.url || '#'}
                          download
                          className="font-medium text-primary hover:text-brand-primary hover:underline"
                        >
                          {resource.title}
                        </a>
                        {resource.description && (
                          <p className="mt-1 text-sm text-secondary">{resource.description}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </motion.div>
      </motion.section>
    </MotionConfig>
  )
}
