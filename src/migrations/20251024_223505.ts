import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_ai_logs_operation" AS ENUM('alt-tag', 'content', 'other');
  CREATE TYPE "public"."enum_ai_settings_provider" AS ENUM('openai', 'anthropic', 'custom');
  CREATE TABLE "ai_logs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"operation" "enum_ai_logs_operation" NOT NULL,
  	"provider" varchar NOT NULL,
  	"model" varchar NOT NULL,
  	"success" boolean DEFAULT true NOT NULL,
  	"tokens_used" numeric,
  	"cost" numeric NOT NULL,
  	"duration" numeric,
  	"image_url" varchar,
  	"alt_text" varchar,
  	"error" varchar,
  	"metadata" jsonb,
  	"user_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "ai_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"provider" "enum_ai_settings_provider" DEFAULT 'openai' NOT NULL,
  	"api_key" varchar NOT NULL,
  	"model" varchar DEFAULT 'gpt-4o',
  	"custom_endpoint" varchar,
  	"temperature" numeric DEFAULT 0.3,
  	"max_tokens" numeric DEFAULT 150,
  	"timeout" numeric DEFAULT 30,
  	"alt_tag_enabled" boolean DEFAULT false,
  	"alt_tag_system_primer" varchar DEFAULT 'Generate concise, SEO-optimized alt text under 125 characters. Describe key visual elements, context, and relevant details for accessibility and search engines. Focus on what is important, avoid phrases like "image of" or "picture of". Be specific and descriptive.',
  	"alt_tag_max_length" numeric DEFAULT 125,
  	"alt_tag_include_context" boolean DEFAULT false,
  	"alt_tag_require_review" boolean DEFAULT false,
  	"alt_tag_fallback_to_filename" boolean DEFAULT true,
  	"alt_tag_log_generations" boolean DEFAULT true,
  	"blog_post_generation_enabled" boolean DEFAULT false,
  	"meta_optimization_enabled" boolean DEFAULT false,
  	"cost_tracking_enabled" boolean DEFAULT false,
  	"cost_tracking_monthly_budget" numeric,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "ai_logs_id" integer;
  ALTER TABLE "ai_logs" ADD CONSTRAINT "ai_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "ai_logs_user_idx" ON "ai_logs" USING btree ("user_id");
  CREATE INDEX "ai_logs_updated_at_idx" ON "ai_logs" USING btree ("updated_at");
  CREATE INDEX "ai_logs_created_at_idx" ON "ai_logs" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_ai_logs_fk" FOREIGN KEY ("ai_logs_id") REFERENCES "public"."ai_logs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_ai_logs_id_idx" ON "payload_locked_documents_rels" USING btree ("ai_logs_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "ai_logs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "ai_settings" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "ai_logs" CASCADE;
  DROP TABLE "ai_settings" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_ai_logs_fk";
  
  DROP INDEX "payload_locked_documents_rels_ai_logs_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "ai_logs_id";
  DROP TYPE "public"."enum_ai_logs_operation";
  DROP TYPE "public"."enum_ai_settings_provider";`)
}
