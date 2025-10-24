import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" ADD COLUMN "sizes_card_mobile_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_card_mobile_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_card_mobile_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_card_mobile_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_card_mobile_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_card_mobile_filename" varchar;
  CREATE INDEX "media_sizes_card_mobile_sizes_card_mobile_filename_idx" ON "media" USING btree ("sizes_card_mobile_filename");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "media_sizes_card_mobile_sizes_card_mobile_filename_idx";
  ALTER TABLE "media" DROP COLUMN "sizes_card_mobile_url";
  ALTER TABLE "media" DROP COLUMN "sizes_card_mobile_width";
  ALTER TABLE "media" DROP COLUMN "sizes_card_mobile_height";
  ALTER TABLE "media" DROP COLUMN "sizes_card_mobile_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_card_mobile_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_card_mobile_filename";`)
}
