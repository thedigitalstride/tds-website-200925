# MongoDB Migration Guide

## Migration from PostgreSQL to MongoDB

Date: October 29, 2025
Reason: Simplify database management and avoid migration issues with Node.js/ESM/CSS imports

## Why MongoDB?

1. **No Schema Migrations Required** - MongoDB is schemaless, changes are automatic
2. **Avoids CSS Import Issues** - No need to run `pnpm migrate:create` which breaks with react-image-crop
3. **Simpler Development** - No migration files to manage
4. **Better for Early Development** - Easy to iterate on schema without migrations

## Changes Made

### 1. Installed MongoDB Adapter
```bash
pnpm add @payloadcms/db-mongodb
```

### 2. Updated payload.config.ts

**From (PostgreSQL):**
```typescript
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'

db: vercelPostgresAdapter({
  pool: {
    connectionString: process.env.POSTGRES_URL || '',
    max: 20,
    min: 2,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  },
}),
```

**To (MongoDB):**
```typescript
import { mongooseAdapter } from '@payloadcms/db-mongodb'

db: mongooseAdapter({
  url: process.env.MONGODB_URI || process.env.DATABASE_URI || 'mongodb://localhost:27017/tds-website',
  connectOptions: {
    maxPoolSize: 20,
    minPoolSize: 2,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  },
}),
```

### 3. Backup Created
- Original config backed up to: `src/payload.config.postgres.backup.ts`

## Environment Variables

### Local Development
```env
MONGODB_URI=mongodb://localhost:27017/tds-website
```

### Production (MongoDB Atlas)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

## MongoDB Setup Options

### Option 1: Local MongoDB with Docker (✅ COMPLETED)
```bash
# Start MongoDB with docker-compose
docker-compose up -d

# Check MongoDB is running
docker ps | grep mongodb

# Check MongoDB logs
docker logs tds-mongodb

# Access MongoDB shell
docker exec -it tds-mongodb mongosh

# Stop MongoDB
docker-compose down
```

Current setup:
- Container name: `tds-mongodb`
- Port: 27017
- Database: `tds-website`
- Connection string: `mongodb://localhost:27017/tds-website`

### Option 2: MongoDB Atlas (Cloud - For Production)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Add to .env as MONGODB_URI

## Benefits After Switch

1. **No More Migration Errors** - CSS import issue completely avoided
2. **Faster Development** - Schema changes apply immediately
3. **Simpler Deployment** - No migration step in CI/CD
4. **Better for Prototyping** - Easy to change schema during development

## Data Migration (If Needed)

Since site is not live yet, we start fresh. If data migration needed later:

```javascript
// Export from Postgres
const postgresData = await postgresPayload.find({ collection: 'posts' })

// Import to MongoDB
for (const item of postgresData.docs) {
  await mongoPayload.create({
    collection: 'posts',
    data: item,
  })
}
```

## Rollback Instructions

If need to switch back to PostgreSQL:
1. Restore from backup: `cp src/payload.config.postgres.backup.ts src/payload.config.ts`
2. Remove MongoDB adapter: `pnpm remove @payloadcms/db-mongodb`
3. Ensure Postgres adapter installed: `pnpm add @payloadcms/db-vercel-postgres`

## Testing MongoDB Connection

```bash
# Start dev server
pnpm dev

# Should see: "Connected to MongoDB" in console
# Admin panel at: http://localhost:3000/admin
```

## Production Deployment

For Vercel deployment:
1. Add MongoDB Atlas connection string to Vercel env vars
2. No migration step needed in build process
3. Deploy normally

## Notes

- MongoDB adapter fully compatible with all Payload features
- Vercel Blob Storage continues to work for media
- All collections and globals work identically
- Performance similar or better than PostgreSQL for this use case