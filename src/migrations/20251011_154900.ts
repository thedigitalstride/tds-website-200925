import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" ALTER COLUMN "cta_button_link_uui_color" SET DEFAULT 'accent';
  ALTER TABLE "_pages_v" ALTER COLUMN "version_cta_button_link_uui_color" SET DEFAULT 'accent';
  ALTER TABLE "pages" DROP COLUMN "header_color_light_mode";
  ALTER TABLE "pages" DROP COLUMN "header_color_dark_mode";
  ALTER TABLE "pages" DROP COLUMN "scrolled_header_color_light_mode";
  ALTER TABLE "pages" DROP COLUMN "scrolled_header_color_dark_mode";
  ALTER TABLE "_pages_v" DROP COLUMN "version_header_color_light_mode";
  ALTER TABLE "_pages_v" DROP COLUMN "version_header_color_dark_mode";
  ALTER TABLE "_pages_v" DROP COLUMN "version_scrolled_header_color_light_mode";
  ALTER TABLE "_pages_v" DROP COLUMN "version_scrolled_header_color_dark_mode";
  DROP TYPE "public"."enum_pages_header_color_light_mode";
  DROP TYPE "public"."enum_pages_header_color_dark_mode";
  DROP TYPE "public"."enum_pages_scrolled_header_color_light_mode";
  DROP TYPE "public"."enum_pages_scrolled_header_color_dark_mode";
  DROP TYPE "public"."enum__pages_v_version_header_color_light_mode";
  DROP TYPE "public"."enum__pages_v_version_header_color_dark_mode";
  DROP TYPE "public"."enum__pages_v_version_scrolled_header_color_light_mode";
  DROP TYPE "public"."enum__pages_v_version_scrolled_header_color_dark_mode";`)
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_header_color_light_mode" AS ENUM('auto', 'dark', 'light');
  CREATE TYPE "public"."enum_pages_header_color_dark_mode" AS ENUM('auto', 'dark', 'light');
  CREATE TYPE "public"."enum_pages_scrolled_header_color_light_mode" AS ENUM('inherit', 'auto', 'dark', 'light');
  CREATE TYPE "public"."enum_pages_scrolled_header_color_dark_mode" AS ENUM('inherit', 'auto', 'dark', 'light');
  CREATE TYPE "public"."enum__pages_v_version_header_color_light_mode" AS ENUM('auto', 'dark', 'light');
  CREATE TYPE "public"."enum__pages_v_version_header_color_dark_mode" AS ENUM('auto', 'dark', 'light');
  CREATE TYPE "public"."enum__pages_v_version_scrolled_header_color_light_mode" AS ENUM('inherit', 'auto', 'dark', 'light');
  CREATE TYPE "public"."enum__pages_v_version_scrolled_header_color_dark_mode" AS ENUM('inherit', 'auto', 'dark', 'light');
  ALTER TABLE "pages" ALTER COLUMN "cta_button_link_uui_color" SET DEFAULT 'primary';
  ALTER TABLE "_pages_v" ALTER COLUMN "version_cta_button_link_uui_color" SET DEFAULT 'primary';
  ALTER TABLE "pages" ADD COLUMN "header_color_light_mode" "enum_pages_header_color_light_mode" DEFAULT 'auto';
  ALTER TABLE "pages" ADD COLUMN "header_color_dark_mode" "enum_pages_header_color_dark_mode" DEFAULT 'auto';
  ALTER TABLE "pages" ADD COLUMN "scrolled_header_color_light_mode" "enum_pages_scrolled_header_color_light_mode" DEFAULT 'inherit';
  ALTER TABLE "pages" ADD COLUMN "scrolled_header_color_dark_mode" "enum_pages_scrolled_header_color_dark_mode" DEFAULT 'inherit';
  ALTER TABLE "_pages_v" ADD COLUMN "version_header_color_light_mode" "enum__pages_v_version_header_color_light_mode" DEFAULT 'auto';
  ALTER TABLE "_pages_v" ADD COLUMN "version_header_color_dark_mode" "enum__pages_v_version_header_color_dark_mode" DEFAULT 'auto';
  ALTER TABLE "_pages_v" ADD COLUMN "version_scrolled_header_color_light_mode" "enum__pages_v_version_scrolled_header_color_light_mode" DEFAULT 'inherit';
  ALTER TABLE "_pages_v" ADD COLUMN "version_scrolled_header_color_dark_mode" "enum__pages_v_version_scrolled_header_color_dark_mode" DEFAULT 'inherit';`)
}
