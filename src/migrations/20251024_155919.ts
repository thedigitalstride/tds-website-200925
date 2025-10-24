import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_posts_blocks_breadcrumb_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__posts_v_blocks_breadcrumb_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TABLE "posts_blocks_breadcrumb" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"spacing" "enum_posts_blocks_breadcrumb_spacing" DEFAULT 'compact',
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_breadcrumb" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"spacing" "enum__posts_v_blocks_breadcrumb_spacing" DEFAULT 'compact',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "posts_blocks_breadcrumb" ADD CONSTRAINT "posts_blocks_breadcrumb_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_breadcrumb" ADD CONSTRAINT "_posts_v_blocks_breadcrumb_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_blocks_breadcrumb_order_idx" ON "posts_blocks_breadcrumb" USING btree ("_order");
  CREATE INDEX "posts_blocks_breadcrumb_parent_id_idx" ON "posts_blocks_breadcrumb" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_breadcrumb_path_idx" ON "posts_blocks_breadcrumb" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_breadcrumb_order_idx" ON "_posts_v_blocks_breadcrumb" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_breadcrumb_parent_id_idx" ON "_posts_v_blocks_breadcrumb" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_breadcrumb_path_idx" ON "_posts_v_blocks_breadcrumb" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "posts_blocks_breadcrumb" CASCADE;
  DROP TABLE "_posts_v_blocks_breadcrumb" CASCADE;
  DROP TYPE "public"."enum_posts_blocks_breadcrumb_spacing";
  DROP TYPE "public"."enum__posts_v_blocks_breadcrumb_spacing";`)
}
