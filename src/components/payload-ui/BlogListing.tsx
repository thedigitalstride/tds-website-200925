'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PaginationPageDefault } from '@/components/uui/application/pagination/pagination'
import { TabList, Tabs } from '@/components/uui/application/tabs/tabs'
import { Select } from '@/components/uui/base/select/select'
import {
  type Article,
  Simple01Vertical,
} from '@/components/uui/marketing/blog/base-components/blog-cards'
import { useBreakpoint } from '@/hooks/use-breakpoint'
import { cx } from '@/utils/cx'
import { formatDateTime } from '@/utilities/formatDateTime'
import { calculateReadingTime } from '@/utilities/calculateReadingTime'

import type { Post, Category, Media } from '@/payload-types'

interface BlogListingProps {
  posts: Post[]
  allPosts: Post[] // All posts for category counting
  categories: Category[]
  currentPage?: number
  totalPages?: number
  selectedCategory?: string
  settings?: {
    pageHeader?: {
      heading?: string | null
      description?: string | null
    } | null
    gridColumns?: {
      desktop?: string | null
      tablet?: string | null
      mobile?: string | null
    } | null
  } | null
}

const sortByOptions = [
  {
    id: 'newest',
    label: 'Newest first',
  },
  {
    id: 'oldest',
    label: 'Oldest first',
  },
]

// Transform Payload Post to UUI Article interface
const transformPost = (post: Post, index: number): Article => {
  // Safely extract data from Post type
  const heroImage = typeof post.heroImage === 'object' ? (post.heroImage as Media) : undefined
  const firstAuthor = post.populatedAuthors?.[0]
  // Extract ALL categories, not just the first one
  const allCategories =
    Array.isArray(post.categories) && post.categories.length > 0
      ? post.categories
          .filter((cat) => typeof cat === 'object')
          .map((cat) => {
            const category = cat as Category
            return {
              name: category.title || 'Uncategorized',
              href: category.slug ? `/posts?category=${category.slug}` : '#',
            }
          })
      : [{ name: 'Uncategorized', href: '#' }]

  return {
    id: post.id.toString(),
    title: post.title,
    summary: post.subtitle || '',
    href: `/posts/${post.slug || 'undefined'}`,
    categories: allCategories,
    thumbnailUrl: heroImage?.url || '/placeholder.jpg',
    publishedAt: formatDateTime(post.publishedAt || ''),
    readingTime: calculateReadingTime(post.content),
    author: {
      name: firstAuthor?.nickname || firstAuthor?.name || 'Anonymous',
      href: '#',
      avatarUrl:
        typeof firstAuthor?.avatar === 'object' ? (firstAuthor.avatar as Media)?.url || '' : '',
    },
    tags: [],
    isFeatured: index === 0,
  }
}

