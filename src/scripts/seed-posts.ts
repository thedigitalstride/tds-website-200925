#!/usr/bin/env node

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Category } from '@/payload-types'

interface SeedUser {
  email: string
  name: string
  nickname: string
}

const users: SeedUser[] = [
  { email: 'alice@example.com', name: 'Alice Johnson', nickname: 'Alice' },
  { email: 'bob@example.com', name: 'Bob Smith', nickname: 'Bob' },
  { email: 'charlie@example.com', name: 'Charlie Brown', nickname: 'Charlie' },
  { email: 'diana@example.com', name: 'Diana Prince', nickname: 'Diana' },
  { email: 'eve@example.com', name: 'Eve Wilson', nickname: 'Eve' }
]

const postTitles = [
  'Building Scalable Web Applications with Modern Architecture',
  'The Future of User Experience Design in 2024',
  'Microservices vs Monoliths: Making the Right Choice',
  'Advanced TypeScript Patterns for Large Applications',
  'Creating Accessible Web Interfaces: A Complete Guide',
  'Performance Optimization Techniques for React Applications',
  'The Rise of Edge Computing and Its Impact on Development',
  'Design Systems: Building Consistent User Interfaces',
  'API Security Best Practices for Modern Applications',
  'Machine Learning Integration in Web Development',
  'Progressive Web Apps: The Next Generation of Web Applications',
  'Sustainable Software Development Practices',
  'The Psychology of User Interface Design',
  'Serverless Architecture: Benefits and Challenges',
  'Cross-Platform Development with React Native',
  'DevOps Culture: Bridging Development and Operations',
  'The Art of Code Reviews: Best Practices and Tools',
  'Building Real-time Applications with WebSockets',
  'Database Design Patterns for Modern Applications',
  'Testing Strategies for Complex Frontend Applications',
  'The Evolution of CSS: From Stylesheets to CSS-in-JS',
  'Blockchain Integration in Web Development',
  'Mobile-First Design: Responsive Design in Practice',
  'GraphQL vs REST: Choosing the Right API Architecture',
  'Cloud-Native Development: Principles and Practices',
  'Web Accessibility: Making the Internet for Everyone',
  'The Future of JavaScript: ES2024 and Beyond',
  'Building Secure Authentication Systems',
  'Performance Monitoring and Analytics for Web Apps',
  'The Role of AI in Modern Software Development'
]

const generateContent = (title: string) => {
  const paragraphs = [
    `${title.split(':')[0]} has become increasingly important in today's rapidly evolving digital landscape. As technology continues to advance, developers and designers must adapt their approaches to meet new challenges and opportunities.`,

    'The key to success lies in understanding both the technical requirements and the user needs. This comprehensive approach ensures that solutions are not only technically sound but also provide genuine value to end users.',

    'Industry experts recommend following established best practices while remaining flexible enough to innovate when necessary. This balance between stability and innovation drives sustainable growth and long-term success.',

    'Implementation requires careful planning and consideration of various factors including scalability, maintainability, and performance. Each decision made during the development process can have significant implications for the final product.',

    'Modern development tools and frameworks provide powerful capabilities that can dramatically improve both developer productivity and application quality. However, choosing the right tools for each specific use case remains crucial.',

    'Collaboration between team members with different specializations creates synergies that lead to better outcomes. Effective communication and shared understanding of goals are essential for project success.',

    'Continuous learning and adaptation are vital in an industry that evolves as rapidly as technology. Staying current with trends, best practices, and emerging technologies ensures continued relevance and effectiveness.',

    'The future holds exciting possibilities for further innovation and improvement. By building on current foundations while exploring new frontiers, we can create solutions that exceed today\'s expectations.'
  ]

  // Create rich text content with proper Lexical format
  return {
    root: {
      type: 'root',
      children: paragraphs.map((paragraph, _index) => ({
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: paragraph,
            format: 0,
            style: '',
            mode: 'normal',
            detail: 0,
            version: 1
          }
        ],
        format: '' as const,
        indent: 0,
        version: 1
      })),
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1
    }
  }
}

const getRandomItems = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

const getRandomDate = (daysBack: number): string => {
  const now = new Date()
  const pastDate = new Date(now.getTime() - (Math.random() * daysBack * 24 * 60 * 60 * 1000))
  return pastDate.toISOString()
}

async function seedDatabase() {
  console.log('🌱 Starting database seeding...')

  try {
    const payload = await getPayload({ config: configPromise })

    // Fetch existing categories
    console.log('📁 Fetching existing categories...')
    const categoriesResult = await payload.find({
      collection: 'categories',
      limit: 100
    })

    const createdCategories = categoriesResult.docs as Category[]

    if (createdCategories.length === 0) {
      console.log('  ❌ No categories found. Please create categories in the admin panel first.')
      process.exit(1)
    }

    console.log(`  ✅ Found ${createdCategories.length} categories:`)
    createdCategories.forEach((cat: Category) => {
      console.log(`     - ${cat.title}`)
    })

    // Create users
    console.log('👥 Creating users...')
    const createdUsers = []

    for (const user of users) {
      try {
        const existingUser = await payload.find({
          collection: 'users',
          where: { email: { equals: user.email } },
          limit: 1
        })

        if (existingUser.docs.length === 0) {
          const newUser = await payload.create({
            collection: 'users',
            data: {
              ...user,
              password: 'password123' // Default password for seed users
            }
          })
          createdUsers.push(newUser)
          console.log(`  ✅ Created user: ${user.name}`)
        } else {
          createdUsers.push(existingUser.docs[0])
          console.log(`  ⏭️  User already exists: ${user.name}`)
        }
      } catch (error) {
        console.log(`  ❌ Error creating user ${user.name}:`, error)
      }
    }

    // Create posts
    console.log('📝 Creating posts...')
    let postsCreated = 0

    for (let i = 0; i < postTitles.length; i++) {
      const title = postTitles[i]
      const slug = title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()

      try {
        const existingPost = await payload.find({
          collection: 'posts',
          where: { slug: { equals: slug } },
          limit: 1
        })

        if (existingPost.docs.length === 0) {
          // Generate subtitle
          const subtitle = `Exploring the key concepts and practical applications of ${title.split(':')[0].toLowerCase()}.`

          // Select random categories (1-3)
          const selectedCategories = getRandomItems(createdCategories, Math.floor(Math.random() * 3) + 1)

          // Select random authors (1-2)
          const selectedAuthors = getRandomItems(createdUsers, Math.floor(Math.random() * 2) + 1)

          await payload.create({
            collection: 'posts',
            data: {
              title,
              subtitle,
              slug,
              content: generateContent(title),
              categories: selectedCategories.map((cat: Category) => cat.id),
              authors: selectedAuthors.map(user => user.id),
              publishedAt: getRandomDate(90), // Random date within last 90 days
              _status: 'published'
            }
          })

          postsCreated++
          console.log(`  ✅ Created post ${postsCreated}/${postTitles.length}: ${title}`)
        } else {
          console.log(`  ⏭️  Post already exists: ${title}`)
        }
      } catch (error) {
        console.log(`  ❌ Error creating post "${title}":`, error)
      }
    }

    console.log(`\n🎉 Seeding completed successfully!`)
    console.log(`📊 Summary:`)
    console.log(`   - Categories: ${createdCategories.length}`)
    console.log(`   - Users: ${createdUsers.length}`)
    console.log(`   - Posts created: ${postsCreated}`)

    process.exit(0)

  } catch (error) {
    console.error('❌ Error during seeding:', error)
    process.exit(1)
  }
}

// Run the seeder
seedDatabase()