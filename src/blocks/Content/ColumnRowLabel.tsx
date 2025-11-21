'use client'

import { RowLabelProps, useRowLabel } from '@payloadcms/ui'
import type { ContentBlock } from '@/payload-types'

export const ColumnRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<ContentBlock['columns']>[number]>()

  // Early return if no data
  if (!data?.data) {
    return <div>Column</div>
  }

  const size = data.data.size || 'oneThird'
  const layout = data.data.layout
  const sticky = data.data.sticky

  // Format size label
  const sizeLabels: Record<string, string> = {
    oneThird: '1/3',
    half: '1/2',
    twoThirds: '2/3',
    full: 'Full',
  }

  // Get content preview from layout blocks
  let preview = ''
  if (layout && Array.isArray(layout) && layout.length > 0) {
    const firstBlock = layout[0]
    const blockCount = layout.length
    
    if (firstBlock && typeof firstBlock === 'object' && 'blockType' in firstBlock) {
      if (firstBlock.blockType === 'richText') {
        preview = blockCount > 1 ? `Rich text + ${blockCount - 1} more` : 'Rich text'
      } else if (firstBlock.blockType === 'inlineCard') {
        preview = blockCount > 1 ? `Card + ${blockCount - 1} more` : 'Card'
      } else if (firstBlock.blockType === 'mediaBlock') {
        preview = blockCount > 1 ? `Image + ${blockCount - 1} more` : 'Image'
      } else if (firstBlock.blockType === 'spacer') {
        preview = blockCount > 1 ? `Spacer + ${blockCount - 1} more` : 'Spacer'
      }
    }
  }

  const columnNumber = data.rowNumber !== undefined ? data.rowNumber + 1 : 1

  return (
    <div>
      <strong>Column {columnNumber}</strong>
      {' '}
      <span style={{ opacity: 0.6 }}>
        ({sizeLabels[size as keyof typeof sizeLabels] || size})
      </span>
      {sticky && (
        <span style={{ marginLeft: '8px', opacity: 0.8, fontWeight: 500 }}>
          [Sticky]
        </span>
      )}
      {preview && (
        <span style={{ marginLeft: '8px', opacity: 0.7 }}>
          {preview}
        </span>
      )}
    </div>
  )
}
