'use client'
import { useRowLabel } from '@payloadcms/ui'
import type { ImageGridBlock } from '@/payload-types'

type ImageItem = NonNullable<ImageGridBlock['images']>[number]

export const ImageGridRowLabel = () => {
  const data = useRowLabel<ImageItem>()
  const rowNumber = data?.rowNumber !== undefined ? data.rowNumber + 1 : 1
  const name = data?.data?.name

  return <span>Image {rowNumber}{name ? `: ${name}` : ''}</span>
}
