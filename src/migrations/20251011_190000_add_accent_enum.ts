import { MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Add 'accent' to the enum_header_cta_button_link_uui_color enum
  await db.execute(sql`
    ALTER TYPE "enum_header_cta_button_link_uui_color" ADD VALUE IF NOT EXISTS 'accent';
  `)
}

export async function down(): Promise<void> {
  // Note: PostgreSQL doesn't support removing enum values directly
  // You would need to recreate the enum type if rollback is needed
  console.warn('Rollback not implemented - cannot remove enum values in PostgreSQL')
}
