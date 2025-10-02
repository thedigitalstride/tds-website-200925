import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   -- Create enum types for version tables with proper naming convention
   DO $$ BEGIN
     CREATE TYPE "public"."enum__pages_v_blocks_button_block_layout" AS ENUM('horizontal', 'vertical');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE "public"."enum__pages_v_blocks_button_block_alignment" AS ENUM('left', 'center', 'right');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE "public"."enum__pages_v_blocks_button_block_buttons_link_type" AS ENUM('reference', 'custom');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE "public"."enum__pages_v_blocks_button_block_buttons_link_uui_color" AS ENUM('primary', 'secondary', 'tertiary', 'link-gray', 'link-color', 'primary-destructive', 'secondary-destructive', 'tertiary-destructive', 'link-destructive');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE "public"."enum__pages_v_blocks_button_block_buttons_link_uui_size" AS ENUM('sm', 'md', 'lg', 'xl');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE "public"."enum__pages_v_blocks_button_block_buttons_icon_position" AS ENUM('leading', 'trailing');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE "public"."enum__pages_v_blocks_hero_heading_layout_options_headline_color" AS ENUM('primary', 'brand');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE "public"."enum__pages_v_blocks_hero_heading_layout_options_text_alignment" AS ENUM('left', 'center');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE "public"."enum__pages_v_blocks_hero_heading_layout_options_spacing" AS ENUM('compact', 'normal', 'spacious');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE "public"."enum__pages_v_blocks_breadcrumb_spacing" AS ENUM('compact', 'normal', 'spacious');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   -- Now create the version tables with these enum types
   CREATE TABLE IF NOT EXISTS "_pages_v_blocks_hero_heading" (
     "_order" integer NOT NULL,
     "_parent_id" integer NOT NULL,
     "_path" text NOT NULL,
     "id" serial PRIMARY KEY NOT NULL,
     "headline" varchar,
     "subtitle" varchar,
     "layout_options_headline_color" "enum__pages_v_blocks_hero_heading_layout_options_headline_color" DEFAULT 'primary',
     "layout_options_text_alignment" "enum__pages_v_blocks_hero_heading_layout_options_text_alignment" DEFAULT 'left',
     "layout_options_spacing" "enum__pages_v_blocks_hero_heading_layout_options_spacing" DEFAULT 'normal',
     "_uuid" varchar,
     "block_name" varchar
   );

   CREATE TABLE IF NOT EXISTS "_pages_v_blocks_breadcrumb" (
     "_order" integer NOT NULL,
     "_parent_id" integer NOT NULL,
     "_path" text NOT NULL,
     "id" serial PRIMARY KEY NOT NULL,
     "spacing" "enum__pages_v_blocks_breadcrumb_spacing" DEFAULT 'compact',
     "_uuid" varchar,
     "block_name" varchar
   );

   CREATE TABLE IF NOT EXISTS "_pages_v_blocks_button_block" (
     "_order" integer NOT NULL,
     "_parent_id" integer NOT NULL,
     "_path" text NOT NULL,
     "id" serial PRIMARY KEY NOT NULL,
     "layout" "enum__pages_v_blocks_button_block_layout" DEFAULT 'horizontal',
     "alignment" "enum__pages_v_blocks_button_block_alignment" DEFAULT 'left',
     "_uuid" varchar,
     "block_name" varchar
   );

   CREATE TABLE IF NOT EXISTS "_pages_v_blocks_button_block_buttons" (
     "_order" integer NOT NULL,
     "_parent_id" integer NOT NULL,
     "id" serial PRIMARY KEY NOT NULL,
     "link_type" "enum__pages_v_blocks_button_block_buttons_link_type" DEFAULT 'reference',
     "link_new_tab" boolean,
     "link_url" varchar,
     "link_label" varchar,
     "link_uui_color" "enum__pages_v_blocks_button_block_buttons_link_uui_color" DEFAULT 'primary',
     "link_uui_size" "enum__pages_v_blocks_button_block_buttons_link_uui_size" DEFAULT 'md',
     "icon" varchar,
     "icon_position" "enum__pages_v_blocks_button_block_buttons_icon_position" DEFAULT 'leading',
     "_uuid" varchar
   );

   -- Add foreign key constraints
   DO $$ BEGIN
     ALTER TABLE "_pages_v_blocks_hero_heading" ADD CONSTRAINT "_pages_v_blocks_hero_heading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     ALTER TABLE "_pages_v_blocks_breadcrumb" ADD CONSTRAINT "_pages_v_blocks_breadcrumb_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     ALTER TABLE "_pages_v_blocks_button_block" ADD CONSTRAINT "_pages_v_blocks_button_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     ALTER TABLE "_pages_v_blocks_button_block_buttons" ADD CONSTRAINT "_pages_v_blocks_button_block_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_button_block"("id") ON DELETE cascade ON UPDATE no action;
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   -- Create indexes
   CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_heading_order_idx" ON "_pages_v_blocks_hero_heading" USING btree ("_order");
   CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_heading_parent_id_idx" ON "_pages_v_blocks_hero_heading" USING btree ("_parent_id");
   CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_heading_path_idx" ON "_pages_v_blocks_hero_heading" USING btree ("_path");

   CREATE INDEX IF NOT EXISTS "_pages_v_blocks_breadcrumb_order_idx" ON "_pages_v_blocks_breadcrumb" USING btree ("_order");
   CREATE INDEX IF NOT EXISTS "_pages_v_blocks_breadcrumb_parent_id_idx" ON "_pages_v_blocks_breadcrumb" USING btree ("_parent_id");
   CREATE INDEX IF NOT EXISTS "_pages_v_blocks_breadcrumb_path_idx" ON "_pages_v_blocks_breadcrumb" USING btree ("_path");

   CREATE INDEX IF NOT EXISTS "_pages_v_blocks_button_block_order_idx" ON "_pages_v_blocks_button_block" USING btree ("_order");
   CREATE INDEX IF NOT EXISTS "_pages_v_blocks_button_block_parent_id_idx" ON "_pages_v_blocks_button_block" USING btree ("_parent_id");
   CREATE INDEX IF NOT EXISTS "_pages_v_blocks_button_block_path_idx" ON "_pages_v_blocks_button_block" USING btree ("_path");

   CREATE INDEX IF NOT EXISTS "_pages_v_blocks_button_block_buttons_order_idx" ON "_pages_v_blocks_button_block_buttons" USING btree ("_order");
   CREATE INDEX IF NOT EXISTS "_pages_v_blocks_button_block_buttons_parent_id_idx" ON "_pages_v_blocks_button_block_buttons" USING btree ("_parent_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE IF EXISTS "_pages_v_blocks_hero_heading" CASCADE;
   DROP TABLE IF EXISTS "_pages_v_blocks_breadcrumb" CASCADE;
   DROP TABLE IF EXISTS "_pages_v_blocks_button_block_buttons" CASCADE;
   DROP TABLE IF EXISTS "_pages_v_blocks_button_block" CASCADE;

   DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_button_block_layout";
   DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_button_block_alignment";
   DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_button_block_buttons_link_type";
   DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_button_block_buttons_link_uui_color";
   DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_button_block_buttons_link_uui_size";
   DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_button_block_buttons_icon_position";
   DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_hero_heading_layout_options_headline_color";
   DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_hero_heading_layout_options_text_alignment";
   DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_hero_heading_layout_options_spacing";
   DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_breadcrumb_spacing";
  `)
}
