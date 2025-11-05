'use client'

import { RowLabelProps, useRowLabel } from '@payloadcms/ui'
import type { ContentBlock } from '@/payload-types'

export const ColumnRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<ContentBlock['columns']>[number]>()

  const contentType = data?.data?.contentType || 'richText'
  const size = data?.data?.size || 'oneThird'

  // Format size label
  const sizeLabels: Record<string, string> = {
    oneThird: '1/3',
    half: '1/2',
    twoThirds: '2/3',
    full: 'Full',
  }

  // Get content preview
  let preview = ''
  if (contentType === 'image' && data?.data?.image) {
    const imageName = typeof data.data.image === 'object' && data.data.image.filename
      ? data.data.image.filename
      : 'Image'
    preview = `📷 ${imageName}`
  } else if (contentType === 'richText' && data?.data?.richText) {
    // Try to extract first text from rich text
    interface LexicalTextNode {
      children?: Array<{ text?: string }>
    }
    const firstChild = data.data.richText?.root?.children?.[0] as LexicalTextNode | undefined
    if (firstChild?.children?.[0]?.text) {
      const text = firstChild.children[0].text as string
      preview = text.length > 30 ? `${text.substring(0, 30)}...` : text
    } else {
      preview = 'Rich text content'
    }
  }

  return (
    <div>
      <strong>Column {data.rowNumber !== undefined ? data.rowNumber + 1 : 1}</strong>
      {' '}
      <span style={{ opacity: 0.6 }}>
        ({sizeLabels[size as keyof typeof sizeLabels]})
      </span>
      {preview && (
        <span style={{ marginLeft: '8px', opacity: 0.7 }}>
          {preview}
        </span>
      )}
    </div>
  )
}
