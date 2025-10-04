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

## 📄 Additional Documentation

### Styling System (Read These First)
- **[Style Guide Reference](/docs/STYLE_GUIDE.md)** - **⭐ START HERE** - Visual reference for typography, colors, spacing, and components. Complete guide to the Tailwind v4 + UUI design system architecture.
- **[Styling Best Practices](/docs/STYLING_BEST_PRACTICES.md)** - **🎯 ESSENTIAL** - How to maintain site-wide styling consistency. Explains the centralized system, semantic tokens, and patterns for components.
- **[Styles System Guide](/src/styles/README.md)** - Technical documentation for the styling system. Covers file structure, theme management, and customization workflows.
- **[Live Style Guide](/style-guide)** - Interactive page showing all typography, colors, buttons, and badges in action.

## 🚨 CRITICAL: Understanding the Styling System - MUST READ BEFORE ANY STYLE CHANGES

**⛔ CLAUDE CODE AGENTS: You MUST fully understand this system before making ANY styling changes. Guessing or making assumptions causes significant issues.**

### How This Styling System Works

This project uses **Tailwind v4 + UntitledUI** with a **CSS variable-based theme system**. Understanding these three layers is CRITICAL:

#### 1. CSS Variables in `theme.css` (Foundation Layer)
- All colors, typography, spacing defined as CSS variables in `@theme` block
- Variables automatically change values in dark mode (`.dark-mode` selector)
- Example:
  ```css
  /* Light mode */
  --color-bg-brand-solid: var(--color-brand-500);  /* Dark blue */

  /* Dark mode (inside .dark-mode selector) */
  --color-bg-brand-solid: var(--color-white);      /* White */
  ```

#### 2. Tailwind Classes (Mapping Layer)
- Tailwind classes map to CSS variables
- Classes like `bg-brand-solid` reference `var(--color-bg-brand-solid)`
- The CSS variable changes in dark mode, so the class automatically adapts
- **NEVER** invent custom class names like `text-primary-inverted` - they don't exist!

#### 3. Dark Mode Overrides (Component Layer)
- Use `dark:` prefix for component-specific overrides
- Example: `text-white dark:text-brand-500`
- Only needed when the CSS variable approach doesn't cover your use case

### ✅ CORRECT Approach to Styling Changes

**Step 1: Check if CSS variables exist**
```bash
# Search theme.css for the variable
grep "color-brand-solid" src/styles/theme.css
```

**Step 2: Update CSS variables in theme.css (if needed)**
```css
/* Light mode */
--color-brand-solid: var(--color-brand-500);

/* Dark mode (inside .dark-mode { ... } block) */
--color-brand-solid: var(--color-white);
```

**Step 3: Use Tailwind classes that map to those variables**
```tsx
// CORRECT - Uses CSS variables that change in dark mode
<button className="bg-brand-solid text-white dark:text-brand-500">
  Button
</button>
```

### ❌ INCORRECT Approaches (DO NOT DO THIS)

**❌ Don't invent class names:**
```tsx
// WRONG - text-primary-inverted doesn't exist
<button className="text-primary-inverted">
```

**❌ Don't use arbitrary values without checking theme:**
```tsx
// WRONG - Bypasses the theme system
<button className="bg-[#031A43] text-[#ffffff]">
```

**❌ Don't add CSS variables outside the @theme block:**
```css
/* WRONG - CSS variables must be in @theme block or .dark-mode selector */
.my-component {
  --my-custom-color: blue;
}
```

**❌ Don't guess - READ the documentation first:**
- `/docs/STYLE_GUIDE.md` - Shows ALL available classes
- `/docs/STYLING_BEST_PRACTICES.md` - Shows HOW to use them
- `/src/styles/theme.css` - Shows the actual CSS variables

### 🔍 How to Find the Right Class/Variable

**Question: "I need white text on a dark blue button that inverts in dark mode"**

1. **Check Style Guide:** `/docs/STYLE_GUIDE.md`
   - Look for text color section
   - Look for button examples

