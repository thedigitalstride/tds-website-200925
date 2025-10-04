import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Migration to update deprecated button color enum values
 *
 * This migration transforms existing data from deprecated 'link-color' and 'link-gray'
 * values to the unified 'link' value, then updates the enum types to remove deprecated values.
 *
 * Background: The button color system was simplified to use a single 'link' variant that
 * adapts to light/dark mode, replacing the deprecated 'link-color' and 'link-gray' variants.
 */

export async function up({ db }: MigrateUpArgs): Promise<void> {
  console.log('🔄 Starting migration: Update deprecated button color values...')

  // Step 1: Update existing data to use 'link' instead of deprecated values
  console.log('  → Updating pages_blocks_features_features...')
  await db.execute(sql`
    UPDATE pages_blocks_features_features
    SET link_uui_color = 'link'
    WHERE link_uui_color IN ('link-color', 'link-gray')
  `)

  console.log('  → Updating _pages_v_blocks_features_features (version history)...')
  await db.execute(sql`
    UPDATE _pages_v_blocks_features_features
    SET link_uui_color = 'link'
    WHERE link_uui_color IN ('link-color', 'link-gray')
  `)

  console.log('  → Updating pages_blocks_button_block_buttons...')
  await db.execute(sql`
    UPDATE pages_blocks_button_block_buttons
    SET link_uui_color = 'link'
    WHERE link_uui_color IN ('link-color', 'link-gray')
  `)

  console.log('  → Updating _pages_v_blocks_button_block_buttons (version history)...')
  await db.execute(sql`
    UPDATE _pages_v_blocks_button_block_buttons
    SET link_uui_color = 'link'
    WHERE link_uui_color IN ('link-color', 'link-gray')
  `)

  console.log('  → Updating pages_blocks_cta_links...')
  await db.execute(sql`
    UPDATE pages_blocks_cta_links
    SET link_uui_color = 'link'
    WHERE link_uui_color IN ('link-color', 'link-gray')
  `)

  console.log('  → Updating _pages_v_blocks_cta_links (version history)...')
  await db.execute(sql`
    UPDATE _pages_v_blocks_cta_links
    SET link_uui_color = 'link'
    WHERE link_uui_color IN ('link-color', 'link-gray')
  `)

  console.log('  → Updating pages_blocks_content_columns...')
  await db.execute(sql`
    UPDATE pages_blocks_content_columns
    SET link_uui_color = 'link'
    WHERE link_uui_color IN ('link-color', 'link-gray')
  `)

  console.log('  → Updating _pages_v_blocks_content_columns (version history)...')
  await db.execute(sql`
    UPDATE _pages_v_blocks_content_columns
    SET link_uui_color = 'link'
    WHERE link_uui_color IN ('link-color', 'link-gray')
  `)

  console.log('  → Updating footer_nav_columns_items...')
  await db.execute(sql`
    UPDATE footer_nav_columns_items
    SET link_uui_color = 'link'
    WHERE link_uui_color IN ('link-color', 'link-gray')
  `)

  // Step 2: Update enum types to remove deprecated values
  // We need to recreate the enums with the new values

  console.log('  → Updating enum_pages_blocks_features_features_link_uui_color...')
  await db.execute(sql`
    ALTER TYPE enum_pages_blocks_features_features_link_uui_color
    RENAME TO enum_pages_blocks_features_features_link_uui_color_old
  `)

  await db.execute(sql`
    CREATE TYPE enum_pages_blocks_features_features_link_uui_color AS ENUM(
      'primary', 'accent', 'secondary', 'tertiary', 'link',
      'primary-destructive', 'secondary-destructive',
      'tertiary-destructive', 'link-destructive'
    )
  `)

  await db.execute(sql`
    ALTER TABLE pages_blocks_features_features
    ALTER COLUMN link_uui_color TYPE enum_pages_blocks_features_features_link_uui_color
    USING link_uui_color::text::enum_pages_blocks_features_features_link_uui_color
  `)

  await db.execute(sql`
    DROP TYPE enum_pages_blocks_features_features_link_uui_color_old
  `)

  console.log('  → Updating enum__pages_v_blocks_features_features_link_uui_color...')
  await db.execute(sql`
    ALTER TYPE enum__pages_v_blocks_features_features_link_uui_color
    RENAME TO enum__pages_v_blocks_features_features_link_uui_color_old
  `)

  await db.execute(sql`
    CREATE TYPE enum__pages_v_blocks_features_features_link_uui_color AS ENUM(
      'primary', 'accent', 'secondary', 'tertiary', 'link',
      'primary-destructive', 'secondary-destructive',
      'tertiary-destructive', 'link-destructive'
    )
  `)

  await db.execute(sql`
    ALTER TABLE _pages_v_blocks_features_features
    ALTER COLUMN link_uui_color TYPE enum__pages_v_blocks_features_features_link_uui_color
    USING link_uui_color::text::enum__pages_v_blocks_features_features_link_uui_color
  `)

  await db.execute(sql`
    DROP TYPE enum__pages_v_blocks_features_features_link_uui_color_old
  `)

  console.log('✅ Migration completed successfully!')
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  console.log('⏪ Rolling back migration: Restore deprecated button color values...')

  // Recreate old enum types with deprecated values
  console.log('  → Restoring enum_pages_blocks_features_features_link_uui_color...')
  await db.execute(sql`
    ALTER TYPE enum_pages_blocks_features_features_link_uui_color
    RENAME TO enum_pages_blocks_features_features_link_uui_color_new
  `)

  await db.execute(sql`
    CREATE TYPE enum_pages_blocks_features_features_link_uui_color AS ENUM(
      'primary', 'secondary', 'tertiary', 'link-color', 'link-gray'
    )
  `)

  await db.execute(sql`
    ALTER TABLE pages_blocks_features_features
    ALTER COLUMN link_uui_color TYPE enum_pages_blocks_features_features_link_uui_color
    USING link_uui_color::text::enum_pages_blocks_features_features_link_uui_color
  `)

  await db.execute(sql`
    DROP TYPE enum_pages_blocks_features_features_link_uui_color_new
  `)

  console.log('  → Restoring enum__pages_v_blocks_features_features_link_uui_color...')
  await db.execute(sql`
    ALTER TYPE enum__pages_v_blocks_features_features_link_uui_color
    RENAME TO enum__pages_v_blocks_features_features_link_uui_color_new
  `)

  await db.execute(sql`
    CREATE TYPE enum__pages_v_blocks_features_features_link_uui_color AS ENUM(
      'primary', 'secondary', 'tertiary', 'link-color', 'link-gray'
    )
  `)

  await db.execute(sql`
    ALTER TABLE _pages_v_blocks_features_features
    ALTER COLUMN link_uui_color TYPE enum__pages_v_blocks_features_features_link_uui_color
    USING link_uui_color::text::enum__pages_v_blocks_features_features_link_uui_color
  `)

  await db.execute(sql`
    DROP TYPE enum__pages_v_blocks_features_features_link_uui_color_new
  `)

  // Note: We don't restore the data values back to 'link-color' or 'link-gray'
  // because we can't determine which value each row originally had.
  // The rollback only restores the enum types to accept the old values.

  console.log('✅ Rollback completed!')
}
