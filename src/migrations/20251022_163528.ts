import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_accordion_header_header_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_accordion_content_source" AS ENUM('dynamic', 'manual');
  CREATE TYPE "public"."enum_pages_blocks_accordion_opts_limit" AS ENUM('3', '6', '9', '12', 'all');
  CREATE TYPE "public"."enum_pages_blocks_accordion_opts_sort_by" AS ENUM('order', 'date', 'question-asc', 'question-desc');
  CREATE TYPE "public"."enum_pages_blocks_accordion_display_options_default_state" AS ENUM('all-collapsed', 'first-open', 'all-open');
  CREATE TYPE "public"."enum_pages_blocks_accordion_display_options_icon_position" AS ENUM('right', 'left', 'none');
  CREATE TYPE "public"."enum_pages_blocks_accordion_display_options_icon_style" AS ENUM('chevron', 'plus-minus');
  CREATE TYPE "public"."enum_pages_blocks_accordion_layout_options_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_accordion_layout_options_card_background" AS ENUM('primary', 'secondary', 'accent');
  CREATE TYPE "public"."enum_pages_blocks_accordion_layout_options_divider_style" AS ENUM('line', 'card', 'none');
  CREATE TYPE "public"."enum_pages_blocks_accordion_layout_options_animation_speed" AS ENUM('fast', 'normal', 'slow');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_header_header_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_content_source" AS ENUM('dynamic', 'manual');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_opts_limit" AS ENUM('3', '6', '9', '12', 'all');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_opts_sort_by" AS ENUM('order', 'date', 'question-asc', 'question-desc');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_display_options_default_state" AS ENUM('all-collapsed', 'first-open', 'all-open');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_display_options_icon_position" AS ENUM('right', 'left', 'none');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_display_options_icon_style" AS ENUM('chevron', 'plus-minus');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_layout_options_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_layout_options_card_background" AS ENUM('primary', 'secondary', 'accent');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_layout_options_divider_style" AS ENUM('line', 'card', 'none');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_layout_options_animation_speed" AS ENUM('fast', 'normal', 'slow');
  CREATE TYPE "public"."enum_faqs_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__faqs_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "pages_blocks_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"header_show_header" boolean DEFAULT true,
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_description" varchar,
  	"header_header_alignment" "enum_pages_blocks_accordion_header_header_alignment" DEFAULT 'left',
  	"content_source" "enum_pages_blocks_accordion_content_source" DEFAULT 'dynamic',
  	"opts_limit" "enum_pages_blocks_accordion_opts_limit" DEFAULT 'all',
  	"opts_sort_by" "enum_pages_blocks_accordion_opts_sort_by" DEFAULT 'order',
  	"display_options_show_categories" boolean DEFAULT true,
  	"display_options_default_state" "enum_pages_blocks_accordion_display_options_default_state" DEFAULT 'all-collapsed',
  	"display_options_allow_multiple_open" boolean DEFAULT false,
  	"display_options_enable_search" boolean DEFAULT false,
  	"display_options_icon_position" "enum_pages_blocks_accordion_display_options_icon_position" DEFAULT 'right',
  	"display_options_icon_style" "enum_pages_blocks_accordion_display_options_icon_style" DEFAULT 'chevron',
  	"layout_options_spacing" "enum_pages_blocks_accordion_layout_options_spacing" DEFAULT 'normal',
  	"layout_options_card_background" "enum_pages_blocks_accordion_layout_options_card_background" DEFAULT 'primary',
  	"layout_options_divider_style" "enum_pages_blocks_accordion_layout_options_divider_style" DEFAULT 'line',
  	"layout_options_animation_speed" "enum_pages_blocks_accordion_layout_options_animation_speed" DEFAULT 'normal',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_show_header" boolean DEFAULT true,
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_description" varchar,
  	"header_header_alignment" "enum__pages_v_blocks_accordion_header_header_alignment" DEFAULT 'left',
  	"content_source" "enum__pages_v_blocks_accordion_content_source" DEFAULT 'dynamic',
  	"opts_limit" "enum__pages_v_blocks_accordion_opts_limit" DEFAULT 'all',
  	"opts_sort_by" "enum__pages_v_blocks_accordion_opts_sort_by" DEFAULT 'order',
  	"display_options_show_categories" boolean DEFAULT true,
  	"display_options_default_state" "enum__pages_v_blocks_accordion_display_options_default_state" DEFAULT 'all-collapsed',
  	"display_options_allow_multiple_open" boolean DEFAULT false,
  	"display_options_enable_search" boolean DEFAULT false,
  	"display_options_icon_position" "enum__pages_v_blocks_accordion_display_options_icon_position" DEFAULT 'right',
  	"display_options_icon_style" "enum__pages_v_blocks_accordion_display_options_icon_style" DEFAULT 'chevron',
  	"layout_options_spacing" "enum__pages_v_blocks_accordion_layout_options_spacing" DEFAULT 'normal',
  	"layout_options_card_background" "enum__pages_v_blocks_accordion_layout_options_card_background" DEFAULT 'primary',
  	"layout_options_divider_style" "enum__pages_v_blocks_accordion_layout_options_divider_style" DEFAULT 'line',
  	"layout_options_animation_speed" "enum__pages_v_blocks_accordion_layout_options_animation_speed" DEFAULT 'normal',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "faqs_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"file_id" integer,
  	"description" varchar
  );
  
  CREATE TABLE "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"featured" boolean DEFAULT false,
  	"order" numeric DEFAULT 0,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"meta_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_faqs_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "faqs_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"pages_id" integer,
  	"categories_id" integer
  );
  
  CREATE TABLE "_faqs_v_version_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"file_id" integer,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_faqs_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_question" varchar,
  	"version_answer" jsonb,
  	"version_featured" boolean DEFAULT false,
  	"version_order" numeric DEFAULT 0,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_meta_description" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__faqs_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_faqs_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"pages_id" integer,
  	"categories_id" integer
  );
  
  ALTER TABLE "pages_rels" ADD COLUMN "faqs_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "faqs_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "faqs_id" integer;
  ALTER TABLE "pages_blocks_accordion" ADD CONSTRAINT "pages_blocks_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_accordion" ADD CONSTRAINT "_pages_v_blocks_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs_resources" ADD CONSTRAINT "faqs_resources_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "faqs_resources" ADD CONSTRAINT "faqs_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs_rels" ADD CONSTRAINT "faqs_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs_rels" ADD CONSTRAINT "faqs_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs_rels" ADD CONSTRAINT "faqs_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs_rels" ADD CONSTRAINT "faqs_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_faqs_v_version_resources" ADD CONSTRAINT "_faqs_v_version_resources_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_faqs_v_version_resources" ADD CONSTRAINT "_faqs_v_version_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_faqs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_faqs_v" ADD CONSTRAINT "_faqs_v_parent_id_faqs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."faqs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_faqs_v_rels" ADD CONSTRAINT "_faqs_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_faqs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_faqs_v_rels" ADD CONSTRAINT "_faqs_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_faqs_v_rels" ADD CONSTRAINT "_faqs_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_faqs_v_rels" ADD CONSTRAINT "_faqs_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_accordion_order_idx" ON "pages_blocks_accordion" USING btree ("_order");
  CREATE INDEX "pages_blocks_accordion_parent_id_idx" ON "pages_blocks_accordion" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_accordion_path_idx" ON "pages_blocks_accordion" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_accordion_order_idx" ON "_pages_v_blocks_accordion" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_accordion_parent_id_idx" ON "_pages_v_blocks_accordion" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_accordion_path_idx" ON "_pages_v_blocks_accordion" USING btree ("_path");
  CREATE INDEX "faqs_resources_order_idx" ON "faqs_resources" USING btree ("_order");
  CREATE INDEX "faqs_resources_parent_id_idx" ON "faqs_resources" USING btree ("_parent_id");
  CREATE INDEX "faqs_resources_file_idx" ON "faqs_resources" USING btree ("file_id");
  CREATE INDEX "faqs_slug_idx" ON "faqs" USING btree ("slug");
  CREATE INDEX "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  CREATE INDEX "faqs__status_idx" ON "faqs" USING btree ("_status");
  CREATE INDEX "faqs_rels_order_idx" ON "faqs_rels" USING btree ("order");
  CREATE INDEX "faqs_rels_parent_idx" ON "faqs_rels" USING btree ("parent_id");
  CREATE INDEX "faqs_rels_path_idx" ON "faqs_rels" USING btree ("path");
  CREATE INDEX "faqs_rels_posts_id_idx" ON "faqs_rels" USING btree ("posts_id");
  CREATE INDEX "faqs_rels_pages_id_idx" ON "faqs_rels" USING btree ("pages_id");
  CREATE INDEX "faqs_rels_categories_id_idx" ON "faqs_rels" USING btree ("categories_id");
  CREATE INDEX "_faqs_v_version_resources_order_idx" ON "_faqs_v_version_resources" USING btree ("_order");
  CREATE INDEX "_faqs_v_version_resources_parent_id_idx" ON "_faqs_v_version_resources" USING btree ("_parent_id");
  CREATE INDEX "_faqs_v_version_resources_file_idx" ON "_faqs_v_version_resources" USING btree ("file_id");
  CREATE INDEX "_faqs_v_parent_idx" ON "_faqs_v" USING btree ("parent_id");
  CREATE INDEX "_faqs_v_version_version_slug_idx" ON "_faqs_v" USING btree ("version_slug");
  CREATE INDEX "_faqs_v_version_version_updated_at_idx" ON "_faqs_v" USING btree ("version_updated_at");
  CREATE INDEX "_faqs_v_version_version_created_at_idx" ON "_faqs_v" USING btree ("version_created_at");
  CREATE INDEX "_faqs_v_version_version__status_idx" ON "_faqs_v" USING btree ("version__status");
  CREATE INDEX "_faqs_v_created_at_idx" ON "_faqs_v" USING btree ("created_at");
  CREATE INDEX "_faqs_v_updated_at_idx" ON "_faqs_v" USING btree ("updated_at");
  CREATE INDEX "_faqs_v_latest_idx" ON "_faqs_v" USING btree ("latest");
  CREATE INDEX "_faqs_v_autosave_idx" ON "_faqs_v" USING btree ("autosave");
  CREATE INDEX "_faqs_v_rels_order_idx" ON "_faqs_v_rels" USING btree ("order");
  CREATE INDEX "_faqs_v_rels_parent_idx" ON "_faqs_v_rels" USING btree ("parent_id");
  CREATE INDEX "_faqs_v_rels_path_idx" ON "_faqs_v_rels" USING btree ("path");
  CREATE INDEX "_faqs_v_rels_posts_id_idx" ON "_faqs_v_rels" USING btree ("posts_id");
  CREATE INDEX "_faqs_v_rels_pages_id_idx" ON "_faqs_v_rels" USING btree ("pages_id");
  CREATE INDEX "_faqs_v_rels_categories_id_idx" ON "_faqs_v_rels" USING btree ("categories_id");
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_rels_faqs_id_idx" ON "pages_rels" USING btree ("faqs_id");
  CREATE INDEX "_pages_v_rels_faqs_id_idx" ON "_pages_v_rels" USING btree ("faqs_id");
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_accordion" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_accordion" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faqs_resources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faqs_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_faqs_v_version_resources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_faqs_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_faqs_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_accordion" CASCADE;
  DROP TABLE "_pages_v_blocks_accordion" CASCADE;
  DROP TABLE "faqs_resources" CASCADE;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "faqs_rels" CASCADE;
  DROP TABLE "_faqs_v_version_resources" CASCADE;
  DROP TABLE "_faqs_v" CASCADE;
  DROP TABLE "_faqs_v_rels" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_faqs_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_faqs_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_faqs_fk";
  
  DROP INDEX "pages_rels_faqs_id_idx";
  DROP INDEX "_pages_v_rels_faqs_id_idx";
  DROP INDEX "payload_locked_documents_rels_faqs_id_idx";
  ALTER TABLE "pages_rels" DROP COLUMN "faqs_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "faqs_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "faqs_id";
  DROP TYPE "public"."enum_pages_blocks_accordion_header_header_alignment";
  DROP TYPE "public"."enum_pages_blocks_accordion_content_source";
  DROP TYPE "public"."enum_pages_blocks_accordion_opts_limit";
  DROP TYPE "public"."enum_pages_blocks_accordion_opts_sort_by";
  DROP TYPE "public"."enum_pages_blocks_accordion_display_options_default_state";
  DROP TYPE "public"."enum_pages_blocks_accordion_display_options_icon_position";
  DROP TYPE "public"."enum_pages_blocks_accordion_display_options_icon_style";
  DROP TYPE "public"."enum_pages_blocks_accordion_layout_options_spacing";
  DROP TYPE "public"."enum_pages_blocks_accordion_layout_options_card_background";
  DROP TYPE "public"."enum_pages_blocks_accordion_layout_options_divider_style";
  DROP TYPE "public"."enum_pages_blocks_accordion_layout_options_animation_speed";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_header_header_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_content_source";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_opts_limit";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_opts_sort_by";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_display_options_default_state";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_display_options_icon_position";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_display_options_icon_style";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_layout_options_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_layout_options_card_background";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_layout_options_divider_style";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_layout_options_animation_speed";
  DROP TYPE "public"."enum_faqs_status";
  DROP TYPE "public"."enum__faqs_v_version_status";`)
}
