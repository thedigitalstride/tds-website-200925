# Environment Configuration

## Required Environment Variables

### Database

```bash
MONGODB_URI=mongodb://localhost:27017/tds-website
```

**Description**: MongoDB database connection string

**Development**: Local MongoDB via Docker

**Production**: MongoDB Atlas or MongoDB Cloud

**Example**:
```bash
# Local Docker
MONGODB_URI=mongodb://localhost:27017/tds-website

# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tds-website

# Alternative env var (fallback)
DATABASE_URI=mongodb://localhost:27017/tds-website
```

---

### Payload CMS

```bash
PAYLOAD_SECRET=your-secret-key-min-32-characters
```

**Description**: Secret key for JWT token encryption

**Requirements**: Minimum 32 characters, random string

**Generation**:
```bash
# Generate a secure random secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

### Server URL

```bash
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

**Description**: Public URL for the application

**Development**: `http://localhost:3000`

**Production**: Optional - custom domain is automatically detected via `VERCEL_URL`

**Example**:
```bash
# Development
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Production (optional override)
NEXT_PUBLIC_SERVER_URL=https://your-custom-domain.com
```

---

### Custom Domain Configuration

When you configure a custom domain in Vercel (e.g., `prod.thedigitalstride.co.uk`):

**Vercel automatically sets**:
- `VERCEL_URL=prod.thedigitalstride.co.uk` ✅ Your custom domain
- `VERCEL_PROJECT_PRODUCTION_URL=my-site.vercel.app` (Vercel's default)

**The app uses VERCEL_URL** for all assets and metadata

**No manual configuration needed** - it just works!

#### Override (Optional)

If you need to force a specific URL:
- Set `NEXT_PUBLIC_SERVER_URL=https://your-domain.com` in Vercel
- This overrides automatic detection

#### Verification

After deployment, check in browser DevTools Network tab:
```
✅ favicon.ico → https://prod.thedigitalstride.co.uk/favicon.svg
❌ NOT       → https://my-site.vercel.app/favicon.svg
```

---

### Vercel Cron

```bash
CRON_SECRET=your-cron-secret
```

**Description**: Authentication secret for Vercel cron jobs

**Used for**: Scheduled tasks and background jobs

**Generation**: Any random string, similar to `PAYLOAD_SECRET`

---

### Preview Secret

```bash
PREVIEW_SECRET=your-preview-secret
```

**Description**: Security token for draft preview functionality

**Used for**: Authenticating live preview requests

**Generation**: Any random string

**Important**: Must match the secret used in preview URL generation

---

### Blob Storage

```bash
BLOB_READ_WRITE_TOKEN=vercel_blob_token
```

**Description**: Vercel Blob Storage access token

**Used for**: File uploads and media management

**How to get**:
1. Deploy to Vercel
2. Go to Storage tab
3. Create Blob Store
4. Copy the token (automatically added to environment)

**Alternative Storage**: Can be replaced with S3, Azure, or other storage adapters

## Environment Files

### `.env` (Development)

Used for local development.

**Location**: Project root

**Git**: Should be in `.gitignore`

**Example**:
```bash
MONGODB_URI=mongodb://localhost:27017/tds-website
PAYLOAD_SECRET=dev-secret-min-32-chars-long-random
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
CRON_SECRET=dev-cron-secret
PREVIEW_SECRET=dev-preview-secret
BLOB_READ_WRITE_TOKEN=dev_blob_token
RESEND_API_KEY=re_your_resend_api_key
```

### `.env.production` (Production)

Used for production builds (optional).

**Location**: Project root

**Git**: Should be in `.gitignore`

**Note**: Vercel uses environment variables from dashboard, not this file

### `.env.example`

Template for environment variables.

**Location**: Project root

**Git**: Should be committed

**Purpose**: Documents required variables for other developers

## Local Development with Docker

### Docker Compose Setup

**File**: `docker-compose.yml`

```yaml
services:
  mongodb:
    image: mongo:latest
    container_name: tds-mongodb
    ports:
      - '27017:27017'
    environment:
      MONGO_INITDB_DATABASE: tds-website
    volumes:
      - mongodb_data:/data/db
    restart: unless-stopped

volumes:
  mongodb_data:
```

### Environment Configuration

Update `.env` for Docker:

```bash
MONGODB_URI=mongodb://localhost:27017/tds-website
```

**Important**: MongoDB runs on default port `27017`

### Docker Commands

```bash
# Start database
docker-compose up -d

# Stop database
docker-compose down

# Stop and remove data
docker-compose down -v

# View logs
docker-compose logs -f mongodb

# Access MongoDB shell
docker exec -it tds-mongodb mongosh tds-website
```

## Vercel Deployment

### Automatic Environment Variables

When deploying to Vercel, these are automatically added:

- `BLOB_READ_WRITE_TOKEN` (if using Vercel Blob Storage)

### Manual Environment Variables

Add these in Vercel dashboard (Settings → Environment Variables):

- `MONGODB_URI` (MongoDB Atlas connection string)
- `PAYLOAD_SECRET`
- `NEXT_PUBLIC_SERVER_URL`
- `CRON_SECRET`
- `PREVIEW_SECRET`
- `RESEND_API_KEY` (for email functionality)

### Environment Scopes

Choose which environments get each variable:

- **Production**: Production deployments only
- **Preview**: Preview deployments (PRs)
- **Development**: Local development with `vercel dev`

**Recommendation**: Use same secrets for all environments, or create separate secrets per environment.

## Security Best Practices

### 1. Never Commit Secrets

```bash
# .gitignore should include:
.env
.env.local
.env.production
.env.*.local
```

### 2. Use Strong Secrets

```bash
# Generate with:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or:
openssl rand -hex 32
```

### 3. Rotate Secrets Regularly

Update `PAYLOAD_SECRET` and `PREVIEW_SECRET` periodically.

**Note**: Rotating `PAYLOAD_SECRET` invalidates all user sessions.

### 4. Separate Environments

Use different secrets for development and production:

```bash
# Development
PAYLOAD_SECRET=dev-secret-min-32-chars

# Production
PAYLOAD_SECRET=prod-secret-totally-different
```

## Troubleshooting

### "PAYLOAD_SECRET must be at least 32 characters"

**Solution**: Generate longer secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### "Failed to connect to MongoDB"

**Check**:
1. MongoDB is running (`docker ps | grep mongo`)
2. `MONGODB_URI` format is correct
3. Port 27017 is not in use by another service
4. Database name matches in both URI and Docker config
5. Start MongoDB: `docker-compose up -d`

### "Preview not working"

**Check**:
1. `PREVIEW_SECRET` is set
2. `NEXT_PUBLIC_SERVER_URL` is correct
3. Preview route exists at `/src/app/(frontend)/next/preview/route.ts`

### "Blob storage upload fails"

**Check**:
1. `BLOB_READ_WRITE_TOKEN` is set
2. Token has read/write permissions
3. Vercel Blob Store is created in dashboard

## Environment Variable Checklist

### Development Setup

- [ ] `.env` file created
- [ ] `MONGODB_URI` points to local MongoDB
- [ ] `PAYLOAD_SECRET` is at least 32 characters
- [ ] `NEXT_PUBLIC_SERVER_URL=http://localhost:3000`
- [ ] `PREVIEW_SECRET` is set
- [ ] MongoDB is running (`docker-compose up -d`)

### Production Deployment

- [ ] All environment variables added to Vercel dashboard
- [ ] `MONGODB_URI` configured with MongoDB Atlas
- [ ] `NEXT_PUBLIC_SERVER_URL` uses production domain
- [ ] `PAYLOAD_SECRET` is production-strength secret
- [ ] `BLOB_READ_WRITE_TOKEN` is configured
- [ ] `RESEND_API_KEY` is configured for email

## Related Documentation

- **[MONGODB_MIGRATION.md](/docs/MONGODB_MIGRATION.md)** - MongoDB migration from PostgreSQL
- **[NEXTJS_PREVIEW_FIX.md](/docs/NEXTJS_PREVIEW_FIX.md)** - Preview functionality setup
