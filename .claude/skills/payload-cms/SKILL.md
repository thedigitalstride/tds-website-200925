---
name: payload-cms
description: Comprehensive guide for Payload CMS development - collections, fields, hooks, migrations, and project-specific patterns. Use when creating/modifying collections, configuring fields, implementing hooks, or making database schema changes.
---

<EXTREMELY_IMPORTANT>
This skill contains MANDATORY workflows for Payload CMS development. If you are working with Payload collections, fields, migrations, or configuration, you MUST follow these patterns.

DO NOT rationalize skipping checklists for "simple" tasks. Simple Payload changes become complex problems when patterns aren't followed.
</EXTREMELY_IMPORTANT>

# Payload CMS Development Skill

## What is Payload CMS?

Payload is a **Next.js fullstack framework** that functions as a code-first, headless CMS. It provides:

- **Admin Panel**: Auto-generated React interface from your schema
- **Database Layer**: Schema automation with migrations and transactions
- **Three APIs**: Local (typesafe), REST, and GraphQL
- **Authentication & Access Control**: Built-in user management and permissions
- **File Management**: Upload handling, image optimization, and cropping
- **Live Preview**: Real-time frontend rendering during content editing

> **Key Advantage**: Write config once, receive full CMS infrastructure with generated APIs, admin UI, and database management.

## When to Use This Skill

Use this skill when:
- Creating or modifying Payload collections or globals
- Adding or configuring fields in collections
- Implementing hooks for data processing
- Setting up access control rules
- Making database schema changes
- Working with rich text, uploads, or relationships
- Configuring blocks for layout builder
- Troubleshooting Payload-related errors

## Core Architecture Principles

### 1. Config-First Development

**Everything starts with the Payload config**. The config is a fully-typed JavaScript object that defines your entire application structure:

```typescript
// src/payload.config.ts
import { buildConfig } from 'payload'

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET,
  db: postgresAdapter({ pool: { connectionString: process.env.POSTGRES_URL } }),
  collections: [ /* Collection configs */ ],
  globals: [ /* Global configs */ ],
})
```

**The Payload Config is central to everything that Payload does.**

### 2. Three API Layers

Payload provides three ways to interact with your data:

#### Local API (Recommended for Next.js)
Direct, typesafe database access from React Server Components:

```typescript
import { getPayload } from 'payload'
import config from '@/payload.config'

const payload = await getPayload({ config })
const pages = await payload.find({ collection: 'pages' })
```

**Benefits**: No HTTP overhead, strongly typed, server-side only.

#### REST API
Auto-mounted at `/api/*`:

```javascript
const response = await fetch('https://localhost:3000/api/pages')
const data = await response.json()
```

#### GraphQL API
Mounted at `/api/graphql` with playground at `/api/graphql-playground`.

> **All three APIs share the exact same query language.**

### 3. Type Safety

Payload auto-generates TypeScript types from your config:

```bash
pnpm generate:types  # Generates src/payload-types.ts
```

**ALWAYS regenerate types after schema changes.**

## Project Structure (This Codebase)

```
src/
├── payload.config.ts         # Main Payload configuration
├── payload-types.ts          # Auto-generated types (DO NOT EDIT)
├── collections/              # Collection configurations
│   ├── Pages/               # Page collection with layout builder
│   ├── Posts/               # Blog posts
│   ├── Media/               # File uploads
│   ├── Categories/          # Taxonomy
│   ├── Users/               # Authentication
│   └── Icons/               # SVG icon library
├── blocks/                   # Reusable content blocks
│   ├── CallToAction/
│   ├── Hero/
│   └── [other blocks]/
├── fields/                   # Reusable field configurations
│   ├── iconSelectorField.ts # Icon selection helper
│   ├── slug/                # Slug generation
│   └── [other fields]/
├── hooks/                    # Payload hooks
│   └── [various hooks]/
└── globals/                  # Global configurations
    ├── Header/
    └── Footer/
```

