import { cn } from '@/utilities/ui'
import React from 'react'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import { RenderBlocks } from '@/blocks/RenderBlocks'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns, spacing, contentAlignment } = props

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
    compact: 'py-12 lg:py-16',
    normal: 'py-16 lg:py-24',
    spacious: 'py-24 lg:py-32',
  }

  // Column span maps for different grid systems
  // Note: On tablet (md), all non-full columns use md:col-span-2 (2 out of 4 columns)
  const desktopSpanMap = { full: 12, half: 6, oneThird: 4, twoThirds: 8 }
  const tabletSpanMap = { full: 4, half: 2, oneThird: 2, twoThirds: 2 }
  
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
          <div className="grid grid-cols-4 lg:grid-cols-12 gap-8 lg:gap-12">
            {columns &&
              columns.length > 0 &&
              columns.map((col, index) => {
                const { layout, size, verticalAlign, sticky } = col
                
                // Apply column start only to first column when aligning
                const isFirstColumn = index === 0
                const alignClasses = isFirstColumn
                  ? cn(tabletClass, desktopClass)
                  : ''

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
                    )}
                    key={index}
                  >
                    {layout && layout.length > 0 && <RenderBlocks blocks={layout} />}
                  </div>
                )
              })}
          </div>
        </div>
      </section>
    </>
  )
}
