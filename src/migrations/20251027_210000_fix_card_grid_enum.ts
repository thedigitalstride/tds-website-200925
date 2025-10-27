import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Add missing enum values to card_grid_card_background enums
  // The CardGrid config expects: 'none', 'primary', 'primary-reversed', 'secondary', 'tertiary', 'accent', 'line'
  // But the enum only has: 'primary', 'secondary', 'accent', 'line'
  // Missing: 'none', 'primary-reversed', 'tertiary'

  // Add to regular enum
  await db.execute(sql`
    ALTER TYPE "public"."enum_pages_blocks_card_grid_card_background"
    ADD VALUE IF NOT EXISTS 'none' BEFORE 'primary';
  `);

  await db.execute(sql`
    ALTER TYPE "public"."enum_pages_blocks_card_grid_card_background"
    ADD VALUE IF NOT EXISTS 'primary-reversed' AFTER 'primary';
  `);

  await db.execute(sql`
    ALTER TYPE "public"."enum_pages_blocks_card_grid_card_background"
    ADD VALUE IF NOT EXISTS 'tertiary' AFTER 'secondary';
  `);

  // Add to version enum
  await db.execute(sql`
    ALTER TYPE "public"."enum__pages_v_blocks_card_grid_card_background"
    ADD VALUE IF NOT EXISTS 'none' BEFORE 'primary';
  `);

  await db.execute(sql`
    ALTER TYPE "public"."enum__pages_v_blocks_card_grid_card_background"
    ADD VALUE IF NOT EXISTS 'primary-reversed' AFTER 'primary';
  `);

  await db.execute(sql`
    ALTER TYPE "public"."enum__pages_v_blocks_card_grid_card_background"
    ADD VALUE IF NOT EXISTS 'tertiary' AFTER 'secondary';
  `);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Note: You cannot easily remove values from enums in PostgreSQL
  // This would require recreating the entire type and all dependent columns
  // For safety, we'll leave this empty
}