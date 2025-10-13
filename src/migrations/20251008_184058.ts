import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_heading_headline_color" AS ENUM('primary', 'brand');
  CREATE TYPE "public"."enum_pages_blocks_hero_heading_subheading_color" AS ENUM('default', 'white');
  CREATE TYPE "public"."enum_pages_blocks_hero_heading_text_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_hero_heading_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_hero_heading_subtitle_size" AS ENUM('small', 'normal');
  CREATE TYPE "public"."enum_pages_blocks_hero_heading_bg_height_variant" AS ENUM('default', 'fullHeight');
  CREATE TYPE "public"."enum_pages_header_color_light_mode" AS ENUM('auto', 'dark', 'light');
  CREATE TYPE "public"."enum_pages_header_color_dark_mode" AS ENUM('auto', 'dark', 'light');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_heading_headline_color" AS ENUM('primary', 'brand');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_heading_subheading_color" AS ENUM('default', 'white');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_heading_text_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_heading_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_heading_subtitle_size" AS ENUM('small', 'normal');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_heading_bg_height_variant" AS ENUM('default', 'fullHeight');
  CREATE TYPE "public"."enum__pages_v_version_header_color_light_mode" AS ENUM('auto', 'dark', 'light');
  CREATE TYPE "public"."enum__pages_v_version_header_color_dark_mode" AS ENUM('auto', 'dark', 'light');
  ALTER TABLE "pages_blocks_hero_heading" ADD COLUMN "headline_color" "enum_pages_blocks_hero_heading_headline_color" DEFAULT 'primary';
  ALTER TABLE "pages_blocks_hero_heading" ADD COLUMN "subheading_color" "enum_pages_blocks_hero_heading_subheading_color" DEFAULT 'default';
  ALTER TABLE "pages_blocks_hero_heading" ADD COLUMN "text_alignment" "enum_pages_blocks_hero_heading_text_alignment" DEFAULT 'left';
  ALTER TABLE "pages_blocks_hero_heading" ADD COLUMN "spacing" "enum_pages_blocks_hero_heading_spacing" DEFAULT 'normal';
  ALTER TABLE "pages_blocks_hero_heading" ADD COLUMN "subtitle_size" "enum_pages_blocks_hero_heading_subtitle_size" DEFAULT 'normal';
  ALTER TABLE "pages_blocks_hero_heading" ADD COLUMN "bg_enabled" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_hero_heading" ADD COLUMN "bg_height_variant" "enum_pages_blocks_hero_heading_bg_height_variant" DEFAULT 'default';
  ALTER TABLE "pages" ADD COLUMN "header_color_light_mode" "enum_pages_header_color_light_mode" DEFAULT 'auto';
  ALTER TABLE "pages" ADD COLUMN "header_color_dark_mode" "enum_pages_header_color_dark_mode" DEFAULT 'auto';
  ALTER TABLE "_pages_v_blocks_hero_heading" ADD COLUMN "headline_color" "enum__pages_v_blocks_hero_heading_headline_color" DEFAULT 'primary';
  ALTER TABLE "_pages_v_blocks_hero_heading" ADD COLUMN "subheading_color" "enum__pages_v_blocks_hero_heading_subheading_color" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_hero_heading" ADD COLUMN "text_alignment" "enum__pages_v_blocks_hero_heading_text_alignment" DEFAULT 'left';
  ALTER TABLE "_pages_v_blocks_hero_heading" ADD COLUMN "spacing" "enum__pages_v_blocks_hero_heading_spacing" DEFAULT 'normal';
  ALTER TABLE "_pages_v_blocks_hero_heading" ADD COLUMN "subtitle_size" "enum__pages_v_blocks_hero_heading_subtitle_size" DEFAULT 'normal';
  ALTER TABLE "_pages_v_blocks_hero_heading" ADD COLUMN "bg_enabled" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_hero_heading" ADD COLUMN "bg_height_variant" "enum__pages_v_blocks_hero_heading_bg_height_variant" DEFAULT 'default';
  ALTER TABLE "_pages_v" ADD COLUMN "version_header_color_light_mode" "enum__pages_v_version_header_color_light_mode" DEFAULT 'auto';
  ALTER TABLE "_pages_v" ADD COLUMN "version_header_color_dark_mode" "enum__pages_v_version_header_color_dark_mode" DEFAULT 'auto';
  ALTER TABLE "pages_blocks_hero_heading" DROP COLUMN "full_height";
  ALTER TABLE "pages_blocks_hero_heading" DROP COLUMN "layout_options_headline_color";
  ALTER TABLE "pages_blocks_hero_heading" DROP COLUMN "layout_options_text_alignment";
  ALTER TABLE "pages_blocks_hero_heading" DROP COLUMN "layout_options_spacing";
  ALTER TABLE "pages_blocks_hero_heading" DROP COLUMN "layout_options_subtitle_size";
  ALTER TABLE "_pages_v_blocks_hero_heading" DROP COLUMN "full_height";
  ALTER TABLE "_pages_v_blocks_hero_heading" DROP COLUMN "layout_options_headline_color";
  ALTER TABLE "_pages_v_blocks_hero_heading" DROP COLUMN "layout_options_text_alignment";
  ALTER TABLE "_pages_v_blocks_hero_heading" DROP COLUMN "layout_options_spacing";
  ALTER TABLE "_pages_v_blocks_hero_heading" DROP COLUMN "layout_options_subtitle_size";
  DROP TYPE "public"."enum_pages_blocks_hero_heading_layout_options_headline_color";
  DROP TYPE "public"."enum_pages_blocks_hero_heading_layout_options_text_alignment";
  DROP TYPE "public"."enum_pages_blocks_hero_heading_layout_options_spacing";
  DROP TYPE "public"."enum_pages_blocks_hero_heading_layout_options_subtitle_size";
  DROP TYPE "public"."enum__pages_v_blocks_hero_heading_layout_options_headline_color";
  DROP TYPE "public"."enum__pages_v_blocks_hero_heading_layout_options_text_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_hero_heading_layout_options_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_hero_heading_layout_options_subtitle_size";`)
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_heading_layout_options_headline_color" AS ENUM('primary', 'brand');
  CREATE TYPE "public"."enum_pages_blocks_hero_heading_layout_options_text_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_hero_heading_layout_options_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_hero_heading_layout_options_subtitle_size" AS ENUM('small', 'normal');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_heading_layout_options_headline_color" AS ENUM('primary', 'brand');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_heading_layout_options_text_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_heading_layout_options_spacing" AS ENUM('compact', 'normal', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_heading_layout_options_subtitle_size" AS ENUM('small', 'normal');
  ALTER TABLE "pages_blocks_hero_heading" ADD COLUMN "full_height" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_hero_heading" ADD COLUMN "layout_options_headline_color" "enum_pages_blocks_hero_heading_layout_options_headline_color" DEFAULT 'primary';
  ALTER TABLE "pages_blocks_hero_heading" ADD COLUMN "layout_options_text_alignment" "enum_pages_blocks_hero_heading_layout_options_text_alignment" DEFAULT 'left';
  ALTER TABLE "pages_blocks_hero_heading" ADD COLUMN "layout_options_spacing" "enum_pages_blocks_hero_heading_layout_options_spacing" DEFAULT 'normal';
  ALTER TABLE "pages_blocks_hero_heading" ADD COLUMN "layout_options_subtitle_size" "enum_pages_blocks_hero_heading_layout_options_subtitle_size" DEFAULT 'normal';
  ALTER TABLE "_pages_v_blocks_hero_heading" ADD COLUMN "full_height" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_hero_heading" ADD COLUMN "layout_options_headline_color" "enum__pages_v_blocks_hero_heading_layout_options_headline_color" DEFAULT 'primary';
  ALTER TABLE "_pages_v_blocks_hero_heading" ADD COLUMN "layout_options_text_alignment" "enum__pages_v_blocks_hero_heading_layout_options_text_alignment" DEFAULT 'left';
  ALTER TABLE "_pages_v_blocks_hero_heading" ADD COLUMN "layout_options_spacing" "enum__pages_v_blocks_hero_heading_layout_options_spacing" DEFAULT 'normal';
  ALTER TABLE "_pages_v_blocks_hero_heading" ADD COLUMN "layout_options_subtitle_size" "enum__pages_v_blocks_hero_heading_layout_options_subtitle_size" DEFAULT 'normal';
  ALTER TABLE "pages_blocks_hero_heading" DROP COLUMN "headline_color";
  ALTER TABLE "pages_blocks_hero_heading" DROP COLUMN "subheading_color";
  ALTER TABLE "pages_blocks_hero_heading" DROP COLUMN "text_alignment";
  ALTER TABLE "pages_blocks_hero_heading" DROP COLUMN "spacing";
  ALTER TABLE "pages_blocks_hero_heading" DROP COLUMN "subtitle_size";
  ALTER TABLE "pages_blocks_hero_heading" DROP COLUMN "bg_enabled";
  ALTER TABLE "pages_blocks_hero_heading" DROP COLUMN "bg_height_variant";
  ALTER TABLE "pages" DROP COLUMN "header_color_light_mode";
  ALTER TABLE "pages" DROP COLUMN "header_color_dark_mode";
  ALTER TABLE "_pages_v_blocks_hero_heading" DROP COLUMN "headline_color";
  ALTER TABLE "_pages_v_blocks_hero_heading" DROP COLUMN "subheading_color";
  ALTER TABLE "_pages_v_blocks_hero_heading" DROP COLUMN "text_alignment";
  ALTER TABLE "_pages_v_blocks_hero_heading" DROP COLUMN "spacing";
  ALTER TABLE "_pages_v_blocks_hero_heading" DROP COLUMN "subtitle_size";
  ALTER TABLE "_pages_v_blocks_hero_heading" DROP COLUMN "bg_enabled";
  ALTER TABLE "_pages_v_blocks_hero_heading" DROP COLUMN "bg_height_variant";
  ALTER TABLE "_pages_v" DROP COLUMN "version_header_color_light_mode";
  ALTER TABLE "_pages_v" DROP COLUMN "version_header_color_dark_mode";
  DROP TYPE "public"."enum_pages_blocks_hero_heading_headline_color";
  DROP TYPE "public"."enum_pages_blocks_hero_heading_subheading_color";
  DROP TYPE "public"."enum_pages_blocks_hero_heading_text_alignment";
  DROP TYPE "public"."enum_pages_blocks_hero_heading_spacing";
  DROP TYPE "public"."enum_pages_blocks_hero_heading_subtitle_size";
  DROP TYPE "public"."enum_pages_blocks_hero_heading_bg_height_variant";
  DROP TYPE "public"."enum_pages_header_color_light_mode";
  DROP TYPE "public"."enum_pages_header_color_dark_mode";
  DROP TYPE "public"."enum__pages_v_blocks_hero_heading_headline_color";
  DROP TYPE "public"."enum__pages_v_blocks_hero_heading_subheading_color";
  DROP TYPE "public"."enum__pages_v_blocks_hero_heading_text_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_hero_heading_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_hero_heading_subtitle_size";
  DROP TYPE "public"."enum__pages_v_blocks_hero_heading_bg_height_variant";
  DROP TYPE "public"."enum__pages_v_version_header_color_light_mode";
  DROP TYPE "public"."enum__pages_v_version_header_color_dark_mode";`)
}
