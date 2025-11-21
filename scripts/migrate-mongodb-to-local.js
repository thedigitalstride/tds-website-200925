#!/usr/bin/env node

/**
 * MongoDB Migration Script (Node.js)
 * Downloads data from MongoDB Atlas to local Docker MongoDB
 *
 * Usage: node scripts/migrate-mongodb-to-local.js
 *
 * Prerequisites:
 *   pnpm add -D mongodb
 *
 * Environment Variables:
 *   MONGODB_ATLAS_URI - MongoDB Atlas connection string (required)
 *   MONGODB_LOCAL_URI - Local MongoDB URI (default: mongodb://localhost:27017)
 *   MONGODB_SOURCE_DB - Source database name (default: atlas-tds-website-2025)
 *   MONGODB_LOCAL_DB - Local database name (default: tds-website)
 *   MONGODB_UPDATE_MODE - 'incremental' or 'full' (default: incremental)
 */

import { MongoClient } from 'mongodb'
import { execSync } from 'child_process'
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { config } from 'dotenv'

// Load environment variables
config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configuration from environment variables
const ONLINE_URI = process.env.MONGODB_ATLAS_URI
const LOCAL_URI = process.env.MONGODB_LOCAL_URI || 'mongodb://localhost:27017'
const SOURCE_DB_NAME = process.env.MONGODB_SOURCE_DB || 'atlas-tds-website-2025'
const LOCAL_DB_NAME = process.env.MONGODB_LOCAL_DB || 'tds-website'
const BACKUP_DIR = './mongodb-backup'
const TIMESTAMP = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)

// Update mode: 'incremental' (compare and update only changed fields) or 'full' (drop and replace)
const UPDATE_MODE = process.env.MONGODB_UPDATE_MODE || 'incremental'

// Validate required environment variables
if (!ONLINE_URI) {
  console.error('\x1b[31m✗\x1b[0m Error: MONGODB_ATLAS_URI environment variable is required')
  console.error('  Please add it to your .env file:')
  console.error('  MONGODB_ATLAS_URI=mongodb+srv://username:password@cluster.mongodb.net/')
  process.exit(1)
}

// Colors for output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  blue: '\x1b[34m',
}

const log = {
  step: (msg) => console.log(`${colors.green}▶${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.cyan}ℹ${colors.reset} ${msg}`),
  detail: (msg) => console.log(`${colors.blue}  →${colors.reset} ${msg}`),
}

