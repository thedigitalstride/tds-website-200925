import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_cta_links_link_uui_color" AS ENUM('primary', 'secondary', 'tertiary', 'link-color');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_uui_size" AS ENUM('md', 'lg');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_uui_color" AS ENUM('primary', 'secondary', 'tertiary', 'link-color');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_uui_size" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_uui_color" AS ENUM('primary', 'secondary', 'tertiary', 'link-color');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_uui_size" AS ENUM('md', 'lg');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_uui_color" AS ENUM('primary', 'secondary', 'tertiary', 'link-color');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_uui_size" AS ENUM('sm', 'md', 'lg');
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN "link_uui_color" "enum_pages_blocks_cta_links_link_uui_color" DEFAULT 'primary';
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN "link_uui_size" "enum_pages_blocks_cta_links_link_uui_size" DEFAULT 'lg';
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "link_uui_color" "enum_pages_blocks_content_columns_link_uui_color" DEFAULT 'primary';
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "link_uui_size" "enum_pages_blocks_content_columns_link_uui_size" DEFAULT 'md';
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN "link_uui_color" "enum__pages_v_blocks_cta_links_link_uui_color" DEFAULT 'primary';
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN "link_uui_size" "enum__pages_v_blocks_cta_links_link_uui_size" DEFAULT 'lg';
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "link_uui_color" "enum__pages_v_blocks_content_columns_link_uui_color" DEFAULT 'primary';
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "link_uui_size" "enum__pages_v_blocks_content_columns_link_uui_size" DEFAULT 'md';
  ALTER TABLE "pages_blocks_cta_links" DROP COLUMN "link_appearance";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "link_appearance";
  ALTER TABLE "_pages_v_blocks_cta_links" DROP COLUMN "link_appearance";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "link_appearance";
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN "link_appearance" "enum_pages_blocks_cta_links_link_appearance" DEFAULT 'default';
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "link_appearance" "enum_pages_blocks_content_columns_link_appearance" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN "link_appearance" "enum__pages_v_blocks_cta_links_link_appearance" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "link_appearance" "enum__pages_v_blocks_content_columns_link_appearance" DEFAULT 'default';
  ALTER TABLE "pages_blocks_cta_links" DROP COLUMN "link_uui_color";
  ALTER TABLE "pages_blocks_cta_links" DROP COLUMN "link_uui_size";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "link_uui_color";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "link_uui_size";
  ALTER TABLE "_pages_v_blocks_cta_links" DROP COLUMN "link_uui_color";
  ALTER TABLE "_pages_v_blocks_cta_links" DROP COLUMN "link_uui_size";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "link_uui_color";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "link_uui_size";
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_uui_color";
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_uui_size";
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_uui_color";
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_uui_size";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_uui_color";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_uui_size";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_uui_color";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_uui_size";`)
}
