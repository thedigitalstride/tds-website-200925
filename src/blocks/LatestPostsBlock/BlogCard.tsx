'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowUpRight } from '@untitledui/icons'
import { Avatar } from '@/components/uui/base/avatar/avatar'
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
}

export const PayloadBlogCard: React.FC<{ article: PayloadArticle; imageClassName?: string }> = ({
  article,
  imageClassName,
}) => (
  <article className="flex flex-col gap-4">
    <Link href={article.href} className="overflow-hidden rounded-2xl" tabIndex={-1}>
      <OptimizedImage
        resource={article.thumbnailMedia}
        src={!article.thumbnailMedia ? article.thumbnailUrl : undefined}
        alt={article.title}
        width={600}
        height={400}
        className={cn(
          'aspect-[1.5] w-full object-cover transition duration-100 ease-linear hover:scale-105',
          imageClassName,
        )}
      />
    </Link>

    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          {article.categories.map((category, index) => (
            <Link
              key={index}
              href={category.href}
              className="text-sm font-semibold text-brand-secondary transition-colors hover:text-brand-secondary_hover"
            >
              <Badge size="sm" color="brand" type="pill-color">
                {category.name}
              </Badge>
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-1">
          <Link
            href={article.href}
            className="group/title flex justify-between gap-x-4 rounded-md text-lg font-semibold text-primary outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {article.title}
            <ArrowUpRight
              className="mt-0.5 size-6 shrink-0 text-fg-quaternary transition duration-100 ease-linear group-hover/title:text-fg-quaternary_hover"
              aria-hidden="true"
            />
          </Link>

          <p className="line-clamp-2 text-md text-tertiary">{article.summary}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Link href={article.author.href} tabIndex={-1} className="flex">
          {article.author.avatarMedia ? (
            <OptimizedImage
              resource={article.author.avatarMedia}
              alt={article.author.name}
              width={40}
              height={40}
              className="size-10 rounded-full object-cover"
            />
          ) : (
            <Avatar
              focusable
              alt={article.author.name}
              src={article.author.avatarUrl}
              size="md"
            />
          )}
        </Link>

        <div>
          <Link
            href={article.author.href}
            className="block rounded-xs text-sm font-semibold text-primary outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {article.author.name}
          </Link>
          <time className="block text-sm text-tertiary">{article.publishedAt}</time>
        </div>
      </div>
    </div>
  </article>
)
