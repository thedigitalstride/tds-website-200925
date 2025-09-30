import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL, GenerateDescription, GenerateImage } from '@payloadcms/plugin-seo/types'
import { richTextEditor } from '@/fields/richTextWithButtons'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'
import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | The Digital Stride` : 'The Digital Stride'
}

const generateDescription: GenerateDescription<Post | Page> = ({ doc }) => {
  // For Posts, use subtitle if available, otherwise fallback to a default
  if ('subtitle' in doc && doc.subtitle) {
    return doc.subtitle
  }

  // For Pages with hero content, extract description from hero
  if ('hero' in doc && doc.hero && typeof doc.hero === 'object' && 'description' in doc.hero && typeof doc.hero.description === 'string') {
    return doc.hero.description
  }

  // Default fallback
  return `View ${doc?.title || 'this page'} on The Digital Stride`
}

const generateImage: GenerateImage<Post | Page> = ({ doc }) => {
  // For Posts, use heroImage if available
  if ('heroImage' in doc && doc.heroImage && typeof doc.heroImage === 'object' && 'id' in doc.heroImage) {
    return doc.heroImage.id
  }

  // For Pages, use hero media if available
  if ('hero' in doc && doc.hero && typeof doc.hero === 'object' && 'media' in doc.hero && doc.hero.media && typeof doc.hero.media === 'object' && 'id' in doc.hero.media) {
    return doc.hero.media.id
  }

  // Return empty string if no image is available - plugin will handle fallback
  return ''
}

const generateURL: GenerateURL<Post | Page> = ({ doc, collectionSlug }) => {
  const url = getServerSideURL()

  // For posts, prefix with /posts
  if (collectionSlug === 'posts') {
    return doc?.slug ? `${url}/posts/${doc.slug}` : url
  }

  // For pages, use the slug directly
  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  nestedDocsPlugin({
    collections: ['pages'],
    generateLabel: (_, doc) => (doc.title as string) || '',
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    collections: ['pages', 'posts'],
    uploadsCollection: 'media',
    generateTitle,
    generateDescription,
    generateImage,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: richTextEditor({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            }
          }
          return field
        })
      },
    },
  }),
  searchPlugin({
    collections: ['posts'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
]
