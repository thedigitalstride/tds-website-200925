import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."cols_desktop" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."cols_tablet" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."cols_mobile" AS ENUM('1', '2');
  ALTER TABLE "pages_blocks_latest_posts" ADD COLUMN "layout_options_use_posts_settings" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_latest_posts" ADD COLUMN "layout_options_grid_columns_desktop" "cols_desktop" DEFAULT '3';
  ALTER TABLE "pages_blocks_latest_posts" ADD COLUMN "layout_options_grid_columns_tablet" "cols_tablet" DEFAULT '2';
  ALTER TABLE "pages_blocks_latest_posts" ADD COLUMN "layout_options_grid_columns_mobile" "cols_mobile" DEFAULT '1';
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD COLUMN "layout_options_use_posts_settings" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD COLUMN "layout_options_grid_columns_desktop" "cols_desktop" DEFAULT '3';
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD COLUMN "layout_options_grid_columns_tablet" "cols_tablet" DEFAULT '2';
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD COLUMN "layout_options_grid_columns_mobile" "cols_mobile" DEFAULT '1';
  ALTER TABLE "posts_blocks_latest_posts" ADD COLUMN "layout_options_use_posts_settings" boolean DEFAULT true;
  ALTER TABLE "posts_blocks_latest_posts" ADD COLUMN "layout_options_grid_columns_desktop" "cols_desktop" DEFAULT '3';
  ALTER TABLE "posts_blocks_latest_posts" ADD COLUMN "layout_options_grid_columns_tablet" "cols_tablet" DEFAULT '2';
  ALTER TABLE "posts_blocks_latest_posts" ADD COLUMN "layout_options_grid_columns_mobile" "cols_mobile" DEFAULT '1';
  ALTER TABLE "_posts_v_blocks_latest_posts" ADD COLUMN "layout_options_use_posts_settings" boolean DEFAULT true;
  ALTER TABLE "_posts_v_blocks_latest_posts" ADD COLUMN "layout_options_grid_columns_desktop" "cols_desktop" DEFAULT '3';
  ALTER TABLE "_posts_v_blocks_latest_posts" ADD COLUMN "layout_options_grid_columns_tablet" "cols_tablet" DEFAULT '2';
  ALTER TABLE "_posts_v_blocks_latest_posts" ADD COLUMN "layout_options_grid_columns_mobile" "cols_mobile" DEFAULT '1';
  ALTER TABLE "pages_blocks_latest_posts" DROP COLUMN "layout_options_columns";
  ALTER TABLE "_pages_v_blocks_latest_posts" DROP COLUMN "layout_options_columns";
  ALTER TABLE "posts_blocks_latest_posts" DROP COLUMN "layout_options_columns";
  ALTER TABLE "_posts_v_blocks_latest_posts" DROP COLUMN "layout_options_columns";
  DROP TYPE "public"."enum_pages_blocks_latest_posts_layout_options_columns";
  DROP TYPE "public"."enum__pages_v_blocks_latest_posts_layout_options_columns";
  DROP TYPE "public"."enum_posts_blocks_latest_posts_layout_options_columns";
  DROP TYPE "public"."enum__posts_v_blocks_latest_posts_layout_options_columns";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_latest_posts_layout_options_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_latest_posts_layout_options_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_posts_blocks_latest_posts_layout_options_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__posts_v_blocks_latest_posts_layout_options_columns" AS ENUM('2', '3', '4');
  ALTER TABLE "pages_blocks_latest_posts" ADD COLUMN "layout_options_columns" "enum_pages_blocks_latest_posts_layout_options_columns" DEFAULT '3';
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD COLUMN "layout_options_columns" "enum__pages_v_blocks_latest_posts_layout_options_columns" DEFAULT '3';
  ALTER TABLE "posts_blocks_latest_posts" ADD COLUMN "layout_options_columns" "enum_posts_blocks_latest_posts_layout_options_columns" DEFAULT '3';
  ALTER TABLE "_posts_v_blocks_latest_posts" ADD COLUMN "layout_options_columns" "enum__posts_v_blocks_latest_posts_layout_options_columns" DEFAULT '3';
  ALTER TABLE "pages_blocks_latest_posts" DROP COLUMN "layout_options_use_posts_settings";
  ALTER TABLE "pages_blocks_latest_posts" DROP COLUMN "layout_options_grid_columns_desktop";
  ALTER TABLE "pages_blocks_latest_posts" DROP COLUMN "layout_options_grid_columns_tablet";
  ALTER TABLE "pages_blocks_latest_posts" DROP COLUMN "layout_options_grid_columns_mobile";
  ALTER TABLE "_pages_v_blocks_latest_posts" DROP COLUMN "layout_options_use_posts_settings";
  ALTER TABLE "_pages_v_blocks_latest_posts" DROP COLUMN "layout_options_grid_columns_desktop";
  ALTER TABLE "_pages_v_blocks_latest_posts" DROP COLUMN "layout_options_grid_columns_tablet";
  ALTER TABLE "_pages_v_blocks_latest_posts" DROP COLUMN "layout_options_grid_columns_mobile";
  ALTER TABLE "posts_blocks_latest_posts" DROP COLUMN "layout_options_use_posts_settings";
  ALTER TABLE "posts_blocks_latest_posts" DROP COLUMN "layout_options_grid_columns_desktop";
  ALTER TABLE "posts_blocks_latest_posts" DROP COLUMN "layout_options_grid_columns_tablet";
  ALTER TABLE "posts_blocks_latest_posts" DROP COLUMN "layout_options_grid_columns_mobile";
  ALTER TABLE "_posts_v_blocks_latest_posts" DROP COLUMN "layout_options_use_posts_settings";
  ALTER TABLE "_posts_v_blocks_latest_posts" DROP COLUMN "layout_options_grid_columns_desktop";
  ALTER TABLE "_posts_v_blocks_latest_posts" DROP COLUMN "layout_options_grid_columns_tablet";
  ALTER TABLE "_posts_v_blocks_latest_posts" DROP COLUMN "layout_options_grid_columns_mobile";
  DROP TYPE "public"."cols_desktop";
  DROP TYPE "public"."cols_tablet";
  DROP TYPE "public"."cols_mobile";`)
}
