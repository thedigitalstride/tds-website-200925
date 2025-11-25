# Image Optimization Guide

This document describes the image handling system in this Payload CMS project, including best practices for performance optimization and the custom `OptimizedImage` component.

## Overview

This project uses a custom `OptimizedImage` component that intelligently handles both Payload Media resources and external images, providing automatic optimization while maintaining UUI component compatibility.

## Payload CMS Best Practices Implementation

This project follows **Payload CMS 3.x best practices** for image handling:

### ✅ Implemented Best Practices

1. **Sharp Integration** - Image processing library configured in [payload.config.ts:95](../src/payload.config.ts#L95)
2. **Image Size Configuration** - All sizes include `position: 'centre'` and `fit` properties for focal point support
3. **MIME Type Restriction** - Upload collection restricted to `image/*` types only
4. **WebP Optimization** - Automatic WebP conversion with 85% quality for optimal file size
5. **Focal Point Selection** - Enabled for editorial control over image cropping
6. **Default Populate Optimization** - Only essential fields populated in relationships to reduce payload size
7. **Admin UI Optimization** - Less relevant image sizes hidden from list views, filters, and group-by options
8. **Filename Sanitization** - Automatic cleanup via `beforeOperation` hook (lowercase, special characters removed)
9. **Required Alt Text** - Enforced for accessibility compliance
10. **Vercel Blob Storage** - Configured with `clientUploads: true` to bypass 4.5MB server limit

### 📊 Performance Impact

- **Reduced API Payload**: `defaultPopulate` reduces Media object size by ~60%
- **Faster Admin Panel**: Hidden image sizes improve list view performance
- **Better SEO**: Required alt text ensures accessibility
- **Cleaner URLs**: Sanitized filenames prevent encoding issues

## Architecture

```
Image Handling Flow:
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│  OptimizedImage │───▶│ Payload Resource?│───▶│   ImageMedia    │
│    Component    │    │                  │    │   Component     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │ No                        │
                                ▼                           ▼
                       ┌──────────────────┐    ┌─────────────────┐
                       │  Next.js Image   │    │   Optimized     │
                       │    Component     │    │    Output       │
                       └──────────────────┘    └─────────────────┘
```

## OptimizedImage Component

### Location
`/src/components/OptimizedImage/index.tsx`

### Purpose
- **Intelligent Routing**: Automatically uses `ImageMedia` for Payload resources or Next.js `Image` for external URLs
- **Performance**: Provides lazy loading, blur placeholders, and responsive images
- **Compatibility**: Maintains UUI component styling and behavior
- **Type Safety**: Full TypeScript support with proper interfaces

### Usage

#### Basic Usage
```tsx
import { OptimizedImage } from '@/components/OptimizedImage'

// External URL
<OptimizedImage
  src="https://example.com/image.jpg"
  alt="Description"
  width={400}
  height={300}
  className="rounded-lg"
/>

// Payload Media Resource
<OptimizedImage
  resource={mediaResource}
  alt="Description"
  className="rounded-lg"
/>
```

#### Advanced Usage
```tsx
<OptimizedImage
  src="https://example.com/hero.jpg"
  alt="Hero image"
  className="w-full h-64 object-cover"
  width={800}
  height={400}
  priority={true}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  placeholder="blur"
/>
```

### Props Interface

```tsx
export interface OptimizedImageProps {
  // Image source - can be external URL, static import, or Payload Media resource
  src?: string | StaticImageData
  resource?: Media

  // Standard img attributes
  alt: string
  className?: string

  // Next.js Image optimization props
  width?: number
  height?: number
  priority?: boolean
  loading?: 'lazy' | 'eager'
  sizes?: string
  fill?: boolean
  quality?: number

  // Additional styling
  pictureClassName?: string

  // Blur placeholder
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
}
```

## Configuration

### Next.js Image Domains

External image domains are configured in `next.config.js`:

```javascript
// next.config.js
images: {
  remotePatterns: [
    // ... existing patterns
    {
      hostname: 'www.untitledui.com',
      protocol: 'https',
    },
    {
      hostname: 'raw.githubusercontent.com',
      protocol: 'https',
    },
    // Add new external domains here
  ],
}
```

### Adding New External Domains

When adding images from new external sources:

1. **Update Next.js Configuration**:
   ```javascript
   {
     hostname: 'your-cdn.example.com',
     protocol: 'https',
   }
   ```

2. **Restart Development Server**: Next.js requires restart after config changes

## Best Practices

### 1. Choose the Right Approach

#### Use Payload Media When:
- Images are managed by content editors
- Need focal point selection
- Require multiple sizes/crops
- Want automatic optimization through Payload
- Images are part of CMS content

#### Use External URLs When:
- Static assets (logos, icons, illustrations)
- Third-party CDN assets
- Design system components
- Marketing materials from external sources

### 2. Performance Optimization

#### Image Dimensions
```tsx
// ✅ Good - Explicit dimensions prevent layout shift
<OptimizedImage
  src="/hero.jpg"
  alt="Hero"
  width={800}
  height={400}
  className="w-full h-auto"
/>

// ❌ Bad - No dimensions cause layout shift
<OptimizedImage
  src="/hero.jpg"
  alt="Hero"
  className="w-full h-auto"
/>
```

#### Priority Loading
```tsx
// ✅ Good - Priority for above-the-fold images
<OptimizedImage
  src="/hero.jpg"
  alt="Hero"
  width={800}
  height={400}
  priority={true}
/>

// ✅ Good - Lazy load for below-the-fold images
<OptimizedImage
  src="/feature.jpg"
  alt="Feature"
  width={400}
  height={300}
  priority={false}
/>
```

#### Responsive Images
```tsx
<OptimizedImage
  src="/responsive.jpg"
  alt="Responsive image"
  width={800}
  height={400}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
/>
```

### 3. Payload Media Integration

#### Collection Configuration
```typescript
// collections/Media.ts
export const Media: CollectionConfig = {
  slug: 'media',
  // Optimize relationship fields - only populate essential data
  defaultPopulate: {
    alt: true,
    url: true,
    filename: true,
    mimeType: true,
    width: true,
    height: true,
    sizes: true,
    updatedAt: true,
  },
  upload: {
    // Restrict to image files only
    mimeTypes: ['image/*'],
    focalPoint: true,
    adminThumbnail: 'thumbnail',
    // Configure image sizes for optimization
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        fit: 'cover',
        position: 'centre',
      },
      {
        name: 'card',
        width: 600,
        height: 400,
        fit: 'cover',
        position: 'centre',
        admin: {
          disableGroupBy: true,
          disableListFilter: true,
        },
      },
    ],
    // Enable WebP optimization
    formatOptions: {
      format: 'webp',
      options: {
        quality: 85,
      },
    },
  },
  // Sanitize filenames for better compatibility
  hooks: {
    beforeOperation: [
      ({ req, operation }) => {
        if ((operation === 'create' || operation === 'update') && req.file) {
          const filename = req.file.name
          const sanitized = filename
            .toLowerCase()
            .replace(/[^a-z0-9.]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')
          req.file.name = sanitized
        }
      },
    ],
  },
}
```

#### Usage in Components
```tsx
// Fetch media in page/component
const page = await payload.find({
  collection: 'pages',
  where: { slug: { equals: 'home' } },
})

// Use in component
<OptimizedImage
  resource={page.hero_image}
  alt={page.hero_image?.alt || 'Hero'}
  className="w-full h-64 object-cover"
/>
```

### 4. UUI Component Integration

When creating new UUI components with images:

```tsx
// ✅ Good - Use OptimizedImage
import { OptimizedImage } from '@/components/OptimizedImage'

export const CustomCard = ({ imgSrc, title }) => (
  <div className="card">
    <OptimizedImage
      src={imgSrc}
      alt={title}
      width={300}
      height={200}
      className="card-image"
    />
    <h3>{title}</h3>
  </div>
)

// ❌ Bad - Don't use img tags
export const CustomCard = ({ imgSrc, title }) => (
  <div className="card">
    <img src={imgSrc} alt={title} className="card-image" />
    <h3>{title}</h3>
  </div>
)
```

## Migration Guide

### Replacing Existing `<img>` Tags

1. **Import OptimizedImage**:
   ```tsx
   import { OptimizedImage } from '@/components/OptimizedImage'
   ```

2. **Replace img tag**:
   ```tsx
   // Before
   <img
     src="https://example.com/image.jpg"
     alt="Description"
     className="w-full h-auto"
   />

   // After
   <OptimizedImage
     src="https://example.com/image.jpg"
     alt="Description"
     width={800}
     height={600}
     className="w-full h-auto"
   />
   ```

3. **Add domain to next.config.js** (if external):
   ```javascript
   images: {
     remotePatterns: [
       // ... existing
       {
         hostname: 'example.com',
         protocol: 'https',
       },
     ],
   }
   ```

## Troubleshooting

### Common Issues

#### 1. External Image Not Loading
```
Error: Invalid src prop on `next/image`
```
**Solution**: Add the domain to `next.config.js` and restart dev server.

#### 2. Layout Shift Issues
**Problem**: Images cause content to jump when loading
**Solution**: Always provide `width` and `height` props or use `fill={true}` with proper container.

#### 3. Performance Issues
**Problem**: Images load too slowly
**Solution**:
- Use `priority={true}` for above-the-fold images
- Optimize image sizes in Payload configuration
- Implement proper `sizes` attribute

#### 4. Blur Placeholder Not Working
**Problem**: No blur effect while loading
**Solution**: Ensure `placeholder="blur"` and provide `blurDataURL` or use Payload's automatic blur generation.

### Debug Mode

Enable Next.js image debug logging:

```javascript
// next.config.js
images: {
  // ... existing config
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  // Enable debug logging
  dangerouslyAllowSVG: true,
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
}
```

## Performance Monitoring

### Metrics to Track
- **Largest Contentful Paint (LCP)**: Should improve with image optimization
- **Cumulative Layout Shift (CLS)**: Should be minimal with proper dimensions
- **Total Blocking Time (TBT)**: Should decrease with lazy loading

### Tools
- **Chrome DevTools**: Performance tab and Lighthouse
- **Next.js Bundle Analyzer**: Monitor image impact on bundle size
- **Vercel Analytics**: Track Core Web Vitals in production

## Updates and Maintenance

### When to Update This System
- Next.js major version upgrades
- Payload CMS major version upgrades
- Addition of new image sources or CDNs
- Performance requirements change

### Keeping Documentation Current
- Update examples when adding new image patterns
- Document new external domains as they're added
- Update best practices based on performance learnings
- Maintain troubleshooting section with common issues

## Related Files

- `/src/components/OptimizedImage/index.tsx` - Main component
- `/src/components/Media/ImageMedia/index.tsx` - Payload image component
- `/src/components/Media/index.tsx` - Media wrapper component
- `/src/utilities/getMediaUrl.ts` - Payload media URL utility
- `/next.config.js` - Next.js configuration
- `/src/collections/Media.ts` - Payload media collection config

## See Also

- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [Payload Media Documentation](https://payloadcms.com/docs/upload/overview)
- [UntitledUI Component Documentation](https://untitledui.com/docs)