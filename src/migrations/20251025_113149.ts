import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_ai_settings_seo_meta_content_weight" AS ENUM('keywords', 'balanced', 'content');
  ALTER TYPE "public"."enum_ai_logs_operation" ADD VALUE 'seo-title' BEFORE 'content';
  ALTER TYPE "public"."enum_ai_logs_operation" ADD VALUE 'seo-description' BEFORE 'content';
  CREATE TABLE "ai_logs_keywords" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"keyword" varchar
  );
  
  CREATE TABLE "ai_logs_content_themes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"theme" varchar
  );
  
  ALTER TABLE "pages" ADD COLUMN "seo_keywords" varchar;
  ALTER TABLE "pages" ADD COLUMN "seo_guidance" varchar;
  ALTER TABLE "pages" ADD COLUMN "ai_seo_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "ai_seo_description" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_seo_keywords" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_seo_guidance" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_ai_seo_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_ai_seo_description" varchar;
  ALTER TABLE "posts" ADD COLUMN "seo_keywords" varchar;
  ALTER TABLE "posts" ADD COLUMN "seo_guidance" varchar;
  ALTER TABLE "posts" ADD COLUMN "ai_seo_title" varchar;
  ALTER TABLE "posts" ADD COLUMN "ai_seo_description" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_seo_keywords" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_seo_guidance" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_ai_seo_title" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_ai_seo_description" varchar;
  ALTER TABLE "ai_logs" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "ai_logs" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "ai_logs" ADD COLUMN "character_count" numeric;
  ALTER TABLE "ai_settings" ADD COLUMN "seo_meta_enabled" boolean DEFAULT false;
  ALTER TABLE "ai_settings" ADD COLUMN "seo_meta_title_system_primer" varchar DEFAULT 'Generate an SEO-optimized page title under 60 characters that includes target keywords naturally near the beginning. Focus on user search intent, make it compelling for click-through, and ensure it accurately represents the page content. Use title case or sentence case consistently. Include brand name when appropriate (typically at the end after a separator). Avoid keyword stuffing and generic phrases.' NOT NULL;
  ALTER TABLE "ai_settings" ADD COLUMN "seo_meta_title_max_length" numeric DEFAULT 60;
  ALTER TABLE "ai_settings" ADD COLUMN "seo_meta_include_brand_in_title" boolean DEFAULT true;
  ALTER TABLE "ai_settings" ADD COLUMN "seo_meta_description_system_primer" varchar DEFAULT 'Generate an SEO-optimized meta description between 150-160 characters that includes target keywords naturally. Write compelling copy that encourages clicks and clearly communicates the page value. Include a call-to-action when appropriate. Focus on benefits and outcomes for the user. Be specific and accurate - avoid vague or generic descriptions. Make it readable and natural, not just a keyword list.' NOT NULL;
  ALTER TABLE "ai_settings" ADD COLUMN "seo_meta_description_min_length" numeric DEFAULT 150;
  ALTER TABLE "ai_settings" ADD COLUMN "seo_meta_description_max_length" numeric DEFAULT 160;
  ALTER TABLE "ai_settings" ADD COLUMN "seo_meta_analyze_full_content" boolean DEFAULT true;
  ALTER TABLE "ai_settings" ADD COLUMN "seo_meta_content_weight" "enum_ai_settings_seo_meta_content_weight" DEFAULT 'balanced';
  ALTER TABLE "ai_settings" ADD COLUMN "seo_meta_extract_key_themes" boolean DEFAULT true;
  ALTER TABLE "ai_settings" ADD COLUMN "seo_meta_max_content_tokens" numeric DEFAULT 2000;
  ALTER TABLE "ai_logs_keywords" ADD CONSTRAINT "ai_logs_keywords_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ai_logs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ai_logs_content_themes" ADD CONSTRAINT "ai_logs_content_themes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ai_logs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "ai_logs_keywords_order_idx" ON "ai_logs_keywords" USING btree ("_order");
  CREATE INDEX "ai_logs_keywords_parent_id_idx" ON "ai_logs_keywords" USING btree ("_parent_id");
  CREATE INDEX "ai_logs_content_themes_order_idx" ON "ai_logs_content_themes" USING btree ("_order");
  CREATE INDEX "ai_logs_content_themes_parent_id_idx" ON "ai_logs_content_themes" USING btree ("_parent_id");
  ALTER TABLE "ai_settings" DROP COLUMN "meta_optimization_enabled";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "ai_logs_keywords" CASCADE;
  DROP TABLE "ai_logs_content_themes" CASCADE;
  ALTER TABLE "ai_logs" ALTER COLUMN "operation" SET DATA TYPE text;
  DROP TYPE "public"."enum_ai_logs_operation";
  CREATE TYPE "public"."enum_ai_logs_operation" AS ENUM('alt-tag', 'content', 'other');
  ALTER TABLE "ai_logs" ALTER COLUMN "operation" SET DATA TYPE "public"."enum_ai_logs_operation" USING "operation"::"public"."enum_ai_logs_operation";
  ALTER TABLE "ai_settings" ADD COLUMN "meta_optimization_enabled" boolean DEFAULT false;
  ALTER TABLE "pages" DROP COLUMN "seo_keywords";
  ALTER TABLE "pages" DROP COLUMN "seo_guidance";
  ALTER TABLE "pages" DROP COLUMN "ai_seo_title";
  ALTER TABLE "pages" DROP COLUMN "ai_seo_description";
  ALTER TABLE "_pages_v" DROP COLUMN "version_seo_keywords";
  ALTER TABLE "_pages_v" DROP COLUMN "version_seo_guidance";
  ALTER TABLE "_pages_v" DROP COLUMN "version_ai_seo_title";
  ALTER TABLE "_pages_v" DROP COLUMN "version_ai_seo_description";
  ALTER TABLE "posts" DROP COLUMN "seo_keywords";
  ALTER TABLE "posts" DROP COLUMN "seo_guidance";
  ALTER TABLE "posts" DROP COLUMN "ai_seo_title";
  ALTER TABLE "posts" DROP COLUMN "ai_seo_description";
  ALTER TABLE "_posts_v" DROP COLUMN "version_seo_keywords";
  ALTER TABLE "_posts_v" DROP COLUMN "version_seo_guidance";
  ALTER TABLE "_posts_v" DROP COLUMN "version_ai_seo_title";
  ALTER TABLE "_posts_v" DROP COLUMN "version_ai_seo_description";
  ALTER TABLE "ai_logs" DROP COLUMN "seo_title";
  ALTER TABLE "ai_logs" DROP COLUMN "seo_description";
  ALTER TABLE "ai_logs" DROP COLUMN "character_count";
  ALTER TABLE "ai_settings" DROP COLUMN "seo_meta_enabled";
  ALTER TABLE "ai_settings" DROP COLUMN "seo_meta_title_system_primer";
  ALTER TABLE "ai_settings" DROP COLUMN "seo_meta_title_max_length";
  ALTER TABLE "ai_settings" DROP COLUMN "seo_meta_include_brand_in_title";
  ALTER TABLE "ai_settings" DROP COLUMN "seo_meta_description_system_primer";
  ALTER TABLE "ai_settings" DROP COLUMN "seo_meta_description_min_length";
  ALTER TABLE "ai_settings" DROP COLUMN "seo_meta_description_max_length";
  ALTER TABLE "ai_settings" DROP COLUMN "seo_meta_analyze_full_content";
  ALTER TABLE "ai_settings" DROP COLUMN "seo_meta_content_weight";
  ALTER TABLE "ai_settings" DROP COLUMN "seo_meta_extract_key_themes";
  ALTER TABLE "ai_settings" DROP COLUMN "seo_meta_max_content_tokens";
  DROP TYPE "public"."enum_ai_settings_seo_meta_content_weight";`)
}
