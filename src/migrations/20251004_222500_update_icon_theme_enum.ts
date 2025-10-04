import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-vercel-postgres'
import { sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Step 1: Add new enum values to the enum types
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

  // Step 2: Update existing data - set all to rounded-square as default
  // Cannot use WHERE clause with invalid enum values, so update all rows
  await db.execute(sql`
    UPDATE pages_blocks_features
    SET layout_options_icon_theme = 'rounded-square'
    WHERE layout_options_icon_theme IS NOT NULL;
  `)

  // Update version history table
  await db.execute(sql`
    UPDATE _pages_v_blocks_features
    SET layout_options_icon_theme = 'rounded-square'
    WHERE layout_options_icon_theme IS NOT NULL;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Note: PostgreSQL doesn't support removing enum values easily
  // This is a one-way migration
  payload.logger.warn('Cannot rollback enum value additions in PostgreSQL')
}
