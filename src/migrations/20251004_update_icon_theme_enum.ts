import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Step 1: Add new enum values to the enum type
  await db.execute(sql`
    ALTER TYPE enum_pages_blocks_features_layout_options_icon_theme
    ADD VALUE IF NOT EXISTS 'rounded-square';
  `)

  await db.execute(sql`
    ALTER TYPE enum_pages_blocks_features_layout_options_icon_theme
    ADD VALUE IF NOT EXISTS 'round';
  `)

  await db.execute(sql`
    ALTER TYPE enum__pages_v_blocks_features_layout_options_icon_theme
    ADD VALUE IF NOT EXISTS 'rounded-square';
  `)

  await db.execute(sql`
    ALTER TYPE enum__pages_v_blocks_features_layout_options_icon_theme
    ADD VALUE IF NOT EXISTS 'round';
  `)

  // Step 2: Update existing data - map old values to new values
  // Map: modern, light, gradient, modern-neue -> rounded-square
  // Map: dark, outline -> round
  await db.execute(sql`
    UPDATE pages_blocks_features
    SET layout_options_icon_theme = 'rounded-square'
    WHERE layout_options_icon_theme IN ('modern', 'light', 'gradient', 'modern-neue');
  `)

  await db.execute(sql`
    UPDATE pages_blocks_features
    SET layout_options_icon_theme = 'round'
    WHERE layout_options_icon_theme IN ('dark', 'outline');
  `)

  // Update version history table
  await db.execute(sql`
    UPDATE _pages_v_blocks_features
    SET layout_options_icon_theme = 'rounded-square'
    WHERE layout_options_icon_theme IN ('modern', 'light', 'gradient', 'modern-neue');
  `)

  await db.execute(sql`
    UPDATE _pages_v_blocks_features
    SET layout_options_icon_theme = 'round'
    WHERE layout_options_icon_theme IN ('dark', 'outline');
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Note: PostgreSQL doesn't support removing enum values easily
  // This is a one-way migration
  payload.logger.warn('Cannot rollback enum value additions in PostgreSQL')
}
