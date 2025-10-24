'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'
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

// Stagger animation configuration - smoother, more gentle
const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // 80ms delay between each item (faster sequence)
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 }, // Reduced vertical movement for subtlety
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6, // Longer duration for smoother fade
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number], // Smoother ease curve (closer to ease-in-out)
    },
  },
}

interface BlogListingProps {
  posts: Post[]
  allPosts: Post[] // All posts for category counting
  categories: Category[]
  currentPage?: number
  totalPages?: number
  selectedCategory?: string
  settings?: {
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
  const firstAuthorAvatar = typeof firstAuthor?.avatar === 'object' ? (firstAuthor.avatar as Media) : undefined

  // Extract ALL categories, not just the first one
  const allCategories =
    Array.isArray(post.categories) && post.categories.length > 0
      ? post.categories
          .filter((cat) => typeof cat === 'object')
          .map((cat) => {
            const category = cat as Category
            return {
              name: category.title || 'Uncategorized',
              href: category.slug ? `/news-insights?category=${category.slug}` : '#',
            }
          })
      : [{ name: 'Uncategorized', href: '#' }]

  return {
    id: post.id.toString(),
    title: post.title,
    summary: post.subtitle || '',
    href: `/news-insights/${post.slug || 'undefined'}`,
    categories: allCategories,
    thumbnailUrl: heroImage?.url || '',
    thumbnailMedia: heroImage, // Pass full Media resource for optimization
    publishedAt: formatDateTime(post.publishedAt || ''),
    readingTime: calculateReadingTime(post.content),
    author: {
      name: firstAuthor?.nickname || firstAuthor?.name || 'Anonymous',
      href: '#',
      avatarUrl: firstAuthorAvatar?.url || '',
      avatarMedia: firstAuthorAvatar, // Pass full Media resource for avatar
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
      router.push(`/news-insights${categoryParam}`)
    } else {
      router.push(`/news-insights/page/${page}${categoryParam}`)
    }
  }

  // Handle category change
  const handleCategoryChange = (key: string) => {
    if (key === 'all') {
      router.push('/news-insights')
    } else {
      router.push(`/news-insights?category=${key}`)
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
      <main className="mx-auto flex w-full max-w-container flex-col gap-12 px-4 py-16 md:gap-16 md:px-8 md:py-24">
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
        <motion.ul
          key={`${selectedCategory}-${sortBy}`} // Replay animation when filters change
          variants={containerVariants}
          initial="hidden"
          animate="visible"
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
            <motion.li
              key={article.id}
              variants={itemVariants}
              className={cx(!isDesktop && '[&:nth-child(n+7)]:hidden')}
            >
              <Simple01Vertical article={article} />
            </motion.li>
          ))}
        </motion.ul>

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
