import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_posts_settings_grid_columns_desktop" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_posts_settings_grid_columns_tablet" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_posts_settings_grid_columns_mobile" AS ENUM('1', '2');
  CREATE TABLE "posts_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"page_header_heading" varchar DEFAULT 'News & insights' NOT NULL,
  	"page_header_description" varchar DEFAULT 'The latest industry news, interviews, technologies, and resources.',
  	"grid_columns_desktop" "enum_posts_settings_grid_columns_desktop" DEFAULT '3',
  	"grid_columns_tablet" "enum_posts_settings_grid_columns_tablet" DEFAULT '2',
  	"grid_columns_mobile" "enum_posts_settings_grid_columns_mobile" DEFAULT '1',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  `)
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "posts_settings" CASCADE;
  DROP TYPE "public"."enum_posts_settings_grid_columns_desktop";
  DROP TYPE "public"."enum_posts_settings_grid_columns_tablet";
  DROP TYPE "public"."enum_posts_settings_grid_columns_mobile";`)
}
