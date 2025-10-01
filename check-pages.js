// Diagnostic script to check pages in database
import { getPayload } from 'payload'
import config from './src/payload.config.js'

async function checkPages() {
  try {
    const payload = await getPayload({ config })

    console.log('Checking pages...')

    // Try to find pages with minimal query
    const pages = await payload.find({
      collection: 'pages',
      limit: 10,
      depth: 0,
    })

    console.log(`Found ${pages.totalDocs} pages`)
    console.log('Pages:', JSON.stringify(pages.docs, null, 2))

    // Check database directly
    const db = payload.db
    if (db && typeof db.execute === 'function') {
      const result = await db.execute({
        raw: 'SELECT COUNT(*) as count FROM pages'
      })
      console.log('Direct DB count:', result)
    }

    process.exit(0)
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

checkPages()
