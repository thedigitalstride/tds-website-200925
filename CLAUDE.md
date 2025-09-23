# TDS Website - Claude Code Configuration

This is a Payload CMS website template built with Next.js App Router, designed for content-driven websites, blogs, and portfolios.

## Project Overview

**Type**: Full-stack CMS website  
**Framework**: Next.js 15.4.4 with App Router  
**CMS**: Payload CMS 3.55.0  
**Database**: Vercel Postgres (production) / Local Postgres (development)  
**Storage**: Vercel Blob Storage  
**Styling**: TailwindCSS v4 with UntitledUI components
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
├── styles/             # Styling system
│   ├── theme.css       # UntitledUI theme with Tailwind v4 @theme block
│   ├── frontend.css    # Basic Tailwind v4 configuration
│   └── payloadStyles.css # Payload CMS admin styles
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

## 🚨 CRITICAL: UntitledUI Integration & Theme System

**This project uses UntitledUI components with a custom theme system. DO NOT modify this setup without understanding the dependencies.**

### Theme Architecture

The styling system is built on **Tailwind CSS v4** with a complete UntitledUI theme integration:

```
src/app/(frontend)/
└── globals.css           # Main CSS entry point with plugins

src/styles/
├── theme.css            # 🚨 CRITICAL: Complete UUI theme with @theme block
├── frontend.css         # Basic Tailwind v4 variables (DO NOT MODIFY)
└── payloadStyles.css    # Payload admin styles
```

### 🚨 CRITICAL Rules for Theme Management

#### ❌ NEVER:
- Modify `frontend.css` - it contains essential Tailwind v4 base configuration
- Create custom CSS files in `/src/styles/` - use the existing theme system
- Override UUI component styles directly - work through CSS variables
- Remove or modify imports in `globals.css`
- Change the `@theme` block structure in `theme.css`

#### ✅ ALWAYS:
- Modify brand colors in `theme.css` in the designated brand color section
- Add new CSS variables to the `@theme` block in `theme.css`
- Import UUI components from `/src/components/uui/`
- Use UUI's component structure without modification
- Test changes with `rm -rf .next && pnpm dev` after theme modifications

### Brand Color Integration

**Current Brand Color**: #1689FF (Blue)

Brand colors are defined in `src/styles/theme.css` lines 124-139:

```css
@theme {
  /* Brand colors - using #1689FF */
  --color-brand-25: rgb(247 251 255);    /* Lightest */
  --color-brand-50: rgb(239 246 255);
  /* ... color scale ... */
  --color-brand-500: rgb(22 137 255);    /* Main brand color #1689FF */
  --color-brand-600: rgb(20 123 230);    /* Hover state */
  /* ... darker shades ... */
  --color-brand-950: rgb(11 66 122);     /* Darkest */

  /* UUI Button Integration */
  --color-brand-solid: var(--color-brand-500);
  --color-brand-solid_hover: var(--color-brand-600);
}
```

**To Change Brand Color:**
1. Update the RGB values in the brand color scale
2. Ensure `--color-brand-solid` points to the correct main color
3. Test all UUI components after changes

### UntitledUI Component Usage

**Components Location**: `/src/components/uui/`

**Available Components**:
- `Button` - Primary component with brand color integration
- Additional UUI components as needed

**Usage Example**:
```tsx
import { Button } from '@/components/uui/button'

// Primary button (uses brand blue background, white text)
<Button color="primary">Click me</Button>

// Secondary button (uses system colors)
<Button color="secondary">Secondary</Button>
```

### Required Dependencies

**DO NOT REMOVE these packages**:
```json
{
  "@untitledui/icons": "latest",
  "next-themes": "latest",
  "react-aria-components": "^1.12.2",
  "tailwind-merge": "^2.3.0",
  "tailwindcss-animate": "^1.0.7",
  "tailwindcss-react-aria-components": "^2.0.1"
}
```

### CSS Import Structure

**Critical Import Order** in `globals.css`:
```css
@import "tailwindcss";
@import "../../styles/theme.css";        /* UUI theme with @theme block */

@plugin "tailwindcss-animate";
@plugin "tailwindcss-react-aria-components";

@custom-variant dark (&:where(.dark-mode, .dark-mode *));
/* ... additional UUI utilities ... */
```

### Troubleshooting

**If buttons/components don't show brand colors:**
1. Check `--color-brand-solid` is defined in `theme.css`
2. Verify `globals.css` imports `../../styles/theme.css` correctly
3. Clear Next.js cache: `rm -rf .next && pnpm dev`
4. Check browser developer tools for missing CSS variables

**If site fails to load:**
1. Check for duplicate metadata exports in `layout.tsx`
2. Verify all imports in `globals.css` point to correct paths
3. Ensure no CSS syntax errors in `theme.css`

### Block Development with UUI

When creating new blocks that use UUI components:

1. **Import from UUI components**:
   ```tsx
   import { Button } from '@/components/uui/button'
   ```

2. **Use standard UUI props** - don't override styling:
   ```tsx
   <Button color="primary" size="lg">
     {buttonText}
   </Button>
   ```

