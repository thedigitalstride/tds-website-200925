import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_heading_layout_options_subtitle_size" AS ENUM('small', 'normal');
  CREATE TYPE "public"."enum_pages_blocks_features_header_header_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_heading_layout_options_subtitle_size" AS ENUM('small', 'normal');
  CREATE TYPE "public"."enum__pages_v_blocks_features_header_header_alignment" AS ENUM('left', 'center');
  ALTER TABLE "pages_blocks_hero_heading" ADD COLUMN "layout_options_subtitle_size" "enum_pages_blocks_hero_heading_layout_options_subtitle_size" DEFAULT 'normal';
  ALTER TABLE "pages_blocks_features" ADD COLUMN "header_header_alignment" "enum_pages_blocks_features_header_header_alignment" DEFAULT 'left';
  ALTER TABLE "_pages_v_blocks_hero_heading" ADD COLUMN "layout_options_subtitle_size" "enum__pages_v_blocks_hero_heading_layout_options_subtitle_size" DEFAULT 'normal';
  ALTER TABLE "_pages_v_blocks_features" ADD COLUMN "header_header_alignment" "enum__pages_v_blocks_features_header_header_alignment" DEFAULT 'left';`)
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_heading" DROP COLUMN "layout_options_subtitle_size";
  ALTER TABLE "pages_blocks_features" DROP COLUMN "header_header_alignment";
  ALTER TABLE "_pages_v_blocks_hero_heading" DROP COLUMN "layout_options_subtitle_size";
  ALTER TABLE "_pages_v_blocks_features" DROP COLUMN "header_header_alignment";
  DROP TYPE "public"."enum_pages_blocks_hero_heading_layout_options_subtitle_size";
  DROP TYPE "public"."enum_pages_blocks_features_header_header_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_hero_heading_layout_options_subtitle_size";
  DROP TYPE "public"."enum__pages_v_blocks_features_header_header_alignment";`)
}
