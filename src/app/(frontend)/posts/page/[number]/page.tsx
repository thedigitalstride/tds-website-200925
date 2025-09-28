import type { Metadata } from 'next/types'

import { BlogListing } from '@/components/payload-ui/BlogListing'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { notFound } from 'next/navigation'
import type { Category } from '@/payload-types'
import type { Where } from 'payload'

export const revalidate = 600

type Args = {
  params: Promise<{
    number: string
  }>
  searchParams: Promise<{
    category?: string
  }>
}

export default async function Page(props: Args) {
  const { number } = await props.params
  const searchParams = await props.searchParams
  const categorySlug = searchParams.category
  const payload = await getPayload({ config: configPromise })

  const currentPage = Number(number)

  if (!Number.isInteger(currentPage) || currentPage < 2) {
    notFound()
  }

  // Allow category filtering on any page number - no redirect needed

  // Fetch all categories first to resolve category slug to ID if needed
  const categories = await payload.find({
    collection: 'categories',
    limit: 100
  })

  // Find the category by slug if one is specified
  let selectedCategory: Category | undefined
  if (categorySlug) {
    selectedCategory = categories.docs.find(cat => cat.slug === categorySlug)
  }

  // Build where clause with optional category filter
  const whereClause: Where = {
    _status: { equals: 'published' }
  }

  // Enable server-side filtering
  if (selectedCategory) {
    whereClause.categories = {
      in: [selectedCategory.id]
    }
  }

  // Fetch posts with all required fields for BlogListing
  const posts = await payload.find({
    collection: 'posts',
    depth: 2,
    limit: 12,
    page: currentPage,
    overrideAccess: false,
    where: whereClause,
    sort: '-publishedAt'
  })

  if (currentPage > posts.totalPages) {
    notFound()
  }

  return (
    <BlogListing
      posts={posts.docs}
      categories={categories.docs}
      currentPage={posts.page}
      totalPages={posts.totalPages}
      selectedCategory={categorySlug || undefined}
    />
  )
}

export async function generateMetadata(props: Args): Promise<Metadata> {
  const { number } = await props.params
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