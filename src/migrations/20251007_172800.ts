import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_features" ALTER COLUMN "layout_options_card_background" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_features" ALTER COLUMN "layout_options_card_background" SET DEFAULT 'brand'::text;
  DROP TYPE "public"."enum_pages_blocks_features_layout_options_card_background";
  CREATE TYPE "public"."enum_pages_blocks_features_layout_options_card_background" AS ENUM('brand', 'accent', 'outline', 'line', 'grey');
  ALTER TABLE "pages_blocks_features" ALTER COLUMN "layout_options_card_background" SET DEFAULT 'brand'::"public"."enum_pages_blocks_features_layout_options_card_background";
  ALTER TABLE "pages_blocks_features" ALTER COLUMN "layout_options_card_background" SET DATA TYPE "public"."enum_pages_blocks_features_layout_options_card_background" USING "layout_options_card_background"::"public"."enum_pages_blocks_features_layout_options_card_background";
  ALTER TABLE "_pages_v_blocks_features" ALTER COLUMN "layout_options_card_background" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_features" ALTER COLUMN "layout_options_card_background" SET DEFAULT 'brand'::text;
  DROP TYPE "public"."enum__pages_v_blocks_features_layout_options_card_background";
  CREATE TYPE "public"."enum__pages_v_blocks_features_layout_options_card_background" AS ENUM('brand', 'accent', 'outline', 'line', 'grey');
  ALTER TABLE "_pages_v_blocks_features" ALTER COLUMN "layout_options_card_background" SET DEFAULT 'brand'::"public"."enum__pages_v_blocks_features_layout_options_card_background";
  ALTER TABLE "_pages_v_blocks_features" ALTER COLUMN "layout_options_card_background" SET DATA TYPE "public"."enum__pages_v_blocks_features_layout_options_card_background" USING "layout_options_card_background"::"public"."enum__pages_v_blocks_features_layout_options_card_background";`)
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_features" ALTER COLUMN "layout_options_card_background" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_features" ALTER COLUMN "layout_options_card_background" SET DEFAULT 'brand'::text;
  DROP TYPE "public"."enum_pages_blocks_features_layout_options_card_background";
  CREATE TYPE "public"."enum_pages_blocks_features_layout_options_card_background" AS ENUM('brand', 'grey', 'outline', 'line');
  ALTER TABLE "pages_blocks_features" ALTER COLUMN "layout_options_card_background" SET DEFAULT 'brand'::"public"."enum_pages_blocks_features_layout_options_card_background";
  ALTER TABLE "pages_blocks_features" ALTER COLUMN "layout_options_card_background" SET DATA TYPE "public"."enum_pages_blocks_features_layout_options_card_background" USING "layout_options_card_background"::"public"."enum_pages_blocks_features_layout_options_card_background";
  ALTER TABLE "_pages_v_blocks_features" ALTER COLUMN "layout_options_card_background" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_features" ALTER COLUMN "layout_options_card_background" SET DEFAULT 'brand'::text;
  DROP TYPE "public"."enum__pages_v_blocks_features_layout_options_card_background";
  CREATE TYPE "public"."enum__pages_v_blocks_features_layout_options_card_background" AS ENUM('brand', 'grey', 'outline', 'line');
  ALTER TABLE "_pages_v_blocks_features" ALTER COLUMN "layout_options_card_background" SET DEFAULT 'brand'::"public"."enum__pages_v_blocks_features_layout_options_card_background";
  ALTER TABLE "_pages_v_blocks_features" ALTER COLUMN "layout_options_card_background" SET DATA TYPE "public"."enum__pages_v_blocks_features_layout_options_card_background" USING "layout_options_card_background"::"public"."enum__pages_v_blocks_features_layout_options_card_background";`)
}
