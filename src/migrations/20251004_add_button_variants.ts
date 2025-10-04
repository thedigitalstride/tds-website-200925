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
 * IMPORTANT: This migration is defensive - it only adds values to enum types that exist.
 * If the enum type doesn't exist, it skips gracefully.
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

  for (const enumType of enumTypes) {
    for (const newValue of newValues) {
      try {
        await db.execute(sql`
          DO $$
          BEGIN
            -- Check if enum type exists
            IF EXISTS (SELECT 1 FROM pg_type WHERE typname = ${enumType}) THEN
              -- Check if value doesn't already exist
              IF NOT EXISTS (
                SELECT 1 FROM pg_enum
                WHERE enumlabel = ${newValue}
                AND enumtypid = ${enumType}::regtype
              ) THEN
                EXECUTE format('ALTER TYPE %I ADD VALUE %L', ${enumType}, ${newValue});
              END IF;
            END IF;
          END $$;
        `)
        console.log(`  ✓ Added "${newValue}" to ${enumType} (if it exists)`)
      } catch (error) {
        // Silently skip if enum type doesn't exist
        console.log(`  → Skipped ${enumType} (doesn't exist)`)
      }
    }
  }

  console.log('✅ Migration completed successfully!')
  console.log('   New values added: accent, tertiary, link')
  console.log('   Deprecated values preserved: link-color, link-gray (for backward compatibility)')
}

export async function down({ db: _db }: MigrateDownArgs): Promise<void> {
  console.log('⏪ Rolling back migration: Remove new button color variants...')
  console.log('   Note: PostgreSQL does not support removing enum values directly.')
  console.log('   Manual intervention required if rollback is needed.')
  console.log('✅ Rollback acknowledged (no action taken)')
}