export const BlogListing: React.FC<BlogListingProps> = ({
  posts,
  allPosts,
  categories,
  currentPage = 1,
  totalPages = 1,
  selectedCategory: selectedCategoryProp,
  settings,
}) => {
  const router = useRouter()
  const isDesktop = useBreakpoint('lg')
  const [sortBy, setSortBy] = useState(sortByOptions[0].id)
  const selectedCategory = selectedCategoryProp || 'all'

  // Handle page navigation
  const handlePageChange = (page: number) => {
    const categoryParam = selectedCategory !== 'all' ? `?category=${selectedCategory}` : ''
    if (page === 1) {
      router.push(`/posts${categoryParam}`)
    } else {
      router.push(`/posts/page/${page}${categoryParam}`)
    }
  }

  // Handle category change
  const handleCategoryChange = (key: string) => {
    if (key === 'all') {
      router.push('/posts')
    } else {
      router.push(`/posts?category=${key}`)
    }
  }

  // Count posts per category - use ALL posts, not filtered subset
  const categoryPostCounts = categories.reduce(
    (acc, category) => {
      const categoryId = category.id
      const postCount = allPosts.filter((post) => {
        if (!post.categories || !Array.isArray(post.categories)) return false
        return post.categories.some((cat) =>
          typeof cat === 'object' ? cat.id === categoryId : cat === categoryId,
        )
      }).length
      acc[categoryId] = postCount
      return acc
    },
    {} as Record<number, number>,
  )

  // Create tabs from categories - only include categories with posts
  const tabs = [
    {
      id: 'all',
      label: 'View all',
    },
    ...categories
      .filter((category) => categoryPostCounts[category.id] > 0)
      .map((category) => ({
        id: category.slug || category.id.toString(),
        label: category.title,
      })),
  ]

  // Transform posts to articles and implement client-side filtering
  const articles = posts.map((post, index) => transformPost(post, index))

  // Filter articles by selected category (client-side filtering)
  const filteredArticles =
    selectedCategory === 'all'
      ? articles
      : articles.filter((article) => {
          // Check if any of the article's categories match the selected category slug
          return article.categories.some((cat) => cat.href.includes(`category=${selectedCategory}`))
        })

  // Sort the filtered articles
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        // Sort by date - most recent first (descending)
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      case 'oldest':
        // Sort by date - oldest first (ascending)
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      default:
        // Default to newest first
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    }
  })

  return (
    <div className="bg-primary">
      <section className="bg-primary py-16 md:py-24">
        <div className="mx-auto max-w-container px-4 md:px-8">
          <div className="flex w-full max-w-3xl flex-col">
            <h2 className="mt-3 text-display-md font-semibold text-primary md:text-display-lg">
              {settings?.pageHeader?.heading || 'News & insights'}
            </h2>
            <p className="mt-4 text-lg text-tertiary md:mt-6 md:text-xl">
              {settings?.pageHeader?.description ||
                'The latest industry news, interviews, technologies, and resources.'}
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto flex w-full max-w-container flex-col gap-12 px-4 pb-16 md:gap-16 md:px-8 md:pb-24">
        {/* Mobile Featured Post */}
        {sortedArticles.length > 0 && (
          <div className="md:hidden">
            <Simple01Vertical article={sortedArticles[0]} />
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col items-end gap-8 md:flex-row">
          <Tabs
            className="w-full"
            selectedKey={selectedCategory}
            onSelectionChange={(key) => handleCategoryChange(key as string)}
          >
            <TabList type="underline" size="md" items={tabs} className="overflow-auto" />
          </Tabs>

          <div className="relative w-full md:max-w-44">
            <Select
              aria-label="Sort by"
              size="md"
              selectedKey={sortBy}
              onSelectionChange={(value) => setSortBy(value as string)}
              items={sortByOptions}
            >
              {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
            </Select>
          </div>
        </div>

        {/* Posts Grid */}
        <ul
          className={cx(
            'grid gap-x-8 gap-y-12 md:gap-y-12',
            // Mobile columns
            settings?.gridColumns?.mobile === '2' ? 'grid-cols-2' : 'grid-cols-1',
            // Tablet columns
            settings?.gridColumns?.tablet === '2'
              ? 'md:grid-cols-2'
              : settings?.gridColumns?.tablet === '3'
                ? 'md:grid-cols-3'
                : settings?.gridColumns?.tablet === '4'
                  ? 'md:grid-cols-4'
                  : 'md:grid-cols-2',
            // Desktop columns
            settings?.gridColumns?.desktop === '2'
              ? 'lg:grid-cols-2'
              : settings?.gridColumns?.desktop === '3'
                ? 'lg:grid-cols-3'
                : settings?.gridColumns?.desktop === '4'
                  ? 'lg:grid-cols-4'
                  : 'lg:grid-cols-3',
          )}
        >
          {sortedArticles.map((article) => (
            <li key={article.id} className={cx(!isDesktop && 'nth-[n+7]:hidden')}>
              <Simple01Vertical article={article} />
            </li>
          ))}
        </ul>

        {/* Pagination */}
        {totalPages > 1 && (
          <PaginationPageDefault
            page={currentPage}
            total={totalPages}
            onPageChange={handlePageChange}
            rounded
          />
        )}
      </main>
    </div>
  )
}
