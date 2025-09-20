# TDS Website - Claude Code Configuration

This is a Payload CMS website template built with Next.js App Router, designed for content-driven websites, blogs, and portfolios.

## Project Overview

**Type**: Full-stack CMS website  
**Framework**: Next.js 15.4.4 with App Router  
**CMS**: Payload CMS 3.55.0  
**Database**: Vercel Postgres (production) / Local Postgres (development)  
**Storage**: Vercel Blob Storage  
**Styling**: TailwindCSS with shadcn/ui components  
**Package Manager**: pnpm  

# Payload Monorepo Agent Instructions

## Project Structure

- Packages are located in the `packages/` directory.
  - The main Payload package is `packages/payload`. This contains the core functionality.
  - Database adapters are in `packages/db-*`.
  - The UI package is `packages/ui`.
  - The Next.js integration is in `packages/next`.
  - Rich text editor packages are in `packages/richtext-*`.
  - Storage adapters are in `packages/storage-*`.
  - Email adapters are in `packages/email-*`.
  - Plugins which add additional functionality are in `packages/plugin-*`.
- Documentation is in the `docs/` directory.
- Monorepo tooling is in the `tools/` directory.
- Test suites and configs are in the `test/` directory.
- LLMS.txt is at URL: https://payloadcms.com/llms.txt
- LLMS-FULL.txt is at URL: https://payloadcms.com/llms-full.txt

## Dev environment tips

- Any package can be built using a `pnpm build:*` script defined in the root `package.json`. These typically follow the format `pnpm build:<directory_name>`. The options are all of the top-level directories inside the `packages/` directory. Ex `pnpm build:db-mongodb` which builds the `packages/db-mongodb` package.
- ALL packages can be built with `pnpm build:all`.
- Use `pnpm dev` to start the monorepo dev server. This loads the default config located at `test/_community/config.ts`.
- Specific dev configs for each package can be run with `pnpm dev <directory_name>`. The options are all of the top-level directories inside the `test/` directory. Ex `pnpm dev fields` which loads the `test/fields/config.ts` config. The directory name can either encompass a single area of functionality or be the name of a specific package.

## Testing instructions

- There are unit, integration, and e2e tests in the monorepo.
- Unit tests can be run with `pnpm test:unit`.
- Integration tests can be run with `pnpm test:int`. Individual test suites can be run with `pnpm test:int <directory_name>`, which will point at `test/<directory_name>/int.spec.ts`.
- E2E tests can be run with `pnpm test:e2e`.
- All tests can be run with `pnpm test`.
- Prefer running `pnpm test:int` for verifying local code changes.

## PR Guidelines

- This repository follows conventional commits for PR titles
- PR Title format: <type>(<scope>): <title>. Title must start with a lowercase letter.
- Valid types are build, chore, ci, docs, examples, feat, fix, perf, refactor, revert, style, templates, test
- Prefer `feat` for new features and `fix` for bug fixes.
- Valid scopes are the following regex patterns: cpa, db-\*, db-mongodb, db-postgres, db-vercel-postgres, db-sqlite, drizzle, email-\*, email-nodemailer, email-resend, eslint, graphql, live-preview, live-preview-react, next, payload-cloud, plugin-cloud, plugin-cloud-storage, plugin-form-builder, plugin-import-export, plugin-multi-tenant, plugin-nested-docs, plugin-redirects, plugin-search, plugin-sentry, plugin-seo, plugin-stripe, richtext-\*, richtext-lexical, richtext-slate, storage-\*, storage-azure, storage-gcs, storage-uploadthing, storage-vercel-blob, storage-s3, translations, ui, templates, examples(\/(\w|-)+)?, deps
- Scopes should be chosen based upon the package(s) being modified. If multiple packages are being modified, choose the most relevant one or no scope at all.
- Example PR titles:
  - `feat(db-mongodb): add support for transactions`
  - `feat(richtext-lexical): add options to hide block handles`
  - `fix(ui): json field type ignoring editorOptions`

## Commit Guidelines

- This repository follows conventional commits for commit messages
- The first commit of a branch should follow the PR title format: <type>(<scope>): <title>. Follow the same rules as PR titles.
- Subsequent commits should prefer `chore` commits without a scope unless a specific package is being modified.
- These will eventually be squashed into the first commit when merging the PR.

## Key Commands

```bash
# Development
pnpm dev                    # Start development server
pnpm build                  # Build for production  
pnpm start                  # Start production server
pnpm ci                     # Run migrations and build

# Code Quality
pnpm lint                   # Run ESLint
pnpm lint:fix              # Fix ESLint issues
pnpm generate:types        # Generate Payload types
pnpm generate:importmap    # Generate import map

# Testing
pnpm test                  # Run all tests
pnpm test:int             # Run integration tests (Vitest)
pnpm test:e2e             # Run end-to-end tests (Playwright)

# Database
pnpm payload migrate       # Run database migrations
pnpm payload migrate:create # Create new migration

# Docker (optional)
docker-compose up          # Start local Postgres database
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
├── fields/              # Reusable Payload field configurations
├── heros/              # Hero section configurations
├── hooks/              # Payload hooks for data processing
├── utilities/          # Helper functions
├── Header/             # Header global configuration
├── Footer/             # Footer global configuration
├── access/             # Access control definitions
└── payload.config.ts   # Main Payload configuration
```

