import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Migration to add new button color variants to existing enum types
 *
 * This migration safely adds 'link', 'accent', and 'tertiary' values to all
 * button color enum types WITHOUT removing the deprecated 'link-color' and 'link-gray'
 * values. This ensures no data corruption while allowing new code to use new variants.
 *
 * Deprecated values can be removed in a future migration after data cleanup.
 *
 * IMPORTANT: This migration is completely defensive:
 * - Checks if enum types exist before attempting to modify them
 * - Gracefully skips missing enum types (they'll be created by Payload's auto-sync)
 * - Safe to run multiple times (idempotent)
 */

export async function up({ db }: MigrateUpArgs): Promise<void> {
  console.log('🔄 Starting migration: Add new button color variants...')

  const enumTypes = [
    'enum_pages_blocks_cta_links_link_uui_color',
    'enum_pages_blocks_content_columns_link_uui_color',
    'enum_pages_blocks_button_block_buttons_link_uui_color',
    'enum_pages_blocks_features_features_link_uui_color',
    'enum__pages_v_blocks_cta_links_link_uui_color',
    'enum__pages_v_blocks_content_columns_link_uui_color',
    'enum__pages_v_blocks_button_block_buttons_link_uui_color',
    'enum__pages_v_blocks_features_features_link_uui_color',
  ]

  const newValues = ['accent', 'tertiary', 'link']

  let successCount = 0
  let skipCount = 0

  for (const newValue of newValues) {
    console.log(`  → Processing "${newValue}" value...`)

    for (const enumType of enumTypes) {
      try {
        // First check if the type exists
        const typeCheck = await db.execute(sql`
          SELECT EXISTS (
            SELECT 1 FROM pg_type WHERE typname = ${enumType}
          ) as exists
        `)

        const typeExists = typeCheck.rows?.[0]?.exists || false

        if (!typeExists) {
          skipCount++
          continue
        }

        // Type exists, now check if value already exists
        const valueCheck = await db.execute(sql`
          SELECT EXISTS (
            SELECT 1 FROM pg_enum e
            JOIN pg_type t ON e.enumtypid = t.oid
            WHERE t.typname = ${enumType}
            AND e.enumlabel = ${newValue}
          ) as exists
        `)

        const valueExists = valueCheck.rows?.[0]?.exists || false

        if (valueExists) {
          console.log(`    ✓ "${newValue}" already exists in ${enumType}`)
          successCount++
          continue
        }

        // Add the new value
        await db.execute(sql`
          ALTER TYPE ${sql.identifier(enumType)} ADD VALUE ${newValue}
        `)

        console.log(`    ✓ Added "${newValue}" to ${enumType}`)
        successCount++
      } catch (_error) {
        // Silently skip errors (enum might not exist, value might be being added concurrently, etc.)
        console.log(`    → Skipped ${enumType} (${_error instanceof Error ? _error.message : 'unknown error'})`)
        skipCount++
      }
    }
  }

  console.log('✅ Migration completed!')
  console.log(`   Successfully processed: ${successCount}`)
  console.log(`   Skipped: ${skipCount}`)
  console.log('   New values: accent, tertiary, link')
  console.log('   Deprecated values preserved: link-color, link-gray')
}

export async function down({ db: _db }: MigrateDownArgs): Promise<void> {
  console.log('⏪ Rolling back migration: Remove new button color variants...')
  console.log('   Note: PostgreSQL does not support removing enum values directly.')
  console.log('   Manual intervention required if rollback is needed.')
  console.log('✅ Rollback acknowledged (no action taken)')
}
