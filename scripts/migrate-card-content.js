#!/usr/bin/env node

/**
 * Card Content Migration Script
 * Copies 'description' field to 'content' field for CardGridBlock and InlineCardBlock
 *
 * Usage: node scripts/migrate-card-content.js
 *
 * This migrates data after the schema change that renamed:
 *   - cards[].description → cards[].content (in cardGrid blocks)
 *   - description → content (in inlineCard blocks)
 */

import { MongoClient } from 'mongodb'
import { config } from 'dotenv'

// Load environment variables
config()

// Use MONGODB_ATLAS_URI for production, otherwise local
const useProduction = process.argv.includes('--production')
const LOCAL_URI = process.env.MONGODB_LOCAL_URI || 'mongodb://localhost:27017'
const ATLAS_URI = process.env.MONGODB_ATLAS_URI
const DB_NAME = useProduction ? 'test' : (process.env.MONGODB_LOCAL_DB || 'tds-website')
const MONGODB_URI = useProduction ? ATLAS_URI : LOCAL_URI

if (useProduction && !ATLAS_URI) {
  console.error('❌ MONGODB_ATLAS_URI environment variable required for production migration')
  process.exit(1)
}

async function migrateCardContent() {
  console.log('\n🔄 Card Content Migration Script')
  console.log('================================')
  console.log(`Mode: ${useProduction ? 'PRODUCTION' : 'Local'}`)
  console.log(`Database: ${DB_NAME}`)
  console.log(`URI: ${useProduction ? 'MongoDB Atlas' : MONGODB_URI}\n`)

  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    console.log('✅ Connected to MongoDB\n')

    const db = client.db(DB_NAME)
    const pagesCollection = db.collection('pages')

    // ==========================================
    // 1. Migrate CardGridBlock cards
    // ==========================================
    console.log('📦 Migrating CardGridBlock cards...')

    // Find all pages with cardGrid blocks that have cards with description
    const pagesWithCardGrid = await pagesCollection.find({
      'layout.blockType': 'cardGrid',
      'layout.cards.description': { $exists: true }
    }).toArray()

    console.log(`   Found ${pagesWithCardGrid.length} pages with cardGrid blocks`)

    let cardGridUpdates = 0
    for (const page of pagesWithCardGrid) {
      let modified = false

      for (const block of page.layout || []) {
        if (block.blockType === 'cardGrid' && block.cards) {
          for (const card of block.cards) {
            if (card.description && !card.content) {
              card.content = card.description
              modified = true
              cardGridUpdates++
            }
          }
        }
      }

      if (modified) {
        await pagesCollection.updateOne(
          { _id: page._id },
          { $set: { layout: page.layout } }
        )
        console.log(`   ✅ Updated page: ${page.title || page.slug || page._id}`)
      }
    }

    console.log(`   Total cards migrated: ${cardGridUpdates}\n`)

    // ==========================================
    // 2. Migrate InlineCardBlock
    // ==========================================
    console.log('📦 Migrating InlineCardBlock...')

    // Find all pages with inlineCard blocks that have description
    const pagesWithInlineCard = await pagesCollection.find({
      'layout.blockType': 'inlineCard',
      'layout.description': { $exists: true }
    }).toArray()

    console.log(`   Found ${pagesWithInlineCard.length} pages with inlineCard blocks`)

    let inlineCardUpdates = 0
    for (const page of pagesWithInlineCard) {
      let modified = false

      for (const block of page.layout || []) {
        if (block.blockType === 'inlineCard' && block.description && !block.content) {
          block.content = block.description
          modified = true
          inlineCardUpdates++
        }
      }

      if (modified) {
        await pagesCollection.updateOne(
          { _id: page._id },
          { $set: { layout: page.layout } }
        )
        console.log(`   ✅ Updated page: ${page.title || page.slug || page._id}`)
      }
    }

    console.log(`   Total inlineCard blocks migrated: ${inlineCardUpdates}\n`)

    // ==========================================
    // 3. Also check _versions collection for drafts
    // ==========================================
    console.log('📦 Checking pages_versions for draft content...')

    const versionsCollection = db.collection('pages_versions')
    const versionsExist = await versionsCollection.countDocuments({}) > 0

    if (versionsExist) {
      const versionsWithCardGrid = await versionsCollection.find({
        'version.layout.blockType': 'cardGrid',
        'version.layout.cards.description': { $exists: true }
      }).toArray()

      let versionUpdates = 0
      for (const versionDoc of versionsWithCardGrid) {
        let modified = false

        for (const block of versionDoc.version?.layout || []) {
          if (block.blockType === 'cardGrid' && block.cards) {
            for (const card of block.cards) {
              if (card.description && !card.content) {
                card.content = card.description
                modified = true
                versionUpdates++
              }
            }
          }
          if (block.blockType === 'inlineCard' && block.description && !block.content) {
            block.content = block.description
            modified = true
            versionUpdates++
          }
        }

        if (modified) {
          await versionsCollection.updateOne(
            { _id: versionDoc._id },
            { $set: { 'version.layout': versionDoc.version.layout } }
          )
        }
      }

      console.log(`   Version documents updated: ${versionUpdates}\n`)
    } else {
      console.log('   No versions collection found (skipping)\n')
    }

    // ==========================================
    // Summary
    // ==========================================
    console.log('================================')
    console.log('✅ Migration Complete!')
    console.log(`   CardGrid cards: ${cardGridUpdates}`)
    console.log(`   InlineCard blocks: ${inlineCardUpdates}`)
    console.log('================================\n')

  } catch (error) {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  } finally {
    await client.close()
    console.log('🔌 Disconnected from MongoDB\n')
  }
}

// Run the migration
migrateCardContent()