## Collections

### Pages (`/admin/collections/pages`)
- Layout builder with blocks (Hero, Content, Media, CTA, Archive, Form)
- Draft/publish workflow with live preview
- SEO metadata with automatic generation
- Slug management with auto-generation

### Posts (`/admin/collections/posts`)
- Rich text editor with Lexical
- Author relationships and categories
- Hero images and related posts
- Draft/publish with scheduled publishing
- SEO optimization

### Media (`/admin/collections/media`)
- Image uploads with automatic resizing
- Focal point selection
- Vercel Blob Storage integration
- Multiple format support

### Categories (`/admin/collections/categories`)
- Nested taxonomy for organizing posts
- Used for content filtering and organization

### Users (`/admin/collections/users`)
- Authentication and admin access
- Author profiles for blog posts

## 🚨 CRITICAL: Database Migration Process

**NEVER use external database tools for schema changes. ALWAYS use Payload's built-in migration system.**

### Required Migration Workflow:

1. **Development Environment:**
   ```bash
   # Payload automatically handles schema changes in development
   # DO NOT manually run migrations in development
   # DO NOT mix "push" mode with manual migrations
   ```

2. **Before Making Schema Changes:**
   ```bash
   # Generate database schema first
   npx payload generate:db-schema
   ```

3. **Creating Migrations (Required for Production):**
   ```bash
   # Create migration after schema changes
   pnpm payload migrate:create
   # This generates TypeScript migration files with up() and down() functions
   # ALWAYS review generated migration files before committing
   ```

4. **Production Deployment (CRITICAL):**
   ```bash
   # Run migrations BEFORE starting application
   pnpm payload migrate
   pnpm build
   # OR use the combined CI command:
   pnpm ci  # Runs migrations + build
   ```

### Database Management Rules:

- ❌ **NEVER** use external tools like pgAdmin, DataGrip, or raw SQL for schema changes
- ❌ **NEVER** manually alter database schema outside of Payload
- ❌ **NEVER** mix manual migrations with Payload's automatic schema sync
- ✅ **ALWAYS** use `payload migrate:create` for schema changes
- ✅ **ALWAYS** run migrations before builds in production
- ✅ **ALWAYS** review migration files before deployment

### Migration Commands:
```bash
pnpm payload migrate:create    # Create new migration (after schema changes)
pnpm payload migrate          # Run pending migrations
pnpm payload migrate:status   # Check migration status
pnpm payload migrate:down     # Rollback last migration batch
pnpm payload migrate:refresh  # Rollback and re-run migrations
pnpm payload migrate:reset    # Rollback all migrations (DESTRUCTIVE)
pnpm payload migrate:fresh    # Drop and recreate schema (DESTRUCTIVE)
```

## Environment Configuration

Required environment variables:
```bash
POSTGRES_URL=              # Database connection string
PAYLOAD_SECRET=            # JWT token encryption
NEXT_PUBLIC_SERVER_URL=    # Public URL (no trailing slash)
CRON_SECRET=              # Vercel cron authentication
PREVIEW_SECRET=           # Draft preview security
BLOB_READ_WRITE_TOKEN=    # Vercel Blob Storage token
```

## Features

- **Layout Builder**: Drag-and-drop page construction
- **Live Preview**: Real-time content preview while editing
- **Draft Workflow**: Publish/unpublish with scheduling
- **SEO Plugin**: Automated meta tags and Open Graph
- **Search Plugin**: Built-in search functionality
- **Redirects Plugin**: URL redirect management
- **Form Builder**: Dynamic form creation
- **Admin Bar**: Frontend editing toolbar
- **Responsive Design**: Mobile-first with breakpoint preview

## Deployment

**Vercel**: Pre-configured for one-click deployment with Neon Postgres and Vercel Blob Storage
**Database Migrations**: Required for production deployments
**Build Process**: Includes sitemap generation and type checking

## Testing

- **Integration Tests**: Vitest with jsdom for component testing
- **E2E Tests**: Playwright for full application testing
- **Development Server**: Automatic test server startup

## Development Notes

- Uses TypeScript with strict type checking
- Payload types auto-generated to `src/payload-types.ts`
- ESLint configuration with Next.js rules
- Prettier for code formatting
- Sharp for image processing
- Cross-platform compatibility with cross-env

## Content Management

Access the admin panel at `/admin` after starting the development server. The CMS provides:
- Visual layout building for pages
- Rich text editing for posts
- Media library management
- User and permission management
- Content scheduling and workflow
- SEO optimization tools

## Local Development with Docker

Optional Docker setup for local Postgres:
1. Update `POSTGRES_URL` to `postgres://postgres@localhost:54320/<dbname>`
2. Update `docker-compose.yml` POSTGRES_DB to match dbname
3. Run `docker-compose up -d`