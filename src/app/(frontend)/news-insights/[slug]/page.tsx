  import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import { RelatedPostsSection } from '@/components/RelatedPostsSection'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import type { Post } from '@/payload-types'

import { PostLayout } from '@/components/PostLayout'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import RenderBlocks from '@/blocks/RenderBlocks'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs
    .map(({ slug }) => {
      // Ensure slug is a string
      return typeof slug === 'string' ? { slug } : null
    })
    .filter((param): param is { slug: string } => param !== null)

  return params
}

// Allow dynamic generation of pages for posts published after build
// Posts are cached with ISR for performance
export const dynamicParams = true
export const revalidate = 3600 // Revalidate cached posts every hour (ISR)

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/news-insights/' + slug
  const post = await queryPostBySlug({ slug, draft })

  if (!post) return <PayloadRedirects url={url} />

  // Generate breadcrumbs for posts (Posts don't have nestedDocsPlugin)
  const breadcrumbs = [
    {
      label: 'News & Insights',
      url: '/news-insights',
      id: 'news-insights',
    },
    {
      label: post.title,
      url: `/news-insights/${post.slug}`,
      id: String(post.id),
    },
  ]

  return (
    <>
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      {/* Before Content Blocks (e.g., Breadcrumbs) */}
      {post.beforeContent && post.beforeContent.length > 0 && (
        <RenderBlocks blocks={post.beforeContent} breadcrumbs={breadcrumbs} />
      )}

      {/* New PostLayout with UUI styling */}
      <PostLayout post={post} />

      {/* Related Posts Section - Smart selection with fallback to category-based recommendations */}
      <RelatedPostsSection currentPost={post} limit={3} />

      {/* After Content Blocks */}
      {post.afterContent && post.afterContent.length > 0 && (
        <RenderBlocks blocks={post.afterContent} />
      )}
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const { isEnabled: draft } = await draftMode()
  const post = await queryPostBySlug({ slug, draft })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug, draft }: { slug: string; draft: boolean }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
    // Type assertion needed due to Payload's populate type limitations
    populate: {
      // authors: not needed due to access control - use populatedAuthors instead
      // populatedAuthors: automatically populated by populateAuthors hook
      // contributors: not needed due to access control - use populatedContributors instead
      // populatedContributors: automatically populated by populateAuthors hook
      categories: {
        title: true,
        slug: true,
      },
      heroImage: true,
      relatedPosts: {
        title: true,
        slug: true,
        meta: {
          image: true,
          description: true,
        },
      },
      beforeContent: true,
      afterContent: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
  })

  return result.docs?.[0] || null
})
