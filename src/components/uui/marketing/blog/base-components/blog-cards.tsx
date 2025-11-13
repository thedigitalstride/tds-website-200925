'use client'

import { ArrowRight } from '@untitledui/icons'
import { Badge } from '@/components/uui/base/badges/badges'
import { cx } from '@/utils/cx'
import { OptimizedImage } from '@/components/OptimizedImage'
import type { Media } from '@/payload-types'

export type Article = {
  id: string
  href: string
  thumbnailUrl: string
  thumbnailMedia?: Media // Payload Media resource for optimized images
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
    avatarMedia?: Media // Payload Media resource for avatar
  }
  publishedAt: string
  readingTime: string
  isFeatured?: boolean
}

export const Simple01Vertical = ({
  article,
  imageClassName,
}: {
  article: Article
  imageClassName?: string
}) => (
  <article className="flex flex-col gap-4">
    <a href={article.href} className="overflow-hidden rounded-md" tabIndex={-1}>
      <OptimizedImage
        resource={article.thumbnailMedia}
        src={!article.thumbnailMedia ? article.thumbnailUrl : undefined}
        alt={article.title}
        width={600}
        height={400}
        sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw"
        className={cx(
          'aspect-[1.5] w-full object-cover transition duration-100 ease-linear hover:scale-105',
          imageClassName,
        )}
      />
    </a>

    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 flex-wrap">
          {article.categories.map((category, index) => (
            <a
              key={index}
              href={category.href}
              className="text-sm font-semibold text-brand-secondary hover:text-brand-secondary_hover transition-colors"
            >
              <Badge size="sm">{category.name}</Badge>
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-1">
          <a
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
          </a>
          <p className="line-clamp-2 text-md text-tertiary">{article.summary}</p>
        </div>
      </div>
      {/*<time className="block text-sm text-tertiary">{article.publishedAt}</time>*/}
    </div>
  </article>
)
