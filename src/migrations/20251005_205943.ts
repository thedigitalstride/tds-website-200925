import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_latest_posts_opts_num_posts" AS ENUM('3', '6', '9', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_latest_posts_opts_num_posts" AS ENUM('3', '6', '9', '12');
  ALTER TABLE "pages_blocks_latest_posts" DROP CONSTRAINT "pages_blocks_latest_posts_latest_posts_options_category_filter_id_categories_id_fk";
  
  ALTER TABLE "_pages_v_blocks_latest_posts" DROP CONSTRAINT "_pages_v_blocks_latest_posts_latest_posts_options_category_filter_id_categories_id_fk";
  
  DROP INDEX "pages_blocks_latest_posts_latest_posts_options_latest_po_idx";
  DROP INDEX "_pages_v_blocks_latest_posts_latest_posts_options_latest_idx";
  ALTER TABLE "pages_blocks_latest_posts" ADD COLUMN "opts_num_posts" "enum_pages_blocks_latest_posts_opts_num_posts" DEFAULT '3';
  ALTER TABLE "pages_blocks_latest_posts" ADD COLUMN "opts_category_filter_id" integer;
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD COLUMN "opts_num_posts" "enum__pages_v_blocks_latest_posts_opts_num_posts" DEFAULT '3';
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD COLUMN "opts_category_filter_id" integer;
  ALTER TABLE "pages_blocks_latest_posts" ADD CONSTRAINT "pages_blocks_latest_posts_opts_category_filter_id_categories_id_fk" FOREIGN KEY ("opts_category_filter_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD CONSTRAINT "_pages_v_blocks_latest_posts_opts_category_filter_id_categories_id_fk" FOREIGN KEY ("opts_category_filter_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_latest_posts_opts_opts_category_filter_idx" ON "pages_blocks_latest_posts" USING btree ("opts_category_filter_id");
  CREATE INDEX "_pages_v_blocks_latest_posts_opts_opts_category_filter_idx" ON "_pages_v_blocks_latest_posts" USING btree ("opts_category_filter_id");
  ALTER TABLE "pages_blocks_latest_posts" DROP COLUMN "latest_posts_options_number_of_posts";
  ALTER TABLE "pages_blocks_latest_posts" DROP COLUMN "latest_posts_options_category_filter_id";
  ALTER TABLE "_pages_v_blocks_latest_posts" DROP COLUMN "latest_posts_options_number_of_posts";
  ALTER TABLE "_pages_v_blocks_latest_posts" DROP COLUMN "latest_posts_options_category_filter_id";
  DROP TYPE "public"."num_posts";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."num_posts" AS ENUM('3', '6', '9', '12');
  ALTER TABLE "pages_blocks_latest_posts" DROP CONSTRAINT "pages_blocks_latest_posts_opts_category_filter_id_categories_id_fk";
  
  ALTER TABLE "_pages_v_blocks_latest_posts" DROP CONSTRAINT "_pages_v_blocks_latest_posts_opts_category_filter_id_categories_id_fk";
  
  DROP INDEX "pages_blocks_latest_posts_opts_opts_category_filter_idx";
  DROP INDEX "_pages_v_blocks_latest_posts_opts_opts_category_filter_idx";
  ALTER TABLE "pages_blocks_latest_posts" ADD COLUMN "latest_posts_options_number_of_posts" "num_posts" DEFAULT '3';
  ALTER TABLE "pages_blocks_latest_posts" ADD COLUMN "latest_posts_options_category_filter_id" integer;
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD COLUMN "latest_posts_options_number_of_posts" "num_posts" DEFAULT '3';
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD COLUMN "latest_posts_options_category_filter_id" integer;
  ALTER TABLE "pages_blocks_latest_posts" ADD CONSTRAINT "pages_blocks_latest_posts_latest_posts_options_category_filter_id_categories_id_fk" FOREIGN KEY ("latest_posts_options_category_filter_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD CONSTRAINT "_pages_v_blocks_latest_posts_latest_posts_options_category_filter_id_categories_id_fk" FOREIGN KEY ("latest_posts_options_category_filter_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_latest_posts_latest_posts_options_latest_po_idx" ON "pages_blocks_latest_posts" USING btree ("latest_posts_options_category_filter_id");
  CREATE INDEX "_pages_v_blocks_latest_posts_latest_posts_options_latest_idx" ON "_pages_v_blocks_latest_posts" USING btree ("latest_posts_options_category_filter_id");
  ALTER TABLE "pages_blocks_latest_posts" DROP COLUMN "opts_num_posts";
  ALTER TABLE "pages_blocks_latest_posts" DROP COLUMN "opts_category_filter_id";
  ALTER TABLE "_pages_v_blocks_latest_posts" DROP COLUMN "opts_num_posts";
  ALTER TABLE "_pages_v_blocks_latest_posts" DROP COLUMN "opts_category_filter_id";
  DROP TYPE "public"."enum_pages_blocks_latest_posts_opts_num_posts";
  DROP TYPE "public"."enum__pages_v_blocks_latest_posts_opts_num_posts";`)
}
