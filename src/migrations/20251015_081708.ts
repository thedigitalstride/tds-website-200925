import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_header_mobile_cta_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_mobile_cta_button_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  CREATE TYPE "public"."enum_header_mobile_cta_button_link_uui_size" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_header_mobile_cta_button_link_icon_pos" AS ENUM('leading', 'trailing');
  ALTER TABLE "header" ADD COLUMN "mobile_cta_button_enabled" boolean DEFAULT false;
  ALTER TABLE "header" ADD COLUMN "mobile_cta_button_link_type" "enum_header_mobile_cta_button_link_type" DEFAULT 'reference';
  ALTER TABLE "header" ADD COLUMN "mobile_cta_button_link_new_tab" boolean;
  ALTER TABLE "header" ADD COLUMN "mobile_cta_button_link_url" varchar;
  ALTER TABLE "header" ADD COLUMN "mobile_cta_button_link_label" varchar;
  ALTER TABLE "header" ADD COLUMN "mobile_cta_button_link_uui_color" "enum_header_mobile_cta_button_link_uui_color" DEFAULT 'primary';
  ALTER TABLE "header" ADD COLUMN "mobile_cta_button_link_uui_size" "enum_header_mobile_cta_button_link_uui_size" DEFAULT 'sm';
  ALTER TABLE "header" ADD COLUMN "mobile_cta_button_link_button_icon" varchar;
  ALTER TABLE "header" ADD COLUMN "mobile_cta_button_link_icon_pos" "enum_header_mobile_cta_button_link_icon_pos" DEFAULT 'trailing';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header" DROP COLUMN "mobile_cta_button_enabled";
  ALTER TABLE "header" DROP COLUMN "mobile_cta_button_link_type";
  ALTER TABLE "header" DROP COLUMN "mobile_cta_button_link_new_tab";
  ALTER TABLE "header" DROP COLUMN "mobile_cta_button_link_url";
  ALTER TABLE "header" DROP COLUMN "mobile_cta_button_link_label";
  ALTER TABLE "header" DROP COLUMN "mobile_cta_button_link_uui_color";
  ALTER TABLE "header" DROP COLUMN "mobile_cta_button_link_uui_size";
  ALTER TABLE "header" DROP COLUMN "mobile_cta_button_link_button_icon";
  ALTER TABLE "header" DROP COLUMN "mobile_cta_button_link_icon_pos";
  DROP TYPE "public"."enum_header_mobile_cta_button_link_type";
  DROP TYPE "public"."enum_header_mobile_cta_button_link_uui_color";
  DROP TYPE "public"."enum_header_mobile_cta_button_link_uui_size";
  DROP TYPE "public"."enum_header_mobile_cta_button_link_icon_pos";`)
}
