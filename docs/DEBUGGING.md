# Debug Logging System

This project includes a comprehensive debug logging facility that integrates with Vercel's logging infrastructure and Payload CMS's built-in logger.

## Overview

The debug logging system provides:
- Environment-controlled debug logging
- Seamless Vercel integration for production debugging
- Production optimization with minimal overhead
- Always-on error logging for troubleshooting

## Quick Start

### Enable Debug Logging

1. **Local Development:**
   ```bash
   # Add to your .env file
   PAYLOAD_DEBUG=true
   ```

2. **Vercel Deployment:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add `PAYLOAD_DEBUG` with value `true` or `false`
   - Deploy to see changes

### View Debug Logs

**Local Development:**
```bash
pnpm dev
# Debug logs appear in your terminal
```

**Vercel Production:**
- **Dashboard**: Project → Functions → Logs tab
- **CLI**: `vercel logs --follow` (install Vercel CLI first)

## Environment Configuration

### Recommended Settings

| Environment | PAYLOAD_DEBUG | Description |
|-------------|---------------|-------------|
| Local Development | `true` | See all debug information |
| Vercel Preview | `true` | Debug staging deployments |
| Vercel Production | `false` | Optimize performance |

### Setting Environment Variables

**Local (.env file):**
```bash
PAYLOAD_DEBUG=true
```

**Vercel Dashboard:**
1. Go to Project Settings → Environment Variables
2. Add `PAYLOAD_DEBUG`
3. Set value (`true` or `false`)
4. Choose environment scope (Development/Preview/Production)

## What Gets Logged

### Debug Messages (when PAYLOAD_DEBUG=true)

**Page Revalidation:**
```
[INFO] Revalidating page at path: /services/seo
[INFO] Revalidating unpublished page at path: /services/ppc
[INFO] Page path changed, descendants will be updated by nested-docs plugin
```

**Always Logged (regardless of debug setting):**
```
[ERROR] Error validating parent relationship: Circular reference detected
```

### Production Logger Levels

| Environment | Log Level | What's Logged |
|-------------|-----------|---------------|
| Development | `debug` | All messages (default Payload behavior) |
| Production | `warn` | Only warnings and errors |

## Using the Debug Utility

### In Your Code

Import the debug utilities:

```typescript
import { debugInfo, debugWarn, debugError, isDebugEnabled } from '@/utilities/debug'
```

**Debug Information:**
```typescript
// Only logs when PAYLOAD_DEBUG=true
debugInfo(payload, 'Processing page update', { pageId: doc.id })
```

**Debug Warnings:**
```typescript
// Only logs when PAYLOAD_DEBUG=true
debugWarn(payload, 'Potential performance issue detected')
```

**Error Logging:**
```typescript
// Always logs (regardless of debug setting)
debugError(payload, error, 'Failed to validate parent relationship')
```

**Check Debug Status:**
```typescript
if (isDebugEnabled()) {
  // Expensive debug operations only when needed
  const debugData = generateExpensiveDebugInfo()
  debugInfo(payload, 'Debug data', debugData)
}
```

### Advanced Usage

**Object-style logging:**
```typescript
import { debugLog } from '@/utilities/debug'

debugLog.info(payload, 'User action', {
  userId: user.id,
  action: 'page_update',
  timestamp: new Date().toISOString()
})
```

**Get debug status:**
```typescript
console.log(debugLog.getStatus())
// Output: "Debug logging: ENABLED (NODE_ENV: development)"
```

## Viewing Logs in Different Environments

### Local Development

**Terminal Output:**
```bash
pnpm dev
# Debug logs appear immediately in your terminal
```

### Vercel Production

**Option 1: Vercel Dashboard**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click "Functions" tab
4. Click "Logs" to view runtime logs
5. Use filters to search for specific messages

**Option 2: Vercel CLI**
```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Login to Vercel
vercel login

# View logs in real-time
vercel logs --follow

# View specific deployment logs
vercel logs --follow <deployment-url>
```

### Log Retention

⚠️ **Important**: Vercel runtime logs are only stored for **1 hour**. For long-term log storage, consider integrating with a third-party service like:
- Logtail
- LogDNA
- Datadog
- New Relic

