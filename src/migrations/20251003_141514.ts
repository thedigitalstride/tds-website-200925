import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_cta_links_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum_pages_blocks_button_block_buttons_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum_pages_blocks_features_features_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_features_features_link_uui_color" AS ENUM('primary', 'secondary', 'tertiary', 'link-color', 'link-gray');
  CREATE TYPE "public"."enum_pages_blocks_features_features_link_uui_size" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_blocks_features_features_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum_pages_blocks_features_layout_options_card_style" AS ENUM('card', 'centered-icon', 'left-icon', 'horizontal-icon', 'simple-card', 'elevated-box');
  CREATE TYPE "public"."enum_pages_blocks_features_layout_options_card_background" AS ENUM('grey', 'brand', 'outline', 'line');
  CREATE TYPE "public"."enum_pages_blocks_features_layout_options_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_features_layout_options_icon_color" AS ENUM('brand', 'gray', 'white', 'accent', 'success', 'warning', 'error');
  CREATE TYPE "public"."enum_pages_blocks_features_layout_options_icon_theme" AS ENUM('light', 'dark', 'gradient', 'modern', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_features_layout_options_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum__pages_v_blocks_button_block_buttons_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum__pages_v_blocks_features_features_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_features_features_link_uui_color" AS ENUM('primary', 'secondary', 'tertiary', 'link-color', 'link-gray');
  CREATE TYPE "public"."enum__pages_v_blocks_features_features_link_uui_size" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__pages_v_blocks_features_features_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum__pages_v_blocks_features_layout_options_card_style" AS ENUM('card', 'centered-icon', 'left-icon', 'horizontal-icon', 'simple-card', 'elevated-box');
  CREATE TYPE "public"."enum__pages_v_blocks_features_layout_options_card_background" AS ENUM('grey', 'brand', 'outline', 'line');
  CREATE TYPE "public"."enum__pages_v_blocks_features_layout_options_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_features_layout_options_icon_color" AS ENUM('brand', 'gray', 'white', 'accent', 'success', 'warning', 'error');
  CREATE TYPE "public"."enum__pages_v_blocks_features_layout_options_icon_theme" AS ENUM('light', 'dark', 'gradient', 'modern', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_features_layout_options_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_header_cta_button_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum_footer_nav_columns_items_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TABLE "pages_blocks_features_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"enable_link" boolean,
  	"link_type" "enum_pages_blocks_features_features_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_uui_color" "enum_pages_blocks_features_features_link_uui_color" DEFAULT 'link-color',
  	"link_uui_size" "enum_pages_blocks_features_features_link_uui_size" DEFAULT 'md',
  	"link_button_icon" varchar,
  	"link_icon_pos" "enum_pages_blocks_features_features_link_icon_pos" DEFAULT 'trailing'
  );
  
  CREATE TABLE "pages_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"header_show_header" boolean DEFAULT true,
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_description" varchar,
  	"layout_options_card_style" "enum_pages_blocks_features_layout_options_card_style" DEFAULT 'card',
  	"layout_options_card_background" "enum_pages_blocks_features_layout_options_card_background" DEFAULT 'grey',
  	"layout_options_columns" "enum_pages_blocks_features_layout_options_columns" DEFAULT '3',
  	"layout_options_icon_color" "enum_pages_blocks_features_layout_options_icon_color" DEFAULT 'brand',
  	"layout_options_icon_theme" "enum_pages_blocks_features_layout_options_icon_theme" DEFAULT 'dark',
  	"layout_options_spacing" "enum_pages_blocks_features_layout_options_spacing" DEFAULT 'normal',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_features_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"enable_link" boolean,
  	"link_type" "enum__pages_v_blocks_features_features_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_uui_color" "enum__pages_v_blocks_features_features_link_uui_color" DEFAULT 'link-color',
  	"link_uui_size" "enum__pages_v_blocks_features_features_link_uui_size" DEFAULT 'md',
  	"link_button_icon" varchar,
  	"link_icon_pos" "enum__pages_v_blocks_features_features_link_icon_pos" DEFAULT 'trailing',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_show_header" boolean DEFAULT true,
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_description" varchar,
  	"layout_options_card_style" "enum__pages_v_blocks_features_layout_options_card_style" DEFAULT 'card',
  	"layout_options_card_background" "enum__pages_v_blocks_features_layout_options_card_background" DEFAULT 'grey',
  	"layout_options_columns" "enum__pages_v_blocks_features_layout_options_columns" DEFAULT '3',
  	"layout_options_icon_color" "enum__pages_v_blocks_features_layout_options_icon_color" DEFAULT 'brand',
  	"layout_options_icon_theme" "enum__pages_v_blocks_features_layout_options_icon_theme" DEFAULT 'dark',
  	"layout_options_spacing" "enum__pages_v_blocks_features_layout_options_spacing" DEFAULT 'normal',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN "link_button_icon" varchar;
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN "link_icon_pos" "enum_pages_blocks_cta_links_link_icon_pos" DEFAULT 'trailing';
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "link_button_icon" varchar;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "link_icon_pos" "enum_pages_blocks_content_columns_link_icon_pos" DEFAULT 'trailing';
  ALTER TABLE "pages_blocks_button_block_buttons" ADD COLUMN "link_button_icon" varchar;
  ALTER TABLE "pages_blocks_button_block_buttons" ADD COLUMN "link_icon_pos" "enum_pages_blocks_button_block_buttons_link_icon_pos" DEFAULT 'trailing';
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN "link_button_icon" varchar;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN "link_icon_pos" "enum__pages_v_blocks_cta_links_link_icon_pos" DEFAULT 'trailing';
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "link_button_icon" varchar;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "link_icon_pos" "enum__pages_v_blocks_content_columns_link_icon_pos" DEFAULT 'trailing';
  ALTER TABLE "_pages_v_blocks_button_block_buttons" ADD COLUMN "link_button_icon" varchar;
  ALTER TABLE "_pages_v_blocks_button_block_buttons" ADD COLUMN "link_icon_pos" "enum__pages_v_blocks_button_block_buttons_link_icon_pos" DEFAULT 'trailing';
  ALTER TABLE "header" ADD COLUMN "cta_button_link_button_icon" varchar;
  ALTER TABLE "header" ADD COLUMN "cta_button_link_icon_pos" "enum_header_cta_button_link_icon_pos" DEFAULT 'trailing';
  ALTER TABLE "footer_nav_columns_items" ADD COLUMN "link_button_icon" varchar;
  ALTER TABLE "footer_nav_columns_items" ADD COLUMN "link_icon_pos" "enum_footer_nav_columns_items_link_icon_pos" DEFAULT 'trailing';
  ALTER TABLE "pages_blocks_features_features" ADD CONSTRAINT "pages_blocks_features_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_features" ADD CONSTRAINT "pages_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features_features" ADD CONSTRAINT "_pages_v_blocks_features_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features" ADD CONSTRAINT "_pages_v_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_features_features_order_idx" ON "pages_blocks_features_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_features_features_parent_id_idx" ON "pages_blocks_features_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_features_order_idx" ON "pages_blocks_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_features_parent_id_idx" ON "pages_blocks_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_features_path_idx" ON "pages_blocks_features" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_features_features_order_idx" ON "_pages_v_blocks_features_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_features_features_parent_id_idx" ON "_pages_v_blocks_features_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_features_order_idx" ON "_pages_v_blocks_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_features_parent_id_idx" ON "_pages_v_blocks_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_features_path_idx" ON "_pages_v_blocks_features" USING btree ("_path");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_features_features" CASCADE;
  DROP TABLE "pages_blocks_features" CASCADE;
  DROP TABLE "_pages_v_blocks_features_features" CASCADE;
  DROP TABLE "_pages_v_blocks_features" CASCADE;
  ALTER TABLE "pages_blocks_cta_links" DROP COLUMN "link_button_icon";
  ALTER TABLE "pages_blocks_cta_links" DROP COLUMN "link_icon_pos";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "link_button_icon";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "link_icon_pos";
  ALTER TABLE "pages_blocks_button_block_buttons" DROP COLUMN "link_button_icon";
  ALTER TABLE "pages_blocks_button_block_buttons" DROP COLUMN "link_icon_pos";
  ALTER TABLE "_pages_v_blocks_cta_links" DROP COLUMN "link_button_icon";
  ALTER TABLE "_pages_v_blocks_cta_links" DROP COLUMN "link_icon_pos";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "link_button_icon";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "link_icon_pos";
  ALTER TABLE "_pages_v_blocks_button_block_buttons" DROP COLUMN "link_button_icon";
  ALTER TABLE "_pages_v_blocks_button_block_buttons" DROP COLUMN "link_icon_pos";
  ALTER TABLE "header" DROP COLUMN "cta_button_link_button_icon";
  ALTER TABLE "header" DROP COLUMN "cta_button_link_icon_pos";
  ALTER TABLE "footer_nav_columns_items" DROP COLUMN "link_button_icon";
  ALTER TABLE "footer_nav_columns_items" DROP COLUMN "link_icon_pos";
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_icon_pos";
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_icon_pos";
  DROP TYPE "public"."enum_pages_blocks_button_block_buttons_link_icon_pos";
  DROP TYPE "public"."enum_pages_blocks_features_features_link_type";
  DROP TYPE "public"."enum_pages_blocks_features_features_link_uui_color";
  DROP TYPE "public"."enum_pages_blocks_features_features_link_uui_size";
  DROP TYPE "public"."enum_pages_blocks_features_features_link_icon_pos";
  DROP TYPE "public"."enum_pages_blocks_features_layout_options_card_style";
  DROP TYPE "public"."enum_pages_blocks_features_layout_options_card_background";
  DROP TYPE "public"."enum_pages_blocks_features_layout_options_columns";
  DROP TYPE "public"."enum_pages_blocks_features_layout_options_icon_color";
  DROP TYPE "public"."enum_pages_blocks_features_layout_options_icon_theme";
  DROP TYPE "public"."enum_pages_blocks_features_layout_options_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_icon_pos";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_icon_pos";
  DROP TYPE "public"."enum__pages_v_blocks_button_block_buttons_link_icon_pos";
  DROP TYPE "public"."enum__pages_v_blocks_features_features_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_features_features_link_uui_color";
  DROP TYPE "public"."enum__pages_v_blocks_features_features_link_uui_size";
  DROP TYPE "public"."enum__pages_v_blocks_features_features_link_icon_pos";
  DROP TYPE "public"."enum__pages_v_blocks_features_layout_options_card_style";
  DROP TYPE "public"."enum__pages_v_blocks_features_layout_options_card_background";
  DROP TYPE "public"."enum__pages_v_blocks_features_layout_options_columns";
  DROP TYPE "public"."enum__pages_v_blocks_features_layout_options_icon_color";
  DROP TYPE "public"."enum__pages_v_blocks_features_layout_options_icon_theme";
  DROP TYPE "public"."enum__pages_v_blocks_features_layout_options_spacing";
  DROP TYPE "public"."enum_header_cta_button_link_icon_pos";
  DROP TYPE "public"."enum_footer_nav_columns_items_link_icon_pos";`)
}
