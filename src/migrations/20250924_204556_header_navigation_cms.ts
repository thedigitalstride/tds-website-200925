import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_header_nav_items_dropdown_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_nav_items_dropdown_items_icon" AS ENUM('TrendUp01', 'Users01', 'SearchLg', 'Mail01', 'InfoCircle', 'Briefcase01', 'File01', 'BarChart01', 'Globe01', 'Settings01', 'Target01', 'Heart01', 'Star01', 'Shield01', 'Code01');
  CREATE TYPE "public"."enum_header_cta_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_cta_button_link_uui_color" AS ENUM('primary', 'secondary', 'tertiary');
  CREATE TYPE "public"."enum_header_cta_button_link_uui_size" AS ENUM('sm', 'md', 'lg');
  CREATE TABLE "header_nav_items_dropdown_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_dropdown_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"description" varchar,
  	"icon" "enum_header_nav_items_dropdown_items_icon"
  );
  
  ALTER TABLE "header_nav_items" ADD COLUMN "has_dropdown" boolean;
  ALTER TABLE "header" ADD COLUMN "cta_button_enabled" boolean DEFAULT true;
  ALTER TABLE "header" ADD COLUMN "cta_button_link_type" "enum_header_cta_button_link_type" DEFAULT 'reference';
  ALTER TABLE "header" ADD COLUMN "cta_button_link_new_tab" boolean;
  ALTER TABLE "header" ADD COLUMN "cta_button_link_url" varchar;
  ALTER TABLE "header" ADD COLUMN "cta_button_link_label" varchar NOT NULL;
  ALTER TABLE "header" ADD COLUMN "cta_button_link_uui_color" "enum_header_cta_button_link_uui_color" DEFAULT 'primary';
  ALTER TABLE "header" ADD COLUMN "cta_button_link_uui_size" "enum_header_cta_button_link_uui_size" DEFAULT 'sm';
  ALTER TABLE "header_nav_items_dropdown_items" ADD CONSTRAINT "header_nav_items_dropdown_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "header_nav_items_dropdown_items_order_idx" ON "header_nav_items_dropdown_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_dropdown_items_parent_id_idx" ON "header_nav_items_dropdown_items" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "header_nav_items_dropdown_items" CASCADE;
  ALTER TABLE "header_nav_items" DROP COLUMN "has_dropdown";
  ALTER TABLE "header" DROP COLUMN "cta_button_enabled";
  ALTER TABLE "header" DROP COLUMN "cta_button_link_type";
  ALTER TABLE "header" DROP COLUMN "cta_button_link_new_tab";
  ALTER TABLE "header" DROP COLUMN "cta_button_link_url";
  ALTER TABLE "header" DROP COLUMN "cta_button_link_label";
  ALTER TABLE "header" DROP COLUMN "cta_button_link_uui_color";
  ALTER TABLE "header" DROP COLUMN "cta_button_link_uui_size";
  DROP TYPE "public"."enum_header_nav_items_dropdown_items_link_type";
  DROP TYPE "public"."enum_header_nav_items_dropdown_items_icon";
  DROP TYPE "public"."enum_header_cta_button_link_type";
  DROP TYPE "public"."enum_header_cta_button_link_uui_color";
  DROP TYPE "public"."enum_header_cta_button_link_uui_size";`)
}
