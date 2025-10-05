# TDS Website - Claude Code Configuration

Payload CMS website template built with Next.js App Router, designed for content-driven websites, blogs, and portfolios.

## Project Overview

**Type**: Full-stack CMS website
**Framework**: Next.js 15.4.4 with App Router
**CMS**: Payload CMS 3.55.0
**Database**: Vercel Postgres (production) / Local Postgres (development)
**Storage**: Vercel Blob Storage
**Styling**: TailwindCSS v4 with UntitledUI components
**Package Manager**: pnpm

## Quick Commands

```bash
# Development
pnpm dev                    # Start development server
pnpm build                  # Build for production
pnpm start                  # Start production server

# Code Quality
pnpm lint                   # Run ESLint
pnpm lint:fix              # Fix ESLint issues
pnpm generate:types        # Generate Payload types

# Testing
pnpm test                  # Run all tests
pnpm test:int             # Run integration tests
pnpm test:e2e             # Run E2E tests

# Database (Production Only)
pnpm payload migrate:create # Create new migration (before deploying)
pnpm payload migrate       # Run migrations (Vercel only)

# Docker (Optional)
docker-compose up -d       # Start local Postgres database
```

## Project Structure

```
src/
├── app/                   # Next.js App Router pages
├── blocks/               # Reusable content blocks (CTA, Hero, etc.)
├── collections/          # Payload CMS collections
│   ├── Pages/           # Page collection with layout builder
│   ├── Posts/           # Blog posts with rich content
│   ├── Media/           # File uploads and media management
│   ├── Categories/      # Taxonomy for posts
│   └── Users/           # User authentication
├── components/          # React components
│   └── uui/            # UntitledUI components
├── fields/              # Reusable Payload field configurations
├── hooks/              # Payload hooks for data processing
├── utilities/          # Helper functions
├── Header/             # Header global configuration
├── Footer/             # Footer global configuration
├── styles/             # Styling system
│   ├── theme.css       # UntitledUI theme with @theme block
│   ├── frontend.css    # Tailwind v4 base (DO NOT MODIFY)
│   └── payloadStyles.css # Payload admin styles
└── payload.config.ts   # Main Payload configuration
```

## 📚 Documentation Index

### 🎨 Styling & UI

- **[STYLING_SYSTEM.md](/docs/STYLING_SYSTEM.md)** - CSS variable-based theme system (Tailwind v4 + UUI). **Read before any style changes.**
- **[BUTTON_SYSTEM.md](/docs/BUTTON_SYSTEM.md)** - Button variants, configuration, and icon usage
- **[STYLE_GUIDE.md](/docs/STYLE_GUIDE.md)** - Visual reference for typography, colors, spacing, components
- **[STYLING_BEST_PRACTICES.md](/docs/STYLING_BEST_PRACTICES.md)** - Site-wide consistency patterns
- **[/style-guide](/style-guide)** - Live interactive style guide

### 🗄️ Database & Deployment

- **[DATABASE_MIGRATIONS.md](/docs/DATABASE_MIGRATIONS.md)** - Dev auto-sync vs production migrations. **Critical rules for AI agents.**
- **[DATABASE_TROUBLESHOOTING.md](/docs/DATABASE_TROUBLESHOOTING.md)** - Common error patterns and fixes
- **[DATABASE_PREVIEW_STRATEGY.md](/docs/DATABASE_PREVIEW_STRATEGY.md)** - Neon branching workflow for preview deployments
- **[ENVIRONMENT.md](/docs/ENVIRONMENT.md)** - Environment variables, Docker setup, and security

### ⚙️ Development & Fixes

- **[NEXTJS_PREVIEW_FIX.md](/docs/NEXTJS_PREVIEW_FIX.md)** - draftMode() fix for Next.js 15+ (recurring issue)
- **[NEXT_JS_15_FILTERING_FIX.md](/docs/NEXT_JS_15_FILTERING_FIX.md)** - Server-side URL parameter extraction
- **[TYPESCRIPT_PATTERNS.md](/docs/TYPESCRIPT_PATTERNS.md)** - TypeScript best practices for Payload/Next.js
- **[IMAGES.md](/docs/IMAGES.md)** - OptimizedImage component usage and image handling
- **[ROW_LABELS.md](/docs/ROW_LABELS.md)** - Admin UX improvements for array fields

### 📖 Implementation Guides

- **[BLOG_IMPLEMENTATION.md](/docs/BLOG_IMPLEMENTATION.md)** - Posts system with UUI components and category filtering
- **[UUI_COMPONENTS_REFERENCE.md](/docs/UUI_COMPONENTS_REFERENCE.md)** - UntitledUI usage patterns and types

## 🚨 Critical Rules (Quick Reference)