## Critical Rules

### ✅ DO:

1. **Organization**:
   - Collections in `src/collections/[CollectionName]/`
   - Reusable fields in `src/fields/`
   - Blocks in `src/blocks/[BlockName]/`
   - Import utilities from project helpers

2. **Type Safety**:
   - Run `pnpm generate:types` after schema changes
   - Import types from `src/payload-types`
   - Use Local API for type-safe queries in Next.js

3. **Database Changes (Development)**:
   - Run `pnpm dev` to auto-sync schema changes
   - Wait for "✓ Schema synchronized" message
   - If build fails with "column does not exist": run dev server again

4. **Database Changes (Production)**:
   - Stop dev server
   - Run `pnpm payload migrate:create`
   - Review generated migration files
   - Commit and push (Vercel runs migrations automatically)

5. **Admin UX**:
   - Use `useAsTitle` to identify documents in lists
   - Implement row labels for array fields with identifiable content
   - Use collapsible fields for grouping optional/advanced settings
   - Configure `defaultColumns` for list view clarity

6. **Field Configuration**:
   - Use `iconSelectorField()` helper for icon selection
   - Implement `slug` fields with auto-generation hooks
   - Use relationship fields for connected data
   - Apply `localized: true` for multi-language content

### ❌ DON'T:

1. **Development**:
   - Run `pnpm payload migrate` in development (production only)
   - Run `pnpm payload migrate:create` unless deploying to production
   - Use external SQL tools for schema changes
   - Modify `src/payload-types.ts` directly (auto-generated)

2. **Field Configuration**:
   - Create duplicate field configs (check `src/fields/` first)
   - Skip row labels for arrays with identifiable content
   - Nest groups more than 2-3 levels deep (use tabs instead)

3. **Access Control**:
   - Put business logic in access control functions
   - Return complex objects from access functions (boolean or simple query only)
   - Bypass access control with Local API (use `overrideAccess: true` carefully)

4. **Hooks**:
   - Mutate original data directly (create new objects)
   - Make external API calls without error handling
   - Implement business logic (use hooks for data transformation only)

## Collections vs Globals

### Collections
**Use for**: Repeated document types (posts, pages, products, users)

**Key Features**:
- Multiple documents
- CRUD operations via all APIs
- List view in admin panel
- Sortable, filterable, searchable

**Example**: Posts, Pages, Media, Categories, Users

### Globals
**Use for**: Single-document entities (site settings, navigation, footer)

**Key Features**:
- Single document per global
- No list view (direct edit)
- Cannot be deleted
- Same hooks and access control as collections

**Example**: Header, Footer, Site Settings

## Common Tasks

### TASK 1: Creating a New Collection

**When you create a new collection, you MUST use TodoWrite to track these steps:**

1. ☐ Create collection directory and files
2. ☐ Define collection configuration
3. ☐ Configure admin options (useAsTitle, defaultColumns)
4. ☐ Add fields with proper types and validation
5. ☐ Implement row labels for array fields (if applicable)
6. ☐ Set up hooks (if needed)
7. ☐ Configure access control (if needed)
8. ☐ Import collection into payload.config.ts
9. ☐ Run `pnpm dev` and wait for schema sync
10. ☐ Run `pnpm generate:types` to update types
11. ☐ Test in admin panel (/admin)
12. ☐ Create frontend component/route (if applicable)

#### Step-by-Step Process

**Step 1: Create Collection Directory**

```bash
mkdir -p src/collections/YourCollection
touch src/collections/YourCollection/index.ts
```

**Step 2: Define Collection Configuration**

