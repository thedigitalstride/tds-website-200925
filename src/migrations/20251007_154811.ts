import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_blocks_features_layout_options_columns" ADD VALUE '1' BEFORE '2';
  ALTER TYPE "public"."enum__pages_v_blocks_features_layout_options_columns" ADD VALUE '1' BEFORE '2';
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

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_features" ALTER COLUMN "layout_options_card_background" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_features" ALTER COLUMN "layout_options_card_background" SET DEFAULT 'grey'::text;
  DROP TYPE "public"."enum_pages_blocks_features_layout_options_card_background";
  CREATE TYPE "public"."enum_pages_blocks_features_layout_options_card_background" AS ENUM('grey', 'brand', 'outline', 'line');
  ALTER TABLE "pages_blocks_features" ALTER COLUMN "layout_options_card_background" SET DEFAULT 'grey'::"public"."enum_pages_blocks_features_layout_options_card_background";
  ALTER TABLE "pages_blocks_features" ALTER COLUMN "layout_options_card_background" SET DATA TYPE "public"."enum_pages_blocks_features_layout_options_card_background" USING "layout_options_card_background"::"public"."enum_pages_blocks_features_layout_options_card_background";
  ALTER TABLE "pages_blocks_features" ALTER COLUMN "layout_options_columns" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_features" ALTER COLUMN "layout_options_columns" SET DEFAULT '3'::text;
  DROP TYPE "public"."enum_pages_blocks_features_layout_options_columns";
  CREATE TYPE "public"."enum_pages_blocks_features_layout_options_columns" AS ENUM('2', '3', '4');
  ALTER TABLE "pages_blocks_features" ALTER COLUMN "layout_options_columns" SET DEFAULT '3'::"public"."enum_pages_blocks_features_layout_options_columns";
  ALTER TABLE "pages_blocks_features" ALTER COLUMN "layout_options_columns" SET DATA TYPE "public"."enum_pages_blocks_features_layout_options_columns" USING "layout_options_columns"::"public"."enum_pages_blocks_features_layout_options_columns";
  ALTER TABLE "_pages_v_blocks_features" ALTER COLUMN "layout_options_card_background" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_features" ALTER COLUMN "layout_options_card_background" SET DEFAULT 'grey'::text;
  DROP TYPE "public"."enum__pages_v_blocks_features_layout_options_card_background";
  CREATE TYPE "public"."enum__pages_v_blocks_features_layout_options_card_background" AS ENUM('grey', 'brand', 'outline', 'line');
  ALTER TABLE "_pages_v_blocks_features" ALTER COLUMN "layout_options_card_background" SET DEFAULT 'grey'::"public"."enum__pages_v_blocks_features_layout_options_card_background";
  ALTER TABLE "_pages_v_blocks_features" ALTER COLUMN "layout_options_card_background" SET DATA TYPE "public"."enum__pages_v_blocks_features_layout_options_card_background" USING "layout_options_card_background"::"public"."enum__pages_v_blocks_features_layout_options_card_background";
  ALTER TABLE "_pages_v_blocks_features" ALTER COLUMN "layout_options_columns" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_features" ALTER COLUMN "layout_options_columns" SET DEFAULT '3'::text;
  DROP TYPE "public"."enum__pages_v_blocks_features_layout_options_columns";
  CREATE TYPE "public"."enum__pages_v_blocks_features_layout_options_columns" AS ENUM('2', '3', '4');
  ALTER TABLE "_pages_v_blocks_features" ALTER COLUMN "layout_options_columns" SET DEFAULT '3'::"public"."enum__pages_v_blocks_features_layout_options_columns";
  ALTER TABLE "_pages_v_blocks_features" ALTER COLUMN "layout_options_columns" SET DATA TYPE "public"."enum__pages_v_blocks_features_layout_options_columns" USING "layout_options_columns"::"public"."enum__pages_v_blocks_features_layout_options_columns";`)
}
