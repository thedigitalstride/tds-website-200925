import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_cta_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_cta_button_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  CREATE TYPE "public"."enum_pages_cta_button_link_uui_size" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_cta_button_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum__pages_v_version_cta_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_cta_button_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  CREATE TYPE "public"."enum__pages_v_version_cta_button_link_uui_size" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_version_cta_button_link_icon_pos" AS ENUM('leading', 'trailing');
  ALTER TABLE "pages" ADD COLUMN "cta_button_enabled" boolean DEFAULT false;
  ALTER TABLE "pages" ADD COLUMN "cta_button_link_type" "enum_pages_cta_button_link_type" DEFAULT 'reference';
  ALTER TABLE "pages" ADD COLUMN "cta_button_link_new_tab" boolean;
  ALTER TABLE "pages" ADD COLUMN "cta_button_link_url" varchar;
  ALTER TABLE "pages" ADD COLUMN "cta_button_link_label" varchar;
  ALTER TABLE "pages" ADD COLUMN "cta_button_link_uui_color" "enum_pages_cta_button_link_uui_color" DEFAULT 'primary';
  ALTER TABLE "pages" ADD COLUMN "cta_button_link_uui_size" "enum_pages_cta_button_link_uui_size" DEFAULT 'md';
  ALTER TABLE "pages" ADD COLUMN "cta_button_link_button_icon" varchar;
  ALTER TABLE "pages" ADD COLUMN "cta_button_link_icon_pos" "enum_pages_cta_button_link_icon_pos" DEFAULT 'trailing';
  ALTER TABLE "_pages_v" ADD COLUMN "version_cta_button_enabled" boolean DEFAULT false;
  ALTER TABLE "_pages_v" ADD COLUMN "version_cta_button_link_type" "enum__pages_v_version_cta_button_link_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v" ADD COLUMN "version_cta_button_link_new_tab" boolean;
  ALTER TABLE "_pages_v" ADD COLUMN "version_cta_button_link_url" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_cta_button_link_label" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_cta_button_link_uui_color" "enum__pages_v_version_cta_button_link_uui_color" DEFAULT 'primary';
  ALTER TABLE "_pages_v" ADD COLUMN "version_cta_button_link_uui_size" "enum__pages_v_version_cta_button_link_uui_size" DEFAULT 'md';
  ALTER TABLE "_pages_v" ADD COLUMN "version_cta_button_link_button_icon" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_cta_button_link_icon_pos" "enum__pages_v_version_cta_button_link_icon_pos" DEFAULT 'trailing';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" DROP COLUMN "cta_button_enabled";
  ALTER TABLE "pages" DROP COLUMN "cta_button_link_type";
  ALTER TABLE "pages" DROP COLUMN "cta_button_link_new_tab";
  ALTER TABLE "pages" DROP COLUMN "cta_button_link_url";
  ALTER TABLE "pages" DROP COLUMN "cta_button_link_label";
  ALTER TABLE "pages" DROP COLUMN "cta_button_link_uui_color";
  ALTER TABLE "pages" DROP COLUMN "cta_button_link_uui_size";
  ALTER TABLE "pages" DROP COLUMN "cta_button_link_button_icon";
  ALTER TABLE "pages" DROP COLUMN "cta_button_link_icon_pos";
  ALTER TABLE "_pages_v" DROP COLUMN "version_cta_button_enabled";
  ALTER TABLE "_pages_v" DROP COLUMN "version_cta_button_link_type";
  ALTER TABLE "_pages_v" DROP COLUMN "version_cta_button_link_new_tab";
  ALTER TABLE "_pages_v" DROP COLUMN "version_cta_button_link_url";
  ALTER TABLE "_pages_v" DROP COLUMN "version_cta_button_link_label";
  ALTER TABLE "_pages_v" DROP COLUMN "version_cta_button_link_uui_color";
  ALTER TABLE "_pages_v" DROP COLUMN "version_cta_button_link_uui_size";
  ALTER TABLE "_pages_v" DROP COLUMN "version_cta_button_link_button_icon";
  ALTER TABLE "_pages_v" DROP COLUMN "version_cta_button_link_icon_pos";
  DROP TYPE "public"."enum_pages_cta_button_link_type";
  DROP TYPE "public"."enum_pages_cta_button_link_uui_color";
  DROP TYPE "public"."enum_pages_cta_button_link_uui_size";
  DROP TYPE "public"."enum_pages_cta_button_link_icon_pos";
  DROP TYPE "public"."enum__pages_v_version_cta_button_link_type";
  DROP TYPE "public"."enum__pages_v_version_cta_button_link_uui_color";
  DROP TYPE "public"."enum__pages_v_version_cta_button_link_uui_size";
  DROP TYPE "public"."enum__pages_v_version_cta_button_link_icon_pos";`)
}