```typescript
// src/collections/YourCollection/index.ts
import type { CollectionConfig } from 'payload'

export const YourCollection: CollectionConfig = {
  slug: 'your-collection',

  // Admin panel configuration
  admin: {
    useAsTitle: 'title', // Field to display in lists
    defaultColumns: ['title', 'status', 'updatedAt'],
    group: 'Content', // Optional: group in admin sidebar
  },

  // Field definitions
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
  ],

  // Optional features
  timestamps: true, // Adds createdAt/updatedAt
  versions: {
    drafts: true, // Enable draft/publish workflow
  },
}
```

**Step 3: Import into Main Config**

```typescript
// src/payload.config.ts
import { YourCollection } from './collections/YourCollection'

export default buildConfig({
  collections: [
    Pages,
    Posts,
    YourCollection, // Add your new collection
    // ... other collections
  ],
})
```

**Step 4: Sync and Generate Types**

```bash
pnpm dev              # Wait for "✓ Schema synchronized"
# In another terminal:
pnpm generate:types   # Generate TypeScript types
```

**Step 5: Verify in Admin Panel**

Navigate to `http://localhost:3000/admin` and verify your collection appears in the sidebar.

---

### TASK 2: Adding Fields to Existing Collection

**When you add fields to a collection, you MUST use TodoWrite to track these steps:**

1. ☐ Locate collection configuration file
2. ☐ Add new field(s) to fields array
3. ☐ Configure field validation and admin options
4. ☐ Update row labels if adding to arrays
5. ☐ Run `pnpm dev` to sync schema
6. ☐ Run `pnpm generate:types` to update types
7. ☐ Test field behavior in admin panel
8. ☐ Update frontend components using the field

#### Common Field Types

**Text Fields**:
```typescript
{
  name: 'title',
  type: 'text',
  required: true,
  minLength: 3,
  maxLength: 100,
  admin: {
    placeholder: 'Enter title...',
  },
}
```

**Rich Text (Lexical)**:
```typescript
{
  name: 'content',
  type: 'richText',
  required: true,
}
```

**Relationship Fields**:
```typescript
{
  name: 'author',
  type: 'relationship',
  relationTo: 'users',
  required: true,
}

{
  name: 'categories',
  type: 'relationship',
  relationTo: 'categories',
  hasMany: true, // Multiple relationships
}
```

**Upload Fields**:
```typescript
{
  name: 'featuredImage',
  type: 'upload',
  relationTo: 'media',
  required: true,
}
```

**Array Fields with Row Labels**:
```typescript
{
  name: 'teamMembers',
  type: 'array',
  admin: {
    components: {
      RowLabel: ({ data, index }) => {
        return data?.name || `Team Member ${String(index + 1).padStart(2, '0')}`
      },
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
    },
  ],
}
```

**Blocks (Layout Builder)**:
```typescript
{
  name: 'layout',
  type: 'blocks',
  blocks: [CallToAction, Hero, Content, MediaBlock],
  required: true,
  minRows: 1,
}
```

**Select Fields**:
```typescript
{
  name: 'status',
  type: 'select',
  options: [
    { label: 'Draft', value: 'draft' },
    { label: 'Published', value: 'published' },
    { label: 'Archived', value: 'archived' },
  ],
  defaultValue: 'draft',
  required: true,
}
```

**Number Fields**:
```typescript
{
  name: 'price',
  type: 'number',
  required: true,
  min: 0,
  admin: {
    step: 0.01, // Decimal precision
  },
}
```

**Checkbox Fields**:
```typescript
{
  name: 'featured',
  type: 'checkbox',
  defaultValue: false,
  admin: {
    position: 'sidebar',
  },
}
```

**Date Fields**:
```typescript
{
  name: 'publishDate',
  type: 'date',
  admin: {
    date: {
      pickerAppearance: 'dayAndTime',
    },
  },
}
```

#### Project-Specific Field Helpers

**Icon Selector**:
```typescript
import { iconSelectorField } from '@/fields/iconSelectorField'

// In your fields array:
iconSelectorField({ name: 'icon', required: false })
```

**Slug with Auto-Generation**:
```typescript
import { slugField } from '@/fields/slug'

// In your fields array:
slugField()
```

