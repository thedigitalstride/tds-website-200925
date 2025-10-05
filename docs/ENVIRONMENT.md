# Environment Configuration

## Required Environment Variables

### Database

```bash
POSTGRES_URL=postgres://username:password@host:port/database
```

**Description**: PostgreSQL database connection string

**Development**: Local Postgres (Docker or system-installed)

**Production**: Vercel Postgres or Neon Postgres

**Example**:
```bash
# Local Docker
POSTGRES_URL=postgres://postgres@localhost:54320/tds_website

# Vercel Postgres
POSTGRES_URL=postgres://user:pass@region.postgres.vercel-storage.com/db

# Neon
POSTGRES_URL=postgres://user:pass@region.neon.tech/dbname
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

**Production**: Your Vercel deployment URL (no trailing slash)

**Example**:
```bash
# Development
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Production
NEXT_PUBLIC_SERVER_URL=https://your-site.vercel.app
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
POSTGRES_URL=postgres://postgres@localhost:54320/tds_website
PAYLOAD_SECRET=dev-secret-min-32-chars-long-random
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
CRON_SECRET=dev-cron-secret
PREVIEW_SECRET=dev-preview-secret
BLOB_READ_WRITE_TOKEN=dev_blob_token
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
version: '3.8'
services:
  postgres:
    image: postgres:15-alpine
    ports:
      - '54320:5432'
    environment:
      POSTGRES_DB: tds_website
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Environment Configuration

Update `.env` for Docker:

```bash
POSTGRES_URL=postgres://postgres:postgres@localhost:54320/tds_website
```

**Important**: Port `54320` on host maps to `5432` in container

### Docker Commands

```bash
# Start database
docker-compose up -d

# Stop database
docker-compose down

# Stop and remove data
docker-compose down -v

# View logs
docker-compose logs -f postgres

# Access PostgreSQL shell
docker exec -it <container-name> psql -U postgres -d tds_website
```

## Vercel Deployment

### Automatic Environment Variables

When deploying to Vercel, these are automatically added:

- `POSTGRES_URL` (if using Vercel Postgres)
- `BLOB_READ_WRITE_TOKEN` (if using Vercel Blob Storage)

### Manual Environment Variables

Add these in Vercel dashboard (Settings → Environment Variables):

- `PAYLOAD_SECRET`
- `NEXT_PUBLIC_SERVER_URL`
- `CRON_SECRET`
- `PREVIEW_SECRET`

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

### "Failed to connect to database"

**Check**:
1. Database is running (`docker-compose ps`)
2. `POSTGRES_URL` format is correct
3. Port is not in use by another service
4. Database name matches in both URL and Docker config

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
- [ ] `POSTGRES_URL` points to local database
- [ ] `PAYLOAD_SECRET` is at least 32 characters
- [ ] `NEXT_PUBLIC_SERVER_URL=http://localhost:3000`
- [ ] `PREVIEW_SECRET` is set
- [ ] Local database is running

### Production Deployment

- [ ] All environment variables added to Vercel dashboard
- [ ] `NEXT_PUBLIC_SERVER_URL` uses production domain
- [ ] `PAYLOAD_SECRET` is production-strength secret
- [ ] `BLOB_READ_WRITE_TOKEN` is configured
- [ ] Database migrations are run (`pnpm payload migrate`)

## Related Documentation

- **[DATABASE_MIGRATIONS.md](/docs/DATABASE_MIGRATIONS.md)** - Database setup and migration workflow
- **[NEXTJS_PREVIEW_FIX.md](/docs/NEXTJS_PREVIEW_FIX.md)** - Preview functionality setup
- **[DATABASE_TROUBLESHOOTING.md](/docs/DATABASE_TROUBLESHOOTING.md)** - Database connection issues
