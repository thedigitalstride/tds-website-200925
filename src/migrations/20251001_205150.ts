import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_heading_layout_options_headline_color" AS ENUM('primary', 'brand');
  CREATE TYPE "public"."enum_pages_blocks_hero_heading_layout_options_text_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_hero_heading_layout_options_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_breadcrumb_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_cta_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_content_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_archive_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_heading_layout_options_headline_color" AS ENUM('primary', 'brand');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_heading_layout_options_text_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_heading_layout_options_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_breadcrumb_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_content_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TABLE "pages_blocks_hero_heading" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"subtitle" varchar,
  	"layout_options_headline_color" "enum_pages_blocks_hero_heading_layout_options_headline_color" DEFAULT 'primary',
  	"layout_options_text_alignment" "enum_pages_blocks_hero_heading_layout_options_text_alignment" DEFAULT 'left',
  	"layout_options_spacing" "enum_pages_blocks_hero_heading_layout_options_spacing" DEFAULT 'normal',
  	"block_name" varchar
  );

  CREATE TABLE "pages_blocks_breadcrumb" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"spacing" "enum_pages_blocks_breadcrumb_spacing" DEFAULT 'compact',
  	"block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_hero_heading" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"subtitle" varchar,
  	"layout_options_headline_color" "enum__pages_v_blocks_hero_heading_layout_options_headline_color" DEFAULT 'primary',
  	"layout_options_text_alignment" "enum__pages_v_blocks_hero_heading_layout_options_text_alignment" DEFAULT 'left',
  	"layout_options_spacing" "enum__pages_v_blocks_hero_heading_layout_options_spacing" DEFAULT 'normal',
  	"_uuid" varchar,
  	"block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_breadcrumb" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"spacing" "enum__pages_v_blocks_breadcrumb_spacing" DEFAULT 'compact',
  	"_uuid" varchar,
  	"block_name" varchar
  );

  ALTER TABLE "pages_blocks_cta" ADD COLUMN "spacing" "enum_pages_blocks_cta_spacing" DEFAULT 'normal';
  ALTER TABLE "pages_blocks_content" ADD COLUMN "spacing" "enum_pages_blocks_content_spacing" DEFAULT 'normal';
  ALTER TABLE "pages_blocks_archive" ADD COLUMN "spacing" "enum_pages_blocks_archive_spacing" DEFAULT 'normal';
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "spacing" "enum__pages_v_blocks_cta_spacing" DEFAULT 'normal';
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "spacing" "enum__pages_v_blocks_content_spacing" DEFAULT 'normal';
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN "spacing" "enum__pages_v_blocks_archive_spacing" DEFAULT 'normal';
  ALTER TABLE "pages_blocks_hero_heading" ADD CONSTRAINT "pages_blocks_hero_heading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_breadcrumb" ADD CONSTRAINT "pages_blocks_breadcrumb_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_heading" ADD CONSTRAINT "_pages_v_blocks_hero_heading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_breadcrumb" ADD CONSTRAINT "_pages_v_blocks_breadcrumb_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_heading_order_idx" ON "pages_blocks_hero_heading" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_heading_parent_id_idx" ON "pages_blocks_hero_heading" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_heading_path_idx" ON "pages_blocks_hero_heading" USING btree ("_path");
  CREATE INDEX "pages_blocks_breadcrumb_order_idx" ON "pages_blocks_breadcrumb" USING btree ("_order");
  CREATE INDEX "pages_blocks_breadcrumb_parent_id_idx" ON "pages_blocks_breadcrumb" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_breadcrumb_path_idx" ON "pages_blocks_breadcrumb" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_heading_order_idx" ON "_pages_v_blocks_hero_heading" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_heading_parent_id_idx" ON "_pages_v_blocks_hero_heading" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_heading_path_idx" ON "_pages_v_blocks_hero_heading" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_breadcrumb_order_idx" ON "_pages_v_blocks_breadcrumb" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_breadcrumb_parent_id_idx" ON "_pages_v_blocks_breadcrumb" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_breadcrumb_path_idx" ON "_pages_v_blocks_breadcrumb" USING btree ("_path");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_heading" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_breadcrumb" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_heading" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_breadcrumb" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_hero_heading" CASCADE;
  DROP TABLE "pages_blocks_breadcrumb" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_heading" CASCADE;
  DROP TABLE "_pages_v_blocks_breadcrumb" CASCADE;
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "spacing";
  ALTER TABLE "pages_blocks_content" DROP COLUMN "spacing";
  ALTER TABLE "pages_blocks_archive" DROP COLUMN "spacing";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "spacing";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN "spacing";
  ALTER TABLE "_pages_v_blocks_archive" DROP COLUMN "spacing";
  DROP TYPE "public"."enum_pages_blocks_hero_heading_layout_options_headline_color";
  DROP TYPE "public"."enum_pages_blocks_hero_heading_layout_options_text_alignment";
  DROP TYPE "public"."enum_pages_blocks_hero_heading_layout_options_spacing";
  DROP TYPE "public"."enum_pages_blocks_breadcrumb_spacing";
  DROP TYPE "public"."enum_pages_blocks_cta_spacing";
  DROP TYPE "public"."enum_pages_blocks_content_spacing";
  DROP TYPE "public"."enum_pages_blocks_archive_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_hero_heading_layout_options_headline_color";
  DROP TYPE "public"."enum__pages_v_blocks_hero_heading_layout_options_text_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_hero_heading_layout_options_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_breadcrumb_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_cta_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_content_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_archive_spacing";`)
}