---

### TASK 3: Creating a New Block

Blocks are reusable content components for layout builders.

**Guidelines (No Mandatory Checklist):**

1. Create block directory: `src/blocks/YourBlock/`
2. Create component: `src/blocks/YourBlock/Component.tsx`
3. Create config: `src/blocks/YourBlock/config.ts`
4. Export from: `src/blocks/YourBlock/index.ts`

**Example Block Structure**:

```typescript
// src/blocks/YourBlock/config.ts
import type { Block } from 'payload'

export const YourBlock: Block = {
  slug: 'yourBlock',
  interfaceName: 'YourBlockType',

  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'textarea',
    },
  ],
}
```

```typescript
// src/blocks/YourBlock/Component.tsx
import React from 'react'
import type { YourBlockType } from '@/payload-types'

export const YourBlockComponent: React.FC<YourBlockType> = ({ heading, content }) => {
  return (
    <div className="your-block">
      <h2>{heading}</h2>
      <p>{content}</p>
    </div>
  )
}
```

```typescript
// src/blocks/YourBlock/index.ts
export { YourBlock } from './config'
export { YourBlockComponent } from './Component'
```

**Add to Collection**:

```typescript
import { YourBlock } from '@/blocks/YourBlock'

fields: [
  {
    name: 'layout',
    type: 'blocks',
    blocks: [YourBlock, CallToAction, Hero],
  },
]
```

---

### TASK 4: Implementing Hooks

Hooks allow you to execute custom logic during document lifecycle events.

**Guidelines (No Mandatory Checklist):**

**Hook Types**:
- `beforeValidate` - Before validation runs
- `afterValidate` - After validation passes
- `beforeChange` - Before database write
- `afterChange` - After database write
- `beforeRead` - Before document is read
- `afterRead` - After document is read
- `beforeDelete` - Before document deletion
- `afterDelete` - After document deletion

**Example: Auto-Generate Slug**:

```typescript
export const YourCollection: CollectionConfig = {
  slug: 'your-collection',

  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        if (operation === 'create' && !data.slug) {
          data.slug = slugify(data.title)
        }
        return data
      },
    ],
  },

  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true },
  ],
}
```

**Example: Transform Data Before Save**:

```typescript
hooks: {
  beforeChange: [
    ({ data }) => {
      // Ensure email is lowercase
      if (data.email) {
        data.email = data.email.toLowerCase()
      }
      return data
    },
  ],
}
```

**Example: Populate Related Data**:

```typescript
hooks: {
  afterRead: [
    async ({ doc, req }) => {
      // Add computed field
      if (doc.authorId) {
        const author = await req.payload.findByID({
          collection: 'users',
          id: doc.authorId,
        })
        doc.authorName = author.name
      }
      return doc
    },
  ],
}
```

**Hook Best Practices**:
- ✅ Use for data transformation
- ✅ Use for auto-populating fields
- ✅ Use for generating computed values
- ❌ Avoid business logic
- ❌ Avoid external API calls without error handling
- ❌ Don't mutate original data directly (return new object)

---

### TASK 5: Configuring Access Control

Access control determines who can perform operations on documents.

**Guidelines (No Mandatory Checklist):**

**Access Control Levels**:
1. **Collection-level**: General CRUD permissions
2. **Document-level**: Per-document rules
3. **Field-level**: Conditional field access

**Example: Collection-Level Access**:

```typescript
export const Posts: CollectionConfig = {
  slug: 'posts',

  access: {
    // Anyone can read
    read: () => true,

    // Only authenticated users can create
    create: ({ req: { user } }) => Boolean(user),

    // Only admins can delete
    delete: ({ req: { user } }) => {
      return user?.role === 'admin'
    },

    // Authors can update their own posts
    update: ({ req: { user } }) => {
      if (user?.role === 'admin') return true

      return {
        author: {
          equals: user?.id,
        },
      }
    },
  },

  fields: [
    // ...
  ],
}
```

