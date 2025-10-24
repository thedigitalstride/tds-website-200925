# The Digital Stride (TDS) Website

> More Leads. Better Customers. Faster Growth.

A full-featured content management system built with Payload CMS and Next.js, designed for marketing websites, blogs, knowledge bases, and content-driven applications. Features a powerful drag-and-drop page builder, hierarchical content organization, and a comprehensive styling system.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15.4.4-black)](https://nextjs.org/)
[![Payload CMS](https://img.shields.io/badge/Payload_CMS-3.59-blue)](https://payloadcms.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [Collections](#-collections)
- [Page Builder Blocks](#-page-builder-blocks)
- [Deployment](#-deployment)
- [Documentation](#-documentation)
- [Testing](#-testing)
- [License](#-license)

## 🎯 Overview

This application is **not just a blog template** – it's a full-featured content management system suitable for:

- 🌐 Marketing websites with complex page hierarchies
- 📚 Technical documentation sites
- 💡 Knowledge bases with categorized FAQs
- ✍️ Multi-author blogs with contribution tracking
- 📰 Content-heavy informational sites

Built on Payload CMS 3.x with Next.js 15 App Router, it provides a flexible page builder system that allows editors to construct virtually any page layout while maintaining full content management capabilities.

## ✨ Key Features

### 🎨 Content Management
- **Layout Builder**: Drag-and-drop page construction with 18+ reusable blocks
- **Hierarchical Pages**: Organize pages in nested structures with breadcrumb-based URLs
- **Rich Blog System**: Lexical editor with hero images, categories, authors, contributors, related posts
- **FAQ Management**: Dedicated FAQ collection with categories, search, schema markup support
- **Draft Workflow**: Publish/unpublish with scheduling and version history (50 versions per document)
- **Live Preview**: Real-time content preview with mobile, tablet, desktop breakpoints

### 🎨 Page Builder Blocks
- **Hero Blocks**: 3 layout variants with typewriter animations, custom backgrounds, CTA buttons
- **Card Grids**: Flexible layouts (5 styles) with icons, rich descriptions, 1-4 column support
- **Features**: Multiple layout options for showcasing product/service features
- **Accordions**: Dynamic FAQ display with category filtering, search, schema.org support
- **Latest Posts**: Dynamic or manual post displays with category filtering
- **Content Blocks**: Multi-column rich text (1/3, 1/2, 2/3, full width)
- **Media Blocks**: Image uploads with captions and links
- **CTAs**: Rich call-to-action blocks with styled buttons
- **Forms**: Embeddable forms with Lexical rich text confirmations
- **And more**: Banners, code blocks, quotes, conclusions, breadcrumbs

### 🎨 Styling System
- **Tailwind CSS v4**: Latest version with native CSS cascade layers
- **UntitledUI Components**: Complete design system with accessibility built-in (react-aria-components)
- **CSS Variable Theme**: Centralized theme management with light/dark mode support
- **Brand Colors**: Customizable primary (#031A43) and accent (#1689FF) colors
- **Typography System**: Comprehensive type scale with responsive sizing
- **Responsive Design**: Mobile-first approach with container queries

### 🖼️ Media Management
- **Vercel Blob Storage**: Cloud storage integration
- **8 Preset Sizes**: Automatic resizing (thumbnail, card, mobile, small, medium, large, xlarge, OG)
- **WebP Optimization**: Automatic format conversion with quality optimization
- **Focal Point Selection**: Smart cropping for responsive images
- **OptimizedImage Component**: Automatic Payload Media + Next.js Image integration
- **Alt Text Enforcement**: Required alt text for accessibility

### 🔍 SEO & Performance
- **SEO Plugin**: Automated meta tags, Open Graph, Twitter Cards
- **Sitemap Generation**: Automatic XML sitemap via next-sitemap
- **Search Integration**: Full-text search on posts and content
- **ISR Support**: Incremental Static Regeneration with revalidation hooks
- **Schema.org Markup**: FAQ schema support for rich snippets
- **Speed Insights**: Vercel Speed Insights integration

### 👨‍💻 Developer Experience
- **TypeScript**: Strict type checking with auto-generated Payload types
- **Testing**: Vitest (integration) + Playwright (E2E)
- **Database Migrations**: Development auto-sync + production migration system
- **Hot Reload**: Fast refresh in development
- **Admin Customization**: Custom branding, before login/dashboard components
- **Row Labels**: Admin UX improvements for identifying array items
- **Collapsible Fields**: Reduce admin panel clutter with grouped fields

## 🛠️ Tech Stack

### Frontend
- **[Next.js 15.4.4](https://nextjs.org/)** - React framework with App Router
- **[React 19.1](https://react.dev/)** - UI library
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[UntitledUI](https://www.untitledui.com/)** - Component library based on react-aria-components
- **[Motion](https://motion.dev/)** - Animation library

### Backend
- **[Payload CMS 3.59](https://payloadcms.com/)** - Headless CMS
- **[Vercel Postgres](https://vercel.com/storage/postgres)** - Production database (or Neon Postgres)
- **[Drizzle ORM](https://orm.drizzle.team/)** - TypeScript ORM
- **[Vercel Blob Storage](https://vercel.com/storage/blob)** - File storage

### Plugins
- **Form Builder** - Drag-and-drop form creation
- **Nested Docs** - Hierarchical page and category structures
- **Redirects** - URL redirect management
- **SEO** - Meta tag and Open Graph automation
- **Search** - Full-text search capabilities
- **Lexical Editor** - Rich text editing

### Developer Tools
- **TypeScript 5.7** - Type safety
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Vitest** - Unit and integration testing
- **Playwright** - End-to-end testing
- **pnpm** - Fast, disk-efficient package manager

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.20.2+ or 20.9.0+
- **pnpm** 10.17.1+ (recommended) or npm/yarn
- **PostgreSQL** (local or cloud)
- **Vercel Account** (for Blob Storage in production)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd tds-website-200925
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   # Database (required)
   POSTGRES_URL=postgresql://user:password@localhost:5432/tds_website

   # Payload (required)
   PAYLOAD_SECRET=your-secret-key-min-32-characters
   NEXT_PUBLIC_SERVER_URL=http://localhost:3000

   # Vercel Blob Storage (required for media uploads)
   BLOB_READ_WRITE_TOKEN=your-vercel-blob-token

   # Preview & Cron (optional)
   PREVIEW_SECRET=your-preview-secret
   CRON_SECRET=your-cron-secret

   # Email (optional - for Resend integration)
   RESEND_API_KEY=your-resend-api-key
   ```

   See [ENVIRONMENT.md](docs/ENVIRONMENT.md) for detailed configuration guide.

4. **Set up local database (optional - using Docker)**
   ```bash
   docker-compose up -d
   ```

   This starts a PostgreSQL database at `localhost:5432`

5. **Start development server**
   ```bash
   pnpm dev
   ```

   The application will be available at:
   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

   **Important**: On first run, Payload will auto-sync the database schema. Wait for the "✓ Schema synchronized" message before proceeding.

6. **Create your first admin user**

   Navigate to http://localhost:3000/admin and create your admin account.

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `POSTGRES_URL` | ✅ | PostgreSQL connection string |
| `PAYLOAD_SECRET` | ✅ | JWT encryption key (min 32 chars) |
| `NEXT_PUBLIC_SERVER_URL` | ✅ | Public-facing URL (no trailing slash) |
| `BLOB_READ_WRITE_TOKEN` | ✅ | Vercel Blob Storage access token |
| `PREVIEW_SECRET` | ⚠️ | Draft preview authentication |
| `CRON_SECRET` | ⚠️ | Vercel cron job authentication |
| `RESEND_API_KEY` | ❌ | Email sending via Resend |

See [docs/ENVIRONMENT.md](docs/ENVIRONMENT.md) for complete setup instructions.

## 📁 Project Structure

```
tds-website-200925/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── (frontend)/          # Public-facing pages
│   │   └── (payload)/           # Admin panel routes
│   ├── blocks/                   # Page builder blocks (18+ blocks)
│   │   ├── HeroHeadingBlock/
│   │   ├── CallToAction/
│   │   ├── CardGridBlock/
│   │   ├── AccordionBlock/
│   │   └── ...
│   ├── collections/              # Payload collections
│   │   ├── Pages/               # Page builder with layouts
│   │   ├── Posts/               # Blog posts
│   │   ├── FAQs/                # FAQ management
│   │   ├── Media/               # Image uploads
│   │   ├── Categories/          # Taxonomy
│   │   └── Users/               # Authentication
│   ├── components/              # React components
│   │   ├── uui/                 # UntitledUI components
│   │   └── ...
│   ├── fields/                  # Reusable Payload field configs
│   ├── hooks/                   # Payload hooks
│   ├── utilities/               # Helper functions
│   ├── styles/                  # Styling system
│   │   ├── theme.css            # CSS variables (@theme block)
│   │   ├── frontend.css         # Tailwind v4 base
│   │   └── payloadStyles.css    # Admin panel styles
│   ├── Header/                  # Header global
│   ├── Footer/                  # Footer global
│   ├── payload.config.ts        # Main Payload configuration
│   └── payload-types.ts         # Auto-generated types
├── docs/                        # Comprehensive documentation (30+ files)
│   ├── STYLING_SYSTEM.md        # Theme & styling guide
│   ├── DATABASE_MIGRATIONS.md   # Migration workflow
│   ├── BLOG_IMPLEMENTATION.md   # Blog system guide
│   └── ...
├── public/                      # Static assets
├── tests/                       # Test suites
├── next.config.js              # Next.js configuration
├── payload.config.ts           # Payload CMS configuration
└── package.json                # Dependencies and scripts
```

## 📜 Available Scripts

### Development
```bash
pnpm dev              # Start development server (auto-syncs DB schema)
pnpm build            # Build for production
pnpm start            # Start production server
pnpm dev:prod         # Build and run production locally
```

### Code Quality
```bash
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint issues automatically
pnpm generate:types   # Generate Payload TypeScript types
```

### Testing
```bash
pnpm test             # Run all tests (integration + E2E)
pnpm test:int         # Run integration tests (Vitest)
pnpm test:e2e         # Run E2E tests (Playwright)
```

### Database (Production Only)
```bash
pnpm payload migrate:create   # Create migration (before deploying schema changes)
pnpm payload migrate          # Run migrations (Vercel auto-runs this)
```

**⚠️ Important**: Never run migrations in development! Use `pnpm dev` for auto-sync. See [docs/DATABASE_MIGRATIONS.md](docs/DATABASE_MIGRATIONS.md) for critical workflow rules.

### Docker (Optional)
```bash
docker-compose up -d   # Start local PostgreSQL database
docker-compose down    # Stop database
```

## 📚 Collections

Access the admin panel at `/admin` to manage these collections:

### Pages (`/admin/collections/pages`)
Full-featured page builder with:
- 18+ drag-and-drop content blocks
- Hierarchical organization with breadcrumbs
- Draft/publish workflow with scheduling
- Live preview with responsive breakpoints
- SEO metadata and Open Graph
- Version history (50 versions)

**Frontend URL**: `/{slug}` or `/{parent}/{child}` (hierarchical)

### Posts (`/admin/collections/posts`)
Rich blog system with:
- Lexical rich text editor
- Hero images with focal point selection
- Author and contributor relationships
- Category taxonomy
- Related posts
- Table of contents (auto or manual)
- Scheduled publishing
- SEO optimization

**Frontend URL**: `/news-insights/{slug}`

### FAQs (`/admin/collections/faqs`)
Knowledge base management with:
- Rich text answers
- Category organization
- Related content linking
- Downloadable resources
- Featured marking
- Sort ordering
- Schema.org FAQPage support

**Used in**: AccordionBlock (dynamic or manual display)

### Media (`/admin/collections/media`)
Image management with:
- Image-only uploads
- 8 automatic resize presets
- Focal point selection for crops
- WebP optimization
- Alt text enforcement
- Filename sanitization
- Vercel Blob Storage

**Upload URL**: `/admin/collections/media`

### Categories (`/admin/collections/categories`)
Hierarchical taxonomy for:
- Post organization
- FAQ categorization
- Nested category structures
- Category-based filtering on frontend

**Admin URL**: `/admin/collections/categories`

### Users (`/admin/collections/users`)
Authentication and profiles:
- Admin access control
- Author profiles with display names
- Avatar support
- Role management

**Admin URL**: `/admin/collections/users`

## 🧩 Page Builder Blocks

### Hero & Headers
- **HeroHeadingBlock** - 3 layout variants, typewriter animation, custom backgrounds, CTA buttons

### Content & Text
- **Content** - Multi-column rich text (1/3, 1/2, 2/3, full width) with optional links
- **Quote** - Testimonial blocks with author attribution
- **Conclusion** - Dedicated conclusion sections for articles

### Features & Cards
- **CardGridBlock** - Flexible card layouts (5 styles), icons, 1-4 columns, internal links
- **FeaturesBlock** - Feature showcases with multiple layout options

### Interactive
- **AccordionBlock** - Dynamic/manual FAQ display, category filtering, search UI, schema support
- **LatestPostsBlock** - Dynamic/manual post displays with filtering and "View All" button

### Media & Visual
- **MediaBlock** - Image uploads with captions and links
- **BreadcrumbBlock** - Navigation breadcrumbs

### Actions
- **CallToAction** - Rich text with styled CTA buttons, spacing control
- **ButtonBlock** - Standalone button collections (horizontal/vertical layout)
- **FormBlock** - Embeddable forms from Form Builder plugin

### Utility
- **Banner** - Info/Warning/Error/Success styled alerts
- **Code** - Syntax-highlighted code blocks (TypeScript, JavaScript, CSS)
- **ArchiveBlock** - Blog listings by collection or manual selection

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Connect your GitHub repository
   - Vercel auto-detects Next.js configuration

3. **Add Environment Variables**
   - Add all required variables from `.env` to Vercel project settings
   - Get `BLOB_READ_WRITE_TOKEN` from Vercel Storage dashboard

4. **Deploy**
   - Vercel automatically builds and deploys
   - Build command: `pnpm ci` (runs migrations + build)

### Database Migration Workflow

**Development** (Local):
- Schema changes auto-sync when running `pnpm dev`
- Wait for "✓ Schema synchronized" message
- Never run migration commands locally

**Production** (Vercel):
1. Stop dev server
2. Run `pnpm payload migrate:create` to generate migration files
3. Review generated SQL in `src/migrations/`
4. Commit and push migration files
5. Vercel runs migrations automatically via `pnpm ci` command

**⚠️ Critical**: Read [docs/DATABASE_MIGRATIONS.md](docs/DATABASE_MIGRATIONS.md) for complete workflow and troubleshooting.

### Preview Deployments

For database branching strategy with preview deployments, see [docs/DATABASE_PREVIEW_STRATEGY.md](docs/DATABASE_PREVIEW_STRATEGY.md).

## 📖 Documentation

This project includes comprehensive documentation in the `/docs` folder:

### Essential Reads
- **[STYLING_SYSTEM.md](docs/STYLING_SYSTEM.md)** - CSS variable theme system (read before any style changes)
- **[DATABASE_MIGRATIONS.md](docs/DATABASE_MIGRATIONS.md)** - Critical migration workflow rules
- **[CLAUDE.md](CLAUDE.md)** - AI agent instructions and quick reference

### Styling & UI
- [BUTTON_SYSTEM.md](docs/BUTTON_SYSTEM.md) - Button variants and configuration
- [STYLE_GUIDE.md](docs/STYLE_GUIDE.md) - Visual reference for design system
- [STYLING_BEST_PRACTICES.md](docs/STYLING_BEST_PRACTICES.md) - Site-wide consistency patterns
- [IMAGES.md](docs/IMAGES.md) - OptimizedImage component usage

### Database & Deployment
- [DATABASE_TROUBLESHOOTING.md](docs/DATABASE_TROUBLESHOOTING.md) - Common errors and fixes
- [DATABASE_PREVIEW_STRATEGY.md](docs/DATABASE_PREVIEW_STRATEGY.md) - Neon branching workflow
- [ENVIRONMENT.md](docs/ENVIRONMENT.md) - Environment variable setup

### Development
- [TYPESCRIPT_PATTERNS.md](docs/TYPESCRIPT_PATTERNS.md) - TypeScript best practices
- [ROW_LABELS.md](docs/ROW_LABELS.md) - Admin UX improvements
- [COLLAPSIBLE_FIELDS.md](docs/COLLAPSIBLE_FIELDS.md) - Reducing admin clutter

### Features
- [BLOG_IMPLEMENTATION.md](docs/BLOG_IMPLEMENTATION.md) - Blog system with category filtering
- [ACCORDION_SYSTEM.md](docs/ACCORDION_SYSTEM.md) - FAQ/Accordion implementation
- [FAQ_SCHEMA_IMPLEMENTATION.md](docs/FAQ_SCHEMA_IMPLEMENTATION.md) - Schema.org structured data

### Interactive Style Guide

Visit `/style-guide` on your local or deployed instance to see an interactive showcase of all UI components, typography, colors, and spacing.

## 🧪 Testing

### Integration Tests (Vitest)
```bash
pnpm test:int
```

Tests UI components and utility functions using jsdom environment.

### End-to-End Tests (Playwright)
```bash
pnpm test:e2e
```

Tests complete user flows and page interactions in real browser environments.

### Type Checking
```bash
pnpm generate:types
```

Auto-generates TypeScript types from Payload collections to `src/payload-types.ts`.

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Code Style**: Run `pnpm lint:fix` before committing
2. **Type Safety**: Ensure `pnpm generate:types` passes
3. **Testing**: Add tests for new features
4. **Documentation**: Update relevant docs in `/docs` folder
5. **Styling**: Follow [STYLING_BEST_PRACTICES.md](docs/STYLING_BEST_PRACTICES.md)
6. **Migrations**: Read [DATABASE_MIGRATIONS.md](docs/DATABASE_MIGRATIONS.md) before schema changes

## 📄 License

This project is licensed under the MIT License.

## 💬 Support

For questions, issues, or feature requests:

- 📧 Email: [ian@thedigitalstride.co.uk]
- 🐛 Issues: [GitHub Issues](https://github.com/thedigitalstride/tds-website-200925/issues)
- 📚 Docs: See `/docs` folder for comprehensive guides

---

**Built with ❤️ using [Payload CMS](https://payloadcms.com/) and [Next.js](https://nextjs.org/)**
