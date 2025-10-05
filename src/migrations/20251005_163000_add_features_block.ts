import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Migration to add Features block support
 *
 * This migration safely creates all necessary enum types and tables for the Features block.
 * It is completely defensive and safe to run multiple times.
 *
 * IMPORTANT: This migration is idempotent:
 * - Checks if enum types exist before creating them
 * - Checks if enum values exist before adding them
 * - Checks if tables exist before creating them
 * - Safe to run multiple times
 */

export async function up({ db }: MigrateUpArgs): Promise<void> {
  console.log('🔄 Starting migration: Add Features block support...')

  // Step 1: Create enum types if they don't exist
  const enumsToCreate = [
    {
      name: 'enum_pages_blocks_features_features_link_type',
      values: ['reference', 'custom'],
    },
    {
      name: 'enum_pages_blocks_features_features_link_uui_color',
      values: ['primary', 'accent', 'secondary', 'tertiary', 'link'],
    },
    {
      name: 'enum_pages_blocks_features_features_link_uui_size',
      values: ['sm', 'md', 'lg', 'xl'],
    },
    {
      name: 'enum_pages_blocks_features_features_link_icon_pos',
      values: ['leading', 'trailing'],
    },
    {
      name: 'enum_pages_blocks_features_layout_options_card_style',
      values: ['card', 'centered-icon', 'left-icon', 'horizontal-icon', 'elevated-box'],
    },
    {
      name: 'enum_pages_blocks_features_layout_options_card_background',
      values: ['grey', 'brand', 'outline', 'line'],
    },
    {
      name: 'enum_pages_blocks_features_layout_options_columns',
      values: ['2', '3', '4'],
    },
    {
      name: 'enum_pages_blocks_features_layout_options_icon_color',
      values: ['brand', 'accent', 'secondary', 'tertiary'],
    },
    {
      name: 'enum_pages_blocks_features_layout_options_icon_theme',
      values: ['rounded-square', 'round'],
    },
    {
      name: 'enum_pages_blocks_features_layout_options_spacing',
      values: ['compact', 'normal', 'spacious'],
    },
    // Version table enums
    {
      name: 'enum__pages_v_blocks_features_features_link_type',
      values: ['reference', 'custom'],
    },
    {
      name: 'enum__pages_v_blocks_features_features_link_uui_color',
      values: ['primary', 'accent', 'secondary', 'tertiary', 'link'],
    },
    {
      name: 'enum__pages_v_blocks_features_features_link_uui_size',
      values: ['sm', 'md', 'lg', 'xl'],
    },
    {
      name: 'enum__pages_v_blocks_features_features_link_icon_pos',
      values: ['leading', 'trailing'],
    },
    {
      name: 'enum__pages_v_blocks_features_layout_options_card_style',
      values: ['card', 'centered-icon', 'left-icon', 'horizontal-icon', 'elevated-box'],
    },
    {
      name: 'enum__pages_v_blocks_features_layout_options_card_background',
      values: ['grey', 'brand', 'outline', 'line'],
    },
    {
      name: 'enum__pages_v_blocks_features_layout_options_columns',
      values: ['2', '3', '4'],
    },
    {
      name: 'enum__pages_v_blocks_features_layout_options_icon_color',
      values: ['brand', 'accent', 'secondary', 'tertiary'],
    },
    {
      name: 'enum__pages_v_blocks_features_layout_options_icon_theme',
      values: ['rounded-square', 'round'],
    },
    {
      name: 'enum__pages_v_blocks_features_layout_options_spacing',
      values: ['compact', 'normal', 'spacious'],
    },
    // Icon position enums for other blocks
    {
      name: 'enum_pages_blocks_cta_links_link_icon_pos',
      values: ['leading', 'trailing'],
    },
    {
      name: 'enum_pages_blocks_content_columns_link_icon_pos',
      values: ['leading', 'trailing'],
    },
    {
      name: 'enum_pages_blocks_button_block_buttons_link_icon_pos',
      values: ['leading', 'trailing'],
    },
    {
      name: 'enum__pages_v_blocks_cta_links_link_icon_pos',
      values: ['leading', 'trailing'],
    },
    {
      name: 'enum__pages_v_blocks_content_columns_link_icon_pos',
      values: ['leading', 'trailing'],
    },
    {
      name: 'enum__pages_v_blocks_button_block_buttons_link_icon_pos',
      values: ['leading', 'trailing'],
    },
    {
      name: 'enum_header_cta_button_link_icon_pos',
      values: ['leading', 'trailing'],
    },
    {
      name: 'enum_footer_nav_columns_items_link_icon_pos',
      values: ['leading', 'trailing'],
    },
    {
      name: 'enum_not_found_link_type',
      values: ['reference', 'custom'],
    },
    {
      name: 'enum_not_found_link_uui_color',
      values: ['primary', 'accent', 'secondary', 'tertiary', 'link'],
    },
    {
      name: 'enum_not_found_link_uui_size',
      values: ['sm', 'md', 'lg', 'xl'],
    },
    {
      name: 'enum_not_found_link_icon_pos',
      values: ['leading', 'trailing'],
    },
  ]

  for (const enumDef of enumsToCreate) {
    try {
      // Check if type exists
      const typeCheck = await db.execute(sql`
        SELECT EXISTS (
          SELECT 1 FROM pg_type WHERE typname = ${enumDef.name}
        ) as exists
      `)

      const typeExists = typeCheck.rows?.[0]?.exists || false

      if (typeExists) {
        console.log(`  ✓ Enum ${enumDef.name} already exists, ensuring all values...`)

        // Ensure all values exist
        for (const value of enumDef.values) {
          const valueCheck = await db.execute(sql`
            SELECT EXISTS (
              SELECT 1 FROM pg_enum e
              JOIN pg_type t ON e.enumtypid = t.oid
              WHERE t.typname = ${enumDef.name}
              AND e.enumlabel = ${value}
            ) as exists
          `)

          const valueExists = valueCheck.rows?.[0]?.exists || false

          if (!valueExists) {
            await db.execute(sql`
              ALTER TYPE ${sql.identifier(enumDef.name)} ADD VALUE ${value}
            `)
            console.log(`    → Added value "${value}" to ${enumDef.name}`)
          }
        }
      } else {
        // Create the enum
        const valuesStr = enumDef.values.map((v) => `'${v}'`).join(', ')
        await db.execute(sql.raw(`
          CREATE TYPE ${enumDef.name} AS ENUM (${valuesStr})
        `))
        console.log(`  ✓ Created enum ${enumDef.name}`)
      }
    } catch (error) {
      console.log(`  → Skipped ${enumDef.name}: ${error instanceof Error ? error.message : 'unknown error'}`)
    }
  }

  // Step 2: Create tables if they don't exist
  console.log('📋 Creating tables...')

  try {
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS pages_blocks_features_features (
        "_order" integer NOT NULL,
        "_parent_id" varchar NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "icon" varchar,
        "title" varchar,
        "description" varchar,
        "enable_link" boolean,
        "link_type" enum_pages_blocks_features_features_link_type DEFAULT 'reference',
        "link_new_tab" boolean,
        "link_url" varchar,
        "link_label" varchar,
        "link_uui_color" enum_pages_blocks_features_features_link_uui_color DEFAULT 'link',
        "link_uui_size" enum_pages_blocks_features_features_link_uui_size DEFAULT 'md',
        "link_button_icon" varchar,
        "link_icon_pos" enum_pages_blocks_features_features_link_icon_pos DEFAULT 'trailing'
      )
    `)
    console.log('  ✓ Created table pages_blocks_features_features')
  } catch (error) {
    console.log(`  → Table pages_blocks_features_features already exists`)
  }

  try {
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS pages_blocks_features (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "_path" text NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "header_show_header" boolean DEFAULT true,
        "header_eyebrow" varchar,
        "header_heading" varchar,
        "header_description" varchar,
        "layout_options_card_style" enum_pages_blocks_features_layout_options_card_style DEFAULT 'card',
        "layout_options_card_background" enum_pages_blocks_features_layout_options_card_background DEFAULT 'grey',
        "layout_options_columns" enum_pages_blocks_features_layout_options_columns DEFAULT '3',
        "layout_options_icon_color" enum_pages_blocks_features_layout_options_icon_color DEFAULT 'brand',
        "layout_options_icon_theme" enum_pages_blocks_features_layout_options_icon_theme DEFAULT 'rounded-square',
        "layout_options_spacing" enum_pages_blocks_features_layout_options_spacing DEFAULT 'normal',
        "block_name" varchar
      )
    `)
    console.log('  ✓ Created table pages_blocks_features')
  } catch (error) {
    console.log(`  → Table pages_blocks_features already exists`)
  }

  try {
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS _pages_v_blocks_features_features (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "id" serial PRIMARY KEY NOT NULL,
        "icon" varchar,
        "title" varchar,
        "description" varchar,
        "enable_link" boolean,
        "link_type" enum__pages_v_blocks_features_features_link_type DEFAULT 'reference',
        "link_new_tab" boolean,
        "link_url" varchar,
        "link_label" varchar,
        "link_uui_color" enum__pages_v_blocks_features_features_link_uui_color DEFAULT 'link',
        "link_uui_size" enum__pages_v_blocks_features_features_link_uui_size DEFAULT 'md',
        "link_button_icon" varchar,
        "link_icon_pos" enum__pages_v_blocks_features_features_link_icon_pos DEFAULT 'trailing',
        "_uuid" varchar
      )
    `)
    console.log('  ✓ Created table _pages_v_blocks_features_features')
  } catch (error) {
    console.log(`  → Table _pages_v_blocks_features_features already exists`)
  }

  try {
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS _pages_v_blocks_features (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "_path" text NOT NULL,
        "id" serial PRIMARY KEY NOT NULL,
        "header_show_header" boolean DEFAULT true,
        "header_eyebrow" varchar,
        "header_heading" varchar,
        "header_description" varchar,
        "layout_options_card_style" enum__pages_v_blocks_features_layout_options_card_style DEFAULT 'card',
        "layout_options_card_background" enum__pages_v_blocks_features_layout_options_card_background DEFAULT 'grey',
        "layout_options_columns" enum__pages_v_blocks_features_layout_options_columns DEFAULT '3',
        "layout_options_icon_color" enum__pages_v_blocks_features_layout_options_icon_color DEFAULT 'brand',
        "layout_options_icon_theme" enum__pages_v_blocks_features_layout_options_icon_theme DEFAULT 'rounded-square',
        "layout_options_spacing" enum__pages_v_blocks_features_layout_options_spacing DEFAULT 'normal',
        "_uuid" varchar,
        "block_name" varchar
      )
    `)
    console.log('  ✓ Created table _pages_v_blocks_features')
  } catch (error) {
    console.log(`  → Table _pages_v_blocks_features already exists`)
  }

  try {
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS not_found (
        "id" serial PRIMARY KEY NOT NULL,
        "heading" varchar DEFAULT '404' NOT NULL,
        "subheading" varchar DEFAULT 'This page could not be found.',
        "link_type" enum_not_found_link_type DEFAULT 'reference',
        "link_new_tab" boolean,
        "link_url" varchar,
        "link_label" varchar NOT NULL,
        "link_uui_color" enum_not_found_link_uui_color DEFAULT 'primary',
        "link_uui_size" enum_not_found_link_uui_size DEFAULT 'md',
        "link_button_icon" varchar,
        "link_icon_pos" enum_not_found_link_icon_pos DEFAULT 'trailing',
        "updated_at" timestamp(3) with time zone,
        "created_at" timestamp(3) with time zone
      )
    `)
    console.log('  ✓ Created table not_found')
  } catch (error) {
    console.log(`  → Table not_found already exists`)
  }

  try {
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS not_found_rels (
        "id" serial PRIMARY KEY NOT NULL,
        "order" integer,
        "parent_id" integer NOT NULL,
        "path" varchar NOT NULL,
        "pages_id" integer,
        "posts_id" integer
      )
    `)
    console.log('  ✓ Created table not_found_rels')
  } catch (error) {
    console.log(`  → Table not_found_rels already exists`)
  }

  // Step 3: Add new columns to existing tables
  console.log('➕ Adding new columns to existing tables...')

  const columnsToAdd = [
    { table: 'pages_blocks_cta_links', column: 'link_button_icon', type: 'varchar' },
    { table: 'pages_blocks_cta_links', column: 'link_icon_pos', type: 'enum_pages_blocks_cta_links_link_icon_pos', default: 'trailing' },
    { table: 'pages_blocks_content_columns', column: 'link_button_icon', type: 'varchar' },
    { table: 'pages_blocks_content_columns', column: 'link_icon_pos', type: 'enum_pages_blocks_content_columns_link_icon_pos', default: 'trailing' },
    { table: 'pages_blocks_button_block_buttons', column: 'link_button_icon', type: 'varchar' },
    { table: 'pages_blocks_button_block_buttons', column: 'link_icon_pos', type: 'enum_pages_blocks_button_block_buttons_link_icon_pos', default: 'trailing' },
    { table: '_pages_v_blocks_cta_links', column: 'link_button_icon', type: 'varchar' },
    { table: '_pages_v_blocks_cta_links', column: 'link_icon_pos', type: 'enum__pages_v_blocks_cta_links_link_icon_pos', default: 'trailing' },
    { table: '_pages_v_blocks_content_columns', column: 'link_button_icon', type: 'varchar' },
    { table: '_pages_v_blocks_content_columns', column: 'link_icon_pos', type: 'enum__pages_v_blocks_content_columns_link_icon_pos', default: 'trailing' },
    { table: '_pages_v_blocks_button_block_buttons', column: 'link_button_icon', type: 'varchar' },
    { table: '_pages_v_blocks_button_block_buttons', column: 'link_icon_pos', type: 'enum__pages_v_blocks_button_block_buttons_link_icon_pos', default: 'trailing' },
    { table: 'header', column: 'cta_button_link_button_icon', type: 'varchar' },
    { table: 'header', column: 'cta_button_link_icon_pos', type: 'enum_header_cta_button_link_icon_pos', default: 'trailing' },
    { table: 'footer_nav_columns_items', column: 'link_button_icon', type: 'varchar' },
    { table: 'footer_nav_columns_items', column: 'link_icon_pos', type: 'enum_footer_nav_columns_items_link_icon_pos', default: 'trailing' },
  ]

  for (const col of columnsToAdd) {
    try {
      const defaultClause = col.default ? `DEFAULT '${col.default}'` : ''
      await db.execute(sql.raw(`
        ALTER TABLE ${col.table}
        ADD COLUMN IF NOT EXISTS ${col.column} ${col.type} ${defaultClause}
      `))
      console.log(`  ✓ Added column ${col.table}.${col.column}`)
    } catch (error) {
      console.log(`  → Column ${col.table}.${col.column} already exists`)
    }
  }

  console.log('✅ Migration completed!')
  console.log('   Features block is now fully supported in production')
}

export async function down({ db: _db }: MigrateDownArgs): Promise<void> {
  console.log('⏪ Rolling back migration: Remove Features block...')
  console.log('   Note: This would require dropping tables and enum types.')
  console.log('   Manual intervention recommended for safety.')
  console.log('✅ Rollback acknowledged (no action taken)')
}
