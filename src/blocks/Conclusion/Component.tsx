import React from 'react'
import RichText from '@/components/RichText'
import type { ConclusionBlock as ConclusionBlockProps } from '@/payload-types'

export const ConclusionBlock: React.FC<
  ConclusionBlockProps & {
    className?: string
  }
> = ({ title, content, className }) => {
  return (
    <div className={`not-prose my-8 rounded-2xl bg-secondary px-5 py-6 md:my-12 md:p-8 ${className || ''}`}>
      <h2 className="mb-4 text-display-xs font-semibold text-primary">{title}</h2>
      <div className="text-lg text-tertiary [&_p+p]:mt-4">
        <RichText data={content} enableGutter={false} enableProse={false} />
      </div>
    </div>
  )
}