### Styling System

**Three-layer architecture**: CSS variables → Tailwind classes → Dark mode overrides

**✅ DO:**
- All style changes through CSS variables in `theme.css`
- Search `theme.css` for existing variables before creating new ones
- Test in both light AND dark modes
- Clear cache after changes: `rm -rf .next && pnpm dev`

**❌ DON'T:**
- Invent class names that don't exist in theme
- Use arbitrary values without checking theme first
- Modify `frontend.css` or `globals.css` structure
- Guess - read `/docs/STYLING_SYSTEM.md` first

**See**: [STYLING_SYSTEM.md](/docs/STYLING_SYSTEM.md)

---

### Database Migrations

**Two strategies**: Dev auto-sync vs Production migrations

**✅ DO (Development):**
- Run `pnpm dev` to auto-sync schema changes
- Wait for "✓ Schema synchronized" before building
- If build fails with "column does not exist": run dev server again

**❌ DON'T (Development):**
- Run `pnpm payload migrate` (production only)
- Run `pnpm payload migrate:create` (only when preparing deployment)
- Attempt to "fix" database with migrations
- Use external SQL tools for schema changes

**Production Deployment:**
1. Stop dev server
2. Run `pnpm payload migrate:create`
3. Review generated migration files
4. Commit and push (Vercel runs migrations automatically)

**See**: [DATABASE_MIGRATIONS.md](/docs/DATABASE_MIGRATIONS.md)

---

### Components & Best Practices

**✅ DO:**
- Use `OptimizedImage` component (never `<img>` tags)
- Implement row labels for array fields with identifiable content
- Import UUI components from `/src/components/uui/`
- Pass icons as props (`iconLeading={Icon}`), not children
- Use `categories` array (not `category` object) in blog queries

**❌ DON'T:**
- Use `<img>` tags directly (breaks optimization)
- Pass icons as children to buttons
- Use `export const dynamic = 'force-static'` with URL parameters
- Destructure `searchParams` in Next.js 15 pages

**See**: [IMAGES.md](/docs/IMAGES.md), [ROW_LABELS.md](/docs/ROW_LABELS.md), [BLOG_IMPLEMENTATION.md](/docs/BLOG_IMPLEMENTATION.md)

## Collections Overview

### Pages (`/admin/collections/pages`)
Layout builder with blocks, draft/publish workflow, SEO metadata, live preview

### Posts (`/admin/collections/posts`)
Rich text editor (Lexical), author relationships, categories, hero images, scheduled publishing

### Media (`/admin/collections/media`)
Image uploads, automatic resizing, focal point selection, Vercel Blob Storage integration

### Categories (`/admin/collections/categories`)
Nested taxonomy for organizing posts and content filtering

### Users (`/admin/collections/users`)
Authentication, admin access, author profiles

## Features

- **Layout Builder**: Drag-and-drop page construction with reusable blocks
- **Live Preview**: Real-time content preview while editing
- **Draft Workflow**: Publish/unpublish with scheduling
- **SEO Plugin**: Automated meta tags and Open Graph
- **UntitledUI Integration**: Complete design system with brand color theming
- **OptimizedImage Component**: Automatic Payload Media integration + Next.js optimization
- **TypeScript**: Strict type checking with auto-generated Payload types

## Development Notes

- Payload types auto-generated to `src/payload-types.ts`
- Access admin panel at `/admin` after starting dev server
- Brand color: #031A43 (dark blue), Accent: #1689FF (light blue)
- All UUI components use react-aria-components for accessibility
- External image domains must be added to `next.config.js`

## Environment Variables

```bash
POSTGRES_URL=              # Database connection string
PAYLOAD_SECRET=            # JWT token encryption (min 32 chars)
NEXT_PUBLIC_SERVER_URL=    # Public URL (no trailing slash)
CRON_SECRET=              # Vercel cron authentication
PREVIEW_SECRET=           # Draft preview security
BLOB_READ_WRITE_TOKEN=    # Vercel Blob Storage token
```

**See**: [ENVIRONMENT.md](/docs/ENVIRONMENT.md) for complete setup guide

## Testing

- **Integration Tests**: `pnpm test:int` (Vitest with jsdom)
- **E2E Tests**: `pnpm test:e2e` (Playwright)
- **Type Checking**: `pnpm generate:types` (auto-generates Payload types)

## Deployment

**Platform**: Vercel (pre-configured)
**Database**: Vercel Postgres or Neon Postgres
**Storage**: Vercel Blob Storage
**CI Command**: `pnpm ci` (runs migrations + build)

**Important**: Always create migration before deploying schema changes to production.

**See**: [DATABASE_MIGRATIONS.md](/docs/DATABASE_MIGRATIONS.md)
