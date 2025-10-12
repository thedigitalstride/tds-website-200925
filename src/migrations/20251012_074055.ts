import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_heading" ADD COLUMN "enable_typewriter" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_hero_heading" ADD COLUMN "enable_typewriter" boolean DEFAULT false;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_heading" DROP COLUMN "enable_typewriter";
  ALTER TABLE "_pages_v_blocks_hero_heading" DROP COLUMN "enable_typewriter";`)
}