// Check if Docker is running
function checkDocker() {
  try {
    execSync('docker ps', { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}

// Check if MongoDB container is running
function checkMongoContainer() {
  try {
    const output = execSync('docker ps --format "{{.Names}}"', { encoding: 'utf-8' })
    return output.includes('tds-mongodb')
  } catch {
    return false
  }
}

// Start MongoDB container
async function startMongoContainer() {
  log.step('Starting local MongoDB container...')
  try {
    execSync('docker-compose up -d', { stdio: 'inherit' })

    // Wait for MongoDB to be ready
    log.step('Waiting for MongoDB to be ready...')
    await new Promise((resolve) => setTimeout(resolve, 5000))

    // Verify it's ready
    const maxAttempts = 30
    for (let i = 0; i < maxAttempts; i++) {
      try {
        const client = new MongoClient(LOCAL_URI)
        await client.connect()
        await client.db('admin').admin().ping()
        await client.close()
        log.success('MongoDB is ready')
        return true
      } catch {
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    }
    throw new Error('MongoDB failed to start')
  } catch (error) {
    log.error(`Failed to start MongoDB: ${error.message}`)
    return false
  }
}

// Extract database name from connection string if present
function extractDatabaseNameFromUri(uri) {
  try {
    // Try to extract database name from URI path
    // Format: mongodb+srv://...@host.net/database-name?options
    const urlMatch = uri.match(/mongodb(\+srv)?:\/\/[^\/]+\/([^?]+)/)
    if (urlMatch && urlMatch[2]) {
      return urlMatch[2]
    }
    return null
  } catch {
    return null
  }
}

// Auto-detect Payload database by scanning for Payload collections
async function autoDetectPayloadDatabase(client) {
  log.step('Auto-detecting Payload database...')

  const payloadCollections = ['pages', 'posts', 'media', 'users', 'categories']
  const systemDatabases = ['admin', 'local', 'config']

  try {
    const adminDb = client.db().admin()
    const databases = await adminDb.listDatabases()

    let bestMatch = null
    let bestScore = 0

    for (const dbInfo of databases.databases) {
      const dbName = dbInfo.name

      // Skip system databases
      if (systemDatabases.includes(dbName)) continue

      try {
        const db = client.db(dbName)
        const collections = await db.listCollections().toArray()
        const collectionNames = collections.map((c) => c.name)

        // Count how many Payload collections this database has
        const score = payloadCollections.filter((name) => collectionNames.includes(name)).length

        if (score > bestScore) {
          bestScore = score
          bestMatch = dbName
        }
      } catch {
        // Skip databases we can't access
        continue
      }
    }

    if (bestMatch && bestScore > 0) {
      log.success(`Auto-detected database '${bestMatch}' with ${bestScore} Payload collections`)
      return bestMatch
    }

    return null
  } catch (error) {
    log.warning(`Auto-detection failed: ${error.message}`)
    return null
  }
}

// Detect the correct database name to use for source (Atlas)
async function detectDatabaseName(client) {
  // Strategy 1: Try the configured database name
  log.step(`Trying configured database: ${SOURCE_DB_NAME}...`)
  try {
    const db = client.db(SOURCE_DB_NAME)
    const collections = await db.listCollections().toArray()
    if (collections.length > 0) {
      log.success(`Using database '${SOURCE_DB_NAME}' (${collections.length} collections found)`)
      return SOURCE_DB_NAME
    }
    log.warning(`Database '${SOURCE_DB_NAME}' exists but has no collections`)
  } catch {
    log.warning(`Database '${SOURCE_DB_NAME}' not found`)
  }

  // Strategy 2: Try to extract from connection string
  const extractedName = extractDatabaseNameFromUri(ONLINE_URI)
  if (extractedName && extractedName !== SOURCE_DB_NAME) {
    log.step(`Trying database from connection string: ${extractedName}...`)
    try {
      const db = client.db(extractedName)
      const collections = await db.listCollections().toArray()
      if (collections.length > 0) {
        log.success(`Using database '${extractedName}' (${collections.length} collections found)`)
        return extractedName
      }
    } catch {
      // Continue to next strategy
    }
  }

  // Strategy 3: Auto-detect by scanning for Payload collections
  const detectedName = await autoDetectPayloadDatabase(client)
  if (detectedName) {
    return detectedName
  }

  // If all strategies fail, return the configured name (will show better error)
  return SOURCE_DB_NAME
}

// Backup existing local data
async function backupLocalData() {
  log.step('Checking for existing local data...')

  try {
    const client = new MongoClient(LOCAL_URI)
    await client.connect()
    const db = client.db(LOCAL_DB_NAME)
    const collections = await db.listCollections().toArray()

    if (collections.length > 0) {
      log.warning('Existing data found. Creating backup...')
      const backupPath = path.join(BACKUP_DIR, `local_backup_${TIMESTAMP}`)
      await fs.mkdir(backupPath, { recursive: true })

      // Export each collection
      for (const collection of collections) {
        const collectionName = collection.name
        const data = await db.collection(collectionName).find({}).toArray()
        const filePath = path.join(backupPath, `${collectionName}.json`)
        await fs.writeFile(filePath, JSON.stringify(data, null, 2))
        log.success(`Backed up ${collectionName}: ${data.length} documents`)
      }

      await client.close()
      log.success(`Local backup created at: ${backupPath}`)
    } else {
      log.success('No existing data to backup')
    }
  } catch (error) {
    if (error.message.includes('ECONNREFUSED')) {
      log.warning('Local MongoDB not accessible (will be started)')
    } else {
      log.warning(`Could not check local data: ${error.message}`)
    }
  }
}

// Connect to source MongoDB and return client
async function connectToSource() {
  log.step('Connecting to MongoDB Atlas...')

  const client = new MongoClient(ONLINE_URI)
  await client.connect()
  log.success('Connected to MongoDB Atlas')

  // Detect the correct database name
  const detectedDbName = await detectDatabaseName(client)
  const db = client.db(detectedDbName)
  const collections = await db.listCollections().toArray()

  if (collections.length === 0) {
    // Enhanced error message with available databases
    log.error(`No collections found in database: ${detectedDbName}`)
    log.step('Listing all available databases...')
    const adminDb = client.db().admin()
    const databases = await adminDb.listDatabases()

    console.log('')
    log.info('Available databases:')
    for (const dbInfo of databases.databases) {
      const dbName = dbInfo.name
      try {
        const testDb = client.db(dbName)
        const testCollections = await testDb.listCollections().toArray()
        const sizeMB = (dbInfo.sizeOnDisk / 1024 / 1024).toFixed(2)
        console.log(`  - ${dbName}: ${testCollections.length} collections (${sizeMB} MB)`)
      } catch {
        console.log(`  - ${dbName}: (access denied)`)
      }
    }
    console.log('')

    await client.close()
    throw new Error(
      `Database '${detectedDbName}' not found or is empty. ` +
        `Please check your MongoDB Atlas dashboard to confirm the database name. ` +
        `Available databases listed above.`,
    )
  }

  log.step(`Found ${collections.length} collections in database '${detectedDbName}'`)
  return { client, dbName: detectedDbName }
}

// Export from online MongoDB (for full replication mode)
async function exportFromOnline() {
  const { client, dbName } = await connectToSource()
  const db = client.db(dbName)
  const collections = await db.listCollections().toArray()

  try {
    log.step('Exporting data...')

    const backupPath = path.join(BACKUP_DIR, TIMESTAMP)
    await fs.mkdir(backupPath, { recursive: true })

    let totalDocuments = 0

    for (const collection of collections) {
      const collectionName = collection.name
      log.step(`Exporting ${collectionName}...`)

      const data = await db.collection(collectionName).find({}).toArray()
      const filePath = path.join(backupPath, `${collectionName}.json`)

      await fs.writeFile(filePath, JSON.stringify(data, null, 2))

      totalDocuments += data.length
      log.success(`${collectionName}: ${data.length} documents`)
    }

    await client.close()
    log.success(`Export completed: ${totalDocuments} total documents from database '${dbName}'`)
    return backupPath
  } catch (error) {
    await client.close()
    log.error(`Export failed: ${error.message}`)
    throw error
  }
}

// Check if a collection contains globals (has globalType field)
async function isGlobalsCollection(collection) {
  try {
    // Check if any document in the collection has a globalType field
    const sample = await collection.findOne({ globalType: { $exists: true } })
    return sample !== null
  } catch {
    return false
  }
}

// Deep compare two objects and return changed fields
function compareDocuments(source, target) {
  const changes = []
  const allKeys = new Set([...Object.keys(source), ...Object.keys(target)])

  for (const key of allKeys) {
    // Skip MongoDB internal fields for comparison
    if (key === '_id' || key === '__v') continue

    const sourceVal = source[key]
    const targetVal = target[key]

    // Deep comparison
    if (JSON.stringify(sourceVal) !== JSON.stringify(targetVal)) {
      changes.push({
        field: key,
        oldValue: targetVal,
        newValue: sourceVal,
      })
    }
  }

  return changes
}

// Import to local MongoDB with incremental updates
async function importToLocalIncremental(sourceClient, sourceDbName) {
  log.step('Importing data with incremental updates...')
  log.info(`Update mode: ${UPDATE_MODE}`)

  const localClient = new MongoClient(LOCAL_URI)

  try {
    await localClient.connect()
    const localDb = localClient.db(LOCAL_DB_NAME)
    const sourceDb = sourceClient.db(sourceDbName)

    const collections = await sourceDb.listCollections().toArray()

    const stats = {
      collections: 0,
      documents: { created: 0, updated: 0, unchanged: 0, deleted: 0 },
      fields: { updated: 0 },
    }

    for (const collection of collections) {
      const collectionName = collection.name
      log.step(`Processing ${collectionName}...`)

      const localCollection = localDb.collection(collectionName)
      const sourceCollection = sourceDb.collection(collectionName)

      // Check if this is a globals collection
      const isGlobals = await isGlobalsCollection(sourceCollection)

      if (isGlobals) {
        // Handle globals collection - match by globalType, replace entire document
        log.detail(`Detected globals collection - matching by globalType`)

        const sourceGlobals = await sourceCollection.find({}).toArray()
        const localGlobals = await localCollection.find({}).toArray()

        const localGlobalsMap = new Map(localGlobals.map((doc) => [doc.globalType, doc]))

        let globalsCreated = 0
        let globalsUpdated = 0
        let globalsUnchanged = 0

        for (const sourceGlobal of sourceGlobals) {
          const globalType = sourceGlobal.globalType
          const localGlobal = localGlobalsMap.get(globalType)

          if (!localGlobal) {
            // New global - insert
            await localCollection.insertOne(sourceGlobal)
            globalsCreated++
            stats.documents.created++
            log.detail(`${globalType}: created`)
          } else {
            // Existing global - compare and replace if different
            const changes = compareDocuments(sourceGlobal, localGlobal)

            if (changes.length > 0) {
              // Replace entire document (globals are single-document entities)
              // Delete old and insert new since _id might be different
              await localCollection.deleteOne({ globalType: globalType })
              await localCollection.insertOne(sourceGlobal)
              globalsUpdated++
              stats.documents.updated++
              log.detail(`${globalType}: updated (${changes.length} field(s) changed)`)
            } else {
              globalsUnchanged++
              stats.documents.unchanged++
            }
          }
        }

        // Delete globals that exist locally but not in source
        const sourceGlobalTypes = new Set(sourceGlobals.map((g) => g.globalType))
        const toDelete = localGlobals.filter((g) => !sourceGlobalTypes.has(g.globalType))

        if (toDelete.length > 0) {
          const deleteTypes = toDelete.map((g) => g.globalType)
          await localCollection.deleteMany({ globalType: { $in: deleteTypes } })
          stats.documents.deleted += toDelete.length
          log.warning(`  Deleted ${toDelete.length} global(s) not in source`)
        }

        stats.collections++

        const summary = []
        if (globalsCreated > 0) summary.push(`${globalsCreated} created`)
        if (globalsUpdated > 0) summary.push(`${globalsUpdated} updated`)
        if (globalsUnchanged > 0) summary.push(`${globalsUnchanged} unchanged`)
        if (toDelete.length > 0) summary.push(`${toDelete.length} deleted`)

        log.success(`${collectionName}: ${summary.join(', ')}`)
        continue // Skip regular collection processing
      }

      // Regular collection processing (existing logic)
      // Get all source documents
      const sourceDocs = await sourceCollection.find({}).toArray()
      const sourceDocMap = new Map(sourceDocs.map((doc) => [doc._id.toString(), doc]))

      // Get all local documents
      const localDocs = await localCollection.find({}).toArray()
      const localDocMap = new Map(localDocs.map((doc) => [doc._id.toString(), doc]))

      let collectionCreated = 0
      let collectionUpdated = 0
      let collectionUnchanged = 0
      let collectionFieldsUpdated = 0

      // Process each source document
      for (const sourceDoc of sourceDocs) {
        const docId = sourceDoc._id.toString()
        const localDoc = localDocMap.get(docId)

        if (!localDoc) {
          // New document - try to insert
          try {
            await localCollection.insertOne(sourceDoc)
            collectionCreated++
            stats.documents.created++
          } catch (error) {
            // If insert fails due to unique index (e.g., email), find and update existing doc
            if (error.code === 11000 && error.keyPattern) {
              // Find existing document by the unique field that caused the conflict
              const uniqueField = Object.keys(error.keyPattern)[0]
              const uniqueValue = sourceDoc[uniqueField]

              if (uniqueValue !== undefined) {
                const existingDoc = await localCollection.findOne({ [uniqueField]: uniqueValue })
                if (existingDoc) {
                  // Update existing document
                  const changes = compareDocuments(sourceDoc, existingDoc)
                  if (changes.length > 0) {
                    const updateFields = {}
                    for (const change of changes) {
                      updateFields[change.field] = change.newValue
                      collectionFieldsUpdated++
                    }
                    await localCollection.updateOne(
                      { _id: existingDoc._id },
                      { $set: updateFields },
                    )
                    collectionUpdated++
                    stats.documents.updated++
                  } else {
                    collectionUnchanged++
                    stats.documents.unchanged++
                  }
                } else {
                  // Shouldn't happen, but re-throw if we can't find the doc
                  throw error
                }
              } else {
                throw error
              }
            } else {
              throw error
            }
          }
        } else {
          // Existing document - compare
          const changes = compareDocuments(sourceDoc, localDoc)

          if (changes.length > 0) {
            // Update only changed fields
            const updateFields = {}
            for (const change of changes) {
              updateFields[change.field] = change.newValue
              collectionFieldsUpdated++
            }

            await localCollection.updateOne({ _id: sourceDoc._id }, { $set: updateFields })

            collectionUpdated++
            stats.documents.updated++

            if (collectionUpdated <= 3) {
              // Show details for first few updates
              log.detail(`${docId}: ${changes.length} field(s) updated`)
              changes.slice(0, 3).forEach((change) => {
                log.detail(`  - ${change.field}: updated`)
              })
              if (changes.length > 3) {
                log.detail(`  ... and ${changes.length - 3} more field(s)`)
              }
            }
          } else {
            collectionUnchanged++
            stats.documents.unchanged++
          }
        }
      }

      // Delete documents that exist locally but not in source
      const sourceIds = new Set(sourceDocs.map((doc) => doc._id.toString()))
      const toDelete = localDocs.filter((doc) => !sourceIds.has(doc._id.toString()))

      if (toDelete.length > 0) {
        const deleteIds = toDelete.map((doc) => doc._id)
        await localCollection.deleteMany({ _id: { $in: deleteIds } })
        stats.documents.deleted += toDelete.length
        log.warning(`  Deleted ${toDelete.length} document(s) not in source`)
      }

      stats.collections++
      stats.fields.updated += collectionFieldsUpdated

      const summary = []
      if (collectionCreated > 0) summary.push(`${collectionCreated} created`)
      if (collectionUpdated > 0) summary.push(`${collectionUpdated} updated`)
      if (collectionUnchanged > 0) summary.push(`${collectionUnchanged} unchanged`)
      if (toDelete.length > 0) summary.push(`${toDelete.length} deleted`)

      log.success(`${collectionName}: ${summary.join(', ')}`)
    }

    await localClient.close()

    // Print summary
    console.log('')
    log.info('Update Summary:')
    console.log(`  Collections processed: ${stats.collections}`)
    console.log(`  Documents created: ${stats.documents.created}`)
    console.log(`  Documents updated: ${stats.documents.updated}`)
    console.log(`  Documents unchanged: ${stats.documents.unchanged}`)
    console.log(`  Documents deleted: ${stats.documents.deleted}`)
    console.log(`  Fields updated: ${stats.fields.updated}`)
    console.log(
      `  Total documents: ${stats.documents.created + stats.documents.updated + stats.documents.unchanged}`,
    )

    return stats
  } catch (error) {
    await localClient.close()
    log.error(`Import failed: ${error.message}`)
    throw error
  }
}

// Import to local MongoDB (full replication mode)
async function importToLocalFull(backupPath) {
  log.step('Importing data to local MongoDB (full replication)...')

  const client = new MongoClient(LOCAL_URI)

  try {
    await client.connect()
    const db = client.db(LOCAL_DB_NAME)

    // Drop existing database for clean import
    log.warning(`Dropping existing local database '${LOCAL_DB_NAME}' for clean import...`)
    await db.dropDatabase()

    // Read all JSON files from backup
    const files = await fs.readdir(backupPath)
    const jsonFiles = files.filter((f) => f.endsWith('.json'))

    let totalDocuments = 0

    for (const file of jsonFiles) {
      const collectionName = file.replace('.json', '')
      log.step(`Importing ${collectionName}...`)

      const filePath = path.join(backupPath, file)
      const content = await fs.readFile(filePath, 'utf-8')
      const data = JSON.parse(content)

      if (data.length > 0) {
        await db.collection(collectionName).insertMany(data)
        totalDocuments += data.length
        log.success(`${collectionName}: ${data.length} documents imported`)
      } else {
        log.warning(`${collectionName}: empty collection (skipped)`)
      }
    }

    await client.close()
    log.success(`Import completed: ${totalDocuments} total documents`)
  } catch (error) {
    await client.close()
    log.error(`Import failed: ${error.message}`)
    throw error
  }
}

// Verify import
async function verifyImport() {
  log.step('Verifying imported data...')

  const client = new MongoClient(LOCAL_URI)

  try {
    await client.connect()
    const db = client.db(LOCAL_DB_NAME)

    const collections = await db.listCollections().toArray()

    if (collections.length === 0) {
      log.error('No collections found after import!')
      await client.close()
      return false
    }

    log.success(`Collections imported: ${collections.map((c) => c.name).join(', ')}`)

    log.step('Document counts:')
    const mainCollections = ['pages', 'posts', 'media', 'users', 'categories']

    let totalDocuments = 0
    for (const collection of collections) {
      const collectionName = collection.name
      const count = await db.collection(collectionName).countDocuments()
      totalDocuments += count

      if (mainCollections.includes(collectionName) || count > 0) {
        console.log(`  - ${collectionName}: ${count} documents`)
      }
    }

    log.success(`Total documents: ${totalDocuments}`)

    await client.close()
    return true
  } catch (error) {
    await client.close()
    log.error(`Verification failed: ${error.message}`)
    return false
  }
}

// Main execution
async function main() {
  console.log('')
  console.log('==========================================')
  console.log('MongoDB Migration: Atlas → Local Docker')
  console.log('==========================================')
  console.log('')

  // Pre-flight checks
  if (!checkDocker()) {
    log.error('Docker is not running. Please start Docker Desktop.')
    process.exit(1)
  }

  if (!checkMongoContainer()) {
    const started = await startMongoContainer()
    if (!started) {
      log.error('Failed to start MongoDB container')
      process.exit(1)
    }
  } else {
    log.success('Local MongoDB container is running')
  }

  try {
    // Migration steps
    await backupLocalData()

    if (UPDATE_MODE === 'incremental') {
      // Incremental update mode
      const { client, dbName } = await connectToSource()
      try {
        await importToLocalIncremental(client, dbName)
      } finally {
        await client.close()
      }
    } else {
      // Full replication mode
      const backupPath = await exportFromOnline()
      await importToLocalFull(backupPath)
    }

    const verified = await verifyImport()

    if (!verified) {
      log.error('Verification failed')
      process.exit(1)
    }

    console.log('')
    console.log('==========================================')
    log.success('Migration completed successfully!')
    console.log('==========================================')
    console.log('')
    if (UPDATE_MODE === 'full') {
      console.log(`Backup location: ${backupPath}`)
      console.log('')
    }
    console.log('To connect to your local MongoDB:')
    console.log(`  docker exec -it tds-mongodb mongosh ${LOCAL_DB_NAME}`)
    console.log('')
    console.log('To update your .env file for local development:')
    console.log(`  MONGODB_URI=mongodb://localhost:27017/${LOCAL_DB_NAME}`)
    console.log('')
  } catch (error) {
    log.error(`Migration failed: ${error.message}`)
    console.error(error)
    process.exit(1)
  }
}

// Run if executed directly
main().catch((error) => {
  log.error(`Fatal error: ${error.message}`)
  process.exit(1)
})
