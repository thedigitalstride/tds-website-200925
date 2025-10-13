# Style Guide Access Control

## 📋 Overview

The `/style-guide` route is a comprehensive design system reference that includes all blocks, components, and styling patterns used in this Payload CMS template.

**This route is automatically excluded from production builds** to keep internal documentation private while maintaining it in the repository for development and testing purposes.

---

## 🔒 Access Rules

### ✅ **Accessible In:**

1. **Local Development** (`npm run dev` or `pnpm dev`)
   - Full access to style guide at `http://localhost:3000/style-guide`
   - Hot reload enabled for rapid iteration

2. **Preview Deployments** (Vercel preview branches)
   - Access at `https://your-branch-name.vercel.app/style-guide`
   - Perfect for sharing design reviews with team
   - Testing changes before production

### ❌ **Blocked In:**

1. **Production Deployments** (main branch on Vercel)
   - Returns 404 Not Found
   - Route is hidden from public users
   - Keeps internal documentation private

---

## 🛠️ How It Works

### Middleware Protection

The style guide is protected via Next.js middleware ([src/middleware.ts](src/middleware.ts)):

```typescript
export function middleware(request: NextRequest) {
  const isProduction = process.env.NODE_ENV === 'production' &&
                       process.env.VERCEL_ENV === 'production'

  if (isProduction) {
    const devRoutes = ['/style-guide', '/test-header']

    if (devRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
      return new NextResponse('Not Found', { status: 404 })
    }
  }

  return NextResponse.next()
}
```

### Environment Detection

- **`NODE_ENV`**: Set by Next.js (`development` | `production`)
- **`VERCEL_ENV`**: Set by Vercel (`production` | `preview` | `development`)

**Protection triggers only when BOTH are `production`**, ensuring preview deployments remain accessible.

---

## 🔧 Override (Not Recommended)

If you need to temporarily enable the style guide in production:

1. Add environment variable in Vercel dashboard:
   ```
   ENABLE_STYLE_GUIDE_IN_PRODUCTION=true
   ```

2. Update middleware to check this variable:
   ```typescript
   const forceEnable = process.env.ENABLE_STYLE_GUIDE_IN_PRODUCTION === 'true'
   if (isProduction && !forceEnable) {
     // block route
   }
   ```

⚠️ **Warning**: This exposes internal design documentation publicly.

---

## 📁 Files Included in Repo

All style guide files remain in version control:

```
src/app/(frontend)/style-guide/
├── page.tsx                      # Main style guide page
├── BlocksSection.tsx             # Payload blocks showcase
├── AdvancedComponentsSection.tsx # UUI components
├── FormElementsSection.tsx       # Form fields
├── PayloadPatternsSection.tsx    # Admin patterns
└── StylingSystemSection.tsx      # Theme architecture
```

**Benefits:**
- ✅ Team members can reference design system
- ✅ Changes are tracked in git history
- ✅ Preview deployments show updates
- ✅ No separate documentation site needed
- ✅ Production stays clean and private

---

## 🎯 Use Cases

### For Developers
- Reference block configurations
- Check component variants
- Understand styling system
- Copy code examples

### For Designers
- Visual component reference
- Color and typography scales
- Spacing and layout patterns
- Dark mode behavior

### For QA/Testing
- Preview deployments for design review
- Verify component states
- Test responsive behavior
- Validate accessibility

---

## 🚀 Quick Access

**Development:**
```bash
pnpm dev
# Visit http://localhost:3000/style-guide
```

**Preview Deployment:**
```bash
git checkout -b feature/my-changes
git push origin feature/my-changes
# Visit Vercel preview URL + /style-guide
```

---

## 📝 Adding More Protected Routes

To protect additional internal routes, update [src/middleware.ts](src/middleware.ts):

```typescript
const devRoutes = [
  '/style-guide',
  '/test-header',
  '/internal-docs',  // Add new routes here
  '/design-tokens'
]

export const config = {
  matcher: [
    '/style-guide/:path*',
    '/test-header/:path*',
    '/internal-docs/:path*',  // Add matchers here
    '/design-tokens/:path*'
  ]
}
```

---

## ✨ Summary

The style guide provides a comprehensive reference for the entire design system while remaining **private in production**. It's accessible during development and on preview deployments, making it perfect for team collaboration without exposing internal documentation to end users.

**Files in repo ✅ | Accessible in production ❌**
