# MongoDB Migration: Atlas to Local Docker

This guide explains how to download your MongoDB Atlas data to your local Docker MongoDB installation.

## Prerequisites

1. **Docker Desktop** must be running
2. **Local MongoDB** must be accessible (via Docker Compose)

## Method 1: Node.js Script (Recommended - No External Tools)

This method uses Node.js and the `mongodb` package. No additional command-line tools required.

### Step 1: Install MongoDB Driver

```bash
pnpm add -D mongodb
```

### Step 2: Run the Migration Script

**Easy way (recommended):**
```bash
pnpm mongodb:pull
```

**Direct way:**
```bash
node scripts/migrate-mongodb-to-local.js
```

The script will:
- ✅ Check Docker is running
- ✅ Start local MongoDB if needed
- ✅ Backup existing local data (if any)
- ✅ Compare source and local data (incremental mode)
- ✅ Update only changed fields (incremental mode)
- ✅ Report on what was updated
- ✅ Verify the import was successful

### Update Modes

The script supports two update modes:

#### Incremental Mode (Default)
- **Compares** each document between source and local
- **Updates only changed fields** (not entire documents)
- **Reports** which fields were updated
- **Preserves** unchanged documents
- **Deletes** documents that no longer exist in source
- **Faster** for regular updates

**Usage:**
```bash
pnpm mongodb:pull
# or
MONGODB_UPDATE_MODE=incremental pnpm mongodb:pull
```

#### Full Replication Mode
- **Drops** entire local database
- **Replaces** everything with source data
- **Clean slate** approach
- **Useful** for initial setup or when you want a complete reset

**Usage:**
```bash
MONGODB_UPDATE_MODE=full pnpm mongodb:pull
```

### What It Does (Incremental Mode)

1. **Connects to MongoDB Atlas** using your connection string
2. **Compares** each document between source and local databases
3. **Updates only changed fields** in existing documents
4. **Creates** new documents that don't exist locally
5. **Deletes** documents that no longer exist in source
6. **Reports** detailed statistics on what was updated
7. **Verifies** document counts for each collection

### Update Reporting

The script provides detailed reporting:

```
Update Summary:
  Collections processed: 22
  Documents created: 5
  Documents updated: 12
  Documents unchanged: 150
  Documents deleted: 2
  Fields updated: 45
  Total documents: 167
```

For each updated document, it shows:
- Document ID
- Number of fields changed
- List of changed field names

## Method 2: Shell Script (Requires MongoDB Tools)

This method uses `mongodump` and `mongorestore` from MongoDB Database Tools.

### Step 1: Install MongoDB Database Tools

**On macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-database-tools
```

**On Linux:**
```bash
# Download from: https://www.mongodb.com/try/download/database-tools
# Or use package manager
```

**On Windows:**
Download from: https://www.mongodb.com/try/download/database-tools

### Step 2: Run the Migration Script

```bash
./scripts/migrate-mongodb-to-local.sh
```

Or if not executable:
```bash
bash scripts/migrate-mongodb-to-local.sh
```

## Manual Migration (Alternative)

If you prefer to do it manually:

### Step 1: Export from Atlas

```bash
mongodump \
  --uri="mongodb+srv://Vercel-Admin-tds-website-2025:hTy40QawOZQeK5qY@tds-website-2025.hpgu6sl.mongodb.net/?retryWrites=true&w=majority" \
  --db=tds-website \
  --out=./mongodb-backup
```

### Step 2: Ensure Local MongoDB is Running

```bash
docker-compose up -d
```

### Step 3: Import to Local

```bash
mongorestore \
  --uri="mongodb://localhost:27017" \
  --db=tds-website \
  ./mongodb-backup/tds-website
```

## Update Modes Explained

### Incremental Updates (Recommended)

**How it works:**
- Compares documents by `_id`
- For existing documents: updates only changed fields using `$set`
- For new documents: inserts them
- For deleted documents: removes them from local database
- Reports which fields were updated

**Benefits:**
- Faster for regular updates
- Preserves local changes you might want to keep
- Shows exactly what changed
- More efficient network usage

**Example output:**
```
▶ Processing pages...
  → 507f1f77bcf86cd799439011: 3 field(s) updated
    - title: updated
    - updatedAt: updated
    - content: updated
✓ pages: 2 created, 5 updated, 10 unchanged, 1 deleted
```

### Full Replication

**How it works:**
- Drops entire local database
- Imports all data fresh from source
- Complete replacement

**When to use:**
- Initial setup
- When you want to completely reset local data
- When incremental updates are causing issues

## After Migration

### Update Your `.env` File

Change your local `.env` to use the local database:

```bash
MONGODB_URI=mongodb://localhost:27017/tds-website
```

### Verify the Data

Connect to your local MongoDB:

```bash
docker exec -it tds-mongodb mongosh tds-website
```

In the MongoDB shell:
```javascript
// List all collections
show collections

// Count documents in main collections
db.pages.countDocuments()
db.posts.countDocuments()
db.media.countDocuments()
db.users.countDocuments()
db.categories.countDocuments()
```

### Start Your Dev Server

```bash
pnpm dev
```

Your app should now use the local database with all your production data.

## Troubleshooting

### "Connection refused" Error

**Problem**: Can't connect to local MongoDB

**Solution**:
```bash
# Check if container is running
docker ps | grep tds-mongodb

# Start it if not running
docker-compose up -d

# Check logs
docker-compose logs mongodb
```

### "Database not found" Error

**Problem**: The script can't find the `tds-website` database

**Solution**: 
- Check your Atlas connection string includes the database name
- Verify the database exists in Atlas
- The script will list available databases if it can't find the specified one

### "MongoDB tools not found"

**Problem**: `mongodump` or `mongorestore` not found

**Solution**: 
- Use Method 1 (Node.js script) instead
- Or install MongoDB Database Tools (see Method 2, Step 1)

### Import Takes Too Long

**Problem**: Large datasets take a long time to import

**Solution**: 
- This is normal for large databases
- The script shows progress for each collection
- Be patient - it will complete

### "Cannot connect to Atlas"

**Problem**: Can't connect to MongoDB Atlas

**Solution**:
- Check your internet connection
- Verify the connection string is correct
- Check if your IP is whitelisted in Atlas (Network Access)
- Try connecting with MongoDB Compass to verify credentials

## Backup Locations

Backups are stored in:
- **Node.js script**: `./mongodb-backup/[timestamp]/`
- **Shell script**: `./mongodb-backup/[timestamp]/`
- **Local backups**: `./mongodb-backup/local_backup_[timestamp]/`

## Security Notes

⚠️ **Important**: The connection string contains credentials. 

- The scripts include your Atlas credentials
- Keep these scripts out of version control
- Consider using environment variables for the connection string
- Rotate credentials if accidentally committed

## Switching Back to Production

To switch back to using Atlas:

1. Update `.env`:
```bash
MONGODB_URI=mongodb+srv://Vercel-Admin-tds-website-2025:hTy40QawOZQeK5qY@tds-website-2025.hpgu6sl.mongodb.net/?retryWrites=true&w=majority
```

2. Restart your dev server

## Related Documentation

- **[ENVIRONMENT.md](/docs/ENVIRONMENT.md)** - Environment variable setup
- **[MONGODB_MIGRATION.md](/docs/MONGODB_MIGRATION.md)** - PostgreSQL to MongoDB migration guide

