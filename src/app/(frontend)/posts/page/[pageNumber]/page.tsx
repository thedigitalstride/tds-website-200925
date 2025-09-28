import type { Metadata } from 'next/types'

import { BlogListing } from '@/components/payload-ui/BlogListing'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { notFound } from 'next/navigation'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  // Fetch posts with all required fields for BlogListing
  const posts = await payload.find({
    collection: 'posts',
    depth: 2, // Increased depth to populate relationships
    limit: 12,
    page: sanitizedPageNumber,
    overrideAccess: false,
    where: {
      _status: { equals: 'published' }
    },
    sort: '-publishedAt'
  })

  if (sanitizedPageNumber > posts.totalPages) notFound()

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
  const { pageNumber } = await paramsPromise
  return {
    title: `Payload Website Template Posts Page ${pageNumber || ''}`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'posts',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 10)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
