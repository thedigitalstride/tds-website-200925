import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_scrolled_header_color_light_mode" AS ENUM('inherit', 'auto', 'dark', 'light');
  CREATE TYPE "public"."enum_pages_scrolled_header_color_dark_mode" AS ENUM('inherit', 'auto', 'dark', 'light');
  CREATE TYPE "public"."enum__pages_v_version_scrolled_header_color_light_mode" AS ENUM('inherit', 'auto', 'dark', 'light');
  CREATE TYPE "public"."enum__pages_v_version_scrolled_header_color_dark_mode" AS ENUM('inherit', 'auto', 'dark', 'light');
  ALTER TABLE "pages" ADD COLUMN "scrolled_header_color_light_mode" "enum_pages_scrolled_header_color_light_mode" DEFAULT 'inherit';
  ALTER TABLE "pages" ADD COLUMN "scrolled_header_color_dark_mode" "enum_pages_scrolled_header_color_dark_mode" DEFAULT 'inherit';
  ALTER TABLE "_pages_v" ADD COLUMN "version_scrolled_header_color_light_mode" "enum__pages_v_version_scrolled_header_color_light_mode" DEFAULT 'inherit';
  ALTER TABLE "_pages_v" ADD COLUMN "version_scrolled_header_color_dark_mode" "enum__pages_v_version_scrolled_header_color_dark_mode" DEFAULT 'inherit';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" DROP COLUMN "scrolled_header_color_light_mode";
  ALTER TABLE "pages" DROP COLUMN "scrolled_header_color_dark_mode";
  ALTER TABLE "_pages_v" DROP COLUMN "version_scrolled_header_color_light_mode";
  ALTER TABLE "_pages_v" DROP COLUMN "version_scrolled_header_color_dark_mode";
  DROP TYPE "public"."enum_pages_scrolled_header_color_light_mode";
  DROP TYPE "public"."enum_pages_scrolled_header_color_dark_mode";
  DROP TYPE "public"."enum__pages_v_version_scrolled_header_color_light_mode";
  DROP TYPE "public"."enum__pages_v_version_scrolled_header_color_dark_mode";`)
}
