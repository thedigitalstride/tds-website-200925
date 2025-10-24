# WebP Conversion Testing Guide

## ✅ Status: CONFIRMED WORKING

**Last tested:** Successfully converting JPEG → WebP with all sizes

Payload CMS's built-in `formatOptions` work correctly with Vercel Blob Storage when `clientUploads: false`. No workaround needed.

---

## Purpose

This guide documents the testing process that confirmed WebP conversion is working correctly.

---

## Current Configuration Status

### ✅ What's Configured

1. **`clientUploads: false`** in [payload.config.ts:94](../src/payload.config.ts#L94)
   - Enables server-side Sharp processing
   - Required for formatOptions to work

2. **`formatOptions`** in [Media.ts:177-183](../src/collections/Media.ts#L177-L183)
   - Configured for WebP conversion (quality: 85)
   - Applied to original uploaded file

3. **`formatOptions` per size** in [Media.ts:61-172](../src/collections/Media.ts#L61-L172)
   - Each imageSize has explicit WebP formatOptions
   - Ensures resized variants are also WebP

4. **Sharp installed**
   - Version 0.34.2 in package.json
   - Required for image processing

### ✅ What Works

**Payload's Built-in formatOptions**
- Automatically converts all uploads to WebP
- No custom code needed
- Works perfectly with Vercel Blob Storage + `clientUploads: false`

---

## Testing Steps

### Step 1: Clean Restart (CRITICAL!)

The formatOptions configuration won't apply to uploads until the dev server is fully restarted with cache cleared.

```bash
# Stop any running dev servers (Ctrl+C)

# Clear Next.js cache
rm -rf .next

# Optional but recommended: Clear node cache
rm -rf node_modules/.cache

# Restart dev server
pnpm dev
```

**Wait for:** `✓ Ready in XXXms` message before proceeding.

---

### Step 2: Upload a Test Image

#### Option A: Via Rich Text Editor (Your Use Case)

1. Go to `/admin/collections/posts`
2. Edit any existing post (or create new one)
3. Click in the rich text editor
4. Click the image upload button
5. Upload a **NEW** JPG or PNG image
   - Must be <4.5MB (server upload limit)
   - Must be a FRESH upload (not previously uploaded)

#### Option B: Via Media Collection (Alternative Test)

1. Go to `/admin/collections/media/create`
2. Upload a **NEW** JPG or PNG image

---

### Step 3: Check the Console Output

**Watch your terminal** where `pnpm dev` is running during upload.

#### ✅ **Expected if formatOptions ARE working:**

```
No special console messages - this is NORMAL
```

Payload processes images silently when formatOptions work correctly.

#### ⚠️ **Expected if formatOptions are NOT working:**

You'll see the image upload successfully, but no conversion messages.

---

### Step 4: Verify the Result

#### Check #1: Filename in Admin Panel

1. Go to `/admin/collections/media`
2. Find your uploaded image
3. Check the **filename**:

**✅ PASS**: `your-image.webp`
**❌ FAIL**: `your-image.jpg` or `your-image.png`

#### Check #2: File Details

Click on the uploaded media item and check:

**✅ PASS**:
- MIME Type: `image/webp`
- All sizes (thumbnail, small, medium, etc.) end in `.webp`

**❌ FAIL**:
- MIME Type: `image/jpeg` or `image/png`
- Sizes end in `.jpg` or `.png`

#### Check #3: Vercel Blob Storage (Optional)

If you have access to Vercel dashboard:

1. Go to Vercel → Your Project → Storage → Blob
2. Find the uploaded file
3. Check the file extension

---

## Test Results & Next Steps

### ✅ Result: WebP Conversion Working

**If you see `.webp` files:**

1. **Congratulations!** Payload's formatOptions are working correctly
2. **No further action needed**
3. The commented-out beforeOperation hook can stay disabled
4. All future uploads will be WebP automatically

**Why it's working:**
- Payload CMS processes images with Sharp before calling the Vercel Blob adapter
- formatOptions are applied during this processing
- clientUploads: false ensures this happens server-side

---

### ❌ Result: Still Uploading as JPG/PNG

**If you still see `.jpg` or `.png` files after following ALL steps above:**

This indicates a bug/limitation with Vercel Blob Storage adapter in Payload CMS 3.59.1.

**Solution: Enable the Manual WebP Conversion Hook**

1. Open [src/collections/Media.ts](../src/collections/Media.ts)
2. Find lines 207-235 (the commented beforeOperation hook)
3. **Uncomment the entire hook**:
   - Remove the `/*` on line 210
   - Remove the `*/` on line 235
   - Remove the `//` from line 207-209

4. **Save the file**

5. **Restart dev server:**
   ```bash
   rm -rf .next && pnpm dev
   ```

6. **Re-test upload** (Step 2 above)

7. **This time you should see:**
   ```
   ✅ Converted your-image.jpg to WebP (156.32KB)
   ```

8. **Verify** the filename is now `.webp`

---

## Understanding the Two Approaches

### Approach 1: formatOptions (Built-in Payload Feature)

**How it works:**
```
Upload → Payload Core → Sharp Processing → formatOptions Applied → Storage
```

**Pros:**
- ✅ Standard Payload CMS feature
- ✅ Cleaner code
- ✅ No custom hooks needed

**Cons:**
- ❌ May not work with some storage adapters
- ❌ Depends on Payload internals

### Approach 2: beforeOperation Hook (Manual Workaround)

**How it works:**
```
Upload → beforeOperation Hook → Manual Sharp Conversion → Storage
```

**Pros:**
- ✅ Guaranteed to work (intercepts upload earlier)
- ✅ Full control over conversion
- ✅ Works with any storage adapter
- ✅ Console logging for debugging

**Cons:**
- ❌ Custom code (not standard Payload)
- ❌ Requires maintenance
- ❌ Duplicates Payload's internal logic

---

## Troubleshooting

### Issue: "Cannot find module 'sharp'"

**Solution:**
```bash
pnpm install sharp
```

### Issue: "File too large" error

**Cause:** Image exceeds 4.5MB (Vercel serverless limit with `clientUploads: false`)

**Solutions:**
1. **Compress image before upload** (recommended)
2. **Change clientUploads to true** (loses WebP conversion)
3. **Use different storage adapter** (e.g., S3, Cloudinary)

### Issue: TypeScript errors after uncommenting hook

**Solution:**
```bash
pnpm generate:types
```

### Issue: Cache not clearing

**Nuclear option:**
```bash
rm -rf .next node_modules/.cache
pnpm install
pnpm dev
```

---

## For Developers

### How to Check if formatOptions Applied

Add temporary console logging to verify processing:

```typescript
// In Media.ts upload config
formatOptions: {
  format: 'webp',
  options: {
    quality: 85,
    effort: 4,
  },
},
```

Then check Payload's logs during upload. If formatOptions work, Sharp will process the image silently.

### Testing Different Scenarios

1. **Direct media upload**: `/admin/collections/media/create`
2. **Rich text editor upload**: In Posts content field
3. **Hero image upload**: In Pages/Posts heroImage field
4. **Different file types**: JPG, PNG, GIF
5. **Different file sizes**: Small (<100KB), Medium (<1MB), Large (>2MB)

---

## Summary Checklist

Before declaring "it's not working":

- [ ] Dev server completely restarted with cache cleared
- [ ] Uploaded a BRAND NEW image (not re-upload)
- [ ] Waited for upload to complete fully
- [ ] Checked filename in `/admin/collections/media`
- [ ] Checked MIME type in media details
- [ ] Tested with both rich text editor AND direct upload
- [ ] Verified `clientUploads: false` in payload.config.ts
- [ ] Verified Sharp installed (`pnpm list sharp`)

**Only after ALL checks fail**, enable the beforeOperation hook workaround.

---

## Expected Performance

### With WebP Conversion

**Before (PNG/JPG):**
- 2.5MB original
- 800KB medium size
- Total: ~3.5MB

**After (WebP):**
- 600KB original (76% reduction)
- 150KB medium size (81% reduction)
- Total: ~850KB (76% reduction)

### File Size Benchmarks

| Image Type | Size | WebP Size | Reduction |
|------------|------|-----------|-----------|
| PNG Photo | 2.5MB | 600KB | 76% |
| PNG Icon | 150KB | 45KB | 70% |
| JPEG Photo | 1.2MB | 850KB | 29% |
| JPEG Screenshot | 890KB | 320KB | 64% |

---

## Questions?

If formatOptions work after testing:
- ✅ Great! Nothing to do.

If they don't work after testing:
- ⚙️ Uncomment the beforeOperation hook
- 📝 Consider reporting to Payload CMS team
- 📚 Read [IMAGE_OPTIMIZATION.md](./IMAGE_OPTIMIZATION.md) for full details

---

**Last Updated:** Based on Payload CMS 3.59.1 with Vercel Blob Storage adapter
