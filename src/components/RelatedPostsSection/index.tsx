import React from 'react'
import type { Post, Category, User, Media } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { PayloadBlogCard } from '@/blocks/LatestPostsBlock/BlogCard'
import type { PayloadArticle } from '@/blocks/LatestPostsBlock/BlogCard'
import { PostsCarousel } from '@/blocks/LatestPostsBlock/PostsCarousel'
import { StaggeredGrid, StaggeredGridItem } from '@/components/StaggeredGrid'
import { cn } from '@/utilities/ui'
import { getGridImageSizes } from '@/utilities/getImageSizes'

/**
 * Transform Payload Post to PayloadArticle (matching LatestPostsBlock format)
 */
const transformPostToArticle = (
  post: Post,
): Omit<
  PayloadArticle,
  'displayExcerpt' | 'displayCategories' | 'displayAuthor' | 'displayDate' | 'displayReadingTime'
> => {
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
    categories,
    thumbnailUrl: heroImage?.url || '',
    thumbnailMedia: heroImage,
    publishedAt: formatDate(post.publishedAt),
    readingTime: calculateReadingTime(post.content),
    author: {
      name: author?.nickname || author?.name || 'Anonymous',
      href: '#',
      avatarUrl: authorAvatar?.url || '',
      avatarMedia: authorAvatar,
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
  if (!content) {
    return '5 min read'
  }

  const contentString = typeof content === 'string' ? content : JSON.stringify(content)
  const wordCount = contentString.split(/\s+/).length
  const minutes = Math.max(1, Math.round(wordCount / 200))
  return `${minutes} min read`
}

export type RelatedPostsSectionProps = {
  currentPost: Post
  limit?: number
}

/**
 * Smart Related Posts Section
 * - Uses manual relatedPosts if configured
 * - Falls back to category-based recommendations
 * - Respects global postsSettings for display
 * - Reuses LatestPostsBlock rendering logic
 */
export const RelatedPostsSection: React.FC<RelatedPostsSectionProps> = async ({
  currentPost,
  limit = 3,
}) => {
  const payload = await getPayload({ config: configPromise })

  // Fetch Posts Settings global for display settings
  const postsSettings = await payload.findGlobal({
    slug: 'postsSettings',
  })

  // Extract display settings from global
  const displayMode = postsSettings?.displayMode || 'auto'
  const desktopCols = postsSettings?.gridColumns?.desktop || '3'
  const tabletCols = postsSettings?.gridColumns?.tablet || '2'
  const mobileCols = postsSettings?.gridColumns?.mobile || '1'

  // Extract carousel settings
  const carouselSettings = postsSettings?.carouselSettings || {}
  const enableDrag = carouselSettings.enableDrag !== false
  const showArrows = carouselSettings.showArrows !== false
  const showProgress = carouselSettings.showProgress || false
  const peekAmount =
    (carouselSettings.peekAmount as 'none' | 'small' | 'medium' | 'large') || 'medium'
  const autoPlay = carouselSettings.autoPlay || false
  const autoPlayInterval = carouselSettings.autoPlayInterval || 5000

  // Extract card display settings
  const cardDisplay = postsSettings?.cardDisplay || {}

  let posts: Post[] = []

  // Smart content selection: Manual relatedPosts OR category-based recommendations
  if (currentPost.relatedPosts && Array.isArray(currentPost.relatedPosts) && currentPost.relatedPosts.length > 0) {
    // Use manually configured related posts
    const postIds = currentPost.relatedPosts
      .map((post) => (typeof post === 'object' ? post.id : post))
      .filter((id): id is string => typeof id === 'string')

    if (postIds.length > 0) {
      const fetchedPosts = await payload.find({
        collection: 'posts',
        depth: 1,
        where: {
          id: { in: postIds },
          _status: { equals: 'published' },
        },
        limit: postIds.length,
      })

      posts = fetchedPosts.docs
    }
  } else {
    // Fallback: Show posts from same categories (excluding current post)
    const categoryIds =
      Array.isArray(currentPost.categories) && currentPost.categories.length > 0
        ? currentPost.categories
            .map((cat) => (typeof cat === 'object' ? cat.id : cat))
            .filter((id): id is string => typeof id === 'string')
        : []

    if (categoryIds.length > 0) {
      const fetchedPosts = await payload.find({
        collection: 'posts',
        depth: 1,
        limit,
        where: {
          _status: { equals: 'published' },
          categories: { in: categoryIds },
          id: { not_equals: currentPost.id },
        },
        sort: '-publishedAt',
      })

      posts = fetchedPosts.docs
    } else {
      // Final fallback: Show latest posts (excluding current)
      const fetchedPosts = await payload.find({
        collection: 'posts',
        depth: 1,
        limit,
        where: {
          _status: { equals: 'published' },
          id: { not_equals: currentPost.id },
        },
        sort: '-publishedAt',
      })

      posts = fetchedPosts.docs
    }
  }

  // Don't render anything if no posts found
  if (posts.length === 0) {
    return null
  }

  // Transform posts to Article interface and pre-calculate display values
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
      displayCategories: cardDisplay?.showCategories !== false,
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
    displayMode === 'carousel' || (displayMode === 'auto' && articles.length > maxColsDesktop)

  // Build responsive grid classes
  const gridClasses = cn(
    'grid gap-x-8 gap-y-12 md:gap-y-16',
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
  )

  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-container px-4 md:px-8">
        {/* Simple heading - no eyebrow, no button */}
        <div className="max-w-3xl">
          <h2 className="text-display-sm font-semibold text-primary md:text-display-md">
            Related articles
          </h2>
        </div>

        {/* Conditional rendering: Carousel vs Grid */}
        {shouldUseCarousel ? (
          <div className="mt-12 md:mt-16">
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
          <StaggeredGrid className={cn(gridClasses, 'mt-12 md:mt-16')}>
            {articles.map((article, index) => (
              <StaggeredGridItem key={article.id}>
                <PayloadBlogCard article={article} sizes={imageSizes} priority={index < 3} />
              </StaggeredGridItem>
            ))}
          </StaggeredGrid>
        )}
      </div>
    </section>
  )
}
