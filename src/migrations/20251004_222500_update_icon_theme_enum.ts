import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-vercel-postgres'
import { sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Step 1: Convert enum columns to varchar to allow updates
  await db.execute(sql`
    ALTER TABLE pages_blocks_features
    ALTER COLUMN layout_options_icon_theme TYPE varchar(255);
  `)

  await db.execute(sql`
    ALTER TABLE _pages_v_blocks_features
    ALTER COLUMN layout_options_icon_theme TYPE varchar(255);
  `)

  // Step 2: Update all values to 'rounded-square' as default
  await db.execute(sql`
    UPDATE pages_blocks_features
    SET layout_options_icon_theme = 'rounded-square'
    WHERE layout_options_icon_theme IS NOT NULL;
  `)

  await db.execute(sql`
    UPDATE _pages_v_blocks_features
    SET layout_options_icon_theme = 'rounded-square'
    WHERE layout_options_icon_theme IS NOT NULL;
  `)

  // Step 3: Drop old enum types
  await db.execute(sql`
    DROP TYPE IF EXISTS enum_pages_blocks_features_layout_options_icon_theme CASCADE;
  `)

  await db.execute(sql`
    DROP TYPE IF EXISTS enum__pages_v_blocks_features_layout_options_icon_theme CASCADE;
  `)

  // Step 4: Create new enum types with only new values
  await db.execute(sql`
    CREATE TYPE enum_pages_blocks_features_layout_options_icon_theme AS ENUM ('rounded-square', 'round');
  `)

  await db.execute(sql`
    CREATE TYPE enum__pages_v_blocks_features_layout_options_icon_theme AS ENUM ('rounded-square', 'round');
  `)

  // Step 5: Convert columns back to enum
  await db.execute(sql`
    ALTER TABLE pages_blocks_features
    ALTER COLUMN layout_options_icon_theme TYPE enum_pages_blocks_features_layout_options_icon_theme
    USING layout_options_icon_theme::enum_pages_blocks_features_layout_options_icon_theme;
  `)

  await db.execute(sql`
    ALTER TABLE _pages_v_blocks_features
    ALTER COLUMN layout_options_icon_theme TYPE enum__pages_v_blocks_features_layout_options_icon_theme
    USING layout_options_icon_theme::enum__pages_v_blocks_features_layout_options_icon_theme;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Note: PostgreSQL doesn't support removing enum values easily
  // This is a one-way migration
  payload.logger.warn('Cannot rollback enum value additions in PostgreSQL')
}
