import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_ai_settings_model" AS ENUM('gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-4', 'gpt-3.5-turbo');
  CREATE TYPE "public"."enum_ai_settings_alt_tag_model" AS ENUM('', 'gpt-4o', 'gpt-4o-mini');
  CREATE TYPE "public"."enum_ai_settings_seo_meta_title_model" AS ENUM('', 'gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo');
  CREATE TYPE "public"."enum_ai_settings_seo_meta_description_model" AS ENUM('', 'gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo');
  ALTER TABLE "ai_settings" ALTER COLUMN "model" SET DEFAULT 'gpt-4o'::"public"."enum_ai_settings_model";
  ALTER TABLE "ai_settings" ALTER COLUMN "model" SET DATA TYPE "public"."enum_ai_settings_model" USING "model"::"public"."enum_ai_settings_model";
  ALTER TABLE "ai_settings" ADD COLUMN "alt_tag_model" "enum_ai_settings_alt_tag_model";
  ALTER TABLE "ai_settings" ADD COLUMN "seo_meta_title_model" "enum_ai_settings_seo_meta_title_model";
  ALTER TABLE "ai_settings" ADD COLUMN "seo_meta_description_model" "enum_ai_settings_seo_meta_description_model";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "ai_settings" ALTER COLUMN "model" SET DATA TYPE varchar;
  ALTER TABLE "ai_settings" ALTER COLUMN "model" SET DEFAULT 'gpt-4o';
  ALTER TABLE "ai_settings" DROP COLUMN "alt_tag_model";
  ALTER TABLE "ai_settings" DROP COLUMN "seo_meta_title_model";
  ALTER TABLE "ai_settings" DROP COLUMN "seo_meta_description_model";
  DROP TYPE "public"."enum_ai_settings_model";
  DROP TYPE "public"."enum_ai_settings_alt_tag_model";
  DROP TYPE "public"."enum_ai_settings_seo_meta_title_model";
  DROP TYPE "public"."enum_ai_settings_seo_meta_description_model";`)
}
