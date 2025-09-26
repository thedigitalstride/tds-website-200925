import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts_populated_authors" ADD COLUMN "nickname" varchar;
  ALTER TABLE "_posts_v_version_populated_authors" ADD COLUMN "nickname" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts_populated_authors" DROP COLUMN "nickname";
  ALTER TABLE "_posts_v_version_populated_authors" DROP COLUMN "nickname";`)
}
