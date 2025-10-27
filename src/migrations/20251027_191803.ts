import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_background_section_header_header_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_background_section_header_text_color" AS ENUM('auto', 'light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_background_section_background_type" AS ENUM('none', 'solid', 'gradient', 'image', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_background_section_solid_color" AS ENUM('primary', 'primary-reversed', 'secondary', 'tertiary', 'accent', 'white', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_background_section_gradient" AS ENUM('brand-radial', 'accent-gradient', 'dark-light', 'sunrise', 'ocean', 'purple-haze');
  CREATE TYPE "public"."enum_pages_blocks_background_section_image_overlay" AS ENUM('none', 'light-20', 'light-40', 'light-60', 'dark-20', 'dark-40', 'dark-60', 'dark-80', 'brand-40', 'brand-60');
  CREATE TYPE "public"."enum_pages_blocks_background_section_image_position" AS ENUM('center', 'top', 'bottom', 'left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_background_section_spacing" AS ENUM('none', 'compact', 'normal', 'spacious', 'extra');
  CREATE TYPE "public"."enum_pages_blocks_background_section_content_width" AS ENUM('container', 'wide', 'full');
  CREATE TYPE "public"."enum_pages_blocks_background_section_color_mode" AS ENUM('auto', 'light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_background_section_header_header_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_background_section_header_text_color" AS ENUM('auto', 'light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_background_section_background_type" AS ENUM('none', 'solid', 'gradient', 'image', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_background_section_solid_color" AS ENUM('primary', 'primary-reversed', 'secondary', 'tertiary', 'accent', 'white', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_background_section_gradient" AS ENUM('brand-radial', 'accent-gradient', 'dark-light', 'sunrise', 'ocean', 'purple-haze');
  CREATE TYPE "public"."enum__pages_v_blocks_background_section_image_overlay" AS ENUM('none', 'light-20', 'light-40', 'light-60', 'dark-20', 'dark-40', 'dark-60', 'dark-80', 'brand-40', 'brand-60');
  CREATE TYPE "public"."enum__pages_v_blocks_background_section_image_position" AS ENUM('center', 'top', 'bottom', 'left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_background_section_spacing" AS ENUM('none', 'compact', 'normal', 'spacious', 'extra');
  CREATE TYPE "public"."enum__pages_v_blocks_background_section_content_width" AS ENUM('container', 'wide', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_background_section_color_mode" AS ENUM('auto', 'light', 'dark');
  ALTER TYPE "public"."enum_pages_blocks_hero_heading_buttons_link_uui_color" ADD VALUE 'primary-reversed' BEFORE 'accent';
  ALTER TYPE "public"."enum_pages_blocks_hero_heading_headline_color" ADD VALUE 'white' BEFORE 'brand';
  ALTER TYPE "public"."enum_pages_blocks_hero_heading_hero_background" ADD VALUE 'none' BEFORE 'primary';
  ALTER TYPE "public"."enum_pages_blocks_hero_heading_hero_background" ADD VALUE 'primary-reversed' BEFORE 'secondary';
  ALTER TYPE "public"."enum_pages_blocks_hero_heading_hero_background" ADD VALUE 'tertiary' BEFORE 'accent';
  ALTER TYPE "public"."enum_pages_blocks_cta_links_link_uui_color" ADD VALUE 'primary-reversed' BEFORE 'accent';
  ALTER TYPE "public"."enum_pages_blocks_content_columns_link_uui_color" ADD VALUE 'primary-reversed' BEFORE 'accent';
  ALTER TYPE "public"."enum_pages_blocks_card_grid_cards_link_uui_color" ADD VALUE 'primary-reversed' BEFORE 'accent';
  ALTER TYPE "public"."enum_pages_blocks_card_grid_card_background" ADD VALUE 'none' BEFORE 'primary';
  ALTER TYPE "public"."enum_pages_blocks_card_grid_card_background" ADD VALUE 'primary-reversed' BEFORE 'secondary';
  ALTER TYPE "public"."enum_pages_blocks_card_grid_card_background" ADD VALUE 'tertiary' BEFORE 'accent';
  ALTER TYPE "public"."enum_pages_blocks_card_grid_icon_color" ADD VALUE 'primary-reversed' BEFORE 'secondary';
  ALTER TYPE "public"."enum_pages_blocks_features_features_link_uui_color" ADD VALUE 'primary-reversed' BEFORE 'accent';
  ALTER TYPE "public"."enum_pages_blocks_features_layout_options_card_background" ADD VALUE 'primary-reversed' BEFORE 'secondary';
  ALTER TYPE "public"."enum_pages_blocks_features_layout_options_card_background" ADD VALUE 'tertiary' BEFORE 'accent';
  ALTER TYPE "public"."enum_pages_blocks_features_layout_options_icon_color" ADD VALUE 'primary-reversed' BEFORE 'secondary';
  ALTER TYPE "public"."enum_pages_blocks_latest_posts_button_config_link_uui_color" ADD VALUE 'primary-reversed' BEFORE 'accent';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_heading_buttons_link_uui_color" ADD VALUE 'primary-reversed' BEFORE 'accent';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_heading_headline_color" ADD VALUE 'white' BEFORE 'brand';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_heading_hero_background" ADD VALUE 'none' BEFORE 'primary';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_heading_hero_background" ADD VALUE 'primary-reversed' BEFORE 'secondary';
  ALTER TYPE "public"."enum__pages_v_blocks_hero_heading_hero_background" ADD VALUE 'tertiary' BEFORE 'accent';
  ALTER TYPE "public"."enum__pages_v_blocks_cta_links_link_uui_color" ADD VALUE 'primary-reversed' BEFORE 'accent';
  ALTER TYPE "public"."enum__pages_v_blocks_content_columns_link_uui_color" ADD VALUE 'primary-reversed' BEFORE 'accent';
  ALTER TYPE "public"."enum__pages_v_blocks_card_grid_cards_link_uui_color" ADD VALUE 'primary-reversed' BEFORE 'accent';
  ALTER TYPE "public"."enum__pages_v_blocks_card_grid_card_background" ADD VALUE 'none' BEFORE 'primary';
  ALTER TYPE "public"."enum__pages_v_blocks_card_grid_card_background" ADD VALUE 'primary-reversed' BEFORE 'secondary';
  ALTER TYPE "public"."enum__pages_v_blocks_card_grid_card_background" ADD VALUE 'tertiary' BEFORE 'accent';
  ALTER TYPE "public"."enum__pages_v_blocks_card_grid_icon_color" ADD VALUE 'primary-reversed' BEFORE 'secondary';
  ALTER TYPE "public"."enum__pages_v_blocks_features_features_link_uui_color" ADD VALUE 'primary-reversed' BEFORE 'accent';
  ALTER TYPE "public"."enum__pages_v_blocks_features_layout_options_card_background" ADD VALUE 'primary-reversed' BEFORE 'secondary';
  ALTER TYPE "public"."enum__pages_v_blocks_features_layout_options_card_background" ADD VALUE 'tertiary' BEFORE 'accent';
  ALTER TYPE "public"."enum__pages_v_blocks_features_layout_options_icon_color" ADD VALUE 'primary-reversed' BEFORE 'secondary';
  ALTER TYPE "public"."enum__pages_v_blocks_latest_posts_button_config_link_uui_color" ADD VALUE 'primary-reversed' BEFORE 'accent';
  ALTER TYPE "public"."enum_posts_blocks_latest_posts_button_config_link_uui_color" ADD VALUE 'primary-reversed' BEFORE 'accent';
  ALTER TYPE "public"."enum_posts_blocks_cta_links_link_uui_color" ADD VALUE 'primary-reversed' BEFORE 'accent';
  ALTER TYPE "public"."enum__posts_v_blocks_latest_posts_button_config_link_uui_color" ADD VALUE 'primary-reversed' BEFORE 'accent';
  ALTER TYPE "public"."enum__posts_v_blocks_cta_links_link_uui_color" ADD VALUE 'primary-reversed' BEFORE 'accent';
  ALTER TYPE "public"."enum_header_cta_button_link_uui_color" ADD VALUE 'primary-reversed' BEFORE 'accent';
  ALTER TYPE "public"."enum_header_mobile_cta_button_link_uui_color" ADD VALUE 'primary-reversed' BEFORE 'accent';
  ALTER TYPE "public"."enum_not_found_link_uui_color" ADD VALUE 'primary-reversed' BEFORE 'accent';
  ALTER TYPE "public"."enum_posts_settings_blocks_hero_heading_buttons_link_uui_color" ADD VALUE 'primary-reversed' BEFORE 'accent';
  ALTER TYPE "public"."enum_posts_settings_blocks_hero_heading_headline_color" ADD VALUE 'white' BEFORE 'brand';
  ALTER TYPE "public"."enum_posts_settings_blocks_hero_heading_hero_background" ADD VALUE 'none' BEFORE 'primary';
  ALTER TYPE "public"."enum_posts_settings_blocks_hero_heading_hero_background" ADD VALUE 'primary-reversed' BEFORE 'secondary';
  ALTER TYPE "public"."enum_posts_settings_blocks_hero_heading_hero_background" ADD VALUE 'tertiary' BEFORE 'accent';
  ALTER TYPE "public"."enum_posts_settings_blocks_cta_links_link_uui_color" ADD VALUE 'primary-reversed' BEFORE 'accent';
  ALTER TYPE "public"."enum_posts_settings_blocks_content_columns_link_uui_color" ADD VALUE 'primary-reversed' BEFORE 'accent';
  CREATE TABLE "pages_blocks_background_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"header_show_header" boolean DEFAULT false,
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_description" varchar,
  	"header_header_alignment" "enum_pages_blocks_background_section_header_header_alignment" DEFAULT 'center',
  	"header_text_color" "enum_pages_blocks_background_section_header_text_color" DEFAULT 'auto',
  	"background_type" "enum_pages_blocks_background_section_background_type" DEFAULT 'none',
  	"solid_color" "enum_pages_blocks_background_section_solid_color" DEFAULT 'primary',
  	"gradient" "enum_pages_blocks_background_section_gradient" DEFAULT 'brand-radial',
  	"background_image_id" integer,
  	"image_overlay" "enum_pages_blocks_background_section_image_overlay" DEFAULT 'dark-40',
  	"image_position" "enum_pages_blocks_background_section_image_position" DEFAULT 'center',
  	"enable_parallax" boolean DEFAULT false,
  	"custom_class" varchar,
  	"spacing" "enum_pages_blocks_background_section_spacing" DEFAULT 'normal',
  	"content_width" "enum_pages_blocks_background_section_content_width" DEFAULT 'container',
  	"color_mode" "enum_pages_blocks_background_section_color_mode" DEFAULT 'auto',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_background_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_show_header" boolean DEFAULT false,
  	"header_eyebrow" varchar,
  	"header_heading" varchar,
  	"header_description" varchar,
  	"header_header_alignment" "enum__pages_v_blocks_background_section_header_header_alignment" DEFAULT 'center',
  	"header_text_color" "enum__pages_v_blocks_background_section_header_text_color" DEFAULT 'auto',
  	"background_type" "enum__pages_v_blocks_background_section_background_type" DEFAULT 'none',
  	"solid_color" "enum__pages_v_blocks_background_section_solid_color" DEFAULT 'primary',
  	"gradient" "enum__pages_v_blocks_background_section_gradient" DEFAULT 'brand-radial',
  	"background_image_id" integer,
  	"image_overlay" "enum__pages_v_blocks_background_section_image_overlay" DEFAULT 'dark-40',
  	"image_position" "enum__pages_v_blocks_background_section_image_position" DEFAULT 'center',
  	"enable_parallax" boolean DEFAULT false,
  	"custom_class" varchar,
  	"spacing" "enum__pages_v_blocks_background_section_spacing" DEFAULT 'normal',
  	"content_width" "enum__pages_v_blocks_background_section_content_width" DEFAULT 'container',
  	"color_mode" "enum__pages_v_blocks_background_section_color_mode" DEFAULT 'auto',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_card_grid" ALTER COLUMN "card_background" SET DEFAULT 'none';
  ALTER TABLE "_pages_v_blocks_card_grid" ALTER COLUMN "card_background" SET DEFAULT 'none';
  ALTER TABLE "pages_blocks_background_section" ADD CONSTRAINT "pages_blocks_background_section_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_background_section" ADD CONSTRAINT "pages_blocks_background_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_background_section" ADD CONSTRAINT "_pages_v_blocks_background_section_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_background_section" ADD CONSTRAINT "_pages_v_blocks_background_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_background_section_order_idx" ON "pages_blocks_background_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_background_section_parent_id_idx" ON "pages_blocks_background_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_background_section_path_idx" ON "pages_blocks_background_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_background_section_background_image_idx" ON "pages_blocks_background_section" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_background_section_order_idx" ON "_pages_v_blocks_background_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_background_section_parent_id_idx" ON "_pages_v_blocks_background_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_background_section_path_idx" ON "_pages_v_blocks_background_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_background_section_background_image_idx" ON "_pages_v_blocks_background_section" USING btree ("background_image_id");
  ALTER TABLE "pages_blocks_hero_heading" DROP COLUMN "subheading_color";
  ALTER TABLE "_pages_v_blocks_hero_heading" DROP COLUMN "subheading_color";
  ALTER TABLE "posts_settings_blocks_hero_heading" DROP COLUMN "subheading_color";
  DROP TYPE "public"."enum_pages_blocks_hero_heading_subheading_color";
  DROP TYPE "public"."enum__pages_v_blocks_hero_heading_subheading_color";
  DROP TYPE "public"."enum_posts_settings_blocks_hero_heading_subheading_color";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_heading_subheading_color" AS ENUM('default', 'white');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_heading_subheading_color" AS ENUM('default', 'white');
  CREATE TYPE "public"."enum_posts_settings_blocks_hero_heading_subheading_color" AS ENUM('default', 'white');
  ALTER TABLE "pages_blocks_background_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_background_section" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_background_section" CASCADE;
  DROP TABLE "_pages_v_blocks_background_section" CASCADE;
  ALTER TABLE "pages_blocks_hero_heading_buttons" ALTER COLUMN "link_uui_color" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_hero_heading_buttons" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum_pages_blocks_hero_heading_buttons_link_uui_color";
  CREATE TYPE "public"."enum_pages_blocks_hero_heading_buttons_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary');
  ALTER TABLE "pages_blocks_hero_heading_buttons" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::"public"."enum_pages_blocks_hero_heading_buttons_link_uui_color";
  ALTER TABLE "pages_blocks_hero_heading_buttons" ALTER COLUMN "link_uui_color" SET DATA TYPE "public"."enum_pages_blocks_hero_heading_buttons_link_uui_color" USING "link_uui_color"::"public"."enum_pages_blocks_hero_heading_buttons_link_uui_color";
  ALTER TABLE "pages_blocks_hero_heading" ALTER COLUMN "headline_color" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_hero_heading" ALTER COLUMN "headline_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum_pages_blocks_hero_heading_headline_color";
  CREATE TYPE "public"."enum_pages_blocks_hero_heading_headline_color" AS ENUM('primary', 'brand');
  ALTER TABLE "pages_blocks_hero_heading" ALTER COLUMN "headline_color" SET DEFAULT 'primary'::"public"."enum_pages_blocks_hero_heading_headline_color";
  ALTER TABLE "pages_blocks_hero_heading" ALTER COLUMN "headline_color" SET DATA TYPE "public"."enum_pages_blocks_hero_heading_headline_color" USING "headline_color"::"public"."enum_pages_blocks_hero_heading_headline_color";
  ALTER TABLE "pages_blocks_hero_heading" ALTER COLUMN "hero_background" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_hero_heading" ALTER COLUMN "hero_background" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum_pages_blocks_hero_heading_hero_background";
  CREATE TYPE "public"."enum_pages_blocks_hero_heading_hero_background" AS ENUM('primary', 'secondary', 'accent');
  ALTER TABLE "pages_blocks_hero_heading" ALTER COLUMN "hero_background" SET DEFAULT 'primary'::"public"."enum_pages_blocks_hero_heading_hero_background";
  ALTER TABLE "pages_blocks_hero_heading" ALTER COLUMN "hero_background" SET DATA TYPE "public"."enum_pages_blocks_hero_heading_hero_background" USING "hero_background"::"public"."enum_pages_blocks_hero_heading_hero_background";
  ALTER TABLE "pages_blocks_card_grid_cards" ALTER COLUMN "link_uui_color" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_card_grid_cards" ALTER COLUMN "link_uui_color" SET DEFAULT 'link'::text;
  DROP TYPE "public"."enum_pages_blocks_card_grid_cards_link_uui_color";
  CREATE TYPE "public"."enum_pages_blocks_card_grid_cards_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  ALTER TABLE "pages_blocks_card_grid_cards" ALTER COLUMN "link_uui_color" SET DEFAULT 'link'::"public"."enum_pages_blocks_card_grid_cards_link_uui_color";
  ALTER TABLE "pages_blocks_card_grid_cards" ALTER COLUMN "link_uui_color" SET DATA TYPE "public"."enum_pages_blocks_card_grid_cards_link_uui_color" USING "link_uui_color"::"public"."enum_pages_blocks_card_grid_cards_link_uui_color";
  ALTER TABLE "pages_blocks_card_grid" ALTER COLUMN "card_background" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_card_grid" ALTER COLUMN "card_background" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum_pages_blocks_card_grid_card_background";
  CREATE TYPE "public"."enum_pages_blocks_card_grid_card_background" AS ENUM('primary', 'secondary', 'accent', 'line');
  ALTER TABLE "pages_blocks_card_grid" ALTER COLUMN "card_background" SET DEFAULT 'primary'::"public"."enum_pages_blocks_card_grid_card_background";
  ALTER TABLE "pages_blocks_card_grid" ALTER COLUMN "card_background" SET DATA TYPE "public"."enum_pages_blocks_card_grid_card_background" USING "card_background"::"public"."enum_pages_blocks_card_grid_card_background";
  ALTER TABLE "pages_blocks_card_grid" ALTER COLUMN "icon_color" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_card_grid" ALTER COLUMN "icon_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum_pages_blocks_card_grid_icon_color";
  CREATE TYPE "public"."enum_pages_blocks_card_grid_icon_color" AS ENUM('primary', 'secondary', 'tertiary', 'accent');
  ALTER TABLE "pages_blocks_card_grid" ALTER COLUMN "icon_color" SET DEFAULT 'primary'::"public"."enum_pages_blocks_card_grid_icon_color";
  ALTER TABLE "pages_blocks_card_grid" ALTER COLUMN "icon_color" SET DATA TYPE "public"."enum_pages_blocks_card_grid_icon_color" USING "icon_color"::"public"."enum_pages_blocks_card_grid_icon_color";
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_uui_color" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_uui_color";
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::"public"."enum_pages_blocks_content_columns_link_uui_color";
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_uui_color" SET DATA TYPE "public"."enum_pages_blocks_content_columns_link_uui_color" USING "link_uui_color"::"public"."enum_pages_blocks_content_columns_link_uui_color";
  ALTER TABLE "pages_blocks_features_features" ALTER COLUMN "link_uui_color" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_features_features" ALTER COLUMN "link_uui_color" SET DEFAULT 'link'::text;
  DROP TYPE "public"."enum_pages_blocks_features_features_link_uui_color";
  CREATE TYPE "public"."enum_pages_blocks_features_features_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  ALTER TABLE "pages_blocks_features_features" ALTER COLUMN "link_uui_color" SET DEFAULT 'link'::"public"."enum_pages_blocks_features_features_link_uui_color";
  ALTER TABLE "pages_blocks_features_features" ALTER COLUMN "link_uui_color" SET DATA TYPE "public"."enum_pages_blocks_features_features_link_uui_color" USING "link_uui_color"::"public"."enum_pages_blocks_features_features_link_uui_color";
  ALTER TABLE "pages_blocks_features" ALTER COLUMN "layout_options_card_background" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_features" ALTER COLUMN "layout_options_card_background" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum_pages_blocks_features_layout_options_card_background";
  CREATE TYPE "public"."enum_pages_blocks_features_layout_options_card_background" AS ENUM('primary', 'secondary', 'accent', 'line');
  ALTER TABLE "pages_blocks_features" ALTER COLUMN "layout_options_card_background" SET DEFAULT 'primary'::"public"."enum_pages_blocks_features_layout_options_card_background";
  ALTER TABLE "pages_blocks_features" ALTER COLUMN "layout_options_card_background" SET DATA TYPE "public"."enum_pages_blocks_features_layout_options_card_background" USING "layout_options_card_background"::"public"."enum_pages_blocks_features_layout_options_card_background";
  ALTER TABLE "pages_blocks_features" ALTER COLUMN "layout_options_icon_color" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_features" ALTER COLUMN "layout_options_icon_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum_pages_blocks_features_layout_options_icon_color";
  CREATE TYPE "public"."enum_pages_blocks_features_layout_options_icon_color" AS ENUM('primary', 'secondary', 'tertiary', 'accent');
  ALTER TABLE "pages_blocks_features" ALTER COLUMN "layout_options_icon_color" SET DEFAULT 'primary'::"public"."enum_pages_blocks_features_layout_options_icon_color";
  ALTER TABLE "pages_blocks_features" ALTER COLUMN "layout_options_icon_color" SET DATA TYPE "public"."enum_pages_blocks_features_layout_options_icon_color" USING "layout_options_icon_color"::"public"."enum_pages_blocks_features_layout_options_icon_color";
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_uui_color" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_uui_color";
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::"public"."enum_pages_blocks_cta_links_link_uui_color";
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_uui_color" SET DATA TYPE "public"."enum_pages_blocks_cta_links_link_uui_color" USING "link_uui_color"::"public"."enum_pages_blocks_cta_links_link_uui_color";
  ALTER TABLE "pages_blocks_latest_posts" ALTER COLUMN "button_config_link_uui_color" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_latest_posts" ALTER COLUMN "button_config_link_uui_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum_pages_blocks_latest_posts_button_config_link_uui_color";
  CREATE TYPE "public"."enum_pages_blocks_latest_posts_button_config_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  ALTER TABLE "pages_blocks_latest_posts" ALTER COLUMN "button_config_link_uui_color" SET DEFAULT 'primary'::"public"."enum_pages_blocks_latest_posts_button_config_link_uui_color";
  ALTER TABLE "pages_blocks_latest_posts" ALTER COLUMN "button_config_link_uui_color" SET DATA TYPE "public"."enum_pages_blocks_latest_posts_button_config_link_uui_color" USING "button_config_link_uui_color"::"public"."enum_pages_blocks_latest_posts_button_config_link_uui_color";
  ALTER TABLE "_pages_v_blocks_hero_heading_buttons" ALTER COLUMN "link_uui_color" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_hero_heading_buttons" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum__pages_v_blocks_hero_heading_buttons_link_uui_color";
  CREATE TYPE "public"."enum__pages_v_blocks_hero_heading_buttons_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary');
  ALTER TABLE "_pages_v_blocks_hero_heading_buttons" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::"public"."enum__pages_v_blocks_hero_heading_buttons_link_uui_color";
  ALTER TABLE "_pages_v_blocks_hero_heading_buttons" ALTER COLUMN "link_uui_color" SET DATA TYPE "public"."enum__pages_v_blocks_hero_heading_buttons_link_uui_color" USING "link_uui_color"::"public"."enum__pages_v_blocks_hero_heading_buttons_link_uui_color";
  ALTER TABLE "_pages_v_blocks_hero_heading" ALTER COLUMN "headline_color" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_hero_heading" ALTER COLUMN "headline_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum__pages_v_blocks_hero_heading_headline_color";
  CREATE TYPE "public"."enum__pages_v_blocks_hero_heading_headline_color" AS ENUM('primary', 'brand');
  ALTER TABLE "_pages_v_blocks_hero_heading" ALTER COLUMN "headline_color" SET DEFAULT 'primary'::"public"."enum__pages_v_blocks_hero_heading_headline_color";
  ALTER TABLE "_pages_v_blocks_hero_heading" ALTER COLUMN "headline_color" SET DATA TYPE "public"."enum__pages_v_blocks_hero_heading_headline_color" USING "headline_color"::"public"."enum__pages_v_blocks_hero_heading_headline_color";
  ALTER TABLE "_pages_v_blocks_hero_heading" ALTER COLUMN "hero_background" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_hero_heading" ALTER COLUMN "hero_background" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum__pages_v_blocks_hero_heading_hero_background";
  CREATE TYPE "public"."enum__pages_v_blocks_hero_heading_hero_background" AS ENUM('primary', 'secondary', 'accent');
  ALTER TABLE "_pages_v_blocks_hero_heading" ALTER COLUMN "hero_background" SET DEFAULT 'primary'::"public"."enum__pages_v_blocks_hero_heading_hero_background";
  ALTER TABLE "_pages_v_blocks_hero_heading" ALTER COLUMN "hero_background" SET DATA TYPE "public"."enum__pages_v_blocks_hero_heading_hero_background" USING "hero_background"::"public"."enum__pages_v_blocks_hero_heading_hero_background";
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ALTER COLUMN "link_uui_color" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ALTER COLUMN "link_uui_color" SET DEFAULT 'link'::text;
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_cards_link_uui_color";
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_cards_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ALTER COLUMN "link_uui_color" SET DEFAULT 'link'::"public"."enum__pages_v_blocks_card_grid_cards_link_uui_color";
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ALTER COLUMN "link_uui_color" SET DATA TYPE "public"."enum__pages_v_blocks_card_grid_cards_link_uui_color" USING "link_uui_color"::"public"."enum__pages_v_blocks_card_grid_cards_link_uui_color";
  ALTER TABLE "_pages_v_blocks_card_grid" ALTER COLUMN "card_background" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_card_grid" ALTER COLUMN "card_background" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_card_background";
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_card_background" AS ENUM('primary', 'secondary', 'accent', 'line');
  ALTER TABLE "_pages_v_blocks_card_grid" ALTER COLUMN "card_background" SET DEFAULT 'primary'::"public"."enum__pages_v_blocks_card_grid_card_background";
  ALTER TABLE "_pages_v_blocks_card_grid" ALTER COLUMN "card_background" SET DATA TYPE "public"."enum__pages_v_blocks_card_grid_card_background" USING "card_background"::"public"."enum__pages_v_blocks_card_grid_card_background";
  ALTER TABLE "_pages_v_blocks_card_grid" ALTER COLUMN "icon_color" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_card_grid" ALTER COLUMN "icon_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_icon_color";
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_icon_color" AS ENUM('primary', 'secondary', 'tertiary', 'accent');
  ALTER TABLE "_pages_v_blocks_card_grid" ALTER COLUMN "icon_color" SET DEFAULT 'primary'::"public"."enum__pages_v_blocks_card_grid_icon_color";
  ALTER TABLE "_pages_v_blocks_card_grid" ALTER COLUMN "icon_color" SET DATA TYPE "public"."enum__pages_v_blocks_card_grid_icon_color" USING "icon_color"::"public"."enum__pages_v_blocks_card_grid_icon_color";
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_uui_color" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_uui_color";
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::"public"."enum__pages_v_blocks_content_columns_link_uui_color";
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_uui_color" SET DATA TYPE "public"."enum__pages_v_blocks_content_columns_link_uui_color" USING "link_uui_color"::"public"."enum__pages_v_blocks_content_columns_link_uui_color";
  ALTER TABLE "_pages_v_blocks_features_features" ALTER COLUMN "link_uui_color" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_features_features" ALTER COLUMN "link_uui_color" SET DEFAULT 'link'::text;
  DROP TYPE "public"."enum__pages_v_blocks_features_features_link_uui_color";
  CREATE TYPE "public"."enum__pages_v_blocks_features_features_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  ALTER TABLE "_pages_v_blocks_features_features" ALTER COLUMN "link_uui_color" SET DEFAULT 'link'::"public"."enum__pages_v_blocks_features_features_link_uui_color";
  ALTER TABLE "_pages_v_blocks_features_features" ALTER COLUMN "link_uui_color" SET DATA TYPE "public"."enum__pages_v_blocks_features_features_link_uui_color" USING "link_uui_color"::"public"."enum__pages_v_blocks_features_features_link_uui_color";
  ALTER TABLE "_pages_v_blocks_features" ALTER COLUMN "layout_options_card_background" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_features" ALTER COLUMN "layout_options_card_background" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum__pages_v_blocks_features_layout_options_card_background";
  CREATE TYPE "public"."enum__pages_v_blocks_features_layout_options_card_background" AS ENUM('primary', 'secondary', 'accent', 'line');
  ALTER TABLE "_pages_v_blocks_features" ALTER COLUMN "layout_options_card_background" SET DEFAULT 'primary'::"public"."enum__pages_v_blocks_features_layout_options_card_background";
  ALTER TABLE "_pages_v_blocks_features" ALTER COLUMN "layout_options_card_background" SET DATA TYPE "public"."enum__pages_v_blocks_features_layout_options_card_background" USING "layout_options_card_background"::"public"."enum__pages_v_blocks_features_layout_options_card_background";
  ALTER TABLE "_pages_v_blocks_features" ALTER COLUMN "layout_options_icon_color" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_features" ALTER COLUMN "layout_options_icon_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum__pages_v_blocks_features_layout_options_icon_color";
  CREATE TYPE "public"."enum__pages_v_blocks_features_layout_options_icon_color" AS ENUM('primary', 'secondary', 'tertiary', 'accent');
  ALTER TABLE "_pages_v_blocks_features" ALTER COLUMN "layout_options_icon_color" SET DEFAULT 'primary'::"public"."enum__pages_v_blocks_features_layout_options_icon_color";
  ALTER TABLE "_pages_v_blocks_features" ALTER COLUMN "layout_options_icon_color" SET DATA TYPE "public"."enum__pages_v_blocks_features_layout_options_icon_color" USING "layout_options_icon_color"::"public"."enum__pages_v_blocks_features_layout_options_icon_color";
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_uui_color" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_uui_color";
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::"public"."enum__pages_v_blocks_cta_links_link_uui_color";
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_uui_color" SET DATA TYPE "public"."enum__pages_v_blocks_cta_links_link_uui_color" USING "link_uui_color"::"public"."enum__pages_v_blocks_cta_links_link_uui_color";
  ALTER TABLE "_pages_v_blocks_latest_posts" ALTER COLUMN "button_config_link_uui_color" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_latest_posts" ALTER COLUMN "button_config_link_uui_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum__pages_v_blocks_latest_posts_button_config_link_uui_color";
  CREATE TYPE "public"."enum__pages_v_blocks_latest_posts_button_config_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  ALTER TABLE "_pages_v_blocks_latest_posts" ALTER COLUMN "button_config_link_uui_color" SET DEFAULT 'primary'::"public"."enum__pages_v_blocks_latest_posts_button_config_link_uui_color";
  ALTER TABLE "_pages_v_blocks_latest_posts" ALTER COLUMN "button_config_link_uui_color" SET DATA TYPE "public"."enum__pages_v_blocks_latest_posts_button_config_link_uui_color" USING "button_config_link_uui_color"::"public"."enum__pages_v_blocks_latest_posts_button_config_link_uui_color";
  ALTER TABLE "posts_blocks_latest_posts" ALTER COLUMN "button_config_link_uui_color" SET DATA TYPE text;
  ALTER TABLE "posts_blocks_latest_posts" ALTER COLUMN "button_config_link_uui_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum_posts_blocks_latest_posts_button_config_link_uui_color";
  CREATE TYPE "public"."enum_posts_blocks_latest_posts_button_config_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  ALTER TABLE "posts_blocks_latest_posts" ALTER COLUMN "button_config_link_uui_color" SET DEFAULT 'primary'::"public"."enum_posts_blocks_latest_posts_button_config_link_uui_color";
  ALTER TABLE "posts_blocks_latest_posts" ALTER COLUMN "button_config_link_uui_color" SET DATA TYPE "public"."enum_posts_blocks_latest_posts_button_config_link_uui_color" USING "button_config_link_uui_color"::"public"."enum_posts_blocks_latest_posts_button_config_link_uui_color";
  ALTER TABLE "posts_blocks_cta_links" ALTER COLUMN "link_uui_color" SET DATA TYPE text;
  ALTER TABLE "posts_blocks_cta_links" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum_posts_blocks_cta_links_link_uui_color";
  CREATE TYPE "public"."enum_posts_blocks_cta_links_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  ALTER TABLE "posts_blocks_cta_links" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::"public"."enum_posts_blocks_cta_links_link_uui_color";
  ALTER TABLE "posts_blocks_cta_links" ALTER COLUMN "link_uui_color" SET DATA TYPE "public"."enum_posts_blocks_cta_links_link_uui_color" USING "link_uui_color"::"public"."enum_posts_blocks_cta_links_link_uui_color";
  ALTER TABLE "_posts_v_blocks_latest_posts" ALTER COLUMN "button_config_link_uui_color" SET DATA TYPE text;
  ALTER TABLE "_posts_v_blocks_latest_posts" ALTER COLUMN "button_config_link_uui_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum__posts_v_blocks_latest_posts_button_config_link_uui_color";
  CREATE TYPE "public"."enum__posts_v_blocks_latest_posts_button_config_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  ALTER TABLE "_posts_v_blocks_latest_posts" ALTER COLUMN "button_config_link_uui_color" SET DEFAULT 'primary'::"public"."enum__posts_v_blocks_latest_posts_button_config_link_uui_color";
  ALTER TABLE "_posts_v_blocks_latest_posts" ALTER COLUMN "button_config_link_uui_color" SET DATA TYPE "public"."enum__posts_v_blocks_latest_posts_button_config_link_uui_color" USING "button_config_link_uui_color"::"public"."enum__posts_v_blocks_latest_posts_button_config_link_uui_color";
  ALTER TABLE "_posts_v_blocks_cta_links" ALTER COLUMN "link_uui_color" SET DATA TYPE text;
  ALTER TABLE "_posts_v_blocks_cta_links" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum__posts_v_blocks_cta_links_link_uui_color";
  CREATE TYPE "public"."enum__posts_v_blocks_cta_links_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  ALTER TABLE "_posts_v_blocks_cta_links" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::"public"."enum__posts_v_blocks_cta_links_link_uui_color";
  ALTER TABLE "_posts_v_blocks_cta_links" ALTER COLUMN "link_uui_color" SET DATA TYPE "public"."enum__posts_v_blocks_cta_links_link_uui_color" USING "link_uui_color"::"public"."enum__posts_v_blocks_cta_links_link_uui_color";
  ALTER TABLE "header" ALTER COLUMN "cta_button_link_uui_color" SET DATA TYPE text;
  ALTER TABLE "header" ALTER COLUMN "cta_button_link_uui_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum_header_cta_button_link_uui_color";
  CREATE TYPE "public"."enum_header_cta_button_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  ALTER TABLE "header" ALTER COLUMN "cta_button_link_uui_color" SET DEFAULT 'primary'::"public"."enum_header_cta_button_link_uui_color";
  ALTER TABLE "header" ALTER COLUMN "cta_button_link_uui_color" SET DATA TYPE "public"."enum_header_cta_button_link_uui_color" USING "cta_button_link_uui_color"::"public"."enum_header_cta_button_link_uui_color";
  ALTER TABLE "header" ALTER COLUMN "mobile_cta_button_link_uui_color" SET DATA TYPE text;
  ALTER TABLE "header" ALTER COLUMN "mobile_cta_button_link_uui_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum_header_mobile_cta_button_link_uui_color";
  CREATE TYPE "public"."enum_header_mobile_cta_button_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  ALTER TABLE "header" ALTER COLUMN "mobile_cta_button_link_uui_color" SET DEFAULT 'primary'::"public"."enum_header_mobile_cta_button_link_uui_color";
  ALTER TABLE "header" ALTER COLUMN "mobile_cta_button_link_uui_color" SET DATA TYPE "public"."enum_header_mobile_cta_button_link_uui_color" USING "mobile_cta_button_link_uui_color"::"public"."enum_header_mobile_cta_button_link_uui_color";
  ALTER TABLE "not_found" ALTER COLUMN "link_uui_color" SET DATA TYPE text;
  ALTER TABLE "not_found" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum_not_found_link_uui_color";
  CREATE TYPE "public"."enum_not_found_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  ALTER TABLE "not_found" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::"public"."enum_not_found_link_uui_color";
  ALTER TABLE "not_found" ALTER COLUMN "link_uui_color" SET DATA TYPE "public"."enum_not_found_link_uui_color" USING "link_uui_color"::"public"."enum_not_found_link_uui_color";
  ALTER TABLE "posts_settings_blocks_hero_heading_buttons" ALTER COLUMN "link_uui_color" SET DATA TYPE text;
  ALTER TABLE "posts_settings_blocks_hero_heading_buttons" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum_posts_settings_blocks_hero_heading_buttons_link_uui_color";
  CREATE TYPE "public"."enum_posts_settings_blocks_hero_heading_buttons_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary');
  ALTER TABLE "posts_settings_blocks_hero_heading_buttons" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::"public"."enum_posts_settings_blocks_hero_heading_buttons_link_uui_color";
  ALTER TABLE "posts_settings_blocks_hero_heading_buttons" ALTER COLUMN "link_uui_color" SET DATA TYPE "public"."enum_posts_settings_blocks_hero_heading_buttons_link_uui_color" USING "link_uui_color"::"public"."enum_posts_settings_blocks_hero_heading_buttons_link_uui_color";
  ALTER TABLE "posts_settings_blocks_hero_heading" ALTER COLUMN "headline_color" SET DATA TYPE text;
  ALTER TABLE "posts_settings_blocks_hero_heading" ALTER COLUMN "headline_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum_posts_settings_blocks_hero_heading_headline_color";
  CREATE TYPE "public"."enum_posts_settings_blocks_hero_heading_headline_color" AS ENUM('primary', 'brand');
  ALTER TABLE "posts_settings_blocks_hero_heading" ALTER COLUMN "headline_color" SET DEFAULT 'primary'::"public"."enum_posts_settings_blocks_hero_heading_headline_color";
  ALTER TABLE "posts_settings_blocks_hero_heading" ALTER COLUMN "headline_color" SET DATA TYPE "public"."enum_posts_settings_blocks_hero_heading_headline_color" USING "headline_color"::"public"."enum_posts_settings_blocks_hero_heading_headline_color";
  ALTER TABLE "posts_settings_blocks_hero_heading" ALTER COLUMN "hero_background" SET DATA TYPE text;
  ALTER TABLE "posts_settings_blocks_hero_heading" ALTER COLUMN "hero_background" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum_posts_settings_blocks_hero_heading_hero_background";
  CREATE TYPE "public"."enum_posts_settings_blocks_hero_heading_hero_background" AS ENUM('primary', 'secondary', 'accent');
  ALTER TABLE "posts_settings_blocks_hero_heading" ALTER COLUMN "hero_background" SET DEFAULT 'primary'::"public"."enum_posts_settings_blocks_hero_heading_hero_background";
  ALTER TABLE "posts_settings_blocks_hero_heading" ALTER COLUMN "hero_background" SET DATA TYPE "public"."enum_posts_settings_blocks_hero_heading_hero_background" USING "hero_background"::"public"."enum_posts_settings_blocks_hero_heading_hero_background";
  ALTER TABLE "posts_settings_blocks_cta_links" ALTER COLUMN "link_uui_color" SET DATA TYPE text;
  ALTER TABLE "posts_settings_blocks_cta_links" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum_posts_settings_blocks_cta_links_link_uui_color";
  CREATE TYPE "public"."enum_posts_settings_blocks_cta_links_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  ALTER TABLE "posts_settings_blocks_cta_links" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::"public"."enum_posts_settings_blocks_cta_links_link_uui_color";
  ALTER TABLE "posts_settings_blocks_cta_links" ALTER COLUMN "link_uui_color" SET DATA TYPE "public"."enum_posts_settings_blocks_cta_links_link_uui_color" USING "link_uui_color"::"public"."enum_posts_settings_blocks_cta_links_link_uui_color";
  ALTER TABLE "posts_settings_blocks_content_columns" ALTER COLUMN "link_uui_color" SET DATA TYPE text;
  ALTER TABLE "posts_settings_blocks_content_columns" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum_posts_settings_blocks_content_columns_link_uui_color";
  CREATE TYPE "public"."enum_posts_settings_blocks_content_columns_link_uui_color" AS ENUM('primary', 'accent', 'secondary', 'tertiary', 'link');
  ALTER TABLE "posts_settings_blocks_content_columns" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::"public"."enum_posts_settings_blocks_content_columns_link_uui_color";
  ALTER TABLE "posts_settings_blocks_content_columns" ALTER COLUMN "link_uui_color" SET DATA TYPE "public"."enum_posts_settings_blocks_content_columns_link_uui_color" USING "link_uui_color"::"public"."enum_posts_settings_blocks_content_columns_link_uui_color";
  ALTER TABLE "pages_blocks_hero_heading" ADD COLUMN "subheading_color" "enum_pages_blocks_hero_heading_subheading_color" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_hero_heading" ADD COLUMN "subheading_color" "enum__pages_v_blocks_hero_heading_subheading_color" DEFAULT 'default';
  ALTER TABLE "posts_settings_blocks_hero_heading" ADD COLUMN "subheading_color" "enum_posts_settings_blocks_hero_heading_subheading_color" DEFAULT 'default';
  DROP TYPE "public"."enum_pages_blocks_background_section_header_header_alignment";
  DROP TYPE "public"."enum_pages_blocks_background_section_header_text_color";
  DROP TYPE "public"."enum_pages_blocks_background_section_background_type";
  DROP TYPE "public"."enum_pages_blocks_background_section_solid_color";
  DROP TYPE "public"."enum_pages_blocks_background_section_gradient";
  DROP TYPE "public"."enum_pages_blocks_background_section_image_overlay";
  DROP TYPE "public"."enum_pages_blocks_background_section_image_position";
  DROP TYPE "public"."enum_pages_blocks_background_section_spacing";
  DROP TYPE "public"."enum_pages_blocks_background_section_content_width";
  DROP TYPE "public"."enum_pages_blocks_background_section_color_mode";
  DROP TYPE "public"."enum__pages_v_blocks_background_section_header_header_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_background_section_header_text_color";
  DROP TYPE "public"."enum__pages_v_blocks_background_section_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_background_section_solid_color";
  DROP TYPE "public"."enum__pages_v_blocks_background_section_gradient";
  DROP TYPE "public"."enum__pages_v_blocks_background_section_image_overlay";
  DROP TYPE "public"."enum__pages_v_blocks_background_section_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_background_section_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_background_section_content_width";
  DROP TYPE "public"."enum__pages_v_blocks_background_section_color_mode";`)
}
