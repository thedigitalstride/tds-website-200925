# Image Upload & Optimization Guide

## Overview

This project uses **Payload CMS** with **Sharp** for image processing and **Vercel Blob Storage** for file storage.

---

## ⚠️ IMPORTANT: Start Here

**Before reading this entire guide**, you need to test whether WebP conversion is working:

👉 **[WEBP_TESTING_GUIDE.md](./WEBP_TESTING_GUIDE.md)** - Complete testing instructions

This guide explains:
- How to properly test WebP conversion
- Whether you need the manual conversion workaround
- Step-by-step troubleshooting

**Come back to this document** after confirming WebP conversion status.

---

## How Image Processing Works

### Processing Pipeline

**Standard Path (formatOptions working):**
```
Upload → Payload Core → Sharp Processing → Vercel Blob Storage
                        (formatOptions)      (Storage)

1. Original file uploaded
2. Payload applies formatOptions (WebP conversion)
3. Sharp generates multiple sized variants
4. All WebP files stored in Blob Storage
```

**Workaround Path (if formatOptions don't work):**
```
Upload → beforeOperation Hook → Sharp Processing → Vercel Blob Storage
         (Manual conversion)     (Resize variants)   (Storage)

1. Original file uploaded
2. beforeOperation hook manually converts to WebP
3. Sharp generates multiple sized variants
4. All WebP files stored in Blob Storage
```

### Key Components

| Component | Purpose | Location |
|-----------|---------|----------|
| **Sharp** | Image processing library | [payload.config.ts:98](../src/payload.config.ts#L98) |
| **formatOptions** | Convert images to WebP | [Media.ts:142-148](../src/collections/Media.ts#L142-L148) |
| **resizeOptions** | Resize original file | [Media.ts:150-153](../src/collections/Media.ts#L150-L153) |
| **imageSizes** | Generate responsive variants | [Media.ts:55-138](../src/collections/Media.ts#L55-L138) |
| **Vercel Blob Storage** | File storage adapter | [payload.config.ts:86-95](../src/payload.config.ts#L86-L95) |

---

## Current Configuration

### ✅ What IS Working

1. **WebP Conversion**: All uploaded images are automatically converted to WebP format
2. **Quality Optimization**: Images compressed at 85% quality (good balance)
3. **Multiple Sizes**: 8 responsive variants generated:
   - `thumbnail`: 300px wide
   - `square`: 500×500px (cropped)
   - `card-mobile`: 400px wide
   - `small`: 600px wide
   - `medium`: 900px wide
   - `large`: 1400px wide
   - `xlarge`: 1920px wide
   - `og`: 1200×630px (social media)

4. **Filename Sanitization**: Automatic cleanup of uploaded filenames
5. **Alt Text Validation**: Required for new uploads (accessibility)

### ⚠️ Important Limitations

#### Server Upload Limit: 4.5MB

**Why?** Vercel serverless functions have a 4.5MB request body limit.

**What happens if users try to upload larger files?**
- Upload will fail with a size error
- Users must compress images before uploading

**Solutions for users:**
- Use online tools like TinyPNG, Squoosh, or Photoshop's "Save for Web"
- Resize images to reasonable dimensions before upload
- Most photos don't need to be >4000px wide

---

## Configuration Details

### formatOptions (WebP Conversion)

Located in [Media.ts:142-148](../src/collections/Media.ts#L142-L148):

```typescript
formatOptions: {
  format: 'webp',
  options: {
    quality: 85, // 0-100, higher = better quality, larger file
    effort: 4,   // 0-6, higher = better compression, slower processing
  },
}
```

**Settings Explained:**
- `quality: 85`: Sweet spot for web images (imperceptible quality loss, significant size reduction)
- `effort: 4`: Moderate compression effort (good balance between speed and size)

**When to adjust:**
- **Increase quality** (90-95) for hero images, product photos
- **Decrease quality** (70-80) for thumbnails, background images
- **Increase effort** (5-6) for critical images where every KB matters

### resizeOptions (Original File Processing)

Located in [Media.ts:150-153](../src/collections/Media.ts#L150-L153):

```typescript
resizeOptions: {
  fit: 'inside',              // Preserve aspect ratio
  withoutEnlargement: true,   // Don't upscale small images
}
```

**Settings Explained:**
- `fit: 'inside'`: Image fits within dimensions without cropping
- `withoutEnlargement`: Prevents making small images blurry by upscaling

**Alternative fit modes:**
- `cover`: Crop to fill dimensions (use for fixed aspect ratios)
- `contain`: Letterbox to fit (adds padding)
- `fill`: Stretch to fit (distorts image - avoid)

### imageSizes (Responsive Variants)

Each size generates a separate optimized file:

```typescript
{
  name: 'medium',           // Used in code: resource.sizes.medium.url
  width: 900,               // Target width in pixels
  position: 'centre',       // Crop focal point (for fixed aspect ratios)
  fit: 'cover',            // Optional: override default fit mode
  admin: {                  // Optional: hide from admin UI
    disableGroupBy: true,
    disableListFilter: true,
  },
}
```

**Best Practices:**
1. **Include height only when cropping** (e.g., `og` size for social cards)
2. **Omit height to preserve aspect ratio** (most cases)
3. **Use descriptive names** that match your frontend code
4. **Hide utility sizes** from admin UI to reduce clutter

---

## Important: clientUploads Setting

### Current Configuration

Located in [payload.config.ts:94](../src/payload.config.ts#L94):

```typescript
clientUploads: false
```

### ⚠️ CRITICAL: Do NOT Change This Without Understanding

| Setting | Image Processing | Upload Limit | Use Case |
|---------|-----------------|--------------|----------|
| `clientUploads: false` | ✅ Full Sharp processing<br>✅ WebP conversion<br>✅ formatOptions work<br>✅ resizeOptions work | ❌ 4.5MB max | **Recommended**<br>Best optimization |
| `clientUploads: true` | ❌ No original processing<br>❌ WebP conversion skipped<br>❌ formatOptions ignored<br>⚠️ Only imageSizes processed | ✅ No limit | Only if you need >4.5MB uploads |

**If you need to upload files >4.5MB**, you have two options:

1. **Keep optimization, educate users**: Add admin UI messaging about file size limits
2. **Disable optimization, allow large files**: Change to `clientUploads: true` (NOT RECOMMENDED)

---

## Frontend Image Usage

### OptimizedImage Component

Located in [ImageMedia/index.tsx:26-119](../src/components/Media/ImageMedia/index.tsx#L26-L119)

**Key Feature**: Automatically selects optimal image size based on usage:

```typescript
// For blob storage URLs, manually select the optimal Payload-generated size
if (isBlobStorage && resource && typeof resource === 'object' && resource.sizes) {
  const optimalUrl = getOptimalPayloadImageUrl(resource, sizeFromProps)
  if (optimalUrl) {
    src = getMediaUrl(optimalUrl, resource.updatedAt)
  }
}
```

**Usage:**

```tsx
<Media
  resource={post.heroImage}
  size="medium"  // Requests 900px variant
  priority={true} // Above-fold: skip animation
/>
```

### Available Sizes in Code

| Size | Width | Use For |
|------|-------|---------|
| `thumbnail` | 300px | Admin thumbnails, tiny previews |
| `square` | 500×500px | Avatar crops, gallery squares |
| `card-mobile` | 400px | Mobile card images |
| `small` | 600px | Small feature images |
| `medium` | 900px | Default content images |
| `large` | 1400px | Hero images, full-width banners |
| `xlarge` | 1920px | Full-screen backgrounds |
| `og` | 1200×630px | Social media cards |

---

## Testing Image Optimization

### 1. Upload a Test Image

1. Go to `/admin/collections/media`
2. Upload a PNG or JPEG image
3. Check the file details in the admin panel

### 2. Verify WebP Conversion

**Expected Results:**
- Original file: `filename.webp` (converted from .png/.jpg)
- Thumbnail: `filename-300x0.webp`
- Medium: `filename-900x0.webp`
- Large: `filename-1400x0.webp`

**If you see `.png` or `.jpg` files:**
- ❌ Sharp processing is NOT working
- Check that `clientUploads: false` in payload.config.ts
- Restart dev server after config changes

### 3. Check File Sizes

**Expected reductions:**
- PNG to WebP: ~60-80% smaller
- JPEG to WebP: ~25-35% smaller

**Example:**
- Original PNG: 2.5MB
- After WebP conversion: 500-800KB
- Medium size (900px): 100-200KB

### 4. Verify in Browser

1. Open frontend page with images
2. Open DevTools → Network tab
3. Filter by `Img`
4. Check:
   - ✅ All images are `.webp` format
   - ✅ Correct sizes are being loaded (900px for medium, etc.)
   - ✅ File sizes are reasonable (<200KB for most images)

---

## Troubleshooting

### Images Not Converting to WebP

**👉 See [WEBP_TESTING_GUIDE.md](./WEBP_TESTING_GUIDE.md) for complete troubleshooting steps.**

Quick checklist:
1. **Restart dev server** with cache cleared: `rm -rf .next && pnpm dev`
2. **Upload a NEW image** (not re-upload)
3. **Check filename** in `/admin/collections/media`
4. **If still JPG/PNG**, follow the testing guide to enable the workaround hook

### Upload Fails with "File Too Large"

**Symptom**: Error when uploading images >4.5MB

**Solution:**
1. **Best practice**: Compress image before upload
2. **Quick fix**: Resize image to reasonable dimensions (e.g., 2000px wide)
3. **Last resort**: Set `clientUploads: true` (disables optimization)

### Images Look Blurry

**Symptom**: Low quality after upload

**Possible causes:**
1. **Quality setting too low**: Increase `quality` in formatOptions (try 90)
2. **Upscaling small images**: Check source image dimensions
3. **Using wrong size**: Verify frontend uses appropriate image size

**Solution:**

```typescript
// In Media.ts
formatOptions: {
  format: 'webp',
  options: {
    quality: 90, // Increase from 85
    effort: 5,   // More compression effort
  },
}
```

### Sizes Not Being Generated

**Symptom**: Only original file uploaded, no thumbnails/variants

**Check:**
1. Sharp installed: `pnpm list sharp` (should show version)
2. Sharp in config: [payload.config.ts:98](../src/payload.config.ts#L98)
3. imageSizes defined: [Media.ts:55-138](../src/collections/Media.ts#L55-L138)

---

## Performance Best Practices

### 1. Use Appropriate Sizes

```tsx
// ❌ Bad: Loading xlarge (1920px) for a 300px thumbnail
<Media resource={post.heroImage} size="xlarge" />

// ✅ Good: Loading medium (900px) for content area
<Media resource={post.heroImage} size="medium" />
```

### 2. Set Priority for Above-Fold Images

```tsx
// Hero image (immediately visible)
<Media resource={page.hero} priority={true} />

// Below-fold image (lazy load)
<Media resource={post.image} priority={false} />
```

### 3. Specify Sizes Prop for Responsive Images

```tsx
<Media
  resource={image}
  size="(max-width: 768px) 400px, 900px"
/>
```

### 4. Use Square Crops for Fixed Dimensions

```tsx
// For circular avatars, gallery grids, etc.
<Media resource={user.avatar} size="square" />
```

---

## When to Adjust Settings

### Increase Quality (90-95)

**Use for:**
- Hero images
- Product photography
- Print-quality downloads
- Client portfolios

**Trade-off:** Larger file sizes (~30% increase)

### Decrease Quality (70-80)

**Use for:**
- Thumbnails
- Background images
- Decorative graphics
- High-traffic pages (every KB matters)

**Trade-off:** Slight quality loss (usually imperceptible)

### Add New Image Sizes

**When to add:**
- Specific design requirements (e.g., 16:9 aspect ratio)
- New component needs (e.g., carousel cards)
- Performance optimization (smaller size for specific use case)

**Example:**

```typescript
{
  name: 'carousel-card',
  width: 350,
  height: 500,
  fit: 'cover',
  position: 'centre',
}
```

---

## Related Documentation

- [IMAGES.md](./IMAGES.md) - OptimizedImage component usage
- [DATABASE_MIGRATIONS.md](./DATABASE_MIGRATIONS.md) - Schema changes for Media collection
- [ENVIRONMENT.md](./ENVIRONMENT.md) - Blob Storage token configuration

---

## Quick Reference

### File Locations

| Component | File Path |
|-----------|-----------|
| Media Collection | [src/collections/Media.ts](../src/collections/Media.ts) |
| Payload Config | [src/payload.config.ts](../src/payload.config.ts) |
| Image Component | [src/components/Media/ImageMedia/index.tsx](../src/components/Media/ImageMedia/index.tsx) |
| Size Utility | [src/utilities/getPayloadImageSize.ts](../src/utilities/getPayloadImageSize.ts) |

### Environment Variables

```bash
BLOB_READ_WRITE_TOKEN=vercel_blob_xxx  # Required for Vercel Blob Storage
```

### Admin URLs

- Media Library: `/admin/collections/media`
- Upload New Image: `/admin/collections/media/create`
- View Image Details: `/admin/collections/media/:id`