2. **Search theme.css:**
   ```bash
   grep "text.*brand" src/styles/theme.css
   grep "color-fg" src/styles/theme.css
   ```

3. **Check existing components:**
   ```bash
   # See how other buttons handle this
   grep -r "text-white" src/components/uui/
   ```

4. **Ask the user if uncertain:**
   - "I see these options in theme.css: [list]. Which should I use?"
   - Better to ask than to guess wrong!

### 🎯 Real Example: Primary Button Styling

**Requirement:** Dark blue button with white text (light mode), white button with dark blue text (dark mode)

**Step 1: Update CSS variables in theme.css**
```css
/* Light mode defaults (lines 143-144) */
--color-brand-solid: var(--color-brand-500);        /* Dark blue */
--color-brand-solid_hover: var(--color-brand-900);  /* Darker blue */

/* Dark mode overrides (inside .dark-mode block, lines 1251-1260) */
--color-bg-brand-solid: var(--color-white);         /* White background */
--color-bg-brand-solid_hover: var(--color-brand-50); /* Light blue hover */
```

**Step 2: Update button component**
```tsx
// src/components/uui/base/buttons/button.tsx
colors: {
  primary: {
    root: [
      "bg-brand-solid text-white dark:text-brand-500",
      "hover:bg-brand-solid_hover",
      "*:data-icon:text-white dark:*:data-icon:text-brand-500",
    ].join(" "),
  },
}
```

**Why this works:**
- `bg-brand-solid` → references CSS variable that changes in dark mode
- `text-white` → white in light mode
- `dark:text-brand-500` → dark blue in dark mode (explicit override)
- Icons use the same pattern with `*:data-icon:` selector

### 📋 Before Making Style Changes - Checklist

- [ ] Read `/docs/STYLE_GUIDE.md` to understand available classes
- [ ] Read `/docs/STYLING_BEST_PRACTICES.md` to understand patterns
- [ ] Search `theme.css` for relevant CSS variables
- [ ] Check existing components for similar patterns
- [ ] Test changes in both light AND dark modes
- [ ] Clear cache: `rm -rf .next && pnpm dev`
- [ ] Verify on `/style-guide` page

### 🚨 Key Takeaway

**The theme system is NOT magic - it's CSS variables + Tailwind mappings + dark mode overrides.**

If you don't understand how these three pieces work together, **STOP and read the documentation** before making changes. Guessing causes broken styles, wasted time, and user frustration.

## 🎨 Button System - Important Configuration Details

### Current Button Variants (Simplified)

