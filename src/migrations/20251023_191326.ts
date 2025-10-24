import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_card_grid_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_cards_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_cards_link_uui_size" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_cards_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_header_header_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_card_style" AS ENUM('card', 'centered-icon', 'left-icon', 'horizontal-icon', 'elevated-box');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_card_background" AS ENUM('primary', 'secondary', 'accent', 'line');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_columns" AS ENUM('1', '2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_icon_color" AS ENUM('primary', 'secondary', 'tertiary', 'accent');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_icon_theme" AS ENUM('rounded-square', 'round');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_cards_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_cards_link_uui_size" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_cards_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_header_header_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_card_style" AS ENUM('card', 'centered-icon', 'left-icon', 'horizontal-icon', 'elevated-box');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_card_background" AS ENUM('primary', 'secondary', 'accent', 'line');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_columns" AS ENUM('1', '2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_icon_color" AS ENUM('primary', 'secondary', 'tertiary', 'accent');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_icon_theme" AS ENUM('rounded-square', 'round');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TABLE "pages_blocks_card_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" jsonb,
  	"icon" varchar,
  	"enable_link" boolean,
  	"link_type" "enum_pages_blocks_card_grid_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_uui_color" "enum_pages_blocks_card_grid_cards_link_uui_color" DEFAULT 'link',
  	"link_uui_size" "enum_pages_blocks_card_grid_cards_link_uui_size" DEFAULT 'md',
  	"link_button_icon" varchar,
  	"link_icon_pos" "enum_pages_blocks_card_grid_cards_link_icon_pos" DEFAULT 'trailing'
  );
  
  CREATE TABLE "pages_blocks_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"header_show_header" boolean DEFAULT true,
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_description" varchar,
  	"header_header_alignment" "enum_pages_blocks_card_grid_header_header_alignment" DEFAULT 'left',
  	"card_style" "enum_pages_blocks_card_grid_card_style" DEFAULT 'card',
  	"card_background" "enum_pages_blocks_card_grid_card_background" DEFAULT 'primary',
  	"columns" "enum_pages_blocks_card_grid_columns" DEFAULT '3',
  	"icon_color" "enum_pages_blocks_card_grid_icon_color" DEFAULT 'primary',
  	"icon_theme" "enum_pages_blocks_card_grid_icon_theme" DEFAULT 'rounded-square',
  	"spacing" "enum_pages_blocks_card_grid_spacing" DEFAULT 'normal',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" jsonb,
  	"icon" varchar,
  	"enable_link" boolean,
  	"link_type" "enum__pages_v_blocks_card_grid_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_uui_color" "enum__pages_v_blocks_card_grid_cards_link_uui_color" DEFAULT 'link',
  	"link_uui_size" "enum__pages_v_blocks_card_grid_cards_link_uui_size" DEFAULT 'md',
  	"link_button_icon" varchar,
  	"link_icon_pos" "enum__pages_v_blocks_card_grid_cards_link_icon_pos" DEFAULT 'trailing',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_show_header" boolean DEFAULT true,
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_description" varchar,
  	"header_header_alignment" "enum__pages_v_blocks_card_grid_header_header_alignment" DEFAULT 'left',
  	"card_style" "enum__pages_v_blocks_card_grid_card_style" DEFAULT 'card',
  	"card_background" "enum__pages_v_blocks_card_grid_card_background" DEFAULT 'primary',
  	"columns" "enum__pages_v_blocks_card_grid_columns" DEFAULT '3',
  	"icon_color" "enum__pages_v_blocks_card_grid_icon_color" DEFAULT 'primary',
  	"icon_theme" "enum__pages_v_blocks_card_grid_icon_theme" DEFAULT 'rounded-square',
  	"spacing" "enum__pages_v_blocks_card_grid_spacing" DEFAULT 'normal',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_card_grid_cards" ADD CONSTRAINT "pages_blocks_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid" ADD CONSTRAINT "pages_blocks_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ADD CONSTRAINT "_pages_v_blocks_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid" ADD CONSTRAINT "_pages_v_blocks_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_card_grid_cards_order_idx" ON "pages_blocks_card_grid_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_grid_cards_parent_id_idx" ON "pages_blocks_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_grid_order_idx" ON "pages_blocks_card_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_grid_parent_id_idx" ON "pages_blocks_card_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_grid_path_idx" ON "pages_blocks_card_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_card_grid_cards_order_idx" ON "_pages_v_blocks_card_grid_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_grid_cards_parent_id_idx" ON "_pages_v_blocks_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_grid_order_idx" ON "_pages_v_blocks_card_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_grid_parent_id_idx" ON "_pages_v_blocks_card_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_grid_path_idx" ON "_pages_v_blocks_card_grid" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_card_grid_cards" CASCADE;
  DROP TABLE "pages_blocks_card_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_card_grid_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_card_grid" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_card_grid_cards_link_type";
  DROP TYPE "public"."enum_pages_blocks_card_grid_cards_link_uui_color";
  DROP TYPE "public"."enum_pages_blocks_card_grid_cards_link_uui_size";
  DROP TYPE "public"."enum_pages_blocks_card_grid_cards_link_icon_pos";
  DROP TYPE "public"."enum_pages_blocks_card_grid_header_header_alignment";
  DROP TYPE "public"."enum_pages_blocks_card_grid_card_style";
  DROP TYPE "public"."enum_pages_blocks_card_grid_card_background";
  DROP TYPE "public"."enum_pages_blocks_card_grid_columns";
  DROP TYPE "public"."enum_pages_blocks_card_grid_icon_color";
  DROP TYPE "public"."enum_pages_blocks_card_grid_icon_theme";
  DROP TYPE "public"."enum_pages_blocks_card_grid_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_cards_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_cards_link_uui_color";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_cards_link_uui_size";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_cards_link_icon_pos";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_header_header_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_card_style";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_card_background";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_columns";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_icon_color";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_icon_theme";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_spacing";`)
}
