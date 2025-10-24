import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_latest_posts_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_latest_posts_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_posts_blocks_latest_posts_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__posts_v_blocks_latest_posts_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_posts_settings_blocks_hero_heading_buttons_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_posts_settings_blocks_hero_heading_buttons_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary');
  CREATE TYPE "public"."enum_posts_settings_blocks_hero_heading_buttons_link_uui_size" AS ENUM('md', 'lg', 'xl');
  CREATE TYPE "public"."enum_posts_settings_blocks_hero_heading_buttons_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum_posts_settings_blocks_hero_heading_hero_layout" AS ENUM('standard', 'splitImage', 'standardContained');
  CREATE TYPE "public"."enum_posts_settings_blocks_hero_heading_headline_color" AS ENUM('primary', 'brand');
  CREATE TYPE "public"."enum_posts_settings_blocks_hero_heading_subheading_color" AS ENUM('default', 'white');
  CREATE TYPE "public"."enum_posts_settings_blocks_hero_heading_text_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_posts_settings_blocks_hero_heading_spacing" AS ENUM('spacious', 'normal', 'compact', 'minimal');
  CREATE TYPE "public"."enum_posts_settings_blocks_hero_heading_subtitle_size" AS ENUM('small', 'normal');
  CREATE TYPE "public"."enum_posts_settings_blocks_hero_heading_hero_background" AS ENUM('primary', 'secondary', 'accent');
  CREATE TYPE "public"."enum_posts_settings_blocks_hero_heading_bg_height_variant" AS ENUM('default', 'fullHeight');
  CREATE TYPE "public"."enum_posts_settings_blocks_hero_heading_bg_type" AS ENUM('none', 'gradient', 'image', 'custom');
  CREATE TYPE "public"."enum_posts_settings_blocks_hero_heading_bg_gradient" AS ENUM('brand-radial', 'accent-gradient', 'dark-light');
  CREATE TYPE "public"."enum_posts_settings_blocks_breadcrumb_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_posts_settings_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_posts_settings_blocks_cta_links_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  CREATE TYPE "public"."enum_posts_settings_blocks_cta_links_link_uui_size" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_posts_settings_blocks_cta_links_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum_posts_settings_blocks_cta_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_posts_settings_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_posts_settings_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_posts_settings_blocks_content_columns_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  CREATE TYPE "public"."enum_posts_settings_blocks_content_columns_link_uui_size" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_posts_settings_blocks_content_columns_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum_posts_settings_blocks_content_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_posts_settings_blocks_button_block_buttons_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_posts_settings_blocks_button_block_buttons_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  CREATE TYPE "public"."enum_posts_settings_blocks_button_block_buttons_link_uui_size" AS ENUM('sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_posts_settings_blocks_button_block_buttons_link_icon_pos" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum_posts_settings_blocks_button_block_layout" AS ENUM('horizontal', 'vertical');
  CREATE TYPE "public"."enum_posts_settings_blocks_button_block_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_posts_settings_display_mode" AS ENUM('auto', 'grid', 'carousel');
  CREATE TYPE "public"."enum_posts_settings_carousel_settings_peek_amount" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_posts_settings_card_display_excerpt_length" AS ENUM('short', 'medium', 'long');
  CREATE TABLE "posts_settings_blocks_hero_heading_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_posts_settings_blocks_hero_heading_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_uui_color" "enum_posts_settings_blocks_hero_heading_buttons_link_uui_color" DEFAULT 'primary',
  	"link_uui_size" "enum_posts_settings_blocks_hero_heading_buttons_link_uui_size" DEFAULT 'xl',
  	"link_button_icon" varchar,
  	"link_icon_pos" "enum_posts_settings_blocks_hero_heading_buttons_link_icon_pos" DEFAULT 'trailing'
  );
  
  CREATE TABLE "posts_settings_blocks_hero_heading" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hero_layout" "enum_posts_settings_blocks_hero_heading_hero_layout" DEFAULT 'standard',
  	"headline" varchar NOT NULL,
  	"subtitle" varchar,
  	"enable_typewriter" boolean DEFAULT false,
  	"headline_color" "enum_posts_settings_blocks_hero_heading_headline_color" DEFAULT 'primary',
  	"subheading_color" "enum_posts_settings_blocks_hero_heading_subheading_color" DEFAULT 'default',
  	"text_alignment" "enum_posts_settings_blocks_hero_heading_text_alignment" DEFAULT 'left',
  	"spacing" "enum_posts_settings_blocks_hero_heading_spacing" DEFAULT 'normal',
  	"subtitle_size" "enum_posts_settings_blocks_hero_heading_subtitle_size" DEFAULT 'normal',
  	"hero_background" "enum_posts_settings_blocks_hero_heading_hero_background" DEFAULT 'primary',
  	"split_image_id" integer,
  	"bg_enabled" boolean DEFAULT false,
  	"bg_height_variant" "enum_posts_settings_blocks_hero_heading_bg_height_variant" DEFAULT 'default',
  	"bg_type" "enum_posts_settings_blocks_hero_heading_bg_type" DEFAULT 'none',
  	"bg_gradient" "enum_posts_settings_blocks_hero_heading_bg_gradient" DEFAULT 'brand-radial',
  	"bg_image_id" integer,
  	"bg_image_opacity" numeric DEFAULT 40,
  	"bg_custom_class" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_settings_blocks_breadcrumb" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"spacing" "enum_posts_settings_blocks_breadcrumb_spacing" DEFAULT 'compact',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_settings_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_posts_settings_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_uui_color" "enum_posts_settings_blocks_cta_links_link_uui_color" DEFAULT 'primary',
  	"link_uui_size" "enum_posts_settings_blocks_cta_links_link_uui_size" DEFAULT 'lg',
  	"link_button_icon" varchar,
  	"link_icon_pos" "enum_posts_settings_blocks_cta_links_link_icon_pos" DEFAULT 'trailing'
  );
  
  CREATE TABLE "posts_settings_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"spacing" "enum_posts_settings_blocks_cta_spacing" DEFAULT 'normal',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_settings_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_posts_settings_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum_posts_settings_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_uui_color" "enum_posts_settings_blocks_content_columns_link_uui_color" DEFAULT 'primary',
  	"link_uui_size" "enum_posts_settings_blocks_content_columns_link_uui_size" DEFAULT 'md',
  	"link_button_icon" varchar,
  	"link_icon_pos" "enum_posts_settings_blocks_content_columns_link_icon_pos" DEFAULT 'trailing'
  );
  
  CREATE TABLE "posts_settings_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"spacing" "enum_posts_settings_blocks_content_spacing" DEFAULT 'normal',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_settings_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer NOT NULL,
  	"caption_text" varchar,
  	"caption_link_url" varchar,
  	"caption_link_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_settings_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
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
  
  CREATE TABLE "posts_settings_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  ALTER TABLE "pages_blocks_latest_posts" ADD COLUMN "spacing" "enum_pages_blocks_latest_posts_spacing" DEFAULT 'normal';
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD COLUMN "spacing" "enum__pages_v_blocks_latest_posts_spacing" DEFAULT 'normal';
  ALTER TABLE "posts_blocks_latest_posts" ADD COLUMN "spacing" "enum_posts_blocks_latest_posts_spacing" DEFAULT 'normal';
  ALTER TABLE "_posts_v_blocks_latest_posts" ADD COLUMN "spacing" "enum__posts_v_blocks_latest_posts_spacing" DEFAULT 'normal';
  ALTER TABLE "posts_settings" ADD COLUMN "display_mode" "enum_posts_settings_display_mode" DEFAULT 'auto';
  ALTER TABLE "posts_settings" ADD COLUMN "carousel_settings_enable_drag" boolean DEFAULT true;
  ALTER TABLE "posts_settings" ADD COLUMN "carousel_settings_show_arrows" boolean DEFAULT true;
  ALTER TABLE "posts_settings" ADD COLUMN "carousel_settings_show_progress" boolean DEFAULT false;
  ALTER TABLE "posts_settings" ADD COLUMN "carousel_settings_peek_amount" "enum_posts_settings_carousel_settings_peek_amount" DEFAULT 'medium';
  ALTER TABLE "posts_settings" ADD COLUMN "carousel_settings_auto_play" boolean DEFAULT false;
  ALTER TABLE "posts_settings" ADD COLUMN "carousel_settings_auto_play_interval" numeric DEFAULT 5000;
  ALTER TABLE "posts_settings" ADD COLUMN "card_display_show_categories" boolean DEFAULT true;
  ALTER TABLE "posts_settings" ADD COLUMN "card_display_show_author" boolean DEFAULT false;
  ALTER TABLE "posts_settings" ADD COLUMN "card_display_show_date" boolean DEFAULT false;
  ALTER TABLE "posts_settings" ADD COLUMN "card_display_show_reading_time" boolean DEFAULT false;
  ALTER TABLE "posts_settings" ADD COLUMN "card_display_show_excerpt" boolean DEFAULT true;
  ALTER TABLE "posts_settings" ADD COLUMN "card_display_excerpt_length" "enum_posts_settings_card_display_excerpt_length" DEFAULT 'medium';
  ALTER TABLE "posts_settings_blocks_hero_heading_buttons" ADD CONSTRAINT "posts_settings_blocks_hero_heading_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_settings_blocks_hero_heading"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_settings_blocks_hero_heading" ADD CONSTRAINT "posts_settings_blocks_hero_heading_split_image_id_media_id_fk" FOREIGN KEY ("split_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_settings_blocks_hero_heading" ADD CONSTRAINT "posts_settings_blocks_hero_heading_bg_image_id_media_id_fk" FOREIGN KEY ("bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_settings_blocks_hero_heading" ADD CONSTRAINT "posts_settings_blocks_hero_heading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_settings_blocks_breadcrumb" ADD CONSTRAINT "posts_settings_blocks_breadcrumb_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_settings_blocks_cta_links" ADD CONSTRAINT "posts_settings_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_settings_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_settings_blocks_cta" ADD CONSTRAINT "posts_settings_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_settings_blocks_content_columns" ADD CONSTRAINT "posts_settings_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_settings_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_settings_blocks_content" ADD CONSTRAINT "posts_settings_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_settings_blocks_media_block" ADD CONSTRAINT "posts_settings_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_settings_blocks_media_block" ADD CONSTRAINT "posts_settings_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_settings_blocks_form_block" ADD CONSTRAINT "posts_settings_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_settings_blocks_form_block" ADD CONSTRAINT "posts_settings_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_settings_blocks_button_block_buttons" ADD CONSTRAINT "posts_settings_blocks_button_block_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_settings_blocks_button_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_settings_blocks_button_block" ADD CONSTRAINT "posts_settings_blocks_button_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_settings_rels" ADD CONSTRAINT "posts_settings_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_settings_rels" ADD CONSTRAINT "posts_settings_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_settings_rels" ADD CONSTRAINT "posts_settings_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_settings_blocks_hero_heading_buttons_order_idx" ON "posts_settings_blocks_hero_heading_buttons" USING btree ("_order");
  CREATE INDEX "posts_settings_blocks_hero_heading_buttons_parent_id_idx" ON "posts_settings_blocks_hero_heading_buttons" USING btree ("_parent_id");
  CREATE INDEX "posts_settings_blocks_hero_heading_order_idx" ON "posts_settings_blocks_hero_heading" USING btree ("_order");
  CREATE INDEX "posts_settings_blocks_hero_heading_parent_id_idx" ON "posts_settings_blocks_hero_heading" USING btree ("_parent_id");
  CREATE INDEX "posts_settings_blocks_hero_heading_path_idx" ON "posts_settings_blocks_hero_heading" USING btree ("_path");
  CREATE INDEX "posts_settings_blocks_hero_heading_split_image_idx" ON "posts_settings_blocks_hero_heading" USING btree ("split_image_id");
  CREATE INDEX "posts_settings_blocks_hero_heading_bg_bg_image_idx" ON "posts_settings_blocks_hero_heading" USING btree ("bg_image_id");
  CREATE INDEX "posts_settings_blocks_breadcrumb_order_idx" ON "posts_settings_blocks_breadcrumb" USING btree ("_order");
  CREATE INDEX "posts_settings_blocks_breadcrumb_parent_id_idx" ON "posts_settings_blocks_breadcrumb" USING btree ("_parent_id");
  CREATE INDEX "posts_settings_blocks_breadcrumb_path_idx" ON "posts_settings_blocks_breadcrumb" USING btree ("_path");
  CREATE INDEX "posts_settings_blocks_cta_links_order_idx" ON "posts_settings_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "posts_settings_blocks_cta_links_parent_id_idx" ON "posts_settings_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "posts_settings_blocks_cta_order_idx" ON "posts_settings_blocks_cta" USING btree ("_order");
  CREATE INDEX "posts_settings_blocks_cta_parent_id_idx" ON "posts_settings_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "posts_settings_blocks_cta_path_idx" ON "posts_settings_blocks_cta" USING btree ("_path");
  CREATE INDEX "posts_settings_blocks_content_columns_order_idx" ON "posts_settings_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "posts_settings_blocks_content_columns_parent_id_idx" ON "posts_settings_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "posts_settings_blocks_content_order_idx" ON "posts_settings_blocks_content" USING btree ("_order");
  CREATE INDEX "posts_settings_blocks_content_parent_id_idx" ON "posts_settings_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "posts_settings_blocks_content_path_idx" ON "posts_settings_blocks_content" USING btree ("_path");
  CREATE INDEX "posts_settings_blocks_media_block_order_idx" ON "posts_settings_blocks_media_block" USING btree ("_order");
  CREATE INDEX "posts_settings_blocks_media_block_parent_id_idx" ON "posts_settings_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "posts_settings_blocks_media_block_path_idx" ON "posts_settings_blocks_media_block" USING btree ("_path");
  CREATE INDEX "posts_settings_blocks_media_block_media_idx" ON "posts_settings_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "posts_settings_blocks_form_block_order_idx" ON "posts_settings_blocks_form_block" USING btree ("_order");
  CREATE INDEX "posts_settings_blocks_form_block_parent_id_idx" ON "posts_settings_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "posts_settings_blocks_form_block_path_idx" ON "posts_settings_blocks_form_block" USING btree ("_path");
  CREATE INDEX "posts_settings_blocks_form_block_form_idx" ON "posts_settings_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "posts_settings_blocks_button_block_buttons_order_idx" ON "posts_settings_blocks_button_block_buttons" USING btree ("_order");
  CREATE INDEX "posts_settings_blocks_button_block_buttons_parent_id_idx" ON "posts_settings_blocks_button_block_buttons" USING btree ("_parent_id");
  CREATE INDEX "posts_settings_blocks_button_block_order_idx" ON "posts_settings_blocks_button_block" USING btree ("_order");
  CREATE INDEX "posts_settings_blocks_button_block_parent_id_idx" ON "posts_settings_blocks_button_block" USING btree ("_parent_id");
  CREATE INDEX "posts_settings_blocks_button_block_path_idx" ON "posts_settings_blocks_button_block" USING btree ("_path");
  CREATE INDEX "posts_settings_rels_order_idx" ON "posts_settings_rels" USING btree ("order");
  CREATE INDEX "posts_settings_rels_parent_idx" ON "posts_settings_rels" USING btree ("parent_id");
  CREATE INDEX "posts_settings_rels_path_idx" ON "posts_settings_rels" USING btree ("path");
  CREATE INDEX "posts_settings_rels_pages_id_idx" ON "posts_settings_rels" USING btree ("pages_id");
  CREATE INDEX "posts_settings_rels_posts_id_idx" ON "posts_settings_rels" USING btree ("posts_id");
  ALTER TABLE "pages_blocks_latest_posts" DROP COLUMN "card_display_show_categories";
  ALTER TABLE "pages_blocks_latest_posts" DROP COLUMN "card_display_show_author";
  ALTER TABLE "pages_blocks_latest_posts" DROP COLUMN "card_display_show_date";
  ALTER TABLE "pages_blocks_latest_posts" DROP COLUMN "card_display_show_reading_time";
  ALTER TABLE "pages_blocks_latest_posts" DROP COLUMN "card_display_show_excerpt";
  ALTER TABLE "pages_blocks_latest_posts" DROP COLUMN "card_display_excerpt_length";
  ALTER TABLE "pages_blocks_latest_posts" DROP COLUMN "layout_options_display_mode";
  ALTER TABLE "pages_blocks_latest_posts" DROP COLUMN "layout_options_use_posts_settings";
  ALTER TABLE "pages_blocks_latest_posts" DROP COLUMN "layout_options_grid_columns_desktop";
  ALTER TABLE "pages_blocks_latest_posts" DROP COLUMN "layout_options_grid_columns_tablet";
  ALTER TABLE "pages_blocks_latest_posts" DROP COLUMN "layout_options_grid_columns_mobile";
  ALTER TABLE "pages_blocks_latest_posts" DROP COLUMN "layout_options_carousel_options_enable_drag";
  ALTER TABLE "pages_blocks_latest_posts" DROP COLUMN "layout_options_carousel_options_show_arrows";
  ALTER TABLE "pages_blocks_latest_posts" DROP COLUMN "layout_options_carousel_options_show_progress";
  ALTER TABLE "pages_blocks_latest_posts" DROP COLUMN "layout_options_carousel_options_peek_amount";
  ALTER TABLE "pages_blocks_latest_posts" DROP COLUMN "layout_options_carousel_options_auto_play";
  ALTER TABLE "pages_blocks_latest_posts" DROP COLUMN "layout_options_carousel_options_auto_play_interval";
  ALTER TABLE "pages_blocks_latest_posts" DROP COLUMN "layout_options_spacing";
  ALTER TABLE "_pages_v_blocks_latest_posts" DROP COLUMN "card_display_show_categories";
  ALTER TABLE "_pages_v_blocks_latest_posts" DROP COLUMN "card_display_show_author";
  ALTER TABLE "_pages_v_blocks_latest_posts" DROP COLUMN "card_display_show_date";
  ALTER TABLE "_pages_v_blocks_latest_posts" DROP COLUMN "card_display_show_reading_time";
  ALTER TABLE "_pages_v_blocks_latest_posts" DROP COLUMN "card_display_show_excerpt";
  ALTER TABLE "_pages_v_blocks_latest_posts" DROP COLUMN "card_display_excerpt_length";
  ALTER TABLE "_pages_v_blocks_latest_posts" DROP COLUMN "layout_options_display_mode";
  ALTER TABLE "_pages_v_blocks_latest_posts" DROP COLUMN "layout_options_use_posts_settings";
  ALTER TABLE "_pages_v_blocks_latest_posts" DROP COLUMN "layout_options_grid_columns_desktop";
  ALTER TABLE "_pages_v_blocks_latest_posts" DROP COLUMN "layout_options_grid_columns_tablet";
  ALTER TABLE "_pages_v_blocks_latest_posts" DROP COLUMN "layout_options_grid_columns_mobile";
  ALTER TABLE "_pages_v_blocks_latest_posts" DROP COLUMN "layout_options_carousel_options_enable_drag";
  ALTER TABLE "_pages_v_blocks_latest_posts" DROP COLUMN "layout_options_carousel_options_show_arrows";
  ALTER TABLE "_pages_v_blocks_latest_posts" DROP COLUMN "layout_options_carousel_options_show_progress";
  ALTER TABLE "_pages_v_blocks_latest_posts" DROP COLUMN "layout_options_carousel_options_peek_amount";
  ALTER TABLE "_pages_v_blocks_latest_posts" DROP COLUMN "layout_options_carousel_options_auto_play";
  ALTER TABLE "_pages_v_blocks_latest_posts" DROP COLUMN "layout_options_carousel_options_auto_play_interval";
  ALTER TABLE "_pages_v_blocks_latest_posts" DROP COLUMN "layout_options_spacing";
  ALTER TABLE "posts_blocks_latest_posts" DROP COLUMN "card_display_show_categories";
  ALTER TABLE "posts_blocks_latest_posts" DROP COLUMN "card_display_show_author";
  ALTER TABLE "posts_blocks_latest_posts" DROP COLUMN "card_display_show_date";
  ALTER TABLE "posts_blocks_latest_posts" DROP COLUMN "card_display_show_reading_time";
  ALTER TABLE "posts_blocks_latest_posts" DROP COLUMN "card_display_show_excerpt";
  ALTER TABLE "posts_blocks_latest_posts" DROP COLUMN "card_display_excerpt_length";
  ALTER TABLE "posts_blocks_latest_posts" DROP COLUMN "layout_options_display_mode";
  ALTER TABLE "posts_blocks_latest_posts" DROP COLUMN "layout_options_use_posts_settings";
  ALTER TABLE "posts_blocks_latest_posts" DROP COLUMN "layout_options_grid_columns_desktop";
  ALTER TABLE "posts_blocks_latest_posts" DROP COLUMN "layout_options_grid_columns_tablet";
  ALTER TABLE "posts_blocks_latest_posts" DROP COLUMN "layout_options_grid_columns_mobile";
  ALTER TABLE "posts_blocks_latest_posts" DROP COLUMN "layout_options_carousel_options_enable_drag";
  ALTER TABLE "posts_blocks_latest_posts" DROP COLUMN "layout_options_carousel_options_show_arrows";
  ALTER TABLE "posts_blocks_latest_posts" DROP COLUMN "layout_options_carousel_options_show_progress";
  ALTER TABLE "posts_blocks_latest_posts" DROP COLUMN "layout_options_carousel_options_peek_amount";
  ALTER TABLE "posts_blocks_latest_posts" DROP COLUMN "layout_options_carousel_options_auto_play";
  ALTER TABLE "posts_blocks_latest_posts" DROP COLUMN "layout_options_carousel_options_auto_play_interval";
  ALTER TABLE "posts_blocks_latest_posts" DROP COLUMN "layout_options_spacing";
  ALTER TABLE "_posts_v_blocks_latest_posts" DROP COLUMN "card_display_show_categories";
  ALTER TABLE "_posts_v_blocks_latest_posts" DROP COLUMN "card_display_show_author";
  ALTER TABLE "_posts_v_blocks_latest_posts" DROP COLUMN "card_display_show_date";
  ALTER TABLE "_posts_v_blocks_latest_posts" DROP COLUMN "card_display_show_reading_time";
  ALTER TABLE "_posts_v_blocks_latest_posts" DROP COLUMN "card_display_show_excerpt";
  ALTER TABLE "_posts_v_blocks_latest_posts" DROP COLUMN "card_display_excerpt_length";
  ALTER TABLE "_posts_v_blocks_latest_posts" DROP COLUMN "layout_options_display_mode";
  ALTER TABLE "_posts_v_blocks_latest_posts" DROP COLUMN "layout_options_use_posts_settings";
  ALTER TABLE "_posts_v_blocks_latest_posts" DROP COLUMN "layout_options_grid_columns_desktop";
  ALTER TABLE "_posts_v_blocks_latest_posts" DROP COLUMN "layout_options_grid_columns_tablet";
  ALTER TABLE "_posts_v_blocks_latest_posts" DROP COLUMN "layout_options_grid_columns_mobile";
  ALTER TABLE "_posts_v_blocks_latest_posts" DROP COLUMN "layout_options_carousel_options_enable_drag";
  ALTER TABLE "_posts_v_blocks_latest_posts" DROP COLUMN "layout_options_carousel_options_show_arrows";
  ALTER TABLE "_posts_v_blocks_latest_posts" DROP COLUMN "layout_options_carousel_options_show_progress";
  ALTER TABLE "_posts_v_blocks_latest_posts" DROP COLUMN "layout_options_carousel_options_peek_amount";
  ALTER TABLE "_posts_v_blocks_latest_posts" DROP COLUMN "layout_options_carousel_options_auto_play";
  ALTER TABLE "_posts_v_blocks_latest_posts" DROP COLUMN "layout_options_carousel_options_auto_play_interval";
  ALTER TABLE "_posts_v_blocks_latest_posts" DROP COLUMN "layout_options_spacing";
  ALTER TABLE "posts_settings" DROP COLUMN "page_header_heading";
  ALTER TABLE "posts_settings" DROP COLUMN "page_header_description";
  DROP TYPE "public"."enum_pages_blocks_latest_posts_card_display_excerpt_length";
  DROP TYPE "public"."enum_pages_blocks_latest_posts_layout_options_display_mode";
  DROP TYPE "public"."cols_desktop";
  DROP TYPE "public"."cols_tablet";
  DROP TYPE "public"."cols_mobile";
  DROP TYPE "public"."peek_amt";
  DROP TYPE "public"."enum_pages_blocks_latest_posts_layout_options_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_latest_posts_card_display_excerpt_length";
  DROP TYPE "public"."enum__pages_v_blocks_latest_posts_layout_options_display_mode";
  DROP TYPE "public"."enum__pages_v_blocks_latest_posts_layout_options_spacing";
  DROP TYPE "public"."enum_posts_blocks_latest_posts_card_display_excerpt_length";
  DROP TYPE "public"."enum_posts_blocks_latest_posts_layout_options_display_mode";
  DROP TYPE "public"."enum_posts_blocks_latest_posts_layout_options_spacing";
  DROP TYPE "public"."enum__posts_v_blocks_latest_posts_card_display_excerpt_length";
  DROP TYPE "public"."enum__posts_v_blocks_latest_posts_layout_options_display_mode";
  DROP TYPE "public"."enum__posts_v_blocks_latest_posts_layout_options_spacing";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_latest_posts_card_display_excerpt_length" AS ENUM('short', 'medium', 'long');
  CREATE TYPE "public"."enum_pages_blocks_latest_posts_layout_options_display_mode" AS ENUM('auto', 'grid', 'carousel');
  CREATE TYPE "public"."cols_desktop" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."cols_tablet" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."cols_mobile" AS ENUM('1', '2');
  CREATE TYPE "public"."peek_amt" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_pages_blocks_latest_posts_layout_options_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_latest_posts_card_display_excerpt_length" AS ENUM('short', 'medium', 'long');
  CREATE TYPE "public"."enum__pages_v_blocks_latest_posts_layout_options_display_mode" AS ENUM('auto', 'grid', 'carousel');
  CREATE TYPE "public"."enum__pages_v_blocks_latest_posts_layout_options_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_posts_blocks_latest_posts_card_display_excerpt_length" AS ENUM('short', 'medium', 'long');
  CREATE TYPE "public"."enum_posts_blocks_latest_posts_layout_options_display_mode" AS ENUM('auto', 'grid', 'carousel');
  CREATE TYPE "public"."enum_posts_blocks_latest_posts_layout_options_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__posts_v_blocks_latest_posts_card_display_excerpt_length" AS ENUM('short', 'medium', 'long');
  CREATE TYPE "public"."enum__posts_v_blocks_latest_posts_layout_options_display_mode" AS ENUM('auto', 'grid', 'carousel');
  CREATE TYPE "public"."enum__posts_v_blocks_latest_posts_layout_options_spacing" AS ENUM('compact', 'normal', 'spacious');
  DROP TABLE "posts_settings_blocks_hero_heading_buttons" CASCADE;
  DROP TABLE "posts_settings_blocks_hero_heading" CASCADE;
  DROP TABLE "posts_settings_blocks_breadcrumb" CASCADE;
  DROP TABLE "posts_settings_blocks_cta_links" CASCADE;
  DROP TABLE "posts_settings_blocks_cta" CASCADE;
  DROP TABLE "posts_settings_blocks_content_columns" CASCADE;
  DROP TABLE "posts_settings_blocks_content" CASCADE;
  DROP TABLE "posts_settings_blocks_media_block" CASCADE;
  DROP TABLE "posts_settings_blocks_form_block" CASCADE;
  DROP TABLE "posts_settings_blocks_button_block_buttons" CASCADE;
  DROP TABLE "posts_settings_blocks_button_block" CASCADE;
  DROP TABLE "posts_settings_rels" CASCADE;
  ALTER TABLE "pages_blocks_latest_posts" ADD COLUMN "card_display_show_categories" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_latest_posts" ADD COLUMN "card_display_show_author" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_latest_posts" ADD COLUMN "card_display_show_date" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_latest_posts" ADD COLUMN "card_display_show_reading_time" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_latest_posts" ADD COLUMN "card_display_show_excerpt" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_latest_posts" ADD COLUMN "card_display_excerpt_length" "enum_pages_blocks_latest_posts_card_display_excerpt_length" DEFAULT 'medium';
  ALTER TABLE "pages_blocks_latest_posts" ADD COLUMN "layout_options_display_mode" "enum_pages_blocks_latest_posts_layout_options_display_mode" DEFAULT 'auto';
  ALTER TABLE "pages_blocks_latest_posts" ADD COLUMN "layout_options_use_posts_settings" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_latest_posts" ADD COLUMN "layout_options_grid_columns_desktop" "cols_desktop" DEFAULT '3';
  ALTER TABLE "pages_blocks_latest_posts" ADD COLUMN "layout_options_grid_columns_tablet" "cols_tablet" DEFAULT '2';
  ALTER TABLE "pages_blocks_latest_posts" ADD COLUMN "layout_options_grid_columns_mobile" "cols_mobile" DEFAULT '1';
  ALTER TABLE "pages_blocks_latest_posts" ADD COLUMN "layout_options_carousel_options_enable_drag" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_latest_posts" ADD COLUMN "layout_options_carousel_options_show_arrows" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_latest_posts" ADD COLUMN "layout_options_carousel_options_show_progress" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_latest_posts" ADD COLUMN "layout_options_carousel_options_peek_amount" "peek_amt" DEFAULT 'medium';
  ALTER TABLE "pages_blocks_latest_posts" ADD COLUMN "layout_options_carousel_options_auto_play" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_latest_posts" ADD COLUMN "layout_options_carousel_options_auto_play_interval" numeric DEFAULT 5000;
  ALTER TABLE "pages_blocks_latest_posts" ADD COLUMN "layout_options_spacing" "enum_pages_blocks_latest_posts_layout_options_spacing" DEFAULT 'normal';
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD COLUMN "card_display_show_categories" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD COLUMN "card_display_show_author" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD COLUMN "card_display_show_date" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD COLUMN "card_display_show_reading_time" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD COLUMN "card_display_show_excerpt" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD COLUMN "card_display_excerpt_length" "enum__pages_v_blocks_latest_posts_card_display_excerpt_length" DEFAULT 'medium';
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD COLUMN "layout_options_display_mode" "enum__pages_v_blocks_latest_posts_layout_options_display_mode" DEFAULT 'auto';
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD COLUMN "layout_options_use_posts_settings" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD COLUMN "layout_options_grid_columns_desktop" "cols_desktop" DEFAULT '3';
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD COLUMN "layout_options_grid_columns_tablet" "cols_tablet" DEFAULT '2';
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD COLUMN "layout_options_grid_columns_mobile" "cols_mobile" DEFAULT '1';
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD COLUMN "layout_options_carousel_options_enable_drag" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD COLUMN "layout_options_carousel_options_show_arrows" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD COLUMN "layout_options_carousel_options_show_progress" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD COLUMN "layout_options_carousel_options_peek_amount" "peek_amt" DEFAULT 'medium';
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD COLUMN "layout_options_carousel_options_auto_play" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD COLUMN "layout_options_carousel_options_auto_play_interval" numeric DEFAULT 5000;
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD COLUMN "layout_options_spacing" "enum__pages_v_blocks_latest_posts_layout_options_spacing" DEFAULT 'normal';
  ALTER TABLE "posts_blocks_latest_posts" ADD COLUMN "card_display_show_categories" boolean DEFAULT true;
  ALTER TABLE "posts_blocks_latest_posts" ADD COLUMN "card_display_show_author" boolean DEFAULT false;
  ALTER TABLE "posts_blocks_latest_posts" ADD COLUMN "card_display_show_date" boolean DEFAULT false;
  ALTER TABLE "posts_blocks_latest_posts" ADD COLUMN "card_display_show_reading_time" boolean DEFAULT false;
  ALTER TABLE "posts_blocks_latest_posts" ADD COLUMN "card_display_show_excerpt" boolean DEFAULT true;
  ALTER TABLE "posts_blocks_latest_posts" ADD COLUMN "card_display_excerpt_length" "enum_posts_blocks_latest_posts_card_display_excerpt_length" DEFAULT 'medium';
  ALTER TABLE "posts_blocks_latest_posts" ADD COLUMN "layout_options_display_mode" "enum_posts_blocks_latest_posts_layout_options_display_mode" DEFAULT 'auto';
  ALTER TABLE "posts_blocks_latest_posts" ADD COLUMN "layout_options_use_posts_settings" boolean DEFAULT true;
  ALTER TABLE "posts_blocks_latest_posts" ADD COLUMN "layout_options_grid_columns_desktop" "cols_desktop" DEFAULT '3';
  ALTER TABLE "posts_blocks_latest_posts" ADD COLUMN "layout_options_grid_columns_tablet" "cols_tablet" DEFAULT '2';
  ALTER TABLE "posts_blocks_latest_posts" ADD COLUMN "layout_options_grid_columns_mobile" "cols_mobile" DEFAULT '1';
  ALTER TABLE "posts_blocks_latest_posts" ADD COLUMN "layout_options_carousel_options_enable_drag" boolean DEFAULT true;
  ALTER TABLE "posts_blocks_latest_posts" ADD COLUMN "layout_options_carousel_options_show_arrows" boolean DEFAULT true;
  ALTER TABLE "posts_blocks_latest_posts" ADD COLUMN "layout_options_carousel_options_show_progress" boolean DEFAULT false;
  ALTER TABLE "posts_blocks_latest_posts" ADD COLUMN "layout_options_carousel_options_peek_amount" "peek_amt" DEFAULT 'medium';
  ALTER TABLE "posts_blocks_latest_posts" ADD COLUMN "layout_options_carousel_options_auto_play" boolean DEFAULT false;
  ALTER TABLE "posts_blocks_latest_posts" ADD COLUMN "layout_options_carousel_options_auto_play_interval" numeric DEFAULT 5000;
  ALTER TABLE "posts_blocks_latest_posts" ADD COLUMN "layout_options_spacing" "enum_posts_blocks_latest_posts_layout_options_spacing" DEFAULT 'normal';
  ALTER TABLE "_posts_v_blocks_latest_posts" ADD COLUMN "card_display_show_categories" boolean DEFAULT true;
  ALTER TABLE "_posts_v_blocks_latest_posts" ADD COLUMN "card_display_show_author" boolean DEFAULT false;
  ALTER TABLE "_posts_v_blocks_latest_posts" ADD COLUMN "card_display_show_date" boolean DEFAULT false;
  ALTER TABLE "_posts_v_blocks_latest_posts" ADD COLUMN "card_display_show_reading_time" boolean DEFAULT false;
  ALTER TABLE "_posts_v_blocks_latest_posts" ADD COLUMN "card_display_show_excerpt" boolean DEFAULT true;
  ALTER TABLE "_posts_v_blocks_latest_posts" ADD COLUMN "card_display_excerpt_length" "enum__posts_v_blocks_latest_posts_card_display_excerpt_length" DEFAULT 'medium';
  ALTER TABLE "_posts_v_blocks_latest_posts" ADD COLUMN "layout_options_display_mode" "enum__posts_v_blocks_latest_posts_layout_options_display_mode" DEFAULT 'auto';
  ALTER TABLE "_posts_v_blocks_latest_posts" ADD COLUMN "layout_options_use_posts_settings" boolean DEFAULT true;
  ALTER TABLE "_posts_v_blocks_latest_posts" ADD COLUMN "layout_options_grid_columns_desktop" "cols_desktop" DEFAULT '3';
  ALTER TABLE "_posts_v_blocks_latest_posts" ADD COLUMN "layout_options_grid_columns_tablet" "cols_tablet" DEFAULT '2';
  ALTER TABLE "_posts_v_blocks_latest_posts" ADD COLUMN "layout_options_grid_columns_mobile" "cols_mobile" DEFAULT '1';
  ALTER TABLE "_posts_v_blocks_latest_posts" ADD COLUMN "layout_options_carousel_options_enable_drag" boolean DEFAULT true;
  ALTER TABLE "_posts_v_blocks_latest_posts" ADD COLUMN "layout_options_carousel_options_show_arrows" boolean DEFAULT true;
  ALTER TABLE "_posts_v_blocks_latest_posts" ADD COLUMN "layout_options_carousel_options_show_progress" boolean DEFAULT false;
  ALTER TABLE "_posts_v_blocks_latest_posts" ADD COLUMN "layout_options_carousel_options_peek_amount" "peek_amt" DEFAULT 'medium';
  ALTER TABLE "_posts_v_blocks_latest_posts" ADD COLUMN "layout_options_carousel_options_auto_play" boolean DEFAULT false;
  ALTER TABLE "_posts_v_blocks_latest_posts" ADD COLUMN "layout_options_carousel_options_auto_play_interval" numeric DEFAULT 5000;
  ALTER TABLE "_posts_v_blocks_latest_posts" ADD COLUMN "layout_options_spacing" "enum__posts_v_blocks_latest_posts_layout_options_spacing" DEFAULT 'normal';
  ALTER TABLE "posts_settings" ADD COLUMN "page_header_heading" varchar DEFAULT 'News & insights' NOT NULL;
  ALTER TABLE "posts_settings" ADD COLUMN "page_header_description" varchar DEFAULT 'The latest industry news, interviews, technologies, and resources.';
  ALTER TABLE "pages_blocks_latest_posts" DROP COLUMN "spacing";
  ALTER TABLE "_pages_v_blocks_latest_posts" DROP COLUMN "spacing";
  ALTER TABLE "posts_blocks_latest_posts" DROP COLUMN "spacing";
  ALTER TABLE "_posts_v_blocks_latest_posts" DROP COLUMN "spacing";
  ALTER TABLE "posts_settings" DROP COLUMN "display_mode";
  ALTER TABLE "posts_settings" DROP COLUMN "carousel_settings_enable_drag";
  ALTER TABLE "posts_settings" DROP COLUMN "carousel_settings_show_arrows";
  ALTER TABLE "posts_settings" DROP COLUMN "carousel_settings_show_progress";
  ALTER TABLE "posts_settings" DROP COLUMN "carousel_settings_peek_amount";
  ALTER TABLE "posts_settings" DROP COLUMN "carousel_settings_auto_play";
  ALTER TABLE "posts_settings" DROP COLUMN "carousel_settings_auto_play_interval";
  ALTER TABLE "posts_settings" DROP COLUMN "card_display_show_categories";
  ALTER TABLE "posts_settings" DROP COLUMN "card_display_show_author";
  ALTER TABLE "posts_settings" DROP COLUMN "card_display_show_date";
  ALTER TABLE "posts_settings" DROP COLUMN "card_display_show_reading_time";
  ALTER TABLE "posts_settings" DROP COLUMN "card_display_show_excerpt";
  ALTER TABLE "posts_settings" DROP COLUMN "card_display_excerpt_length";
  DROP TYPE "public"."enum_pages_blocks_latest_posts_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_latest_posts_spacing";
  DROP TYPE "public"."enum_posts_blocks_latest_posts_spacing";
  DROP TYPE "public"."enum__posts_v_blocks_latest_posts_spacing";
  DROP TYPE "public"."enum_posts_settings_blocks_hero_heading_buttons_link_type";
  DROP TYPE "public"."enum_posts_settings_blocks_hero_heading_buttons_link_uui_color";
  DROP TYPE "public"."enum_posts_settings_blocks_hero_heading_buttons_link_uui_size";
  DROP TYPE "public"."enum_posts_settings_blocks_hero_heading_buttons_link_icon_pos";
  DROP TYPE "public"."enum_posts_settings_blocks_hero_heading_hero_layout";
  DROP TYPE "public"."enum_posts_settings_blocks_hero_heading_headline_color";
  DROP TYPE "public"."enum_posts_settings_blocks_hero_heading_subheading_color";
  DROP TYPE "public"."enum_posts_settings_blocks_hero_heading_text_alignment";
  DROP TYPE "public"."enum_posts_settings_blocks_hero_heading_spacing";
  DROP TYPE "public"."enum_posts_settings_blocks_hero_heading_subtitle_size";
  DROP TYPE "public"."enum_posts_settings_blocks_hero_heading_hero_background";
  DROP TYPE "public"."enum_posts_settings_blocks_hero_heading_bg_height_variant";
  DROP TYPE "public"."enum_posts_settings_blocks_hero_heading_bg_type";
  DROP TYPE "public"."enum_posts_settings_blocks_hero_heading_bg_gradient";
  DROP TYPE "public"."enum_posts_settings_blocks_breadcrumb_spacing";
  DROP TYPE "public"."enum_posts_settings_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_posts_settings_blocks_cta_links_link_uui_color";
  DROP TYPE "public"."enum_posts_settings_blocks_cta_links_link_uui_size";
  DROP TYPE "public"."enum_posts_settings_blocks_cta_links_link_icon_pos";
  DROP TYPE "public"."enum_posts_settings_blocks_cta_spacing";
  DROP TYPE "public"."enum_posts_settings_blocks_content_columns_size";
  DROP TYPE "public"."enum_posts_settings_blocks_content_columns_link_type";
  DROP TYPE "public"."enum_posts_settings_blocks_content_columns_link_uui_color";
  DROP TYPE "public"."enum_posts_settings_blocks_content_columns_link_uui_size";
  DROP TYPE "public"."enum_posts_settings_blocks_content_columns_link_icon_pos";
  DROP TYPE "public"."enum_posts_settings_blocks_content_spacing";
  DROP TYPE "public"."enum_posts_settings_blocks_button_block_buttons_link_type";
  DROP TYPE "public"."enum_posts_settings_blocks_button_block_buttons_link_uui_color";
  DROP TYPE "public"."enum_posts_settings_blocks_button_block_buttons_link_uui_size";
  DROP TYPE "public"."enum_posts_settings_blocks_button_block_buttons_link_icon_pos";
  DROP TYPE "public"."enum_posts_settings_blocks_button_block_layout";
  DROP TYPE "public"."enum_posts_settings_blocks_button_block_alignment";
  DROP TYPE "public"."enum_posts_settings_display_mode";
  DROP TYPE "public"."enum_posts_settings_carousel_settings_peek_amount";
  DROP TYPE "public"."enum_posts_settings_card_display_excerpt_length";`)
}
