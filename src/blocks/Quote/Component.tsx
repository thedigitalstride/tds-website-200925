import React from 'react'
import type { QuoteBlock as QuoteBlockProps } from '@/payload-types'

export const QuoteBlock: React.FC<
  QuoteBlockProps & {
    className?: string
  }
> = ({ quote, author, className }) => {
  return (
    <figure className={className}>
      <blockquote>
        <p>{quote}</p>
      </blockquote>
        <figcaption className="not-prose inline-flex flex-col w-full">         
          <p className="text-md font-semibold text-primary">{author.name}</p>
          {author.role && (
            <cite className="text-md text-tertiary not-italic">{author.role}</cite>
          )}
        </figcaption>
    </figure>
  )
}