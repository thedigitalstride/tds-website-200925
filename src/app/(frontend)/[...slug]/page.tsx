import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    depth: 2, // Include breadcrumbs
    select: {
      slug: true,
      breadcrumbs: true,
    },
  })

  return pages.docs
    ?.filter((doc) => doc.slug !== 'home')
    .map((doc) => {
      // No breadcrumbs = top-level page
      if (!doc.breadcrumbs || doc.breadcrumbs.length === 0) {
        return { slug: [doc.slug] }
      }

      // Extract path from last breadcrumb's URL
      const lastBreadcrumb = doc.breadcrumbs[doc.breadcrumbs.length - 1]
      const path = lastBreadcrumb.url?.substring(1).split('/') || [doc.slug]

      return { slug: path }
    }) || []
}

type Args = {
  params: Promise<{
    slug?: string[]
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = [] } = await paramsPromise
  const url = '/' + slug.join('/')

  const page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageBySlug({
    slug,
  })

  // Fallback removed since seeding is not needed

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout, breadcrumbs } = page

  return (
    <article className="pt-16 pb-24">
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <div className="container mx-auto px-4">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = [] } = await paramsPromise
  const page = await queryPageBySlug({
    slug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string[] }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  // Home page special case
  if (slug.length === 0) {
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } },
      draft,
      limit: 1,
      overrideAccess: draft,
    })
    return result.docs?.[0] || null
  }

  // For nested pages, query by last segment
  const lastSegment = slug[slug.length - 1]

  const candidates = await payload.find({
    collection: 'pages',
    where: { slug: { equals: lastSegment } },
    draft,
    depth: 2, // Include breadcrumbs
    overrideAccess: draft,
  })

  // Find the page with matching breadcrumb path
  return candidates.docs.find(doc => {
    // Top-level page (no breadcrumbs except self)
    if (!doc.breadcrumbs || doc.breadcrumbs.length <= 1) {
      return slug.length === 1
    }

    // Check breadcrumb URLs match our path
    const lastBreadcrumb = doc.breadcrumbs[doc.breadcrumbs.length - 1]
    const breadcrumbPath = lastBreadcrumb.url?.substring(1) // Remove leading /

    return breadcrumbPath === slug.join('/')
  }) || null
})
