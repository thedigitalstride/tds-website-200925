import React from 'react'
import type {
  Post,
  Category,
  User,
  Media,
  LatestPostsBlock as LatestPostsBlockProps,
} from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { PayloadBlogCard } from './BlogCard'
import type { PayloadArticle } from './BlogCard'
import { PostsCarousel } from './PostsCarousel'
import { StaggeredGrid, StaggeredGridItem } from '@/components/StaggeredGrid'
import { UUIButton } from '@/components/payload-ui'
import { cn } from '@/utilities/ui'
import { getGridImageSizes } from '@/utilities/getImageSizes'

/**
 * Transform Payload Post to base article (without display properties)
 */
const transformPostToArticle = (post: Post): Omit<PayloadArticle, 'displayExcerpt' | 'displayCategories' | 'displayAuthor' | 'displayDate' | 'displayReadingTime'> => {
  // Extract and type-guard heroImage
  const heroImage = typeof post.heroImage === 'object' ? (post.heroImage as Media) : undefined

  // Extract and type-guard first author
  const firstAuthor = post.populatedAuthors?.[0]
  const author =
    firstAuthor && typeof firstAuthor === 'object' ? (firstAuthor as unknown as User) : undefined
  const authorAvatar =
    author?.avatar && typeof author.avatar === 'object' ? (author.avatar as Media) : undefined

  // Extract categories array
  const categories =
    Array.isArray(post.categories) && post.categories.length > 0
      ? post.categories
          .filter((cat): cat is Category => typeof cat === 'object')
          .map((category) => ({
            name: category.title || 'Uncategorized',
            href: category.slug ? `/news-insights?category=${category.slug}` : '#',
          }))
      : [{ name: 'Uncategorized', href: '#' }]

  return {
    id: post.id.toString(),
    title: post.title,
    summary: post.subtitle || '',
    href: `/news-insights/${post.slug}`,
    categories, // Array, not singular
    thumbnailUrl: heroImage?.url || '',
    thumbnailMedia: heroImage, // Pass the full Media object
    publishedAt: formatDate(post.publishedAt),
    readingTime: calculateReadingTime(post.content),
    author: {
      name: author?.nickname || author?.name || 'Anonymous',
      href: '#',
      avatarUrl: authorAvatar?.url || '',
      avatarMedia: authorAvatar, // Pass the full Media object
    },
  }
}

/**
 * Format date for display
 */
