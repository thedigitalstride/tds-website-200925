import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, _payload, _req }: MigrateUpArgs): Promise<void> {
  // Drop and recreate the description column as JSONB
  // This is necessary because PostgreSQL cannot automatically cast text to JSONB
  await db.execute(sql`
   ALTER TABLE "pages_blocks_features_features" DROP COLUMN IF EXISTS "description";
   ALTER TABLE "pages_blocks_features_features" ADD COLUMN "description" jsonb;

   ALTER TABLE "_pages_v_blocks_features_features" DROP COLUMN IF EXISTS "description";
   ALTER TABLE "_pages_v_blocks_features_features" ADD COLUMN "description" jsonb;`)
}

export async function down({ db, _payload, _req }: MigrateDownArgs): Promise<void> {
  // Reverse the migration by converting back to varchar
  await db.execute(sql`
   ALTER TABLE "pages_blocks_features_features" DROP COLUMN IF EXISTS "description";
   ALTER TABLE "pages_blocks_features_features" ADD COLUMN "description" varchar;

   ALTER TABLE "_pages_v_blocks_features_features" DROP COLUMN IF EXISTS "description";
   ALTER TABLE "_pages_v_blocks_features_features" ADD COLUMN "description" varchar;`)
}
