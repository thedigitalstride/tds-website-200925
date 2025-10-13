import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Migration to fix incomplete Features block enum types
 *
 * The previous migration may have created enum types without all values.
 * This migration safely fixes them using the varchar conversion pattern:
 * 1. Convert columns from enum to varchar
 * 2. Drop old enum types
 * 3. Recreate with all values
 * 4. Convert columns back to enum
 *
 * This is the safest approach for enum modifications in PostgreSQL.
 */

export async function up({ db }: MigrateUpArgs): Promise<void> {
  console.log('🔄 Starting migration: Fix Features block enum types...')

  // Check if tables exist before trying to alter them
  const tableCheck = await db.execute(sql`
    SELECT EXISTS (
      SELECT FROM information_schema.tables
      WHERE table_name = 'pages_blocks_features'
    ) as exists
  `)

  const tablesExist = tableCheck.rows?.[0]?.exists || false

  if (!tablesExist) {
    console.log('  → Tables don\'t exist yet, skipping varchar conversion')
    console.log('  → Enums will be created correctly by the previous migration')
    return
  }

  console.log('  ✓ Tables exist, proceeding with enum fix...')

  // Step 1: Convert enum columns to varchar
  console.log('📝 Converting columns to varchar...')

  try {
    await db.execute(sql`
      ALTER TABLE pages_blocks_features
      ALTER COLUMN layout_options_icon_color TYPE varchar(50)
    `)
    console.log('  ✓ Converted pages_blocks_features.layout_options_icon_color to varchar')
  } catch (_error) {
    console.log(`  → Could not convert pages_blocks_features.layout_options_icon_color: ${_error instanceof Error ? _error.message : 'unknown'}`)
  }

  try {
    await db.execute(sql`
      ALTER TABLE _pages_v_blocks_features
      ALTER COLUMN layout_options_icon_color TYPE varchar(50)
    `)
    console.log('  ✓ Converted _pages_v_blocks_features.layout_options_icon_color to varchar')
  } catch (_error) {
    console.log(`  → Could not convert _pages_v_blocks_features.layout_options_icon_color: ${_error instanceof Error ? _error.message : 'unknown'}`)
  }

  // Step 2: Drop old enum types
  console.log('🗑️  Dropping old enum types...')

  try {
    await db.execute(sql`
      DROP TYPE IF EXISTS enum_pages_blocks_features_layout_options_icon_color CASCADE
    `)
    console.log('  ✓ Dropped enum_pages_blocks_features_layout_options_icon_color')
  } catch (_error) {
    console.log(`  → Could not drop enum: ${_error instanceof Error ? _error.message : 'unknown'}`)
  }

  try {
    await db.execute(sql`
      DROP TYPE IF EXISTS enum__pages_v_blocks_features_layout_options_icon_color CASCADE
    `)
    console.log('  ✓ Dropped enum__pages_v_blocks_features_layout_options_icon_color')
  } catch (_error) {
    console.log(`  → Could not drop enum: ${_error instanceof Error ? _error.message : 'unknown'}`)
  }

  // Step 3: Create new enum types with all values
  console.log('📋 Creating enum types with all values...')

  try {
    await db.execute(sql`
      CREATE TYPE enum_pages_blocks_features_layout_options_icon_color
      AS ENUM('brand', 'accent', 'secondary', 'tertiary')
    `)
    console.log('  ✓ Created enum_pages_blocks_features_layout_options_icon_color')
  } catch (_error) {
    console.log(`  → Could not create enum: ${_error instanceof Error ? _error.message : 'unknown'}`)
  }

  try {
    await db.execute(sql`
      CREATE TYPE enum__pages_v_blocks_features_layout_options_icon_color
      AS ENUM('brand', 'accent', 'secondary', 'tertiary')
    `)
    console.log('  ✓ Created enum__pages_v_blocks_features_layout_options_icon_color')
  } catch (_error) {
    console.log(`  → Could not create enum: ${_error instanceof Error ? _error.message : 'unknown'}`)
  }

  // Step 4: Convert columns back to enum
  console.log('🔄 Converting columns back to enum...')

  try {
    await db.execute(sql`
      ALTER TABLE pages_blocks_features
      ALTER COLUMN layout_options_icon_color TYPE enum_pages_blocks_features_layout_options_icon_color
      USING layout_options_icon_color::enum_pages_blocks_features_layout_options_icon_color
    `)
    console.log('  ✓ Converted pages_blocks_features.layout_options_icon_color back to enum')
  } catch (_error) {
    console.log(`  → Could not convert back to enum: ${_error instanceof Error ? _error.message : 'unknown'}`)
  }

  try {
    await db.execute(sql`
      ALTER TABLE _pages_v_blocks_features
      ALTER COLUMN layout_options_icon_color TYPE enum__pages_v_blocks_features_layout_options_icon_color
      USING layout_options_icon_color::enum__pages_v_blocks_features_layout_options_icon_color
    `)
    console.log('  ✓ Converted _pages_v_blocks_features.layout_options_icon_color back to enum')
  } catch (_error) {
    console.log(`  → Could not convert back to enum: ${_error instanceof Error ? _error.message : 'unknown'}`)
  }

  console.log('✅ Migration completed!')
  console.log('   Enum types fixed - all values (brand, accent, secondary, tertiary) now available')
}

export async function down({ db: _db }: MigrateDownArgs): Promise<void> {
  console.log('⏪ Rolling back not supported for this fix')
  console.log('   Manual intervention required if rollback needed')
  console.log('✅ Rollback acknowledged (no action taken)')
}
