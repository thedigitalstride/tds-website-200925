import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_heading_layout_options_headline_color" AS ENUM('primary', 'brand');
  CREATE TYPE "public"."enum_pages_blocks_hero_heading_layout_options_text_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_hero_heading_layout_options_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_breadcrumb_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_cta_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_content_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_archive_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_button_block_buttons_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_button_block_buttons_link_uui_color" AS ENUM('primary', 'secondary', 'tertiary', 'link-gray', 'link-color', 'primary-destructive', 'secondary-destructive', 'tertiary-destructive', 'link-destructive');
  CREATE TYPE "public"."enum_pages_blocks_button_block_buttons_link_uui_size" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_button_block_buttons_icon_position" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum_pages_blocks_button_block_layout" AS ENUM('horizontal', 'vertical');
  CREATE TYPE "public"."enum_pages_blocks_button_block_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_heading_layout_options_headline_color" AS ENUM('primary', 'brand');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_heading_layout_options_text_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_heading_layout_options_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_breadcrumb_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_content_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_button_block_buttons_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_button_block_buttons_link_uui_color" AS ENUM('primary', 'secondary', 'tertiary', 'link-gray', 'link-color', 'primary-destructive', 'secondary-destructive', 'tertiary-destructive', 'link-destructive');
  CREATE TYPE "public"."enum__pages_v_blocks_button_block_buttons_link_uui_size" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_button_block_buttons_icon_position" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum__pages_v_blocks_button_block_layout" AS ENUM('horizontal', 'vertical');
  CREATE TYPE "public"."enum__pages_v_blocks_button_block_alignment" AS ENUM('left', 'center', 'right');
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
  
  CREATE TABLE "pages_blocks_button_block_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_button_block_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_uui_color" "enum_pages_blocks_button_block_buttons_link_uui_color" DEFAULT 'primary',
  	"link_uui_size" "enum_pages_blocks_button_block_buttons_link_uui_size" DEFAULT 'md',
  	"icon" varchar,
  	"icon_position" "enum_pages_blocks_button_block_buttons_icon_position" DEFAULT 'leading'
  );
  
  CREATE TABLE "pages_blocks_button_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"layout" "enum_pages_blocks_button_block_layout" DEFAULT 'horizontal',
  	"alignment" "enum_pages_blocks_button_block_alignment" DEFAULT 'left',
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
  
  CREATE TABLE "_pages_v_blocks_button_block_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_button_block_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_uui_color" "enum__pages_v_blocks_button_block_buttons_link_uui_color" DEFAULT 'primary',
  	"link_uui_size" "enum__pages_v_blocks_button_block_buttons_link_uui_size" DEFAULT 'md',
  	"icon" varchar,
  	"icon_position" "enum__pages_v_blocks_button_block_buttons_icon_position" DEFAULT 'leading',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_button_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"layout" "enum__pages_v_blocks_button_block_layout" DEFAULT 'horizontal',
  	"alignment" "enum__pages_v_blocks_button_block_alignment" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_hero_links" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_hero_links" CASCADE;
  DROP TABLE "_pages_v_version_hero_links" CASCADE;
  ALTER TABLE "pages" DROP CONSTRAINT "pages_hero_media_id_media_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_hero_media_id_media_id_fk";
  
  DROP INDEX "pages_hero_hero_media_idx";
  DROP INDEX "_pages_v_version_hero_version_hero_media_idx";
  ALTER TABLE "header_nav_items_dropdown_items" ALTER COLUMN "icon" SET DATA TYPE varchar;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "spacing" "enum_pages_blocks_cta_spacing" DEFAULT 'normal';
  ALTER TABLE "pages_blocks_content" ADD COLUMN "spacing" "enum_pages_blocks_content_spacing" DEFAULT 'normal';
  ALTER TABLE "pages_blocks_archive" ADD COLUMN "spacing" "enum_pages_blocks_archive_spacing" DEFAULT 'normal';
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "spacing" "enum__pages_v_blocks_cta_spacing" DEFAULT 'normal';
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "spacing" "enum__pages_v_blocks_content_spacing" DEFAULT 'normal';
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN "spacing" "enum__pages_v_blocks_archive_spacing" DEFAULT 'normal';
  ALTER TABLE "pages_blocks_hero_heading" ADD CONSTRAINT "pages_blocks_hero_heading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_breadcrumb" ADD CONSTRAINT "pages_blocks_breadcrumb_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_button_block_buttons" ADD CONSTRAINT "pages_blocks_button_block_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_button_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_button_block" ADD CONSTRAINT "pages_blocks_button_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_heading" ADD CONSTRAINT "_pages_v_blocks_hero_heading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_breadcrumb" ADD CONSTRAINT "_pages_v_blocks_breadcrumb_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_button_block_buttons" ADD CONSTRAINT "_pages_v_blocks_button_block_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_button_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_button_block" ADD CONSTRAINT "_pages_v_blocks_button_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_heading_order_idx" ON "pages_blocks_hero_heading" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_heading_parent_id_idx" ON "pages_blocks_hero_heading" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_heading_path_idx" ON "pages_blocks_hero_heading" USING btree ("_path");
  CREATE INDEX "pages_blocks_breadcrumb_order_idx" ON "pages_blocks_breadcrumb" USING btree ("_order");
  CREATE INDEX "pages_blocks_breadcrumb_parent_id_idx" ON "pages_blocks_breadcrumb" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_breadcrumb_path_idx" ON "pages_blocks_breadcrumb" USING btree ("_path");
  CREATE INDEX "pages_blocks_button_block_buttons_order_idx" ON "pages_blocks_button_block_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_button_block_buttons_parent_id_idx" ON "pages_blocks_button_block_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_button_block_order_idx" ON "pages_blocks_button_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_button_block_parent_id_idx" ON "pages_blocks_button_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_button_block_path_idx" ON "pages_blocks_button_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_heading_order_idx" ON "_pages_v_blocks_hero_heading" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_heading_parent_id_idx" ON "_pages_v_blocks_hero_heading" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_heading_path_idx" ON "_pages_v_blocks_hero_heading" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_breadcrumb_order_idx" ON "_pages_v_blocks_breadcrumb" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_breadcrumb_parent_id_idx" ON "_pages_v_blocks_breadcrumb" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_breadcrumb_path_idx" ON "_pages_v_blocks_breadcrumb" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_button_block_buttons_order_idx" ON "_pages_v_blocks_button_block_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_button_block_buttons_parent_id_idx" ON "_pages_v_blocks_button_block_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_button_block_order_idx" ON "_pages_v_blocks_button_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_button_block_parent_id_idx" ON "_pages_v_blocks_button_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_button_block_path_idx" ON "_pages_v_blocks_button_block" USING btree ("_path");
  ALTER TABLE "pages" DROP COLUMN "hero_type";
  ALTER TABLE "pages" DROP COLUMN "hero_rich_text";
  ALTER TABLE "pages" DROP COLUMN "hero_media_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_type";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_rich_text";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_media_id";
  DROP TYPE "public"."enum_pages_hero_links_link_type";
  DROP TYPE "public"."enum_pages_hero_links_link_appearance";
  DROP TYPE "public"."enum_pages_hero_type";
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_version_hero_type";
  DROP TYPE "public"."enum_header_nav_items_dropdown_items_icon";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  CREATE TYPE "public"."enum_header_nav_items_dropdown_items_icon" AS ENUM('TrendUp01', 'Users01', 'SearchLg', 'Mail01', 'InfoCircle', 'Briefcase01', 'File01', 'BarChart01', 'Globe01', 'Settings01', 'Target01', 'Star01', 'Shield01', 'Code01');
  CREATE TABLE "pages_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "_pages_v_version_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_version_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_version_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  ALTER TABLE "pages_blocks_hero_heading" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_breadcrumb" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_button_block_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_button_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_heading" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_breadcrumb" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_button_block_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_button_block" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_hero_heading" CASCADE;
  DROP TABLE "pages_blocks_breadcrumb" CASCADE;
  DROP TABLE "pages_blocks_button_block_buttons" CASCADE;
  DROP TABLE "pages_blocks_button_block" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_heading" CASCADE;
  DROP TABLE "_pages_v_blocks_breadcrumb" CASCADE;
  DROP TABLE "_pages_v_blocks_button_block_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_button_block" CASCADE;
  ALTER TABLE "header_nav_items_dropdown_items" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_header_nav_items_dropdown_items_icon" USING "icon"::"public"."enum_header_nav_items_dropdown_items_icon";
  ALTER TABLE "pages" ADD COLUMN "hero_type" "enum_pages_hero_type" DEFAULT 'lowImpact';
  ALTER TABLE "pages" ADD COLUMN "hero_rich_text" jsonb;
  ALTER TABLE "pages" ADD COLUMN "hero_media_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_type" "enum__pages_v_version_hero_type" DEFAULT 'lowImpact';
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_rich_text" jsonb;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_media_id" integer;
  ALTER TABLE "pages_hero_links" ADD CONSTRAINT "pages_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_links" ADD CONSTRAINT "_pages_v_version_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_hero_links_order_idx" ON "pages_hero_links" USING btree ("_order");
  CREATE INDEX "pages_hero_links_parent_id_idx" ON "pages_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_hero_links_order_idx" ON "_pages_v_version_hero_links" USING btree ("_order");
  CREATE INDEX "_pages_v_version_hero_links_parent_id_idx" ON "_pages_v_version_hero_links" USING btree ("_parent_id");
  ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_hero_hero_media_idx" ON "pages" USING btree ("hero_media_id");
  CREATE INDEX "_pages_v_version_hero_version_hero_media_idx" ON "_pages_v" USING btree ("version_hero_media_id");
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
  DROP TYPE "public"."enum_pages_blocks_button_block_buttons_link_type";
  DROP TYPE "public"."enum_pages_blocks_button_block_buttons_link_uui_color";
  DROP TYPE "public"."enum_pages_blocks_button_block_buttons_link_uui_size";
  DROP TYPE "public"."enum_pages_blocks_button_block_buttons_icon_position";
  DROP TYPE "public"."enum_pages_blocks_button_block_layout";
  DROP TYPE "public"."enum_pages_blocks_button_block_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_hero_heading_layout_options_headline_color";
  DROP TYPE "public"."enum__pages_v_blocks_hero_heading_layout_options_text_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_hero_heading_layout_options_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_breadcrumb_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_cta_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_content_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_archive_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_button_block_buttons_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_button_block_buttons_link_uui_color";
  DROP TYPE "public"."enum__pages_v_blocks_button_block_buttons_link_uui_size";
  DROP TYPE "public"."enum__pages_v_blocks_button_block_buttons_icon_position";
  DROP TYPE "public"."enum__pages_v_blocks_button_block_layout";
  DROP TYPE "public"."enum__pages_v_blocks_button_block_alignment";`)
}