3. **Test with both light and dark themes** if theme switching is implemented

### Development Workflow

**When adding new UUI components:**
1. Copy component from UntitledUI docs
2. Place in `/src/components/uui/`
3. Verify it uses existing CSS variables from `theme.css`
4. Test brand color integration works automatically

**When modifying colors:**
1. Only edit the brand color section in `theme.css`
2. Maintain the RGB format: `rgb(22 137 255)`
3. Test all components after changes
4. Clear cache if changes don't appear

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

## 🚨 CRITICAL: Payload CMS draftMode() Fix for Next.js 15+

**This is a recurring, breaking issue that MUST be fixed when upgrading Next.js or encountering preview errors.**

### Error Symptoms:
```
Error: `draftMode` was called outside a request scope
GET /next/preview?slug=... 500 in XXXms
Failed to create URL object from URL: , falling back to http://localhost
```

### Root Cause:
Next.js 15+ has stricter requirements for when `draftMode()` can be called. The function signature and request handling in API routes must match Payload's expected pattern exactly.

### ✅ CRITICAL FIX - Preview Route Implementation:

**File:** `/src/app/(frontend)/next/preview/route.ts`

```typescript
import type { CollectionSlug, PayloadRequest } from 'payload'
import { getPayload } from 'payload'

import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

import configPromise from '@payload-config'

export async function GET(
  req: {
    cookies: {
      get: (name: string) => {
        value: string
      }
    }
  } & Request,
): Promise<Response> {
  const payload = await getPayload({ config: configPromise })

  const { searchParams } = new URL(req.url)

  const path = searchParams.get('path')
  const collection = searchParams.get('collection') as CollectionSlug
  const slug = searchParams.get('slug')
  const previewSecret = searchParams.get('previewSecret')

  if (previewSecret !== process.env.PREVIEW_SECRET) {
    return new Response('You are not allowed to preview this page', {
      status: 403,
    })
  }

  if (!path || !collection || !slug) {
    return new Response('Insufficient search params', { status: 404 })
  }

  if (!path.startsWith('/')) {
    return new Response(
      'This endpoint can only be used for relative previews',
      { status: 500 },
    )
  }

  let user

  try {
    user = await payload.auth({
      req: req as unknown as PayloadRequest,
      headers: req.headers,
    })
  } catch (error) {
    payload.logger.error(
      { err: error },
      'Error verifying token for live preview',
    )
    return new Response('You are not allowed to preview this page', {
      status: 403,
    })
  }

  const draft = await draftMode()

  if (!user) {
    draft.disable()
    return new Response('You are not allowed to preview this page', {
      status: 403,
    })
  }

  draft.enable()

  redirect(path)
}
```

### ⚠️ Critical Implementation Notes:

1. **Function Signature:** MUST use the exact `req` typing with cookies interface
2. **Request Handling:** Do NOT use `NextRequest` - use the Payload-compatible interface
3. **draftMode Call:** MUST use `await draftMode()` in async context
4. **Error Handling:** Always include try/catch for auth calls
5. **Response Format:** Use proper Response objects, not NextResponse

### ❌ Common Mistakes That Break Preview:

```typescript
// WRONG - Will cause "called outside request scope" error
export async function GET(req: NextRequest): Promise<Response>
const draft = draftMode() // Missing await

// WRONG - Will cause type errors
import { NextRequest } from 'next/server'

// WRONG - Will cause auth failures
user = await payload.auth({ req })
```

### 🔧 Troubleshooting Steps:

1. **Clear Build Cache:** `rm -rf .next && pnpm dev`
2. **Check Environment Variables:** Ensure `PREVIEW_SECRET` is set
3. **Verify Function Signature:** Must match the exact pattern above
4. **Test Preview URL:** Should return 200, not 500
5. **Check Server Logs:** No "draftMode called outside request scope" errors

### 🎯 Success Indicators:

- ✅ Preview routes return 200 status
- ✅ No draftMode context errors in server logs
- ✅ Admin panel live preview works correctly
- ✅ Draft content displays properly in preview mode

### 📋 Required Files for Preview System:

- `/src/app/(frontend)/next/preview/route.ts` - Main preview route (FIXED ABOVE)
- `/src/utilities/generatePreviewPath.ts` - Preview URL generation
- `/src/collections/Pages/index.ts` - Collection preview configuration

This fix has been tested with:
- **Next.js:** 15.4.4
- **Payload CMS:** 3.55.0
- **Node.js:** 18+

**⚠️ WARNING:** Do NOT modify this pattern without testing. This is a critical system component and breaking it will disable all preview functionality.

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
- **UntitledUI Integration**: Complete design system with brand color theming
- **Tailwind v4**: Modern CSS-in-CSS approach with @theme configuration

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
- **UntitledUI Components**: All UI components use react-aria-components for accessibility
- **Theme System**: CSS variables defined in `@theme` block for consistent theming
- **Brand Integration**: #1689FF blue color integrated throughout UUI component system

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