const formatDate = (dateString?: string | null): string => {
  if (!dateString) {
    return new Date().toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }
  return new Date(dateString).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/**
 * Calculate estimated reading time
 */
const calculateReadingTime = (content: unknown): string => {
  // Handle missing or null content
  if (!content) {
    return '5 min read' // Default fallback
  }

  // Simple estimate: ~200 words per minute
  const contentString = typeof content === 'string' ? content : JSON.stringify(content)
  const wordCount = contentString.split(/\s+/).length
  const minutes = Math.max(1, Math.round(wordCount / 200))
  return `${minutes} min read`
}

export const LatestPostsBlock: React.FC<
  LatestPostsBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, header, contentSource, opts, selectedPosts, buttonConfig, spacing } = props

  // Fetch Posts Settings global for ALL display settings
  const payload = await getPayload({ config: configPromise })
  const postsSettings = await payload.findGlobal({
    slug: 'postsSettings',
  })

  // Extract all display settings from global (single source of truth)
  const displayMode = postsSettings?.displayMode || 'auto'
  const desktopCols = postsSettings?.gridColumns?.desktop || '3'
  const tabletCols = postsSettings?.gridColumns?.tablet || '2'
  const mobileCols = postsSettings?.gridColumns?.mobile || '1'

  // Extract carousel settings from global
  const carouselSettings = postsSettings?.carouselSettings || {}
  const enableDrag = carouselSettings.enableDrag !== false // Default true
  const showArrows = carouselSettings.showArrows !== false // Default true
  const showProgress = carouselSettings.showProgress || false
  const peekAmount = (carouselSettings.peekAmount as 'none' | 'small' | 'medium' | 'large') || 'medium'
  const autoPlay = carouselSettings.autoPlay || false
  const autoPlayInterval = carouselSettings.autoPlayInterval || 5000

  // Extract card display settings from global
  const cardDisplay = postsSettings?.cardDisplay || {}

  let posts: Post[] = []

  // Fetch posts based on content source
  if (contentSource === 'latest') {
    const numberOfPosts = parseInt(opts?.numPosts || '4')
    const categoryFilters = opts?.categoryFilter
    const excludePosts = opts?.excludePosts
    const sortBy = opts?.sortBy || 'date-desc'
    const showFeaturedFirst = opts?.showFeaturedFirst || false

    // Build where clause
    const whereClause: Record<string, unknown> = {
      _status: { equals: 'published' },
    }

    // Add category filter if specified (multiple categories with OR logic)
    if (categoryFilters && Array.isArray(categoryFilters) && categoryFilters.length > 0) {
      const categoryIds = categoryFilters
        .map((cat) => (typeof cat === 'object' ? cat.id : cat))
        .filter((id): id is string => typeof id === 'string')

      if (categoryIds.length > 0) {
        whereClause.categories = { in: categoryIds }
      }
    }

    // Exclude specific posts
    if (excludePosts && Array.isArray(excludePosts) && excludePosts.length > 0) {
      const excludeIds = excludePosts
        .map((post) => (typeof post === 'object' ? post.id : post))
        .filter((id): id is string => typeof id === 'string')

      if (excludeIds.length > 0) {
        whereClause.id = { not_in: excludeIds }
      }
    }

    // Determine sort order
    let sortField = '-publishedAt' // Default: newest first
    switch (sortBy) {
      case 'date-asc':
        sortField = 'publishedAt'
        break
      case 'title-asc':
        sortField = 'title'
        break
      case 'title-desc':
        sortField = '-title'
        break
      default:
        sortField = '-publishedAt'
    }

    const fetchedPosts = await payload.find({
      collection: 'posts',
      depth: 1, // Populate relationships (heroImage, authors, categories)
      limit: numberOfPosts,
      where: whereClause as never, // Type assertion for Payload where clause
      sort: sortField,
    })

    posts = fetchedPosts.docs

    // Handle featured-first sorting (post-fetch sort)
    if (showFeaturedFirst) {
      posts = posts.sort((a, b) => {
        // Assuming posts have a 'featured' boolean field
        const aFeatured = (a as Post & { featured?: boolean }).featured || false
        const bFeatured = (b as Post & { featured?: boolean }).featured || false
        if (aFeatured && !bFeatured) return -1
        if (!aFeatured && bFeatured) return 1
        return 0
      })
    }
  } else {
    // Manual selection - need to fetch full posts with relationships
    if (selectedPosts?.length) {
      const payload = await getPayload({ config: configPromise })

      // Extract post IDs from selectedPosts
      const postIds = selectedPosts
        .map((post) => (typeof post === 'object' ? post.id : post))
        .filter((id): id is string => typeof id === 'string')

      // Fetch full posts with relationships populated
      if (postIds.length > 0) {
        const fetchedPosts = await payload.find({
          collection: 'posts',
          depth: 1, // Populate relationships
          where: {
            id: { in: postIds },
          },
          limit: postIds.length,
        })

        posts = fetchedPosts.docs
      }
    }
  }

  // Transform posts to Article interface and pre-calculate all display values
  const excerptLengths = {
    short: 50,
    medium: 100,
    long: 150,
  }

  const excerptLength = (cardDisplay?.excerptLength as 'short' | 'medium' | 'long') || 'medium'
  const maxExcerptLength = excerptLengths[excerptLength]

  const articles = posts.map((post) => {
    const article = transformPostToArticle(post)

    // Pre-calculate excerpt based on settings
    const shouldShowExcerpt = cardDisplay?.showExcerpt !== false
    const excerpt =
      shouldShowExcerpt && article.summary
        ? article.summary.length > maxExcerptLength
          ? article.summary.substring(0, maxExcerptLength) + '...'
          : article.summary
        : null

    return {
      ...article,
      displayExcerpt: excerpt,
      displayCategories: cardDisplay?.showCategories !== false, // Default true
      displayAuthor: cardDisplay?.showAuthor || false,
      displayDate: cardDisplay?.showDate || false,
      displayReadingTime: cardDisplay?.showReadingTime || false,
    }
  })

  // Calculate responsive image sizes based on grid columns
  const imageSizes = getGridImageSizes({
    mobile: mobileCols,
    tablet: tabletCols,
    desktop: desktopCols,
  })

  // Determine if we should use carousel
  const maxColsDesktop = parseInt(desktopCols)
  const shouldUseCarousel =
    displayMode === 'carousel' ||
    (displayMode === 'auto' && articles.length > maxColsDesktop)

  // Build responsive grid classes (for grid mode)
  const gridClasses = cn(
    'mt-12 grid gap-x-8 gap-y-12 md:mt-16 md:gap-y-16',
    // Mobile columns
    mobileCols === '1' ? 'grid-cols-1' : 'grid-cols-2',
    // Tablet columns
    tabletCols === '2'
      ? 'md:grid-cols-2'
      : tabletCols === '3'
        ? 'md:grid-cols-3'
        : tabletCols === '4'
          ? 'md:grid-cols-4'
          : 'md:grid-cols-2',
    // Desktop columns
    desktopCols === '2'
      ? 'lg:grid-cols-2'
      : desktopCols === '3'
        ? 'lg:grid-cols-3'
        : desktopCols === '4'
          ? 'lg:grid-cols-4'
          : 'lg:grid-cols-3',
    !header?.showHeader && 'mt-0',
  )

  // Spacing classes (match FeaturesBlock)
  const spacingClasses: Record<string, string> = {
    none: '',
    compact: 'py-12 lg:py-16',
    normal: 'py-16 lg:py-24',
    spacious: 'py-24 lg:py-32',
  }

  return (
    <section className={cn(spacingClasses[spacing || 'normal'])} id={`block-${id}`}>
      <div className="mx-auto max-w-container px-4 md:px-8">
        {/* Header with button */}
        {header?.showHeader && (
          <div className="flex flex-col items-start justify-between lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              {header.eyebrow && (
                <p className="text-sm font-semibold text-brand-secondary md:text-md">
                  {header.eyebrow}
                </p>
              )}
              {header.heading && (
                <h2 className="mt-3 text-display-sm font-semibold text-primary md:text-display-md">
                  {header.heading}
                </h2>
              )}
              {header.description && (
                <p className="mt-4 text-lg text-secondary md:mt-5 md:text-xl">
                  {header.description}
                </p>
              )}
            </div>

            {/* Desktop button */}
            {buttonConfig?.showButton && buttonConfig.link && (
              <div className="hidden gap-3 lg:flex">
                <UUIButton
                  label={buttonConfig.link.label || 'View all posts'}
                  link={buttonConfig.link}
                />
              </div>
            )}
          </div>
        )}

        {/* Conditional rendering: Carousel vs Grid */}
        {shouldUseCarousel ? (
          <div className={cn('mt-12 md:mt-16', !header?.showHeader && 'mt-0')}>
            <PostsCarousel
              articles={articles}
              imageSizes={imageSizes}
              peekAmount={peekAmount}
              enableDrag={enableDrag}
              showArrows={showArrows}
              showProgress={showProgress}
              autoPlay={autoPlay}
              autoPlayInterval={autoPlayInterval}
              columns={{
                mobile: mobileCols,
                tablet: tabletCols,
                desktop: desktopCols,
              }}
            />
          </div>
        ) : (
          <StaggeredGrid className={gridClasses}>
            {articles.map((article, index) => (
              <StaggeredGridItem key={article.id}>
                <PayloadBlogCard
                  article={article}
                  sizes={imageSizes}
                  priority={index < 3}
                />
              </StaggeredGridItem>
            ))}
          </StaggeredGrid>
        )}

        {/* Mobile button */}
        {buttonConfig?.showButton && buttonConfig.link && (
          <div className="mt-12 flex flex-col gap-3 lg:hidden">
            <UUIButton
              label={buttonConfig.link.label || 'View all posts'}
              link={buttonConfig.link}
            />
          </div>
        )}
      </div>
    </section>
  )
}
