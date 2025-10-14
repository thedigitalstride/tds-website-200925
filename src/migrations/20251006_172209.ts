import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_posts_blocks_latest_posts_content_source" AS ENUM('latest', 'manual');
  CREATE TYPE "public"."enum_posts_blocks_latest_posts_opts_num_posts" AS ENUM('3', '6', '9', '12');
  CREATE TYPE "public"."enum_posts_blocks_latest_posts_button_config_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_posts_blocks_latest_posts_button_config_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  CREATE TYPE "public"."enum_posts_blocks_latest_posts_button_config_link_uui_size" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_posts_blocks_latest_posts_button_config_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum_posts_blocks_latest_posts_layout_options_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_posts_blocks_latest_posts_layout_options_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_posts_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_posts_blocks_cta_links_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  CREATE TYPE "public"."enum_posts_blocks_cta_links_link_uui_size" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_posts_blocks_cta_links_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum_posts_blocks_cta_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__posts_v_blocks_latest_posts_content_source" AS ENUM('latest', 'manual');
  CREATE TYPE "public"."enum__posts_v_blocks_latest_posts_opts_num_posts" AS ENUM('3', '6', '9', '12');
  CREATE TYPE "public"."enum__posts_v_blocks_latest_posts_button_config_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__posts_v_blocks_latest_posts_button_config_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  CREATE TYPE "public"."enum__posts_v_blocks_latest_posts_button_config_link_uui_size" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__posts_v_blocks_latest_posts_button_config_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum__posts_v_blocks_latest_posts_layout_options_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__posts_v_blocks_latest_posts_layout_options_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__posts_v_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__posts_v_blocks_cta_links_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  CREATE TYPE "public"."enum__posts_v_blocks_cta_links_link_uui_size" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__posts_v_blocks_cta_links_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum__posts_v_blocks_cta_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TABLE "posts_blocks_latest_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"header_show_header" boolean DEFAULT true,
  	"header_eyebrow" varchar,
  	"header_heading" varchar DEFAULT 'Latest blog posts',
  	"header_description" varchar,
  	"content_source" "enum_posts_blocks_latest_posts_content_source" DEFAULT 'latest',
  	"opts_num_posts" "enum_posts_blocks_latest_posts_opts_num_posts" DEFAULT '3',
  	"opts_category_filter_id" integer,
  	"button_config_show_button" boolean DEFAULT true,
  	"button_config_link_type" "enum_posts_blocks_latest_posts_button_config_link_type" DEFAULT 'reference',
  	"button_config_link_new_tab" boolean,
  	"button_config_link_url" varchar,
  	"button_config_link_label" varchar,
  	"button_config_link_uui_color" "enum_posts_blocks_latest_posts_button_config_link_uui_color" DEFAULT 'primary',
  	"button_config_link_uui_size" "enum_posts_blocks_latest_posts_button_config_link_uui_size" DEFAULT 'xl',
  	"button_config_link_button_icon" varchar,
  	"button_config_link_icon_pos" "enum_posts_blocks_latest_posts_button_config_link_icon_pos" DEFAULT 'trailing',
  	"layout_options_columns" "enum_posts_blocks_latest_posts_layout_options_columns" DEFAULT '3',
  	"layout_options_spacing" "enum_posts_blocks_latest_posts_layout_options_spacing" DEFAULT 'normal',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_posts_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_uui_color" "enum_posts_blocks_cta_links_link_uui_color" DEFAULT 'primary',
  	"link_uui_size" "enum_posts_blocks_cta_links_link_uui_size" DEFAULT 'lg',
  	"link_button_icon" varchar,
  	"link_icon_pos" "enum_posts_blocks_cta_links_link_icon_pos" DEFAULT 'trailing'
  );
  
  CREATE TABLE "posts_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"spacing" "enum_posts_blocks_cta_spacing" DEFAULT 'normal',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption_text" varchar,
  	"caption_link_url" varchar,
  	"caption_link_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_latest_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_show_header" boolean DEFAULT true,
  	"header_eyebrow" varchar,
  	"header_heading" varchar DEFAULT 'Latest blog posts',
  	"header_description" varchar,
  	"content_source" "enum__posts_v_blocks_latest_posts_content_source" DEFAULT 'latest',
  	"opts_num_posts" "enum__posts_v_blocks_latest_posts_opts_num_posts" DEFAULT '3',
  	"opts_category_filter_id" integer,
  	"button_config_show_button" boolean DEFAULT true,
  	"button_config_link_type" "enum__posts_v_blocks_latest_posts_button_config_link_type" DEFAULT 'reference',
  	"button_config_link_new_tab" boolean,
  	"button_config_link_url" varchar,
  	"button_config_link_label" varchar,
  	"button_config_link_uui_color" "enum__posts_v_blocks_latest_posts_button_config_link_uui_color" DEFAULT 'primary',
  	"button_config_link_uui_size" "enum__posts_v_blocks_latest_posts_button_config_link_uui_size" DEFAULT 'xl',
  	"button_config_link_button_icon" varchar,
  	"button_config_link_icon_pos" "enum__posts_v_blocks_latest_posts_button_config_link_icon_pos" DEFAULT 'trailing',
  	"layout_options_columns" "enum__posts_v_blocks_latest_posts_layout_options_columns" DEFAULT '3',
  	"layout_options_spacing" "enum__posts_v_blocks_latest_posts_layout_options_spacing" DEFAULT 'normal',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__posts_v_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_uui_color" "enum__posts_v_blocks_cta_links_link_uui_color" DEFAULT 'primary',
  	"link_uui_size" "enum__posts_v_blocks_cta_links_link_uui_size" DEFAULT 'lg',
  	"link_button_icon" varchar,
  	"link_icon_pos" "enum__posts_v_blocks_cta_links_link_icon_pos" DEFAULT 'trailing',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"spacing" "enum__posts_v_blocks_cta_spacing" DEFAULT 'normal',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption_text" varchar,
  	"caption_link_url" varchar,
  	"caption_link_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "posts_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "_posts_v_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "posts_blocks_latest_posts" ADD CONSTRAINT "posts_blocks_latest_posts_opts_category_filter_id_categories_id_fk" FOREIGN KEY ("opts_category_filter_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_latest_posts" ADD CONSTRAINT "posts_blocks_latest_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_cta_links" ADD CONSTRAINT "posts_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_cta" ADD CONSTRAINT "posts_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_media_block" ADD CONSTRAINT "posts_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_media_block" ADD CONSTRAINT "posts_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_latest_posts" ADD CONSTRAINT "_posts_v_blocks_latest_posts_opts_category_filter_id_categories_id_fk" FOREIGN KEY ("opts_category_filter_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_latest_posts" ADD CONSTRAINT "_posts_v_blocks_latest_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_cta_links" ADD CONSTRAINT "_posts_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_cta" ADD CONSTRAINT "_posts_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_media_block" ADD CONSTRAINT "_posts_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_media_block" ADD CONSTRAINT "_posts_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_blocks_latest_posts_order_idx" ON "posts_blocks_latest_posts" USING btree ("_order");
  CREATE INDEX "posts_blocks_latest_posts_parent_id_idx" ON "posts_blocks_latest_posts" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_latest_posts_path_idx" ON "posts_blocks_latest_posts" USING btree ("_path");
  CREATE INDEX "posts_blocks_latest_posts_opts_opts_category_filter_idx" ON "posts_blocks_latest_posts" USING btree ("opts_category_filter_id");
  CREATE INDEX "posts_blocks_cta_links_order_idx" ON "posts_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "posts_blocks_cta_links_parent_id_idx" ON "posts_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_cta_order_idx" ON "posts_blocks_cta" USING btree ("_order");
  CREATE INDEX "posts_blocks_cta_parent_id_idx" ON "posts_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_cta_path_idx" ON "posts_blocks_cta" USING btree ("_path");
  CREATE INDEX "posts_blocks_media_block_order_idx" ON "posts_blocks_media_block" USING btree ("_order");
  CREATE INDEX "posts_blocks_media_block_parent_id_idx" ON "posts_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_media_block_path_idx" ON "posts_blocks_media_block" USING btree ("_path");
  CREATE INDEX "posts_blocks_media_block_media_idx" ON "posts_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "_posts_v_blocks_latest_posts_order_idx" ON "_posts_v_blocks_latest_posts" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_latest_posts_parent_id_idx" ON "_posts_v_blocks_latest_posts" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_latest_posts_path_idx" ON "_posts_v_blocks_latest_posts" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_latest_posts_opts_opts_category_filter_idx" ON "_posts_v_blocks_latest_posts" USING btree ("opts_category_filter_id");
  CREATE INDEX "_posts_v_blocks_cta_links_order_idx" ON "_posts_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_cta_links_parent_id_idx" ON "_posts_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_cta_order_idx" ON "_posts_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_cta_parent_id_idx" ON "_posts_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_cta_path_idx" ON "_posts_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_media_block_order_idx" ON "_posts_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_media_block_parent_id_idx" ON "_posts_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_media_block_path_idx" ON "_posts_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_media_block_media_idx" ON "_posts_v_blocks_media_block" USING btree ("media_id");
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_rels_pages_id_idx" ON "posts_rels" USING btree ("pages_id");
  CREATE INDEX "_posts_v_rels_pages_id_idx" ON "_posts_v_rels" USING btree ("pages_id");`)
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts_blocks_latest_posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_cta_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_media_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_latest_posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_cta_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_media_block" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "posts_blocks_latest_posts" CASCADE;
  DROP TABLE "posts_blocks_cta_links" CASCADE;
  DROP TABLE "posts_blocks_cta" CASCADE;
  DROP TABLE "posts_blocks_media_block" CASCADE;
  DROP TABLE "_posts_v_blocks_latest_posts" CASCADE;
  DROP TABLE "_posts_v_blocks_cta_links" CASCADE;
  DROP TABLE "_posts_v_blocks_cta" CASCADE;
  DROP TABLE "_posts_v_blocks_media_block" CASCADE;
  ALTER TABLE "posts_rels" DROP CONSTRAINT "posts_rels_pages_fk";
  
  ALTER TABLE "_posts_v_rels" DROP CONSTRAINT "_posts_v_rels_pages_fk";
  
  DROP INDEX "posts_rels_pages_id_idx";
  DROP INDEX "_posts_v_rels_pages_id_idx";
  ALTER TABLE "posts_rels" DROP COLUMN "pages_id";
  ALTER TABLE "_posts_v_rels" DROP COLUMN "pages_id";
  DROP TYPE "public"."enum_posts_blocks_latest_posts_content_source";
  DROP TYPE "public"."enum_posts_blocks_latest_posts_opts_num_posts";
  DROP TYPE "public"."enum_posts_blocks_latest_posts_button_config_link_type";
  DROP TYPE "public"."enum_posts_blocks_latest_posts_button_config_link_uui_color";
  DROP TYPE "public"."enum_posts_blocks_latest_posts_button_config_link_uui_size";
  DROP TYPE "public"."enum_posts_blocks_latest_posts_button_config_link_icon_pos";
  DROP TYPE "public"."enum_posts_blocks_latest_posts_layout_options_columns";
  DROP TYPE "public"."enum_posts_blocks_latest_posts_layout_options_spacing";
  DROP TYPE "public"."enum_posts_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_posts_blocks_cta_links_link_uui_color";
  DROP TYPE "public"."enum_posts_blocks_cta_links_link_uui_size";
  DROP TYPE "public"."enum_posts_blocks_cta_links_link_icon_pos";
  DROP TYPE "public"."enum_posts_blocks_cta_spacing";
  DROP TYPE "public"."enum__posts_v_blocks_latest_posts_content_source";
  DROP TYPE "public"."enum__posts_v_blocks_latest_posts_opts_num_posts";
  DROP TYPE "public"."enum__posts_v_blocks_latest_posts_button_config_link_type";
  DROP TYPE "public"."enum__posts_v_blocks_latest_posts_button_config_link_uui_color";
  DROP TYPE "public"."enum__posts_v_blocks_latest_posts_button_config_link_uui_size";
  DROP TYPE "public"."enum__posts_v_blocks_latest_posts_button_config_link_icon_pos";
  DROP TYPE "public"."enum__posts_v_blocks_latest_posts_layout_options_columns";
  DROP TYPE "public"."enum__posts_v_blocks_latest_posts_layout_options_spacing";
  DROP TYPE "public"."enum__posts_v_blocks_cta_links_link_type";
  DROP TYPE "public"."enum__posts_v_blocks_cta_links_link_uui_color";
  DROP TYPE "public"."enum__posts_v_blocks_cta_links_link_uui_size";
  DROP TYPE "public"."enum__posts_v_blocks_cta_links_link_icon_pos";
  DROP TYPE "public"."enum__posts_v_blocks_cta_spacing";`)
}
