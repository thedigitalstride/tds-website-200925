# Next.js 15+ draftMode() Fix

## 🚨 CRITICAL: Recurring Breaking Issue

This is a **recurring, breaking issue** that MUST be fixed when upgrading Next.js or encountering preview errors.

## Error Symptoms

```
Error: `draftMode` was called outside a request scope
GET /next/preview?slug=... 500 in XXXms
Failed to create URL object from URL: , falling back to http://localhost
```

## Root Cause

Next.js 15.4+ requires `NextRequest` type for proper request context tracking with `draftMode()`.

**Using custom request types breaks the context.**

## ✅ CRITICAL FIX: Preview Route Implementation

**File**: `/src/app/(frontend)/next/preview/route.ts`

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

## ⚠️ Critical Implementation Notes

### 1. Request Type (MOST IMPORTANT)

🚨 **MUST use `NextRequest` from `next/server`**

This is the **ONLY** correct type for Next.js 15.4+. Custom request types break `draftMode()`.

```typescript
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest): Promise<Response> {
  // ... implementation
}
```

### 2. Import Required

```typescript
import { NextRequest } from 'next/server'
```

This import is **mandatory**.

### 3. draftMode() Position

Can be called after `getPayload()` and `payload.auth()`.

**Timing doesn't matter** as long as `NextRequest` is used.

### 4. Error Handling

Always include try/catch for auth calls:

```typescript
try {
  user = await payload.auth({
    req: req as unknown as PayloadRequest,
    headers: req.headers,
  })
} catch (error) {
  payload.logger.error({ err: error }, 'Error verifying token for live preview')
  return new Response('You are not allowed to preview this page', { status: 403 })
}
```

### 5. Response Format

Use proper `Response` objects, not `NextResponse`:

```typescript
return new Response('Message', { status: 403 })
```

## ❌ Common Mistakes That Break Preview

### Wrong: Custom Request Type

```typescript
// ❌ WRONG - Custom request type breaks draftMode() context
export async function GET(
  req: {
    cookies: { get: (name: string) => { value: string } }
  } & Request,
): Promise<Response>
```

### Wrong: Missing NextRequest Import

```typescript
// ❌ WRONG - Missing NextRequest import
// Using Request or custom types instead
export async function GET(req: Request): Promise<Response>
```

### Wrong: Missing await on draftMode()

```typescript
// ❌ WRONG - Missing await
const draft = draftMode()
```

### ✅ Correct Implementation

```typescript
// ✅ CORRECT
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest): Promise<Response> {
  // ... implementation
  const draft = await draftMode()
  // ...
}
```

## 🔧 Troubleshooting Steps

### 1. Verify NextRequest Import

Ensure this line is present:

```typescript
import { NextRequest } from 'next/server'
```

### 2. Check Function Signature

Must use:

```typescript
export async function GET(req: NextRequest): Promise<Response>
```

### 3. Clear Build Cache

```bash
rm -rf .next && pnpm dev
```

### 4. Check Environment Variables

Ensure `PREVIEW_SECRET` is set in `.env`:

```bash
PREVIEW_SECRET=your-secret-here
```

### 5. Test Preview URL

Should return **200**, not 500:

```
http://localhost:3000/next/preview?path=/&collection=pages&slug=home&previewSecret=your-secret
```

### 6. Check Server Logs

No "draftMode called outside request scope" errors should appear.

## 🎯 Success Indicators

- ✅ Preview routes return 200 status
- ✅ No draftMode context errors in server logs
- ✅ Admin panel live preview works correctly
- ✅ Draft content displays properly in preview mode

## 📋 Required Files for Preview System

### 1. Preview Route

**File**: `/src/app/(frontend)/next/preview/route.ts`

Main preview route (implementation shown above).

### 2. Preview Path Generator

**File**: `/src/utilities/generatePreviewPath.ts`

Generates preview URLs for collections.

### 3. Collection Configuration

**File**: `/src/collections/Pages/index.ts`

Collection preview configuration:

```typescript
admin: {
  useAsTitle: 'title',
  livePreview: {
    url: ({ data }) => {
      return `${process.env.NEXT_PUBLIC_SERVER_URL}/next/preview?path=${encodeURIComponent(
        `/${data.slug === 'home' ? '' : data.slug}`
      )}&collection=pages&slug=${data.slug}&previewSecret=${process.env.PREVIEW_SECRET}`
    },
  },
}
```

## 📖 Reference

This implementation is taken directly from the **official Payload CMS website template**.

**Source**: https://github.com/payloadcms/payload/blob/main/templates/website/src/app/(frontend)/next/preview/route.ts

**Tested with**:
- Next.js 15.4.4
- Payload CMS 3.55.0
- Node.js 18+

## ⚠️ Why This Issue Keeps Recurring

The issue recurs because the "fix" with custom request types appears in outdated documentation and seems logical, but actually **breaks Next.js 15.4+ context tracking**.

**Always use the official Payload template implementation** rather than custom request types.

### Key Insight

The problem is **NOT** the timing of `draftMode()` calls - it's the **request type**.

`NextRequest` is **required** for proper context tracking.

## Testing Preview Functionality

### 1. Start Development Server

```bash
pnpm dev
```

### 2. Login to Admin Panel

Navigate to `http://localhost:3000/admin`

### 3. Open Page Editor

Edit any page in `/admin/collections/pages`

### 4. Click Live Preview

Should open preview in side panel without errors.

### 5. Verify Draft Changes

Make changes to page content and verify they appear in preview immediately.

## Related Documentation

- **[ENVIRONMENT.md](/docs/ENVIRONMENT.md)** - Environment variable setup
- **[DATABASE_MIGRATIONS.md](/docs/DATABASE_MIGRATIONS.md)** - Production deployment workflow