**Available Colors:**
- `color="primary"` - **Brand button** (dark blue #031A43 in light mode, white in dark mode)
- `color="accent"` - **Accent button** (light blue #1689FF in both modes)
- `color="secondary"` - Secondary button (system colors)
- `color="tertiary"` - Tertiary button (minimal styling)
- `color="link"` - Link button (brand-colored text with underline)
- Destructive variants: `primary-destructive`, `secondary-destructive`, `tertiary-destructive`, `link-destructive`

**Key Design Decisions:**
1. **Removed `link-gray` variant** - Simplified to one link variant (`link`) that uses brand colors
2. **Primary renamed to "Brand" in UI** - More accurate naming, though code still uses `color="primary"`
3. **Flat design** - No shadows, rings, or gradients on primary/accent buttons
4. **Hover scale animation** - All buttons scale to 105% on hover (`hover:scale-105`) with 100ms transition

### Button Color Configuration

**Critical CSS Variables (in `theme.css`):**

```css
/* Light Mode (base @theme block, lines 789-798, 814-815) */
--color-bg-brand-solid: var(--color-brand-500);     /* #031A43 dark blue */
--color-bg-brand-solid_hover: var(--color-brand-700); /* Darker on hover */
--color-bg-accent-solid: var(--color-accent-500);   /* #1689FF light blue */
--color-bg-accent-solid_hover: var(--color-accent-600); /* Darker on hover */

/* Dark Mode (.dark-mode block, lines 1251-1260, 1276-1277) */
--color-bg-brand-solid: var(--color-white);         /* White background */
--color-bg-brand-solid_hover: var(--color-brand-100); /* Light blue tint on hover */
--color-bg-accent-solid: var(--color-accent-500);   /* Same as light mode */
--color-bg-accent-solid_hover: var(--color-accent-600); /* Same as light mode */
```

**IMPORTANT:** Always use the 500 (non-tinted) colors as base:
- Brand button base: `brand-500` (#031A43)
- Accent button base: `accent-500` (#1689FF)
- Hover states use lighter (100) or darker (600-700) shades

### Button Component Structure

**File:** `src/components/uui/base/buttons/button.tsx`

**Key Implementation Details:**
1. **Text color handling:**
   - Primary button uses `text-white` in light mode, `dark:text-brand-500` in dark mode
   - Icons follow same pattern: `*:data-icon:text-white dark:*:data-icon:text-brand-500`

2. **Link-type detection:**
   ```tsx
   const isLinkType = ["link", "link-destructive"].includes(color);
   ```
   Link buttons have no padding and use underline effects

3. **Hover animation:**
   - Applied at root level: `hover:scale-105` (line 13)
   - Smooth 100ms transition with `ease-linear`
   - Scales entire button content (text + icons + spacing together)

### Icon Integration

**Icons from `@untitledui/icons`:**
```tsx
import { ArrowRight } from "@untitledui/icons/ArrowRight";
import { Download01 as Download } from "@untitledui/icons/Download01";
import { Plus } from "@untitledui/icons/Plus";
```

**Usage patterns:**
```tsx
// Leading icon
<Button color="primary" iconLeading={Plus}>Create New</Button>

// Trailing icon
<Button color="primary" iconTrailing={ArrowRight}>Continue</Button>

// Icon only (with aria-label)
<Button color="primary" iconLeading={Plus} aria-label="Add" />
```

**IMPORTANT:** Icons must be passed as props (`iconLeading`/`iconTrailing`), NOT as children. Passing icons as children breaks layout.

### Testing Location

**Style Guide Page:** `/style-guide`
- Shows all button variants in one place
- Includes theme toggle for light/dark mode testing
- Demonstrates buttons with icons, sizes, and colors

### Common Mistakes to Avoid

❌ **Don't:** Use `color="brand"` in code
✅ **Do:** Use `color="primary"` (only the UI label says "Brand")

❌ **Don't:** Pass icons as children: `<Button><Icon /></Button>`
✅ **Do:** Pass icons as props: `<Button iconLeading={Icon} />`

❌ **Don't:** Use brand-600 or accent-600 as base colors
✅ **Do:** Always use 500 colors as base (brand-500, accent-500)

❌ **Don't:** Modify button component styles without updating theme.css CSS variables
✅ **Do:** Update CSS variables in theme.css first, then button component classes reference those variables

### Database & Deployment
- **[Database Preview Strategy](/docs/DATABASE_PREVIEW_STRATEGY.md)** - **⭐ CRITICAL** - Three-tier database setup with Neon branching for safe migration testing. Explains preview database workflow, migration best practices, and production protection.

### Other Guides
- **[Image Optimization Guide](/docs/IMAGES.md)** - Complete guide for handling images in this project, including the OptimizedImage component, Payload Media integration, and performance best practices.
- **[Row Labels Guide](/docs/ROW_LABELS.md)** - Complete guide for implementing row labels in array fields to improve admin UX. Includes when to use row labels, implementation patterns, and code examples.
- **[Blog Implementation Guide](/docs/BLOG_IMPLEMENTATION.md)** - Comprehensive guide for implementing and maintaining the blog/posts system with UUI components, category filtering, and Next.js 15 patterns.
- **[TypeScript Patterns](/docs/TYPESCRIPT_PATTERNS.md)** - TypeScript best practices, common patterns, and solutions for Payload CMS, Next.js 15, and UUI components.
- **[Next.js 15 Filtering Fix](/docs/NEXT_JS_15_FILTERING_FIX.md)** - Critical fix for server-side URL parameter extraction in Next.js 15. Resolves issues with category filtering, searchParams extraction, and force-static compatibility.
- **[UUI Components Reference](/docs/UUI_COMPONENTS_REFERENCE.md)** - Reference guide for UntitledUI component usage, types, and integration patterns.

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

## 🚨 CRITICAL: Database Migration Process - ABSOLUTE RULES

**⛔ CLAUDE CODE AGENTS: READ THIS CAREFULLY - VIOLATION OF THESE RULES CAUSES CRITICAL DATABASE CORRUPTION ⛔**

### 🚫 NEVER - UNDER ANY CIRCUMSTANCES:

1. **❌ NEVER run `pnpm payload migrate` in development** - This command is ONLY for production deployments
2. **❌ NEVER run `pnpm payload migrate:create` manually** - Only used when explicitly preparing for production deployment
3. **❌ NEVER run `pnpm payload migrate:down`** - Rolling back migrations in dev causes corruption
4. **❌ NEVER run `pnpm payload migrate:status`** - Checking migration status implies you might run migrations (don't)
5. **❌ NEVER attempt to "fix" database schema errors by running migrations**
6. **❌ NEVER assume migrations are the solution to build errors**
7. **❌ NEVER use external database tools (pgAdmin, DataGrip, raw SQL) for schema changes**

### ✅ ALWAYS - REQUIRED BEHAVIOR:

1. **✅ ALWAYS let Payload's dev mode auto-sync schema changes** - This is automatic, requires zero manual intervention
2. **✅ ALWAYS start dev server (`pnpm dev`) when schema is out of sync** - Dev mode detects and fixes schema automatically
3. **✅ ALWAYS wait for dev server to complete auto-sync before testing builds**
4. **✅ ALWAYS ask the user before touching ANY migration command**

### 🔴 CRITICAL ERROR RECOGNITION:

**If you see these error patterns during `pnpm build`:**
- ❌ "column [name] does not exist"
- ❌ "relation [name] does not exist"
- ❌ "type [name] does not exist"
- ❌ "Failed query: select..."

**THE CORRECT RESPONSE IS:**
1. ✅ Start dev server: `pnpm dev`
2. ✅ Wait for Payload to auto-sync schema (watch console output)
3. ✅ Stop dev server
4. ✅ Try build again
5. ✅ **NEVER** run migration commands

**THE INCORRECT RESPONSE IS:**
1. ❌ Run `pnpm payload migrate`
2. ❌ Run `pnpm payload migrate:create`
3. ❌ Check migration status
4. ❌ Attempt to manually fix database

### 🎯 Development Workflow (MANDATORY):

**Development Environment (LOCAL):**
```bash
# 1. Make schema changes in code (collections, fields, etc.)
# 2. Start dev server - Payload auto-syncs schema automatically
pnpm dev

# 3. Payload detects changes and applies them automatically
# NO MANUAL INTERVENTION REQUIRED

# 4. Build to verify everything works
pnpm build

# IF BUILD FAILS WITH SCHEMA ERRORS:
# - Start dev server again (pnpm dev)
# - Let it complete auto-sync
# - Try build again
# DO NOT RUN MIGRATIONS
```

### 📋 EXACT MANUAL PROCESS FOR PRODUCTION DEPLOYMENT

**⚠️ IMPORTANT: This section is for the USER to follow manually, NOT for AI agents to execute**

#### Phase 1: Local Development (Your Daily Work)
```bash
# 1. Make your code changes (collections, fields, etc.)

# 2. Start dev server - it auto-syncs schema
pnpm dev
# Watch console: "✓ Schema synchronized with database"

# 3. Test your changes locally
# Everything works? Great! Dev database is auto-synced

# 4. Build to verify
pnpm build
# Should succeed if dev server synced properly
```

#### Phase 2: Preparing for Production Deployment (Manual Process)
```bash
# 1. STOP dev server completely (Ctrl+C)

# 2. Create migration for production
pnpm payload migrate:create

# 3. You'll see a prompt:
# "Name this migration (optional):"
# Enter a descriptive name like: "add_blog_categories"
# Or just press Enter for timestamp-based name

# 4. Check what was created
ls src/migrations/
# You'll see new files:
# - 20251004_XXXXXX_your_name.ts (migration code)
# - 20251004_XXXXXX_your_name.json (migration metadata)

# 5. Review the migration file
# Open the .ts file and check it captured your changes

# 6. Commit BOTH migration files
git add src/migrations/
git commit -m "feat: add migration for [your changes]"

# 7. Push to your branch
git push origin your-branch
```

#### Phase 3: Vercel Deployment (Automatic)
```bash
# When you push to GitHub, Vercel automatically runs:
# (from package.json "ci" script)
payload migrate && pnpm build

# This:
# 1. Applies your new migration to production database
# 2. Updates the schema
# 3. Builds the application
```

### 🛠️ TROUBLESHOOTING COMMON ISSUES

#### Problem: "Column does not exist" in local build
```bash
# Solution:
pnpm dev          # Start dev server
# Wait 5-10 seconds for auto-sync
# Ctrl+C to stop
pnpm build       # Try build again
```

#### Problem: Forgot to create migration before deploying
```bash
# You'll see in Vercel logs:
# "Error: column xyz does not exist"

# Fix:
pnpm payload migrate:create  # Create migration locally
git add src/migrations/
git commit -m "fix: add missing migration"
git push                     # Redeploy
```

#### Problem: Migration failed in production
```bash
# Check Vercel function logs for error
# Common fixes:
# 1. If data transformation issue: Edit migration file
# 2. If timeout: Split into smaller migrations
# 3. If critical: May need database backup restore
```

### 🚨 WHEN DATABASE IS CORRUPTED (Due to Incorrect Migration Usage):

**If you have already run migrations in development and database is corrupted:**

1. **STOP** - Do not run any more migration commands
2. **ASK USER** - Explain situation: "I incorrectly ran migrations in development. Database may be corrupted. Options are:
   - Option A: `migrate:fresh` (DELETES ALL DATA, clean slate)
   - Option B: Restore from backup if available"
3. **WAIT FOR USER DECISION** - Do not proceed without explicit permission
4. **NEVER** attempt to "fix" by running more migrations

### 🎓 WHY THESE RULES EXIST:

- **Dev mode uses "push" strategy**: Payload automatically syncs schema changes to database
- **Production uses "migrate" strategy**: Explicit migrations track and apply changes safely
- **Mixing strategies causes corruption**: Database gets stuck between auto-sync and migration tracking
- **Recovery is destructive**: Once corrupted, only option is to drop database or restore backup

### 📋 Migration Commands Reference (PRODUCTION ONLY):

```bash
# ⚠️ ALL OF THESE ARE PRODUCTION-ONLY COMMANDS
# DO NOT USE IN DEVELOPMENT UNLESS USER EXPLICITLY REQUESTS

pnpm payload migrate:create    # Create new migration (production prep only)
pnpm payload migrate          # Run pending migrations (production only)
pnpm payload migrate:status   # Check migration status (production only)
pnpm payload migrate:down     # Rollback last migration (production only)
pnpm payload migrate:refresh  # Rollback and re-run (production only)
pnpm payload migrate:reset    # Rollback all migrations (DESTRUCTIVE)
pnpm payload migrate:fresh    # Drop and recreate schema (DESTRUCTIVE)
```

### ⚠️ SUMMARY FOR CLAUDE CODE AGENTS:

**Your job when you see build errors with "column does not exist":**
1. Recognize this as schema out of sync
2. Start dev server to auto-sync schema
3. Wait for sync to complete
4. Try build again
5. **DO NOT TOUCH MIGRATION COMMANDS**

**Your job is NOT:**
1. ❌ To run migrations
2. ❌ To "fix" the database
3. ❌ To check migration status
4. ❌ To create migrations (unless preparing for production deployment)
5. ❌ To assume migrations are needed

### 🔥 CRITICAL LESSON LEARNED: Environment File Management

**Problem:** Local `pnpm build` was using `.env.production` instead of `.env`, causing builds to connect to remote database instead of local Docker database.

**Key Insights:**
1. **Next.js automatically loads `.env.production` during `next build`** - This is default Next.js behavior
2. **`.env.production` should NOT be committed to the repository** - It contains production database credentials
3. **Local builds should use local database** - Development and builds should use the same database (local Docker)
4. **Production env vars belong on Vercel** - Set them in Vercel dashboard, not in committed files

**Solution:**
- ✅ Remove `.env.production` from the repository
- ✅ Add `.env.production` to `.gitignore`
- ✅ Set production environment variables in Vercel dashboard
- ✅ Local development and builds use `.env` with local Docker database

**Environment Variable Priority (Next.js):**
1. `.env.production.local` (highest priority for production builds, gitignored)
2. `.env.production` (should NOT be committed)
3. `.env.local` (gitignored)
4. `.env` (can be committed for local development defaults)

### 🎯 CRITICAL LESSON: Schema Changes Require Migrations for Production

**Problem:** After adding new fields (`buttonIcon`, `iconPos`) to the `link` field configuration, local database was auto-synced but production/preview deployments failed.

**Key Insights:**
1. **Dev mode auto-syncs schema silently** - No prompts shown locally, columns added automatically
2. **Production uses migrations** - Preview/production deployments run `payload migrate`, not auto-sync
3. **Schema changes after last migration are invisible to production** - If you add fields without creating a migration, production won't have them

**Required Workflow for Schema Changes:**
1. Make schema changes in code (add fields, change types, etc.)
2. Dev server auto-syncs to local database automatically
3. **BEFORE deploying to preview/production:**
   ```bash
   pnpm payload migrate:create
   ```
4. Review the generated migration file
5. Commit and push the migration
6. Vercel will run the migration during deployment

**Warning Signs You Forgot to Create a Migration:**
- ✅ Local build works fine
- ❌ Preview/production deployment fails with "column does not exist"
- ❌ Error mentions columns that you recently added to your code

**Solution:**
- Always run `pnpm payload migrate:create` before deploying schema changes to preview/production
- The migration captures all schema differences between code and last migration
- Commit the migration files (both `.ts` and `.json`) to git

## 🚨 CRITICAL: Payload CMS draftMode() Fix for Next.js 15+

**This is a recurring, breaking issue that MUST be fixed when upgrading Next.js or encountering preview errors.**

### Error Symptoms:
```
Error: `draftMode` was called outside a request scope
GET /next/preview?slug=... 500 in XXXms
Failed to create URL object from URL: , falling back to http://localhost
```

### Root Cause:
Next.js 15.4+ requires `NextRequest` type for proper request context tracking with `draftMode()`. Using custom request types breaks the context.

### ✅ CRITICAL FIX - Preview Route Implementation:

**File:** `/src/app/(frontend)/next/preview/route.ts`

**⚠️ This implementation is copied directly from the official Payload CMS website template.**

```typescript
import type { CollectionSlug, PayloadRequest } from 'payload'
import { getPayload } from 'payload'

import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

import configPromise from '@payload-config'

export async function GET(req: NextRequest): Promise<Response> {
  const payload = await getPayload({ config: configPromise })

  const { searchParams } = new URL(req.url)

  const path = searchParams.get('path')
  const collection = searchParams.get('collection') as CollectionSlug
  const slug = searchParams.get('slug')
  const previewSecret = searchParams.get('previewSecret')

  if (previewSecret !== process.env.PREVIEW_SECRET) {
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  if (!path || !collection || !slug) {
    return new Response('Insufficient search params', { status: 404 })
  }

  if (!path.startsWith('/')) {
    return new Response('This endpoint can only be used for relative previews', { status: 500 })
  }

  let user

  try {
    user = await payload.auth({
      req: req as unknown as PayloadRequest,
      headers: req.headers,
    })
  } catch (error) {
    payload.logger.error({ err: error }, 'Error verifying token for live preview')
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  const draft = await draftMode()

  if (!user) {
    draft.disable()
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  // You can add additional checks here to see if the user is allowed to preview this page

  draft.enable()

  redirect(path)
}
```

### ⚠️ Critical Implementation Notes:

1. **Request Type:** 🚨 **MUST use `NextRequest` from `next/server`**. This is the ONLY correct type for Next.js 15.4+. Custom request types break `draftMode()`.
2. **Import Required:** `import { NextRequest } from 'next/server'` is mandatory
3. **draftMode() Position:** Can be called after `getPayload()` and `payload.auth()` - timing doesn't matter as long as `NextRequest` is used
4. **Error Handling:** Always include try/catch for auth calls
5. **Response Format:** Use proper Response objects, not NextResponse

### ❌ Common Mistakes That Break Preview:

```typescript
// WRONG - Custom request type breaks draftMode() context
export async function GET(
  req: {
    cookies: { get: (name: string) => { value: string } }
  } & Request,
): Promise<Response>

// WRONG - Missing NextRequest import
// Using Request or custom types instead

// WRONG - Missing await on draftMode()
const draft = draftMode() // Missing await

// ✅ CORRECT - Use NextRequest
import { NextRequest } from 'next/server'
export async function GET(req: NextRequest): Promise<Response> {
  // ... implementation
  const draft = await draftMode()
}
```

### 🔧 Troubleshooting Steps:

1. **Verify NextRequest Import:** Ensure `import { NextRequest } from 'next/server'` is present
2. **Check Function Signature:** Must use `export async function GET(req: NextRequest): Promise<Response>`
3. **Clear Build Cache:** `rm -rf .next && pnpm dev`
4. **Check Environment Variables:** Ensure `PREVIEW_SECRET` is set
5. **Test Preview URL:** Should return 200, not 500
6. **Check Server Logs:** No "draftMode called outside request scope" errors

### 🎯 Success Indicators:

- ✅ Preview routes return 200 status
- ✅ No draftMode context errors in server logs
- ✅ Admin panel live preview works correctly
- ✅ Draft content displays properly in preview mode

### 📋 Required Files for Preview System:

- `/src/app/(frontend)/next/preview/route.ts` - Main preview route (FIXED ABOVE)
- `/src/utilities/generatePreviewPath.ts` - Preview URL generation
- `/src/collections/Pages/index.ts` - Collection preview configuration

### 📖 Reference:

This implementation is taken directly from the official Payload CMS website template:
- **Source:** https://github.com/payloadcms/payload/blob/main/templates/website/src/app/(frontend)/next/preview/route.ts
- **Tested with:** Next.js 15.4.4, Payload CMS 3.55.0, Node.js 18+

### ⚠️ Why This Issue Keeps Recurring:

The issue recurs because the "fix" with custom request types appears in outdated documentation and seems logical, but actually breaks Next.js 15.4+ context tracking. **Always use the official Payload template implementation** rather than custom request types.

**Key Insight:** The problem is NOT the timing of `draftMode()` calls - it's the request type. `NextRequest` is required for proper context tracking.

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
- **OptimizedImage Component**: Intelligent image optimization with automatic Payload Media integration and Next.js Image optimization for external assets

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
- **🚨 CRITICAL - Image Handling**: Always use `OptimizedImage` component instead of `<img>` tags. See `/docs/IMAGES.md` for complete guidelines. External image domains must be added to `next.config.js`.
- **🚨 CRITICAL - Row Labels**: ALWAYS implement row labels for array fields with identifiable content (navigation items, social links, etc.). See `/docs/ROW_LABELS.md` for complete guidelines. This improves admin UX by showing meaningful labels when arrays are collapsed.
- **🚨 CRITICAL - Blog/Posts System**: Use proper TypeScript patterns for blog implementation. Always use `categories` array (not `category` object), import `Where` type from Payload, and follow Next.js 15 searchParams patterns. See `/docs/BLOG_IMPLEMENTATION.md` and `/docs/TYPESCRIPT_PATTERNS.md`.
- **🚨 CRITICAL - Next.js 15 Compatibility**: Never use `export const dynamic = 'force-static'` with URL parameters. Always use `props.searchParams` pattern instead of destructuring. See `/docs/NEXT_JS_15_FILTERING_FIX.md` for complete fix.

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