import { cn } from '@/utilities/ui'
import React from 'react'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import {
  getBackgroundClasses,
  getTextColorClasses,
  type BackgroundVariant,
} from '@/utilities/backgroundVariants'

interface ExtendedContentBlockProps extends Omit<ContentBlockProps, 'cardSpacing'> {
  cardSpacing?: 'default' | 'compact' | 'normal' | 'large' | 'xl'
}

// Column styling class mappings
const paddingClasses: Record<string, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

const roundedClasses: Record<string, string> = {
  none: '',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
}

export const ContentBlock: React.FC<ExtendedContentBlockProps> = (props) => {
  const { columns, spacing, contentAlignment, cardSpacing } = props

  const colsSpanClasses = {
    full: 'lg:col-span-12',
    half: 'lg:col-span-6',
    oneThird: 'lg:col-span-4',
    twoThirds: 'lg:col-span-8',
  }

  const verticalAlignClasses = {
    top: 'self-start',
    middle: 'self-center',
    bottom: 'self-end',
  }

  const spacingClasses: Record<string, string> = {
    none: '',
    compact: 'py-12 lg:py-16',
    normal: 'py-16 lg:py-24',
    spacious: 'py-24 lg:py-32',
  }

  // Column span maps for different grid systems
  // Note: On tablet (md), all non-full columns use md:col-span-2 (2 out of 4 columns)
  const desktopSpanMap = { full: 12, half: 6, oneThird: 4, twoThirds: 8 }
  const tabletSpanMap = { full: 4, half: 2, oneThird: 2, twoThirds: 2 }
  
  // Grid gap classes (applies to the grid container, not individual columns)
  const gridGapClasses: Record<string, string> = {
    default: 'gap-8 lg:gap-12', // Original default grid spacing
    compact: 'gap-4',
    normal: 'gap-6',
    large: 'gap-8',
    xl: 'gap-12',
  }
  
  // Calculate total spans for each grid system
  const desktopTotalSpan =
    columns?.reduce((sum, col) => {
      const span = desktopSpanMap[col.size as keyof typeof desktopSpanMap] ?? 4
      return Math.min(sum + span, 12)
    }, 0) ?? 12
    
  const tabletTotalSpan =
    columns?.reduce((sum, col) => {
      const span = tabletSpanMap[col.size as keyof typeof tabletSpanMap] ?? 2
      return Math.min(sum + span, 4)
    }, 0) ?? 4

  const isFullWidthDesktop = desktopTotalSpan >= 12
  const isFullWidthTablet = tabletTotalSpan >= 4

  // Calculate grid column start for alignment at each breakpoint
  const getColumnStart = (gridColumns: number, totalSpan: number, isFullWidth: boolean) => {
    if (isFullWidth || !contentAlignment || contentAlignment === 'left') return undefined
    
    if (contentAlignment === 'center') {
      // Center: (gridColumns - totalSpan) / 2, rounded down, + 1 (grid is 1-indexed)
      const offset = Math.floor((gridColumns - totalSpan) / 2)
      return offset + 1
    }
    
    if (contentAlignment === 'right') {
      // Right: start at gridColumns - totalSpan + 1
      return gridColumns - totalSpan + 1
    }
    
    return undefined
  }

  const tabletColumnStart = getColumnStart(4, tabletTotalSpan, isFullWidthTablet)
  const desktopColumnStart = getColumnStart(12, desktopTotalSpan, isFullWidthDesktop)
  
  // Generate unique class names for CSS scoping
  const tabletClass = tabletColumnStart ? `content-align-tablet-${tabletColumnStart}` : ''
  const desktopClass = desktopColumnStart ? `content-align-desktop-${desktopColumnStart}` : ''

  return (
    <>
      {(tabletColumnStart || desktopColumnStart) && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
              ${tabletColumnStart ? `
                @media (min-width: 768px) and (max-width: 1023px) {
                  .content-align-tablet-${tabletColumnStart} {
                    grid-column-start: ${tabletColumnStart} !important;
                  }
                }
              ` : ''}
              ${desktopColumnStart ? `
                @media (min-width: 1024px) {
                  .content-align-desktop-${desktopColumnStart} {
                    grid-column-start: ${desktopColumnStart} !important;
                  }
                }
              ` : ''}
            `,
          }}
        />
      )}
      <section className={cn(spacingClasses[spacing || 'normal'])}>
        <div className="mx-auto max-w-container px-4 md:px-8">
          <div className={cn(
            'grid grid-cols-4 lg:grid-cols-12',
            gridGapClasses[cardSpacing || 'default']
          )}>
            {columns &&
              columns.length > 0 &&
              columns.map((col, index) => {
                const {
                  layout,
                  size,
                  verticalAlign,
                  sticky,
                  columnBackground,
                  columnPadding,
                  columnRounded,
                  columnShadow,
                } = col

                // Apply defaults (null values from CMS should use defaults)
                const bgVariant = columnBackground ?? 'none'
                const padding = columnPadding ?? 'none'
                const rounded = columnRounded ?? 'xl'
                const shadow = columnShadow ?? false

                // Apply column start only to first column when aligning
                const isFirstColumn = index === 0
                const alignClasses = isFirstColumn ? cn(tabletClass, desktopClass) : ''

                // Compute column styling classes
                const hasBackground = bgVariant !== 'none'
                const bgClasses = hasBackground
                  ? getBackgroundClasses(bgVariant as BackgroundVariant)
                  : ''
                const textColorContext = hasBackground
                  ? getTextColorClasses(bgVariant as BackgroundVariant)
                  : null

                return (
                  <div
                    className={cn(
                      'col-span-4',
                      colsSpanClasses[size!],
                      verticalAlignClasses[verticalAlign || 'top'],
                      size !== 'full' && 'md:col-span-2',
                      alignClasses,
                      // Sticky positioning (tablet and desktop, not mobile)
                      sticky && 'md:sticky md:top-24 md:self-start',
                      // Column styling classes
                      hasBackground && bgClasses,
                      hasBackground && paddingClasses[padding],
                      hasBackground && bgVariant !== 'line' && roundedClasses[rounded],
                      hasBackground && shadow && 'shadow-md',
                    )}
                    key={index}
                  >
                    {layout && layout.length > 0 && (
                      <RenderBlocks blocks={layout} textColorContext={textColorContext} disableInnerContainer />
                    )}
                  </div>
                )
              })}
          </div>
        </div>
      </section>
    </>
  )
}
