import type { Metadata } from 'next/types'

import { BlogListing } from '@/components/payload-ui/BlogListing'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import type { Category } from '@/payload-types'
import type { Where } from 'payload'

export const revalidate = 600

type Args = {
  searchParams: Promise<{
    category?: string
  }>
}

export default async function Page(props: Args) {
  const searchParams = await props.searchParams
  const categorySlug = searchParams.category || undefined

  const payload = await getPayload({ config: configPromise })

  // Fetch all categories first to resolve category slug to ID if needed
  const categories = await payload.find({
    collection: 'categories',
    limit: 100,
  })

  // Find the category by slug if one is specified
  let selectedCategory: Category | undefined
  if (categorySlug) {
    selectedCategory = categories.docs.find((cat) => cat.slug === categorySlug)
  }

  // Build where clause with optional category filter
  const whereClause: Where = {
    _status: { equals: 'published' },
  }

  // Enable server-side filtering
  if (selectedCategory) {
    whereClause.categories = {
      in: [selectedCategory.id],
    }
  }

  // Fetch ALL published posts (just IDs and categories) for category counting
  const allPostsForCounting = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 1000, // High limit to get all posts
    overrideAccess: false,
    where: {
      _status: { equals: 'published' },
    },
    select: {
      id: true,
      categories: true,
    },
  })

  // Fetch filtered posts for display
  const posts = await payload.find({
    collection: 'posts',
    depth: 2,
    limit: 12,
    page: 1, // Explicitly set to page 1
    overrideAccess: false,
    where: whereClause,
    sort: '-publishedAt',
  })

  // Fetch posts settings
  const postsSettings = await payload.findGlobal({
    slug: 'postsSettings',
  })

  return (
    <BlogListing
      posts={posts.docs}
      allPosts={allPostsForCounting.docs}
      categories={categories.docs}
      currentPage={1} // Page 1
      totalPages={posts.totalPages}
      selectedCategory={categorySlug || undefined}
      settings={postsSettings}
    />
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `The Digital Stride Posts`,
  }
}
