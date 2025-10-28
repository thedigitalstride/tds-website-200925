import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_icons_category" AS ENUM('navigation', 'action', 'social', 'communication', 'interface', 'file', 'device', 'commerce', 'media', 'custom');
  CREATE TYPE "public"."enum_ai_settings_icon_enhancement_model" AS ENUM('', 'gpt-4o-mini', 'gpt-4o', 'gpt-3.5-turbo');
  ALTER TYPE "public"."enum_ai_logs_operation" ADD VALUE 'icon-enhancement' BEFORE 'content';
  CREATE TABLE "icons_keywords" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"keyword" varchar NOT NULL
  );
  
  CREATE TABLE "icons_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar NOT NULL
  );
  
  CREATE TABLE "icons_usage_locations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"collection" varchar,
  	"field" varchar
  );
  
  CREATE TABLE "icons" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"category" "enum_icons_category" DEFAULT 'interface',
  	"svg_code" varchar NOT NULL,
  	"original_svg" varchar,
  	"description" varchar,
  	"metadata_width" numeric,
  	"metadata_height" numeric,
  	"metadata_view_box" varchar,
  	"metadata_path_count" numeric,
  	"metadata_file_size" numeric,
  	"ai_metadata_enhanced_at" timestamp(3) with time zone,
  	"ai_metadata_model" varchar,
  	"ai_metadata_confidence" numeric,
  	"usage_count" numeric DEFAULT 0,
  	"usage_last_used" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "ai_logs" ADD COLUMN "ai_input" varchar;
  ALTER TABLE "ai_logs" ADD COLUMN "ai_output" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "icons_id" integer;
  ALTER TABLE "ai_settings" ADD COLUMN "icon_enhancement_enabled" boolean DEFAULT false;
  ALTER TABLE "ai_settings" ADD COLUMN "icon_enhancement_model" "enum_ai_settings_icon_enhancement_model";
  ALTER TABLE "ai_settings" ADD COLUMN "icon_enhancement_auto_keywords" boolean DEFAULT true;
  ALTER TABLE "ai_settings" ADD COLUMN "icon_enhancement_auto_category" boolean DEFAULT true;
  ALTER TABLE "ai_settings" ADD COLUMN "icon_enhancement_semantic_search" boolean DEFAULT false;
  ALTER TABLE "ai_settings" ADD COLUMN "icon_enhancement_system_primer" varchar DEFAULT 'Analyze this icon name and generate: 1) 5-10 relevant keywords for search, 2) appropriate category (navigation/action/social/communication/interface/file/device/commerce/media/custom), 3) brief description (max 50 words). Focus on common usage patterns and synonyms.';
  ALTER TABLE "ai_settings" ADD COLUMN "icon_enhancement_max_keywords" numeric DEFAULT 10;
  ALTER TABLE "icons_keywords" ADD CONSTRAINT "icons_keywords_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."icons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "icons_tags" ADD CONSTRAINT "icons_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."icons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "icons_usage_locations" ADD CONSTRAINT "icons_usage_locations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."icons"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "icons_keywords_order_idx" ON "icons_keywords" USING btree ("_order");
  CREATE INDEX "icons_keywords_parent_id_idx" ON "icons_keywords" USING btree ("_parent_id");
  CREATE INDEX "icons_tags_order_idx" ON "icons_tags" USING btree ("_order");
  CREATE INDEX "icons_tags_parent_id_idx" ON "icons_tags" USING btree ("_parent_id");
  CREATE INDEX "icons_usage_locations_order_idx" ON "icons_usage_locations" USING btree ("_order");
  CREATE INDEX "icons_usage_locations_parent_id_idx" ON "icons_usage_locations" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "icons_name_idx" ON "icons" USING btree ("name");
  CREATE INDEX "icons_updated_at_idx" ON "icons" USING btree ("updated_at");
  CREATE INDEX "icons_created_at_idx" ON "icons" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_icons_fk" FOREIGN KEY ("icons_id") REFERENCES "public"."icons"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_icons_id_idx" ON "payload_locked_documents_rels" USING btree ("icons_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "icons_keywords" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "icons_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "icons_usage_locations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "icons" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "icons_keywords" CASCADE;
  DROP TABLE "icons_tags" CASCADE;
  DROP TABLE "icons_usage_locations" CASCADE;
  DROP TABLE "icons" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_icons_fk";
  
  ALTER TABLE "ai_logs" ALTER COLUMN "operation" SET DATA TYPE text;
  DROP TYPE "public"."enum_ai_logs_operation";
  CREATE TYPE "public"."enum_ai_logs_operation" AS ENUM('alt-tag', 'seo-title', 'seo-description', 'content', 'other');
  ALTER TABLE "ai_logs" ALTER COLUMN "operation" SET DATA TYPE "public"."enum_ai_logs_operation" USING "operation"::"public"."enum_ai_logs_operation";
  DROP INDEX "payload_locked_documents_rels_icons_id_idx";
  ALTER TABLE "ai_logs" DROP COLUMN "ai_input";
  ALTER TABLE "ai_logs" DROP COLUMN "ai_output";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "icons_id";
  ALTER TABLE "ai_settings" DROP COLUMN "icon_enhancement_enabled";
  ALTER TABLE "ai_settings" DROP COLUMN "icon_enhancement_model";
  ALTER TABLE "ai_settings" DROP COLUMN "icon_enhancement_auto_keywords";
  ALTER TABLE "ai_settings" DROP COLUMN "icon_enhancement_auto_category";
  ALTER TABLE "ai_settings" DROP COLUMN "icon_enhancement_semantic_search";
  ALTER TABLE "ai_settings" DROP COLUMN "icon_enhancement_system_primer";
  ALTER TABLE "ai_settings" DROP COLUMN "icon_enhancement_max_keywords";
  DROP TYPE "public"."enum_icons_category";
  DROP TYPE "public"."enum_ai_settings_icon_enhancement_model";`)
}
