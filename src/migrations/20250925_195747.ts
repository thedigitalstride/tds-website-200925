import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "posts_table_of_contents" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "_posts_v_version_table_of_contents" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "header_nav_items_dropdown_items" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum_header_nav_items_dropdown_items_icon";
  CREATE TYPE "public"."enum_header_nav_items_dropdown_items_icon" AS ENUM('TrendUp01', 'Users01', 'SearchLg', 'Mail01', 'InfoCircle', 'Briefcase01', 'File01', 'BarChart01', 'Globe01', 'Settings01', 'Target01', 'Star01', 'Shield01', 'Code01');
  ALTER TABLE "header_nav_items_dropdown_items" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_header_nav_items_dropdown_items_icon" USING "icon"::"public"."enum_header_nav_items_dropdown_items_icon";
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "caption_text" varchar;
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "caption_link_url" varchar;
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "caption_link_text" varchar;
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "caption_text" varchar;
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "caption_link_url" varchar;
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "caption_link_text" varchar;
  ALTER TABLE "posts" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_subtitle" varchar;
  ALTER TABLE "users" ADD COLUMN "role" varchar;
  ALTER TABLE "users" ADD COLUMN "avatar_id" integer;
  ALTER TABLE "posts_table_of_contents" ADD CONSTRAINT "posts_table_of_contents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_table_of_contents" ADD CONSTRAINT "_posts_v_version_table_of_contents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_table_of_contents_order_idx" ON "posts_table_of_contents" USING btree ("_order");
  CREATE INDEX "posts_table_of_contents_parent_id_idx" ON "posts_table_of_contents" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_table_of_contents_order_idx" ON "_posts_v_version_table_of_contents" USING btree ("_order");
  CREATE INDEX "_posts_v_version_table_of_contents_parent_id_idx" ON "_posts_v_version_table_of_contents" USING btree ("_parent_id");
  ALTER TABLE "users" ADD CONSTRAINT "users_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_avatar_idx" ON "users" USING btree ("avatar_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_header_nav_items_dropdown_items_icon" ADD VALUE 'Heart01' BEFORE 'Star01';
  ALTER TABLE "posts_table_of_contents" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_version_table_of_contents" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "posts_table_of_contents" CASCADE;
  DROP TABLE "_posts_v_version_table_of_contents" CASCADE;
  ALTER TABLE "users" DROP CONSTRAINT "users_avatar_id_media_id_fk";
  
  DROP INDEX "users_avatar_idx";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "caption_text";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "caption_link_url";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "caption_link_text";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "caption_text";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "caption_link_url";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "caption_link_text";
  ALTER TABLE "posts" DROP COLUMN "subtitle";
  ALTER TABLE "_posts_v" DROP COLUMN "version_subtitle";
  ALTER TABLE "users" DROP COLUMN "role";
  ALTER TABLE "users" DROP COLUMN "avatar_id";`)
}