**Example: Field-Level Access**:

```typescript
fields: [
  {
    name: 'internalNotes',
    type: 'textarea',
    access: {
      read: ({ req: { user } }) => user?.role === 'admin',
      update: ({ req: { user } }) => user?.role === 'admin',
    },
  },
]
```

**Access Control Patterns**:

**Public Read, Admin Write**:
```typescript
access: {
  read: () => true,
  create: isAdmin,
  update: isAdmin,
  delete: isAdmin,
}
```

**Own Content Only**:
```typescript
access: {
  read: ({ req: { user } }) => {
    if (!user) return false
    if (user.role === 'admin') return true
    return { author: { equals: user.id } }
  },
}
```

**Published Content**:
```typescript
access: {
  read: ({ req: { user } }) => {
    if (user?.role === 'admin') return true
    return { _status: { equals: 'published' } }
  },
}
```

---

### TASK 6: Database Migrations

**When making schema changes for production deployment, you MUST use TodoWrite to track these steps:**

1. ☐ Make schema changes in development
2. ☐ Test changes with `pnpm dev` (auto-sync)
3. ☐ Verify changes work correctly
4. ☐ Stop dev server
5. ☐ Run `pnpm payload migrate:create`
6. ☐ Review generated migration files in `src/migrations/`
7. ☐ Test migration locally (optional)
8. ☐ Commit migration files
9. ☐ Push to repository
10. ☐ Vercel automatically runs migrations on deploy

#### Development vs Production

**Development (Local)**:
- Schema changes auto-sync via `pnpm dev`
- No manual migrations needed
- Database schema updates automatically
- Wait for "✓ Schema synchronized" message

**Production (Vercel/Deployed)**:
- Schema changes require migration files
- Migrations run automatically on deploy
- Must create migrations before deploying

#### Common Migration Scenarios

**Adding a Field**:
1. Add field to collection config
2. Run `pnpm dev` (auto-syncs locally)
3. Before deploying: `pnpm payload migrate:create`

**Renaming a Field**:
1. Migration will DROP old column and CREATE new one
2. Data will be LOST unless you handle it in migration
3. Consider: Add new field → migrate data → remove old field

**Changing Field Type**:
1. Payload generates migration to change column type
2. Verify data compatibility (e.g., text → number)
3. Test thoroughly before deploying

#### Migration File Structure

```typescript
// src/migrations/YYYYMMDD_HHMMSS_description.ts
import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  // Changes to apply
  await payload.db.drizzle.execute(sql`
    ALTER TABLE "posts" ADD COLUMN "featured" boolean DEFAULT false
  `)
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Changes to rollback
  await payload.db.drizzle.execute(sql`
    ALTER TABLE "posts" DROP COLUMN "featured"
  `)
}
```

**See**: [DATABASE_MIGRATIONS.md](/docs/DATABASE_MIGRATIONS.md) for complete guide.

---

## Project-Specific Patterns

### 1. UntitledUI Integration

This project uses UntitledUI components throughout the frontend. When creating blocks that render on the frontend:

**Import UUI Components**:
```typescript
import { UUIButton } from '@/components/uui/UUIButton'
import { UUIContainer } from '@/components/uui/UUIContainer'
```

**Button Icon Pattern**:
```typescript
// ✅ Correct: Pass icon as prop
<UUIButton iconLeading={ArrowRightIcon}>Click Me</UUIButton>

// ❌ Wrong: Don't pass as children
<UUIButton><ArrowRightIcon />Click Me</UUIButton>
```

**See**: [BUTTON_SYSTEM.md](/docs/BUTTON_SYSTEM.md), [STYLING_SYSTEM.md](/docs/STYLING_SYSTEM.md)

### 2. OptimizedImage Component

Always use the project's `OptimizedImage` component for media relationships:

