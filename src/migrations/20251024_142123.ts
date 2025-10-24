import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_button_block_buttons" CASCADE;
  DROP TABLE "pages_blocks_button_block" CASCADE;
  DROP TABLE "_pages_v_blocks_button_block_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_button_block" CASCADE;
  DROP TABLE "posts_settings_blocks_button_block_buttons" CASCADE;
  DROP TABLE "posts_settings_blocks_button_block" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_button_block_buttons_link_type";
  DROP TYPE "public"."enum_pages_blocks_button_block_buttons_link_uui_color";
  DROP TYPE "public"."enum_pages_blocks_button_block_buttons_link_uui_size";
  DROP TYPE "public"."enum_pages_blocks_button_block_buttons_link_icon_pos";
  DROP TYPE "public"."enum_pages_blocks_button_block_layout";
  DROP TYPE "public"."enum_pages_blocks_button_block_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_button_block_buttons_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_button_block_buttons_link_uui_color";
  DROP TYPE "public"."enum__pages_v_blocks_button_block_buttons_link_uui_size";
  DROP TYPE "public"."enum__pages_v_blocks_button_block_buttons_link_icon_pos";
  DROP TYPE "public"."enum__pages_v_blocks_button_block_layout";
  DROP TYPE "public"."enum__pages_v_blocks_button_block_alignment";
  DROP TYPE "public"."enum_posts_settings_blocks_button_block_buttons_link_type";
  DROP TYPE "public"."enum_posts_settings_blocks_button_block_buttons_link_uui_color";
  DROP TYPE "public"."enum_posts_settings_blocks_button_block_buttons_link_uui_size";
  DROP TYPE "public"."enum_posts_settings_blocks_button_block_buttons_link_icon_pos";
  DROP TYPE "public"."enum_posts_settings_blocks_button_block_layout";
  DROP TYPE "public"."enum_posts_settings_blocks_button_block_alignment";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_button_block_buttons_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_button_block_buttons_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  CREATE TYPE "public"."enum_pages_blocks_button_block_buttons_link_uui_size" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_button_block_buttons_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum_pages_blocks_button_block_layout" AS ENUM('horizontal', 'vertical');
  CREATE TYPE "public"."enum_pages_blocks_button_block_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_button_block_buttons_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_button_block_buttons_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_button_block_buttons_link_uui_size" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_button_block_buttons_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum__pages_v_blocks_button_block_layout" AS ENUM('horizontal', 'vertical');
  CREATE TYPE "public"."enum__pages_v_blocks_button_block_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_posts_settings_blocks_button_block_buttons_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_posts_settings_blocks_button_block_buttons_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  CREATE TYPE "public"."enum_posts_settings_blocks_button_block_buttons_link_uui_size" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_posts_settings_blocks_button_block_buttons_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum_posts_settings_blocks_button_block_layout" AS ENUM('horizontal', 'vertical');
  CREATE TYPE "public"."enum_posts_settings_blocks_button_block_alignment" AS ENUM('left', 'center', 'right');
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
  	"link_button_icon" varchar,
  	"link_icon_pos" "enum_pages_blocks_button_block_buttons_link_icon_pos" DEFAULT 'trailing'
  );
  
  CREATE TABLE "pages_blocks_button_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"layout" "enum_pages_blocks_button_block_layout" DEFAULT 'horizontal',
  	"alignment" "enum_pages_blocks_button_block_alignment" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_button_block_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_button_block_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_uui_color" "enum__pages_v_blocks_button_block_buttons_link_uui_color" DEFAULT 'primary',
  	"link_uui_size" "enum__pages_v_blocks_button_block_buttons_link_uui_size" DEFAULT 'md',
  	"link_button_icon" varchar,
  	"link_icon_pos" "enum__pages_v_blocks_button_block_buttons_link_icon_pos" DEFAULT 'trailing',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_button_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"layout" "enum__pages_v_blocks_button_block_layout" DEFAULT 'horizontal',
  	"alignment" "enum__pages_v_blocks_button_block_alignment" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_settings_blocks_button_block_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_posts_settings_blocks_button_block_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_uui_color" "enum_posts_settings_blocks_button_block_buttons_link_uui_color" DEFAULT 'primary',
  	"link_uui_size" "enum_posts_settings_blocks_button_block_buttons_link_uui_size" DEFAULT 'md',
  	"link_button_icon" varchar,
  	"link_icon_pos" "enum_posts_settings_blocks_button_block_buttons_link_icon_pos" DEFAULT 'trailing'
  );
  
  CREATE TABLE "posts_settings_blocks_button_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"layout" "enum_posts_settings_blocks_button_block_layout" DEFAULT 'horizontal',
  	"alignment" "enum_posts_settings_blocks_button_block_alignment" DEFAULT 'left',
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_button_block_buttons" ADD CONSTRAINT "pages_blocks_button_block_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_button_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_button_block" ADD CONSTRAINT "pages_blocks_button_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_button_block_buttons" ADD CONSTRAINT "_pages_v_blocks_button_block_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_button_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_button_block" ADD CONSTRAINT "_pages_v_blocks_button_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_settings_blocks_button_block_buttons" ADD CONSTRAINT "posts_settings_blocks_button_block_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_settings_blocks_button_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_settings_blocks_button_block" ADD CONSTRAINT "posts_settings_blocks_button_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_button_block_buttons_order_idx" ON "pages_blocks_button_block_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_button_block_buttons_parent_id_idx" ON "pages_blocks_button_block_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_button_block_order_idx" ON "pages_blocks_button_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_button_block_parent_id_idx" ON "pages_blocks_button_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_button_block_path_idx" ON "pages_blocks_button_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_button_block_buttons_order_idx" ON "_pages_v_blocks_button_block_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_button_block_buttons_parent_id_idx" ON "_pages_v_blocks_button_block_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_button_block_order_idx" ON "_pages_v_blocks_button_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_button_block_parent_id_idx" ON "_pages_v_blocks_button_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_button_block_path_idx" ON "_pages_v_blocks_button_block" USING btree ("_path");
  CREATE INDEX "posts_settings_blocks_button_block_buttons_order_idx" ON "posts_settings_blocks_button_block_buttons" USING btree ("_order");
  CREATE INDEX "posts_settings_blocks_button_block_buttons_parent_id_idx" ON "posts_settings_blocks_button_block_buttons" USING btree ("_parent_id");
  CREATE INDEX "posts_settings_blocks_button_block_order_idx" ON "posts_settings_blocks_button_block" USING btree ("_order");
  CREATE INDEX "posts_settings_blocks_button_block_parent_id_idx" ON "posts_settings_blocks_button_block" USING btree ("_parent_id");
  CREATE INDEX "posts_settings_blocks_button_block_path_idx" ON "posts_settings_blocks_button_block" USING btree ("_path");`)
}
