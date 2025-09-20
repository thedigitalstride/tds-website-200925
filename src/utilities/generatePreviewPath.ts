import { PayloadRequest, CollectionSlug } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  posts: '/posts',
  pages: '',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string | string[]
  req: PayloadRequest
}

export const generatePreviewPath = ({ collection, slug }: Props) => {
  // Handle array slugs for nested pages
  const slugString = Array.isArray(slug) ? slug.join('/') : slug
  const pathSlug = Array.isArray(slug) ? slug.join('/') : slug

  const encodedParams = new URLSearchParams({
    slug: slugString,
    collection,
    path: `${collectionPrefixMap[collection]}/${pathSlug}`,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  const url = `/next/preview?${encodedParams.toString()}`

  return url
}