```typescript
import { OptimizedImage } from '@/components/OptimizedImage'

// In your component:
<OptimizedImage
  media={block.image} // Payload Media relationship
  alt={block.imageAlt || ''}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

**Never use `<img>` tags directly.**

**See**: [IMAGES.md](/docs/IMAGES.md)

### 3. Icon Selector Field

Use the project's icon selector helper for consistent icon selection:

```typescript
import { iconSelectorField } from '@/fields/iconSelectorField'

fields: [
  iconSelectorField({ name: 'icon', required: false }),
]
```

This provides a visual icon picker in the admin panel with search functionality.

**See**: [ICON_SELECTOR.md](/docs/ICON_SELECTOR.md)

### 4. Row Labels for Arrays

Always implement row labels for array fields that have identifiable content:

```typescript
{
  name: 'features',
  type: 'array',
  admin: {
    components: {
      RowLabel: ({ data, index }) => {
        return data?.title || `Feature ${String(index + 1).padStart(2, '0')}`
      },
    },
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
  ],
}
```

**See**: [ROW_LABELS.md](/docs/ROW_LABELS.md)

### 5. Collapsible Fields

Group related optional/advanced settings in collapsible sections:

```typescript
{
  name: 'advancedSettings',
  type: 'collapsible',
  label: 'Advanced Settings',
  admin: {
    initCollapsed: true,
  },
  fields: [
    { name: 'customCss', type: 'textarea' },
    { name: 'customId', type: 'text' },
  ],
}
```

**See**: [COLLAPSIBLE_FIELDS.md](/docs/COLLAPSIBLE_FIELDS.md)

### 6. SEO Plugin

This project uses `@payloadcms/plugin-seo`. Collections with SEO should configure the plugin:

```typescript
import { seoPlugin } from '@payloadcms/plugin-seo'

// In payload.config.ts:
plugins: [
  seoPlugin({
    collections: ['pages', 'posts'],
    generateTitle: ({ doc }) => `${doc.title} | Your Site`,
    generateDescription: ({ doc }) => doc.excerpt || doc.description,
  }),
]
```

### 7. Live Preview

This project has live preview configured for Pages collection:

```typescript
admin: {
  livePreview: {
    url: ({ data, locale }) => {
      const path = data.slug === 'home' ? '' : data.slug
      return `${process.env.NEXT_PUBLIC_SERVER_URL}${path ? `/${path}` : ''}?preview=true`
    },
  },
}
```

---

## Querying Data (Next.js Frontend)

### Using Local API

**In React Server Components**:

```typescript
import { getPayload } from 'payload'
import config from '@/payload.config'

const payload = await getPayload({ config })

// Find all
const { docs } = await payload.find({
  collection: 'posts',
  limit: 10,
  sort: '-publishedDate',
})

// Find by ID
const post = await payload.findByID({
  collection: 'posts',
  id: params.id,
})

