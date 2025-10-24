import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_heading_buttons_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_hero_heading_buttons_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary');
  CREATE TYPE "public"."enum_pages_blocks_hero_heading_buttons_link_uui_size" AS ENUM('md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_hero_heading_buttons_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum_pages_blocks_hero_heading_hero_layout" AS ENUM('standard', 'splitImage');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_heading_buttons_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_heading_buttons_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_heading_buttons_link_uui_size" AS ENUM('md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_heading_buttons_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_heading_hero_layout" AS ENUM('standard', 'splitImage');
  CREATE TABLE "pages_blocks_hero_heading_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_hero_heading_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_uui_color" "enum_pages_blocks_hero_heading_buttons_link_uui_color" DEFAULT 'primary',
  	"link_uui_size" "enum_pages_blocks_hero_heading_buttons_link_uui_size" DEFAULT 'xl',
  	"link_button_icon" varchar,
  	"link_icon_pos" "enum_pages_blocks_hero_heading_buttons_link_icon_pos" DEFAULT 'trailing'
  );
  
  CREATE TABLE "_pages_v_blocks_hero_heading_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_hero_heading_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_uui_color" "enum__pages_v_blocks_hero_heading_buttons_link_uui_color" DEFAULT 'primary',
  	"link_uui_size" "enum__pages_v_blocks_hero_heading_buttons_link_uui_size" DEFAULT 'xl',
  	"link_button_icon" varchar,
  	"link_icon_pos" "enum__pages_v_blocks_hero_heading_buttons_link_icon_pos" DEFAULT 'trailing',
  	"_uuid" varchar
  );
  
  ALTER TABLE "pages_blocks_hero_heading" ADD COLUMN "hero_layout" "enum_pages_blocks_hero_heading_hero_layout" DEFAULT 'standard';
  ALTER TABLE "pages_blocks_hero_heading" ADD COLUMN "split_image_id" integer;
  ALTER TABLE "pages_blocks_hero_heading" ADD COLUMN "split_image_alt" varchar;
  ALTER TABLE "_pages_v_blocks_hero_heading" ADD COLUMN "hero_layout" "enum__pages_v_blocks_hero_heading_hero_layout" DEFAULT 'standard';
  ALTER TABLE "_pages_v_blocks_hero_heading" ADD COLUMN "split_image_id" integer;
  ALTER TABLE "_pages_v_blocks_hero_heading" ADD COLUMN "split_image_alt" varchar;
  ALTER TABLE "pages_blocks_hero_heading_buttons" ADD CONSTRAINT "pages_blocks_hero_heading_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_heading"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_heading_buttons" ADD CONSTRAINT "_pages_v_blocks_hero_heading_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_heading"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_heading_buttons_order_idx" ON "pages_blocks_hero_heading_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_heading_buttons_parent_id_idx" ON "pages_blocks_hero_heading_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_heading_buttons_order_idx" ON "_pages_v_blocks_hero_heading_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_heading_buttons_parent_id_idx" ON "_pages_v_blocks_hero_heading_buttons" USING btree ("_parent_id");
  ALTER TABLE "pages_blocks_hero_heading" ADD CONSTRAINT "pages_blocks_hero_heading_split_image_id_media_id_fk" FOREIGN KEY ("split_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_heading" ADD CONSTRAINT "_pages_v_blocks_hero_heading_split_image_id_media_id_fk" FOREIGN KEY ("split_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_heading_split_image_idx" ON "pages_blocks_hero_heading" USING btree ("split_image_id");
  CREATE INDEX "_pages_v_blocks_hero_heading_split_image_idx" ON "_pages_v_blocks_hero_heading" USING btree ("split_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_heading_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_heading_buttons" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_hero_heading_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_heading_buttons" CASCADE;
  ALTER TABLE "pages_blocks_hero_heading" DROP CONSTRAINT "pages_blocks_hero_heading_split_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_hero_heading" DROP CONSTRAINT "_pages_v_blocks_hero_heading_split_image_id_media_id_fk";
  
  DROP INDEX "pages_blocks_hero_heading_split_image_idx";
  DROP INDEX "_pages_v_blocks_hero_heading_split_image_idx";
  ALTER TABLE "pages_blocks_hero_heading" DROP COLUMN "hero_layout";
  ALTER TABLE "pages_blocks_hero_heading" DROP COLUMN "split_image_id";
  ALTER TABLE "pages_blocks_hero_heading" DROP COLUMN "split_image_alt";
  ALTER TABLE "_pages_v_blocks_hero_heading" DROP COLUMN "hero_layout";
  ALTER TABLE "_pages_v_blocks_hero_heading" DROP COLUMN "split_image_id";
  ALTER TABLE "_pages_v_blocks_hero_heading" DROP COLUMN "split_image_alt";
  DROP TYPE "public"."enum_pages_blocks_hero_heading_buttons_link_type";
  DROP TYPE "public"."enum_pages_blocks_hero_heading_buttons_link_uui_color";
  DROP TYPE "public"."enum_pages_blocks_hero_heading_buttons_link_uui_size";
  DROP TYPE "public"."enum_pages_blocks_hero_heading_buttons_link_icon_pos";
  DROP TYPE "public"."enum_pages_blocks_hero_heading_hero_layout";
  DROP TYPE "public"."enum__pages_v_blocks_hero_heading_buttons_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_heading_buttons_link_uui_color";
  DROP TYPE "public"."enum__pages_v_blocks_hero_heading_buttons_link_uui_size";
  DROP TYPE "public"."enum__pages_v_blocks_hero_heading_buttons_link_icon_pos";
  DROP TYPE "public"."enum__pages_v_blocks_hero_heading_hero_layout";`)
}
