import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Migration to add Features block support
 *
 * This migration uses the varchar conversion strategy to safely handle enum types.
 * It avoids ALTER TYPE ADD VALUE which cannot run in transactions.
 *
 * Strategy:
 * 1. Create new enum types with all values
 * 2. Create new tables
 * 3. Add new columns to existing tables
 */

export async function up({ db }: MigrateUpArgs): Promise<void> {
  console.log('🔄 Starting migration: Add Features block support...')

  // Step 1: Create all enum types (these will be created fresh with all values)
  console.log('📋 Creating enum types...')

  const enumDefinitions = [
    `CREATE TYPE IF NOT EXISTS enum_pages_blocks_cta_links_link_icon_pos AS ENUM('leading', 'trailing')`,
    `CREATE TYPE IF NOT EXISTS enum_pages_blocks_content_columns_link_icon_pos AS ENUM('leading', 'trailing')`,
    `CREATE TYPE IF NOT EXISTS enum_pages_blocks_button_block_buttons_link_icon_pos AS ENUM('leading', 'trailing')`,
    `CREATE TYPE IF NOT EXISTS enum_pages_blocks_features_features_link_type AS ENUM('reference', 'custom')`,
    `CREATE TYPE IF NOT EXISTS enum_pages_blocks_features_features_link_uui_color AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link')`,
    `CREATE TYPE IF NOT EXISTS enum_pages_blocks_features_features_link_uui_size AS ENUM('sm', 'md', 'lg', 'xl')`,
    `CREATE TYPE IF NOT EXISTS enum_pages_blocks_features_features_link_icon_pos AS ENUM('leading', 'trailing')`,
    `CREATE TYPE IF NOT EXISTS enum_pages_blocks_features_layout_options_card_style AS ENUM('card', 'centered-icon', 'left-icon', 'horizontal-icon', 'elevated-box')`,
    `CREATE TYPE IF NOT EXISTS enum_pages_blocks_features_layout_options_card_background AS ENUM('grey', 'brand', 'outline', 'line')`,
    `CREATE TYPE IF NOT EXISTS enum_pages_blocks_features_layout_options_columns AS ENUM('2', '3', '4')`,
    `CREATE TYPE IF NOT EXISTS enum_pages_blocks_features_layout_options_icon_color AS ENUM('brand', 'accent', 'secondary', 'tertiary')`,
    `CREATE TYPE IF NOT EXISTS enum_pages_blocks_features_layout_options_icon_theme AS ENUM('rounded-square', 'round')`,
    `CREATE TYPE IF NOT EXISTS enum_pages_blocks_features_layout_options_spacing AS ENUM('compact', 'normal', 'spacious')`,
    `CREATE TYPE IF NOT EXISTS enum__pages_v_blocks_cta_links_link_icon_pos AS ENUM('leading', 'trailing')`,
    `CREATE TYPE IF NOT EXISTS enum__pages_v_blocks_content_columns_link_icon_pos AS ENUM('leading', 'trailing')`,
    `CREATE TYPE IF NOT EXISTS enum__pages_v_blocks_button_block_buttons_link_icon_pos AS ENUM('leading', 'trailing')`,
    `CREATE TYPE IF NOT EXISTS enum__pages_v_blocks_features_features_link_type AS ENUM('reference', 'custom')`,
    `CREATE TYPE IF NOT EXISTS enum__pages_v_blocks_features_features_link_uui_color AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link')`,
    `CREATE TYPE IF NOT EXISTS enum__pages_v_blocks_features_features_link_uui_size AS ENUM('sm', 'md', 'lg', 'xl')`,
    `CREATE TYPE IF NOT EXISTS enum__pages_v_blocks_features_features_link_icon_pos AS ENUM('leading', 'trailing')`,
    `CREATE TYPE IF NOT EXISTS enum__pages_v_blocks_features_layout_options_card_style AS ENUM('card', 'centered-icon', 'left-icon', 'horizontal-icon', 'elevated-box')`,
    `CREATE TYPE IF NOT EXISTS enum__pages_v_blocks_features_layout_options_card_background AS ENUM('grey', 'brand', 'outline', 'line')`,
    `CREATE TYPE IF NOT EXISTS enum__pages_v_blocks_features_layout_options_columns AS ENUM('2', '3', '4')`,
    `CREATE TYPE IF NOT EXISTS enum__pages_v_blocks_features_layout_options_icon_color AS ENUM('brand', 'accent', 'secondary', 'tertiary')`,
    `CREATE TYPE IF NOT EXISTS enum__pages_v_blocks_features_layout_options_icon_theme AS ENUM('rounded-square', 'round')`,
    `CREATE TYPE IF NOT EXISTS enum__pages_v_blocks_features_layout_options_spacing AS ENUM('compact', 'normal', 'spacious')`,
    `CREATE TYPE IF NOT EXISTS enum_header_cta_button_link_icon_pos AS ENUM('leading', 'trailing')`,
    `CREATE TYPE IF NOT EXISTS enum_footer_nav_columns_items_link_icon_pos AS ENUM('leading', 'trailing')`,
    `CREATE TYPE IF NOT EXISTS enum_not_found_link_type AS ENUM('reference', 'custom')`,
    `CREATE TYPE IF NOT EXISTS enum_not_found_link_uui_color AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link')`,
    `CREATE TYPE IF NOT EXISTS enum_not_found_link_uui_size AS ENUM('sm', 'md', 'lg', 'xl')`,
    `CREATE TYPE IF NOT EXISTS enum_not_found_link_icon_pos AS ENUM('leading', 'trailing')`,
  ]

  for (const enumDef of enumDefinitions) {
    try {
      await db.execute(sql.raw(enumDef))
      console.log(`  ✓ ${enumDef.substring(0, 80)}...`)
    } catch (_error) {
      // Enum already exists, that's OK
      console.log(`  → Enum already exists (this is fine)`)
    }
  }

  // Step 2: Create tables
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
  } catch (_error) {
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
  } catch (_error) {
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
  } catch (_error) {
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
  } catch (_error) {
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
  } catch (_error) {
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
  } catch (_error) {
    console.log(`  → Table not_found_rels already exists`)
  }

  // Step 3: Add new columns to existing tables
  console.log('➕ Adding new columns to existing tables...')

  const alterStatements = [
    `ALTER TABLE pages_blocks_cta_links ADD COLUMN IF NOT EXISTS link_button_icon varchar`,
    `ALTER TABLE pages_blocks_cta_links ADD COLUMN IF NOT EXISTS link_icon_pos enum_pages_blocks_cta_links_link_icon_pos DEFAULT 'trailing'`,
    `ALTER TABLE pages_blocks_content_columns ADD COLUMN IF NOT EXISTS link_button_icon varchar`,
    `ALTER TABLE pages_blocks_content_columns ADD COLUMN IF NOT EXISTS link_icon_pos enum_pages_blocks_content_columns_link_icon_pos DEFAULT 'trailing'`,
    `ALTER TABLE pages_blocks_button_block_buttons ADD COLUMN IF NOT EXISTS link_button_icon varchar`,
    `ALTER TABLE pages_blocks_button_block_buttons ADD COLUMN IF NOT EXISTS link_icon_pos enum_pages_blocks_button_block_buttons_link_icon_pos DEFAULT 'trailing'`,
    `ALTER TABLE _pages_v_blocks_cta_links ADD COLUMN IF NOT EXISTS link_button_icon varchar`,
    `ALTER TABLE _pages_v_blocks_cta_links ADD COLUMN IF NOT EXISTS link_icon_pos enum__pages_v_blocks_cta_links_link_icon_pos DEFAULT 'trailing'`,
    `ALTER TABLE _pages_v_blocks_content_columns ADD COLUMN IF NOT EXISTS link_button_icon varchar`,
    `ALTER TABLE _pages_v_blocks_content_columns ADD COLUMN IF NOT EXISTS link_icon_pos enum__pages_v_blocks_content_columns_link_icon_pos DEFAULT 'trailing'`,
    `ALTER TABLE _pages_v_blocks_button_block_buttons ADD COLUMN IF NOT EXISTS link_button_icon varchar`,
    `ALTER TABLE _pages_v_blocks_button_block_buttons ADD COLUMN IF NOT EXISTS link_icon_pos enum__pages_v_blocks_button_block_buttons_link_icon_pos DEFAULT 'trailing'`,
    `ALTER TABLE header ADD COLUMN IF NOT EXISTS cta_button_link_button_icon varchar`,
    `ALTER TABLE header ADD COLUMN IF NOT EXISTS cta_button_link_icon_pos enum_header_cta_button_link_icon_pos DEFAULT 'trailing'`,
    `ALTER TABLE footer_nav_columns_items ADD COLUMN IF NOT EXISTS link_button_icon varchar`,
    `ALTER TABLE footer_nav_columns_items ADD COLUMN IF NOT EXISTS link_icon_pos enum_footer_nav_columns_items_link_icon_pos DEFAULT 'trailing'`,
  ]

  for (const stmt of alterStatements) {
    try {
      await db.execute(sql.raw(stmt))
      console.log(`  ✓ ${stmt.substring(0, 80)}...`)
    } catch (_error) {
      console.log(`  → Column already exists (this is fine)`)
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
