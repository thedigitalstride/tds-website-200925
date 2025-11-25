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
