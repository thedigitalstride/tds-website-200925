import type { Metadata } from 'next/types'

import { BlogListing } from '@/components/payload-ui/BlogListing'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { notFound } from 'next/navigation'

export const revalidate = 600

type Args = {
  params: Promise<{
    number: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { number } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const currentPage = Number(number)

  if (!Number.isInteger(currentPage) || currentPage < 2) {
    notFound()
  }

  // Fetch posts with all required fields for BlogListing
  const posts = await payload.find({
    collection: 'posts',
    depth: 2,
    limit: 12,
    page: currentPage,
    overrideAccess: false,
    where: {
      _status: { equals: 'published' }
    },
    sort: '-publishedAt'
  })

  if (currentPage > posts.totalPages) {
    notFound()
  }

  // Fetch all categories for filtering
  const categories = await payload.find({
    collection: 'categories',
    limit: 100
  })

  return (
    <BlogListing
      posts={posts.docs}
      categories={categories.docs}
      currentPage={posts.page}
      totalPages={posts.totalPages}
    />
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { number } = await paramsPromise
  return {
    title: `Payload Website Template Posts - Page ${number}`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'posts',
    overrideAccess: false,
    where: {
      _status: { equals: 'published' }
    }
  })

  const totalPages = Math.ceil(totalDocs / 12) // 12 posts per page

  const pages: { number: string }[] = []

  // Generate pages starting from 2 (page 1 is handled by /posts/page.tsx)
  for (let i = 2; i <= totalPages; i++) {
    pages.push({ number: String(i) })
  }

  return pages
}