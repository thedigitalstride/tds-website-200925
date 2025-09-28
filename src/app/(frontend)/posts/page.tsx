import type { Metadata } from 'next/types'

import { BlogListing } from '@/components/payload-ui/BlogListing'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  // Fetch posts for page 1 with all required fields for BlogListing
  const posts = await payload.find({
    collection: 'posts',
    depth: 2,
    limit: 12,
    page: 1, // Explicitly set to page 1
    overrideAccess: false,
    where: {
      _status: { equals: 'published' }
    },
    sort: '-publishedAt'
  })

  // Fetch all categories for filtering
  const categories = await payload.find({
    collection: 'categories',
    limit: 100
  })

  return (
    <BlogListing
      posts={posts.docs}
      categories={categories.docs}
      currentPage={1} // Page 1
      totalPages={posts.totalPages}
    />
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Posts`,
  }
}
