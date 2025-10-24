'use client'

import { useRowLabel } from '@payloadcms/ui'

interface ResourceData {
  title?: string
  file?: {
    filename?: string
  }
}

export const ResourceRowLabel = () => {
  const { data } = useRowLabel<ResourceData>()

  if (data?.title) {
    return `Resource: ${data.title}`
  }

  if (typeof data?.file === 'object' && data.file?.filename) {
    return `Resource: ${data.file.filename}`
  }

  return 'Resource'
}
