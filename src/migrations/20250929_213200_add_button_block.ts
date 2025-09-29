import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_button_block_buttons_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_button_block_buttons_link_uui_color" AS ENUM('primary', 'secondary', 'tertiary', 'link-gray', 'link-color', 'primary-destructive', 'secondary-destructive', 'tertiary-destructive', 'link-destructive');
  CREATE TYPE "public"."enum_pages_blocks_button_block_buttons_link_uui_size" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_button_block_buttons_icon_position" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum_pages_blocks_button_block_layout" AS ENUM('horizontal', 'vertical');
  CREATE TYPE "public"."enum_pages_blocks_button_block_alignment" AS ENUM('left', 'center', 'right');

  CREATE TABLE "pages_blocks_button_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"layout" "enum_pages_blocks_button_block_layout" DEFAULT 'horizontal',
  	"alignment" "enum_pages_blocks_button_block_alignment" DEFAULT 'left',
  	"block_name" varchar
  );

  CREATE TABLE "pages_blocks_button_block_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_button_block_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_uui_color" "enum_pages_blocks_button_block_buttons_link_uui_color" DEFAULT 'primary',
  	"link_uui_size" "enum_pages_blocks_button_block_buttons_link_uui_size" DEFAULT 'md',
  	"icon" varchar,
  	"icon_position" "enum_pages_blocks_button_block_buttons_icon_position" DEFAULT 'leading'
  );

  ALTER TABLE "pages_blocks_button_block" ADD CONSTRAINT "pages_blocks_button_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_button_block_buttons" ADD CONSTRAINT "pages_blocks_button_block_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_button_block"("id") ON DELETE cascade ON UPDATE no action;

  CREATE INDEX "pages_blocks_button_block_order_idx" ON "pages_blocks_button_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_button_block_parent_id_idx" ON "pages_blocks_button_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_button_block_path_idx" ON "pages_blocks_button_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_button_block_buttons_order_idx" ON "pages_blocks_button_block_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_button_block_buttons_parent_id_idx" ON "pages_blocks_button_block_buttons" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_button_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_button_block_buttons" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_button_block" CASCADE;
  DROP TABLE "pages_blocks_button_block_buttons" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_button_block_buttons_link_type";
  DROP TYPE "public"."enum_pages_blocks_button_block_buttons_link_uui_color";
  DROP TYPE "public"."enum_pages_blocks_button_block_buttons_link_uui_size";
  DROP TYPE "public"."enum_pages_blocks_button_block_buttons_icon_position";
  DROP TYPE "public"."enum_pages_blocks_button_block_layout";
  DROP TYPE "public"."enum_pages_blocks_button_block_alignment";`)
}