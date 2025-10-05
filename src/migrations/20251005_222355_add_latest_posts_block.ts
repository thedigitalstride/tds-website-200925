import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_latest_posts_content_source" AS ENUM('latest', 'manual');
  CREATE TYPE "public"."enum_pages_blocks_latest_posts_opts_num_posts" AS ENUM('3', '6', '9', '12');
  CREATE TYPE "public"."enum_pages_blocks_latest_posts_button_config_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_latest_posts_button_config_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  CREATE TYPE "public"."enum_pages_blocks_latest_posts_button_config_link_uui_size" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_latest_posts_button_config_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum_pages_blocks_latest_posts_layout_options_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_latest_posts_layout_options_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_latest_posts_content_source" AS ENUM('latest', 'manual');
  CREATE TYPE "public"."enum__pages_v_blocks_latest_posts_opts_num_posts" AS ENUM('3', '6', '9', '12');
  CREATE TYPE "public"."enum__pages_v_blocks_latest_posts_button_config_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_latest_posts_button_config_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_latest_posts_button_config_link_uui_size" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_latest_posts_button_config_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum__pages_v_blocks_latest_posts_layout_options_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_latest_posts_layout_options_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TABLE "pages_blocks_latest_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"header_show_header" boolean DEFAULT true,
  	"header_eyebrow" varchar,
  	"header_heading" varchar DEFAULT 'Latest blog posts',
  	"header_description" varchar,
  	"content_source" "enum_pages_blocks_latest_posts_content_source" DEFAULT 'latest',
  	"opts_num_posts" "enum_pages_blocks_latest_posts_opts_num_posts" DEFAULT '3',
  	"opts_category_filter_id" integer,
  	"button_config_show_button" boolean DEFAULT true,
  	"button_config_link_type" "enum_pages_blocks_latest_posts_button_config_link_type" DEFAULT 'reference',
  	"button_config_link_new_tab" boolean,
  	"button_config_link_url" varchar,
  	"button_config_link_label" varchar,
  	"button_config_link_uui_color" "enum_pages_blocks_latest_posts_button_config_link_uui_color" DEFAULT 'primary',
  	"button_config_link_uui_size" "enum_pages_blocks_latest_posts_button_config_link_uui_size" DEFAULT 'xl',
  	"button_config_link_button_icon" varchar,
  	"button_config_link_icon_pos" "enum_pages_blocks_latest_posts_button_config_link_icon_pos" DEFAULT 'trailing',
  	"layout_options_columns" "enum_pages_blocks_latest_posts_layout_options_columns" DEFAULT '3',
  	"layout_options_spacing" "enum_pages_blocks_latest_posts_layout_options_spacing" DEFAULT 'normal',
  	"block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_latest_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  	"header_show_header" boolean DEFAULT true,
  	"header_eyebrow" varchar,
  	"header_heading" varchar DEFAULT 'Latest blog posts',
  	"header_description" varchar,
  	"content_source" "enum__pages_v_blocks_latest_posts_content_source" DEFAULT 'latest',
  	"opts_num_posts" "enum__pages_v_blocks_latest_posts_opts_num_posts" DEFAULT '3',
  	"opts_category_filter_id" integer,
  	"button_config_show_button" boolean DEFAULT true,
  	"button_config_link_type" "enum__pages_v_blocks_latest_posts_button_config_link_type" DEFAULT 'reference',
  	"button_config_link_new_tab" boolean,
  	"button_config_link_url" varchar,
  	"button_config_link_label" varchar,
  	"button_config_link_uui_color" "enum__pages_v_blocks_latest_posts_button_config_link_uui_color" DEFAULT 'primary',
  	"button_config_link_uui_size" "enum__pages_v_blocks_latest_posts_button_config_link_uui_size" DEFAULT 'xl',
  	"button_config_link_button_icon" varchar,
  	"button_config_link_icon_pos" "enum__pages_v_blocks_latest_posts_button_config_link_icon_pos" DEFAULT 'trailing',
  	"layout_options_columns" "enum__pages_v_blocks_latest_posts_layout_options_columns" DEFAULT '3',
  	"layout_options_spacing" "enum__pages_v_blocks_latest_posts_layout_options_spacing" DEFAULT 'normal',
  	"block_name" varchar,
  	"_uuid" varchar
  );

  ALTER TABLE "pages_blocks_latest_posts" ADD CONSTRAINT "pages_blocks_latest_posts_opts_category_filter_id_categories_id_fk" FOREIGN KEY ("opts_category_filter_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_latest_posts" ADD CONSTRAINT "pages_blocks_latest_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD CONSTRAINT "_pages_v_blocks_latest_posts_opts_category_filter_id_categories_id_fk" FOREIGN KEY ("opts_category_filter_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD CONSTRAINT "_pages_v_blocks_latest_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_latest_posts_opts_opts_category_filter_idx" ON "pages_blocks_latest_posts" USING btree ("opts_category_filter_id");
  CREATE INDEX "pages_blocks_latest_posts_order_idx" ON "pages_blocks_latest_posts" USING btree ("_order");
  CREATE INDEX "pages_blocks_latest_posts_parent_id_idx" ON "pages_blocks_latest_posts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_latest_posts_path_idx" ON "pages_blocks_latest_posts" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_latest_posts_opts_opts_category_filter_idx" ON "_pages_v_blocks_latest_posts" USING btree ("opts_category_filter_id");
  CREATE INDEX "_pages_v_blocks_latest_posts_order_idx" ON "_pages_v_blocks_latest_posts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_latest_posts_parent_id_idx" ON "_pages_v_blocks_latest_posts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_latest_posts_path_idx" ON "_pages_v_blocks_latest_posts" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_latest_posts" CASCADE;
  DROP TABLE "_pages_v_blocks_latest_posts" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_latest_posts_content_source";
  DROP TYPE "public"."enum_pages_blocks_latest_posts_opts_num_posts";
  DROP TYPE "public"."enum_pages_blocks_latest_posts_button_config_link_type";
  DROP TYPE "public"."enum_pages_blocks_latest_posts_button_config_link_uui_color";
  DROP TYPE "public"."enum_pages_blocks_latest_posts_button_config_link_uui_size";
  DROP TYPE "public"."enum_pages_blocks_latest_posts_button_config_link_icon_pos";
  DROP TYPE "public"."enum_pages_blocks_latest_posts_layout_options_columns";
  DROP TYPE "public"."enum_pages_blocks_latest_posts_layout_options_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_latest_posts_content_source";
  DROP TYPE "public"."enum__pages_v_blocks_latest_posts_opts_num_posts";
  DROP TYPE "public"."enum__pages_v_blocks_latest_posts_button_config_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_latest_posts_button_config_link_uui_color";
  DROP TYPE "public"."enum__pages_v_blocks_latest_posts_button_config_link_uui_size";
  DROP TYPE "public"."enum__pages_v_blocks_latest_posts_button_config_link_icon_pos";
  DROP TYPE "public"."enum__pages_v_blocks_latest_posts_layout_options_columns";
  DROP TYPE "public"."enum__pages_v_blocks_latest_posts_layout_options_spacing";`)
}
