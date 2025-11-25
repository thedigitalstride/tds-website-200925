'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from '@untitledui/icons'
import { Badge } from '@/components/uui/base/badges/badges'
import { OptimizedImage } from '@/components/OptimizedImage'
import type { Media } from '@/payload-types'
import { cn } from '@/utilities/ui'

export type PayloadArticle = {
  id: string
  href: string
  thumbnailUrl: string
  thumbnailMedia?: Media
  title: string
  summary: string
  categories: Array<{
    href: string
    name: string
  }>
  author: {
    href: string
    name: string
    avatarUrl: string
    avatarMedia?: Media
  }
  publishedAt: string
  readingTime: string
  // Pre-calculated display values (computed on server)
  displayExcerpt: string | null
  displayCategories: boolean
  displayAuthor: boolean
  displayDate: boolean
  displayReadingTime: boolean
}

const BlogCardComponent: React.FC<{
  article: PayloadArticle
  imageClassName?: string
  priority?: boolean
  sizes?: string
}> = ({ article, imageClassName, priority = false, sizes }) => (
  <article className="flex flex-col gap-4">
    <Link href={article.href} className="overflow-hidden rounded-xl" tabIndex={-1}>
      <OptimizedImage
        resource={article.thumbnailMedia}
        src={!article.thumbnailMedia && article.thumbnailUrl ? article.thumbnailUrl : undefined}
        alt={article.title}
        width={600}
        height={400}
        priority={priority}
        sizes={sizes}
        className={cn(
          'aspect-[1.5] w-full object-cover transition-transform duration-300 ease-linear hover:scale-105',
          imageClassName,
        )}
      />
    </Link>

    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        {/* Categories */}
        {article.displayCategories && article.categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {article.categories.map((category, index) => (
              <Link
                key={index}
                href={category.href}
                className="text-sm font-semibold text-brand-secondary transition-colors hover:text-brand-secondary_hover"
              >
                <Badge size="sm">{category.name}</Badge>
              </Link>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <Link
            href={article.href}
            className="group/title flex justify-between gap-x-4 rounded-md text-lg font-semibold text-primary outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <span className="underline-offset-4 transition-all duration-100 ease-linear group-hover/title:underline">
              {article.title}
            </span>
            <ArrowRight
              className="mt-0.5 size-6 shrink-0 text-fg-primary transition duration-100 ease-linear group-hover/title:text-fg-primary_hover"
              aria-hidden="true"
            />
          </Link>

          {/* Excerpt */}
          {article.displayExcerpt && (
            <p className="line-clamp-2 text-md text-tertiary">{article.displayExcerpt}</p>
          )}
        </div>
      </div>

      {/* Author / Meta Info */}
      {(article.displayAuthor || article.displayDate || article.displayReadingTime) && (
        <div className="flex items-center gap-3 text-sm text-tertiary">
          {article.displayAuthor && <span>{article.author.name}</span>}

          {article.displayDate && (
            <>
              {article.displayAuthor && <span aria-hidden="true">·</span>}
              <time>{article.publishedAt}</time>
            </>
          )}

          {article.displayReadingTime && (
            <>
              {(article.displayAuthor || article.displayDate) && <span aria-hidden="true">·</span>}
              <span>{article.readingTime}</span>
            </>
          )}
        </div>
      )}
    </div>
  </article>
)

// Memoize to prevent any re-renders from parent state changes
export const PayloadBlogCard = React.memo(BlogCardComponent)