## Troubleshooting

### Logs Not Appearing

**Check Environment Variable:**
```bash
# Verify PAYLOAD_DEBUG is set correctly
echo $PAYLOAD_DEBUG
```

**Vercel Environment Variables:**
1. Check Dashboard → Project → Settings → Environment Variables
2. Ensure `PAYLOAD_DEBUG=true` is set for correct environment
3. Redeploy after changing environment variables

**Log Level Too High:**
- In production, only warnings and errors appear by default
- Set `PAYLOAD_DEBUG=true` to see debug messages

### Performance Considerations

**Production Impact:**
- Debug logging adds minimal overhead when disabled
- Error logging always enabled for troubleshooting
- Production logger level set to `warn` for optimal performance

**Best Practices:**
```typescript
// ✅ Good: Conditional expensive operations
if (isDebugEnabled()) {
  const expensiveData = performExpensiveCalculation()
  debugInfo(payload, 'Complex debug info', expensiveData)
}

// ❌ Avoid: Always performing expensive operations
const expensiveData = performExpensiveCalculation() // Always runs
debugInfo(payload, 'Debug info', expensiveData) // Only logs conditionally
```

## File Structure

```
src/
├── utilities/
│   └── debug.ts                    # Debug logging utility
├── collections/
│   └── Pages/
│       └── hooks/
│           ├── revalidatePage.ts   # Uses debug logging
│           └── validateParent.ts   # Uses debug logging
├── payload.config.ts               # Logger configuration
└── .env.example                    # Debug environment variable
```

## Integration with Existing Logging

### Payload CMS Logger

The debug system extends Payload's built-in logger:
- Uses Pino logger internally
- Integrates with Payload's logging configuration
- Respects Payload's log level settings

### Vercel Integration

- All `console.log` and logger output automatically captured
- Appears in Vercel Dashboard Functions → Logs
- Accessible via Vercel CLI
- Supports log filtering and search

## Examples

### Page Revalidation Debug

When a page is updated, you'll see:
```
[INFO] Revalidating page at path: /services/seo-consulting
[INFO] Page path changed, descendants will be updated by nested-docs plugin
```

### Parent Validation Error

When a circular reference is detected:
```
[ERROR] Error validating parent relationship: A page cannot be its own parent
```

### Custom Debug Logging

```typescript
// In your custom hook
import { debugInfo, isDebugEnabled } from '@/utilities/debug'

export const myCustomHook = ({ req: { payload } }) => {
  if (isDebugEnabled()) {
    debugInfo(payload, 'Custom hook executed', {
      timestamp: new Date().toISOString(),
      userId: payload.user?.id
    })
  }
}
```

## Migration from Console.log

If you have existing `console.log` statements:

**Before:**
```typescript
console.log('Debug message', data)
```

**After:**
```typescript
import { debugInfo } from '@/utilities/debug'

debugInfo(payload, 'Debug message', data)
```

**Benefits:**
- Environment-controlled output
- Vercel integration
- Production optimization
- Consistent logging format

## Support

For issues with the debug logging system:

1. Check environment variables are set correctly
2. Verify Vercel deployment includes updated environment variables
3. Use `debugLog.getStatus()` to check debug state
4. Check Vercel Dashboard → Functions → Logs for output

## Advanced Configuration

### Custom Logger Configuration

To override the default logger configuration in `payload.config.ts`:

```typescript
import pino from 'pino'

// Custom logger for development
const devLogger = pino({
  level: 'debug',
  transport: {
    target: 'pino-pretty',
    options: { colorize: true }
  }
})

export default buildConfig({
  logger: process.env.NODE_ENV === 'development' ? devLogger : { options: { level: 'warn' } },
  // ... rest of config
})
```

### Log Drains (Advanced)

For production log management, configure Vercel Log Drains:

1. Go to Project Settings → Log Drains
2. Add Custom Log Drain
3. Select Function and Edge runtime logs
4. Configure endpoint for your log management service

This allows sending logs to external services for long-term storage and analysis.