// Find with query
const { docs } = await payload.find({
  collection: 'posts',
  where: {
    _status: { equals: 'published' },
    category: { equals: 'news' },
  },
})
```

**Common Query Operators**:
- `equals`: Exact match
- `not_equals`: Not equal
- `in`: Match any in array
- `not_in`: Not in array
- `greater_than`: >
- `greater_than_equal`: >=
- `less_than`: <
- `less_than_equal`: <=
- `like`: Partial match (case-insensitive)
- `contains`: Contains value
- `exists`: Field exists (true/false)

**Depth Parameter**:
```typescript
const { docs } = await payload.find({
  collection: 'posts',
  depth: 2, // Populate nested relationships
})
```

**Pagination**:
```typescript
const { docs, totalDocs, totalPages, page } = await payload.find({
  collection: 'posts',
  limit: 10,
  page: 1,
})
```

---

## Troubleshooting

### "Column does not exist" Error

**Cause**: Database schema out of sync with config.

**Solution**:
1. Ensure dev server is running: `pnpm dev`
2. Wait for "✓ Schema synchronized" message
3. If issue persists, restart dev server
4. Check for TypeScript errors in collection configs

**See**: [DATABASE_TROUBLESHOOTING.md](/docs/DATABASE_TROUBLESHOOTING.md)

### Type Errors in Frontend

**Cause**: Payload types not updated after schema changes.

**Solution**:
```bash
pnpm generate:types
```

Restart TypeScript server in IDE if needed.

### Migration Conflicts

**Cause**: Multiple developers creating migrations simultaneously.

**Solution**:
1. Pull latest migrations from main branch
2. Delete your local migration files
3. Re-run `pnpm payload migrate:create`
4. Review and commit new migration

### Admin Panel Not Loading

**Cause**: Various (config error, database connection, build issue).

**Solution**:
1. Check console for errors
2. Verify database connection: `POSTGRES_URL` in `.env`
3. Clear Next.js cache: `rm -rf .next && pnpm dev`
4. Check `payload.config.ts` for syntax errors

### Upload/Media Issues

**Cause**: Storage configuration or missing environment variables.

**Solution**:
1. Verify `BLOB_READ_WRITE_TOKEN` in `.env`
2. Check `next.config.js` for allowed image domains
3. Verify storage adapter in `payload.config.ts`

---

## Related Documentation

**This Project**:
- [CLAUDE.md](/CLAUDE.md) - Project overview and quick reference
- [DATABASE_MIGRATIONS.md](/docs/DATABASE_MIGRATIONS.md) - Migration workflow
- [IMAGES.md](/docs/IMAGES.md) - OptimizedImage usage
- [ROW_LABELS.md](/docs/ROW_LABELS.md) - Admin UX for arrays
- [COLLAPSIBLE_FIELDS.md](/docs/COLLAPSIBLE_FIELDS.md) - Field organization
- [STYLING_SYSTEM.md](/docs/STYLING_SYSTEM.md) - CSS architecture

**Official Payload Docs**:
- Main Docs: https://payloadcms.com/docs
- Collections: https://payloadcms.com/docs/configuration/collections
- Fields: https://payloadcms.com/docs/fields/overview
- Hooks: https://payloadcms.com/docs/hooks/overview
- Access Control: https://payloadcms.com/docs/access-control/overview
- Local API: https://payloadcms.com/docs/local-api/overview

---

## Quick Reference: Common Patterns

### Collection with Full Features

```typescript
import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'

export const Posts: CollectionConfig = {
  slug: 'posts',

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', '_status', 'updatedAt'],
    group: 'Content',
  },

  versions: {
    drafts: true,
  },

  access: {
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      return { _status: { equals: 'published' } }
    },
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField(),
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
  ],

  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' && !data.publishedDate) {
          data.publishedDate = new Date()
        }
        return data
      },
    ],
  },

  timestamps: true,
}
```

### Global Configuration

```typescript
import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',

  admin: {
    group: 'Settings',
  },

  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'navigation',
      type: 'array',
      admin: {
        components: {
          RowLabel: ({ data }) => data?.label || 'Nav Item',
        },
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],

  versions: true,
}
```

---

## Summary

This skill provides comprehensive guidance for Payload CMS development in this codebase. Key takeaways:

1. **Config-first**: Everything starts with collection/global configs
2. **Type-safe**: Always generate types after schema changes
3. **Migration workflow**: Dev auto-sync, production requires migration files
4. **Admin UX**: Use row labels, collapsible fields, and proper titles
5. **Project patterns**: UUI components, OptimizedImage, icon selectors
6. **Access control**: Implement at collection, document, and field levels
7. **Hooks**: Use for data transformation, not business logic
8. **Local API**: Prefer typesafe Local API in Next.js Server Components

**When in doubt**:
- Check existing collections for patterns
- Consult project documentation in `/docs/`
- Reference official Payload docs
- Use checklists for complex tasks (migrations, new collections)
