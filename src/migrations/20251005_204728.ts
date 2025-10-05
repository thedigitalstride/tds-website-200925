import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_cta_links_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum_pages_blocks_button_block_buttons_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum_pages_blocks_features_features_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_features_features_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  CREATE TYPE "public"."enum_pages_blocks_features_features_link_uui_size" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_features_features_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum_pages_blocks_features_layout_options_card_style" AS ENUM('card', 'centered-icon', 'left-icon', 'horizontal-icon', 'elevated-box');
  CREATE TYPE "public"."enum_pages_blocks_features_layout_options_card_background" AS ENUM('grey', 'brand', 'outline', 'line');
  CREATE TYPE "public"."enum_pages_blocks_features_layout_options_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_features_layout_options_icon_color" AS ENUM('brand', 'accent', 'secondary', 'tertiary');
  CREATE TYPE "public"."enum_pages_blocks_features_layout_options_icon_theme" AS ENUM('rounded-square', 'round');
  CREATE TYPE "public"."enum_pages_blocks_features_layout_options_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_latest_posts_content_source" AS ENUM('latest', 'manual');
  CREATE TYPE "public"."num_posts" AS ENUM('3', '6', '9', '12');
  CREATE TYPE "public"."enum_pages_blocks_latest_posts_button_config_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_latest_posts_button_config_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  CREATE TYPE "public"."enum_pages_blocks_latest_posts_button_config_link_uui_size" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_latest_posts_button_config_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum_pages_blocks_latest_posts_layout_options_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_latest_posts_layout_options_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum__pages_v_blocks_button_block_buttons_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum__pages_v_blocks_features_features_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_features_features_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_features_features_link_uui_size" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_features_features_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum__pages_v_blocks_features_layout_options_card_style" AS ENUM('card', 'centered-icon', 'left-icon', 'horizontal-icon', 'elevated-box');
  CREATE TYPE "public"."enum__pages_v_blocks_features_layout_options_card_background" AS ENUM('grey', 'brand', 'outline', 'line');
  CREATE TYPE "public"."enum__pages_v_blocks_features_layout_options_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_features_layout_options_icon_color" AS ENUM('brand', 'accent', 'secondary', 'tertiary');
  CREATE TYPE "public"."enum__pages_v_blocks_features_layout_options_icon_theme" AS ENUM('rounded-square', 'round');
  CREATE TYPE "public"."enum__pages_v_blocks_features_layout_options_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_latest_posts_content_source" AS ENUM('latest', 'manual');
  CREATE TYPE "public"."enum__pages_v_blocks_latest_posts_button_config_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_latest_posts_button_config_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_latest_posts_button_config_link_uui_size" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_latest_posts_button_config_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum__pages_v_blocks_latest_posts_layout_options_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_latest_posts_layout_options_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_header_cta_button_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum_footer_nav_columns_items_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum_not_found_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_not_found_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  CREATE TYPE "public"."enum_not_found_link_uui_size" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_not_found_link_icon_pos" AS ENUM('leading', 'trailing');
  ALTER TYPE "public"."enum_pages_blocks_cta_links_link_uui_size" ADD VALUE 'sm' BEFORE 'md';
  ALTER TYPE "public"."enum_pages_blocks_cta_links_link_uui_size" ADD VALUE 'xl';
  ALTER TYPE "public"."enum_pages_blocks_content_columns_link_uui_size" ADD VALUE 'xl';
  ALTER TYPE "public"."enum__pages_v_blocks_cta_links_link_uui_size" ADD VALUE 'sm' BEFORE 'md';
  ALTER TYPE "public"."enum__pages_v_blocks_cta_links_link_uui_size" ADD VALUE 'xl';
  ALTER TYPE "public"."enum__pages_v_blocks_content_columns_link_uui_size" ADD VALUE 'xl';
  ALTER TYPE "public"."enum_header_cta_button_link_uui_color" ADD VALUE 'accent' BEFORE 'secondary';
  ALTER TYPE "public"."enum_header_cta_button_link_uui_color" ADD VALUE 'link';
  ALTER TYPE "public"."enum_header_cta_button_link_uui_size" ADD VALUE 'xl';
  ALTER TYPE "public"."enum_footer_nav_columns_items_link_uui_size" ADD VALUE 'sm' BEFORE 'lg';
  ALTER TYPE "public"."enum_footer_nav_columns_items_link_uui_size" ADD VALUE 'md' BEFORE 'lg';
  ALTER TYPE "public"."enum_footer_nav_columns_items_link_uui_size" ADD VALUE 'xl';
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
  	"link_uui_color" "enum_pages_blocks_features_features_link_uui_color" DEFAULT 'link',
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
  	"layout_options_icon_theme" "enum_pages_blocks_features_layout_options_icon_theme" DEFAULT 'rounded-square',
  	"layout_options_spacing" "enum_pages_blocks_features_layout_options_spacing" DEFAULT 'normal',
  	"block_name" varchar
  );
  
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
  	"latest_posts_options_number_of_posts" "num_posts" DEFAULT '3',
  	"latest_posts_options_category_filter_id" integer,
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
  	"link_uui_color" "enum__pages_v_blocks_features_features_link_uui_color" DEFAULT 'link',
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
  	"layout_options_icon_theme" "enum__pages_v_blocks_features_layout_options_icon_theme" DEFAULT 'rounded-square',
  	"layout_options_spacing" "enum__pages_v_blocks_features_layout_options_spacing" DEFAULT 'normal',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_latest_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_show_header" boolean DEFAULT true,
  	"header_eyebrow" varchar,
  	"header_heading" varchar DEFAULT 'Latest blog posts',
  	"header_description" varchar,
  	"content_source" "enum__pages_v_blocks_latest_posts_content_source" DEFAULT 'latest',
  	"latest_posts_options_number_of_posts" "num_posts" DEFAULT '3',
  	"latest_posts_options_category_filter_id" integer,
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
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "not_found" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT '404' NOT NULL,
  	"subheading" varchar DEFAULT 'This page could not be found.',
  	"link_type" "enum_not_found_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_uui_color" "enum_not_found_link_uui_color" DEFAULT 'primary',
  	"link_uui_size" "enum_not_found_link_uui_size" DEFAULT 'md',
  	"link_button_icon" varchar,
  	"link_icon_pos" "enum_not_found_link_icon_pos" DEFAULT 'trailing',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "not_found_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_uui_color" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_uui_color";
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::"public"."enum_pages_blocks_cta_links_link_uui_color";
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_uui_color" SET DATA TYPE "public"."enum_pages_blocks_cta_links_link_uui_color" USING "link_uui_color"::"public"."enum_pages_blocks_cta_links_link_uui_color";
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_uui_color" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_uui_color";
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::"public"."enum_pages_blocks_content_columns_link_uui_color";
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_uui_color" SET DATA TYPE "public"."enum_pages_blocks_content_columns_link_uui_color" USING "link_uui_color"::"public"."enum_pages_blocks_content_columns_link_uui_color";
  ALTER TABLE "pages_blocks_button_block_buttons" ALTER COLUMN "link_uui_color" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_button_block_buttons" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum_pages_blocks_button_block_buttons_link_uui_color";
  CREATE TYPE "public"."enum_pages_blocks_button_block_buttons_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  ALTER TABLE "pages_blocks_button_block_buttons" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::"public"."enum_pages_blocks_button_block_buttons_link_uui_color";
  ALTER TABLE "pages_blocks_button_block_buttons" ALTER COLUMN "link_uui_color" SET DATA TYPE "public"."enum_pages_blocks_button_block_buttons_link_uui_color" USING "link_uui_color"::"public"."enum_pages_blocks_button_block_buttons_link_uui_color";
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_uui_color" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_uui_color";
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::"public"."enum__pages_v_blocks_cta_links_link_uui_color";
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_uui_color" SET DATA TYPE "public"."enum__pages_v_blocks_cta_links_link_uui_color" USING "link_uui_color"::"public"."enum__pages_v_blocks_cta_links_link_uui_color";
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_uui_color" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_uui_color";
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::"public"."enum__pages_v_blocks_content_columns_link_uui_color";
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_uui_color" SET DATA TYPE "public"."enum__pages_v_blocks_content_columns_link_uui_color" USING "link_uui_color"::"public"."enum__pages_v_blocks_content_columns_link_uui_color";
  ALTER TABLE "_pages_v_blocks_button_block_buttons" ALTER COLUMN "link_uui_color" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_button_block_buttons" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum__pages_v_blocks_button_block_buttons_link_uui_color";
  CREATE TYPE "public"."enum__pages_v_blocks_button_block_buttons_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  ALTER TABLE "_pages_v_blocks_button_block_buttons" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::"public"."enum__pages_v_blocks_button_block_buttons_link_uui_color";
  ALTER TABLE "_pages_v_blocks_button_block_buttons" ALTER COLUMN "link_uui_color" SET DATA TYPE "public"."enum__pages_v_blocks_button_block_buttons_link_uui_color" USING "link_uui_color"::"public"."enum__pages_v_blocks_button_block_buttons_link_uui_color";
  ALTER TABLE "footer_nav_columns_items" ALTER COLUMN "link_uui_color" SET DATA TYPE text;
  ALTER TABLE "footer_nav_columns_items" ALTER COLUMN "link_uui_color" SET DEFAULT 'link'::text;
  DROP TYPE "public"."enum_footer_nav_columns_items_link_uui_color";
  CREATE TYPE "public"."enum_footer_nav_columns_items_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  ALTER TABLE "footer_nav_columns_items" ALTER COLUMN "link_uui_color" SET DEFAULT 'link'::"public"."enum_footer_nav_columns_items_link_uui_color";
  ALTER TABLE "footer_nav_columns_items" ALTER COLUMN "link_uui_color" SET DATA TYPE "public"."enum_footer_nav_columns_items_link_uui_color" USING "link_uui_color"::"public"."enum_footer_nav_columns_items_link_uui_color";
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
  ALTER TABLE "pages_blocks_latest_posts" ADD CONSTRAINT "pages_blocks_latest_posts_latest_posts_options_category_filter_id_categories_id_fk" FOREIGN KEY ("latest_posts_options_category_filter_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_latest_posts" ADD CONSTRAINT "pages_blocks_latest_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features_features" ADD CONSTRAINT "_pages_v_blocks_features_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features" ADD CONSTRAINT "_pages_v_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD CONSTRAINT "_pages_v_blocks_latest_posts_latest_posts_options_category_filter_id_categories_id_fk" FOREIGN KEY ("latest_posts_options_category_filter_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD CONSTRAINT "_pages_v_blocks_latest_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "not_found_rels" ADD CONSTRAINT "not_found_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."not_found"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "not_found_rels" ADD CONSTRAINT "not_found_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "not_found_rels" ADD CONSTRAINT "not_found_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_features_features_order_idx" ON "pages_blocks_features_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_features_features_parent_id_idx" ON "pages_blocks_features_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_features_order_idx" ON "pages_blocks_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_features_parent_id_idx" ON "pages_blocks_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_features_path_idx" ON "pages_blocks_features" USING btree ("_path");
  CREATE INDEX "pages_blocks_latest_posts_order_idx" ON "pages_blocks_latest_posts" USING btree ("_order");
  CREATE INDEX "pages_blocks_latest_posts_parent_id_idx" ON "pages_blocks_latest_posts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_latest_posts_path_idx" ON "pages_blocks_latest_posts" USING btree ("_path");
  CREATE INDEX "pages_blocks_latest_posts_latest_posts_options_latest_po_idx" ON "pages_blocks_latest_posts" USING btree ("latest_posts_options_category_filter_id");
  CREATE INDEX "_pages_v_blocks_features_features_order_idx" ON "_pages_v_blocks_features_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_features_features_parent_id_idx" ON "_pages_v_blocks_features_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_features_order_idx" ON "_pages_v_blocks_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_features_parent_id_idx" ON "_pages_v_blocks_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_features_path_idx" ON "_pages_v_blocks_features" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_latest_posts_order_idx" ON "_pages_v_blocks_latest_posts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_latest_posts_parent_id_idx" ON "_pages_v_blocks_latest_posts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_latest_posts_path_idx" ON "_pages_v_blocks_latest_posts" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_latest_posts_latest_posts_options_latest_idx" ON "_pages_v_blocks_latest_posts" USING btree ("latest_posts_options_category_filter_id");
  CREATE INDEX "not_found_rels_order_idx" ON "not_found_rels" USING btree ("order");
  CREATE INDEX "not_found_rels_parent_idx" ON "not_found_rels" USING btree ("parent_id");
  CREATE INDEX "not_found_rels_path_idx" ON "not_found_rels" USING btree ("path");
  CREATE INDEX "not_found_rels_pages_id_idx" ON "not_found_rels" USING btree ("pages_id");
  CREATE INDEX "not_found_rels_posts_id_idx" ON "not_found_rels" USING btree ("posts_id");
  ALTER TABLE "pages_blocks_button_block_buttons" DROP COLUMN "icon";
  ALTER TABLE "pages_blocks_button_block_buttons" DROP COLUMN "icon_position";
  ALTER TABLE "_pages_v_blocks_button_block_buttons" DROP COLUMN "icon";
  ALTER TABLE "_pages_v_blocks_button_block_buttons" DROP COLUMN "icon_position";
  DROP TYPE "public"."enum_pages_blocks_button_block_buttons_icon_position";
  DROP TYPE "public"."enum__pages_v_blocks_button_block_buttons_icon_position";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_button_block_buttons_icon_position" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum__pages_v_blocks_button_block_buttons_icon_position" AS ENUM('leading', 'trailing');
  ALTER TABLE "pages_blocks_features_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_latest_posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_features_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_latest_posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "not_found" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "not_found_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_features_features" CASCADE;
  DROP TABLE "pages_blocks_features" CASCADE;
  DROP TABLE "pages_blocks_latest_posts" CASCADE;
  DROP TABLE "_pages_v_blocks_features_features" CASCADE;
  DROP TABLE "_pages_v_blocks_features" CASCADE;
  DROP TABLE "_pages_v_blocks_latest_posts" CASCADE;
  DROP TABLE "not_found" CASCADE;
  DROP TABLE "not_found_rels" CASCADE;
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_uui_color" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_uui_color";
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_uui_color" AS ENUM('primary', 'secondary', 'tertiary', 'link-color');
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::"public"."enum_pages_blocks_cta_links_link_uui_color";
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_uui_color" SET DATA TYPE "public"."enum_pages_blocks_cta_links_link_uui_color" USING "link_uui_color"::"public"."enum_pages_blocks_cta_links_link_uui_color";
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_uui_size" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_uui_size" SET DEFAULT 'lg'::text;
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_uui_size";
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_uui_size" AS ENUM('md', 'lg');
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_uui_size" SET DEFAULT 'lg'::"public"."enum_pages_blocks_cta_links_link_uui_size";
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_uui_size" SET DATA TYPE "public"."enum_pages_blocks_cta_links_link_uui_size" USING "link_uui_size"::"public"."enum_pages_blocks_cta_links_link_uui_size";
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_uui_color" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_uui_color";
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_uui_color" AS ENUM('primary', 'secondary', 'tertiary', 'link-color');
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::"public"."enum_pages_blocks_content_columns_link_uui_color";
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_uui_color" SET DATA TYPE "public"."enum_pages_blocks_content_columns_link_uui_color" USING "link_uui_color"::"public"."enum_pages_blocks_content_columns_link_uui_color";
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_uui_size" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_uui_size" SET DEFAULT 'md'::text;
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_uui_size";
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_uui_size" AS ENUM('sm', 'md', 'lg');
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_uui_size" SET DEFAULT 'md'::"public"."enum_pages_blocks_content_columns_link_uui_size";
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_uui_size" SET DATA TYPE "public"."enum_pages_blocks_content_columns_link_uui_size" USING "link_uui_size"::"public"."enum_pages_blocks_content_columns_link_uui_size";
  ALTER TABLE "pages_blocks_button_block_buttons" ALTER COLUMN "link_uui_color" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_button_block_buttons" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum_pages_blocks_button_block_buttons_link_uui_color";
  CREATE TYPE "public"."enum_pages_blocks_button_block_buttons_link_uui_color" AS ENUM('primary', 'secondary', 'tertiary', 'link-gray', 'link-color', 'primary-destructive', 'secondary-destructive', 'tertiary-destructive', 'link-destructive');
  ALTER TABLE "pages_blocks_button_block_buttons" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::"public"."enum_pages_blocks_button_block_buttons_link_uui_color";
  ALTER TABLE "pages_blocks_button_block_buttons" ALTER COLUMN "link_uui_color" SET DATA TYPE "public"."enum_pages_blocks_button_block_buttons_link_uui_color" USING "link_uui_color"::"public"."enum_pages_blocks_button_block_buttons_link_uui_color";
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_uui_color" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_uui_color";
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_uui_color" AS ENUM('primary', 'secondary', 'tertiary', 'link-color');
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::"public"."enum__pages_v_blocks_cta_links_link_uui_color";
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_uui_color" SET DATA TYPE "public"."enum__pages_v_blocks_cta_links_link_uui_color" USING "link_uui_color"::"public"."enum__pages_v_blocks_cta_links_link_uui_color";
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_uui_size" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_uui_size" SET DEFAULT 'lg'::text;
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_uui_size";
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_uui_size" AS ENUM('md', 'lg');
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_uui_size" SET DEFAULT 'lg'::"public"."enum__pages_v_blocks_cta_links_link_uui_size";
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_uui_size" SET DATA TYPE "public"."enum__pages_v_blocks_cta_links_link_uui_size" USING "link_uui_size"::"public"."enum__pages_v_blocks_cta_links_link_uui_size";
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_uui_color" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_uui_color";
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_uui_color" AS ENUM('primary', 'secondary', 'tertiary', 'link-color');
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::"public"."enum__pages_v_blocks_content_columns_link_uui_color";
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_uui_color" SET DATA TYPE "public"."enum__pages_v_blocks_content_columns_link_uui_color" USING "link_uui_color"::"public"."enum__pages_v_blocks_content_columns_link_uui_color";
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_uui_size" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_uui_size" SET DEFAULT 'md'::text;
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_uui_size";
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_uui_size" AS ENUM('sm', 'md', 'lg');
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_uui_size" SET DEFAULT 'md'::"public"."enum__pages_v_blocks_content_columns_link_uui_size";
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_uui_size" SET DATA TYPE "public"."enum__pages_v_blocks_content_columns_link_uui_size" USING "link_uui_size"::"public"."enum__pages_v_blocks_content_columns_link_uui_size";
  ALTER TABLE "_pages_v_blocks_button_block_buttons" ALTER COLUMN "link_uui_color" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_button_block_buttons" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum__pages_v_blocks_button_block_buttons_link_uui_color";
  CREATE TYPE "public"."enum__pages_v_blocks_button_block_buttons_link_uui_color" AS ENUM('primary', 'secondary', 'tertiary', 'link-gray', 'link-color', 'primary-destructive', 'secondary-destructive', 'tertiary-destructive', 'link-destructive');
  ALTER TABLE "_pages_v_blocks_button_block_buttons" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::"public"."enum__pages_v_blocks_button_block_buttons_link_uui_color";
  ALTER TABLE "_pages_v_blocks_button_block_buttons" ALTER COLUMN "link_uui_color" SET DATA TYPE "public"."enum__pages_v_blocks_button_block_buttons_link_uui_color" USING "link_uui_color"::"public"."enum__pages_v_blocks_button_block_buttons_link_uui_color";
  ALTER TABLE "header" ALTER COLUMN "cta_button_link_uui_color" SET DATA TYPE text;
  ALTER TABLE "header" ALTER COLUMN "cta_button_link_uui_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum_header_cta_button_link_uui_color";
  CREATE TYPE "public"."enum_header_cta_button_link_uui_color" AS ENUM('primary', 'secondary', 'tertiary');
  ALTER TABLE "header" ALTER COLUMN "cta_button_link_uui_color" SET DEFAULT 'primary'::"public"."enum_header_cta_button_link_uui_color";
  ALTER TABLE "header" ALTER COLUMN "cta_button_link_uui_color" SET DATA TYPE "public"."enum_header_cta_button_link_uui_color" USING "cta_button_link_uui_color"::"public"."enum_header_cta_button_link_uui_color";
  ALTER TABLE "header" ALTER COLUMN "cta_button_link_uui_size" SET DATA TYPE text;
  ALTER TABLE "header" ALTER COLUMN "cta_button_link_uui_size" SET DEFAULT 'sm'::text;
  DROP TYPE "public"."enum_header_cta_button_link_uui_size";
  CREATE TYPE "public"."enum_header_cta_button_link_uui_size" AS ENUM('sm', 'md', 'lg');
  ALTER TABLE "header" ALTER COLUMN "cta_button_link_uui_size" SET DEFAULT 'sm'::"public"."enum_header_cta_button_link_uui_size";
  ALTER TABLE "header" ALTER COLUMN "cta_button_link_uui_size" SET DATA TYPE "public"."enum_header_cta_button_link_uui_size" USING "cta_button_link_uui_size"::"public"."enum_header_cta_button_link_uui_size";
  ALTER TABLE "footer_nav_columns_items" ALTER COLUMN "link_uui_color" SET DATA TYPE text;
  ALTER TABLE "footer_nav_columns_items" ALTER COLUMN "link_uui_color" SET DEFAULT 'link-gray'::text;
  DROP TYPE "public"."enum_footer_nav_columns_items_link_uui_color";
  CREATE TYPE "public"."enum_footer_nav_columns_items_link_uui_color" AS ENUM('link-gray');
  ALTER TABLE "footer_nav_columns_items" ALTER COLUMN "link_uui_color" SET DEFAULT 'link-gray'::"public"."enum_footer_nav_columns_items_link_uui_color";
  ALTER TABLE "footer_nav_columns_items" ALTER COLUMN "link_uui_color" SET DATA TYPE "public"."enum_footer_nav_columns_items_link_uui_color" USING "link_uui_color"::"public"."enum_footer_nav_columns_items_link_uui_color";
  ALTER TABLE "footer_nav_columns_items" ALTER COLUMN "link_uui_size" SET DATA TYPE text;
  ALTER TABLE "footer_nav_columns_items" ALTER COLUMN "link_uui_size" SET DEFAULT 'lg'::text;
  DROP TYPE "public"."enum_footer_nav_columns_items_link_uui_size";
  CREATE TYPE "public"."enum_footer_nav_columns_items_link_uui_size" AS ENUM('lg');
  ALTER TABLE "footer_nav_columns_items" ALTER COLUMN "link_uui_size" SET DEFAULT 'lg'::"public"."enum_footer_nav_columns_items_link_uui_size";
  ALTER TABLE "footer_nav_columns_items" ALTER COLUMN "link_uui_size" SET DATA TYPE "public"."enum_footer_nav_columns_items_link_uui_size" USING "link_uui_size"::"public"."enum_footer_nav_columns_items_link_uui_size";
  ALTER TABLE "pages_blocks_button_block_buttons" ADD COLUMN "icon" varchar;
  ALTER TABLE "pages_blocks_button_block_buttons" ADD COLUMN "icon_position" "enum_pages_blocks_button_block_buttons_icon_position" DEFAULT 'leading';
  ALTER TABLE "_pages_v_blocks_button_block_buttons" ADD COLUMN "icon" varchar;
  ALTER TABLE "_pages_v_blocks_button_block_buttons" ADD COLUMN "icon_position" "enum__pages_v_blocks_button_block_buttons_icon_position" DEFAULT 'leading';
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
  DROP TYPE "public"."enum_pages_blocks_latest_posts_content_source";
  DROP TYPE "public"."num_posts";
  DROP TYPE "public"."enum_pages_blocks_latest_posts_button_config_link_type";
  DROP TYPE "public"."enum_pages_blocks_latest_posts_button_config_link_uui_color";
  DROP TYPE "public"."enum_pages_blocks_latest_posts_button_config_link_uui_size";
  DROP TYPE "public"."enum_pages_blocks_latest_posts_button_config_link_icon_pos";
  DROP TYPE "public"."enum_pages_blocks_latest_posts_layout_options_columns";
  DROP TYPE "public"."enum_pages_blocks_latest_posts_layout_options_spacing";
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
  DROP TYPE "public"."enum__pages_v_blocks_latest_posts_content_source";
  DROP TYPE "public"."enum__pages_v_blocks_latest_posts_button_config_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_latest_posts_button_config_link_uui_color";
  DROP TYPE "public"."enum__pages_v_blocks_latest_posts_button_config_link_uui_size";
  DROP TYPE "public"."enum__pages_v_blocks_latest_posts_button_config_link_icon_pos";
  DROP TYPE "public"."enum__pages_v_blocks_latest_posts_layout_options_columns";
  DROP TYPE "public"."enum__pages_v_blocks_latest_posts_layout_options_spacing";
  DROP TYPE "public"."enum_header_cta_button_link_icon_pos";
  DROP TYPE "public"."enum_footer_nav_columns_items_link_icon_pos";
  DROP TYPE "public"."enum_not_found_link_type";
  DROP TYPE "public"."enum_not_found_link_uui_color";
  DROP TYPE "public"."enum_not_found_link_uui_size";
  DROP TYPE "public"."enum_not_found_link_icon_pos";`)
}
