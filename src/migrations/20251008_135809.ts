import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_heading_bg_type" AS ENUM('none', 'gradient', 'image', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_hero_heading_bg_gradient" AS ENUM('brand-radial', 'accent-gradient', 'dark-light');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_heading_bg_type" AS ENUM('none', 'gradient', 'image', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_heading_bg_gradient" AS ENUM('brand-radial', 'accent-gradient', 'dark-light');
  ALTER TABLE "pages_blocks_hero_heading" ADD COLUMN "full_height" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_hero_heading" ADD COLUMN "bg_type" "enum_pages_blocks_hero_heading_bg_type" DEFAULT 'none';
  ALTER TABLE "pages_blocks_hero_heading" ADD COLUMN "bg_gradient" "enum_pages_blocks_hero_heading_bg_gradient" DEFAULT 'brand-radial';
  ALTER TABLE "pages_blocks_hero_heading" ADD COLUMN "bg_image_id" integer;
  ALTER TABLE "pages_blocks_hero_heading" ADD COLUMN "bg_image_opacity" numeric DEFAULT 40;
  ALTER TABLE "pages_blocks_hero_heading" ADD COLUMN "bg_custom_class" varchar;
  ALTER TABLE "_pages_v_blocks_hero_heading" ADD COLUMN "full_height" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_hero_heading" ADD COLUMN "bg_type" "enum__pages_v_blocks_hero_heading_bg_type" DEFAULT 'none';
  ALTER TABLE "_pages_v_blocks_hero_heading" ADD COLUMN "bg_gradient" "enum__pages_v_blocks_hero_heading_bg_gradient" DEFAULT 'brand-radial';
  ALTER TABLE "_pages_v_blocks_hero_heading" ADD COLUMN "bg_image_id" integer;
  ALTER TABLE "_pages_v_blocks_hero_heading" ADD COLUMN "bg_image_opacity" numeric DEFAULT 40;
  ALTER TABLE "_pages_v_blocks_hero_heading" ADD COLUMN "bg_custom_class" varchar;
  ALTER TABLE "pages_blocks_hero_heading" ADD CONSTRAINT "pages_blocks_hero_heading_bg_image_id_media_id_fk" FOREIGN KEY ("bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_heading" ADD CONSTRAINT "_pages_v_blocks_hero_heading_bg_image_id_media_id_fk" FOREIGN KEY ("bg_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_heading_bg_bg_image_idx" ON "pages_blocks_hero_heading" USING btree ("bg_image_id");
  CREATE INDEX "_pages_v_blocks_hero_heading_bg_bg_image_idx" ON "_pages_v_blocks_hero_heading" USING btree ("bg_image_id");`)
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_heading" DROP CONSTRAINT "pages_blocks_hero_heading_bg_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_hero_heading" DROP CONSTRAINT "_pages_v_blocks_hero_heading_bg_image_id_media_id_fk";
  
  DROP INDEX "pages_blocks_hero_heading_bg_bg_image_idx";
  DROP INDEX "_pages_v_blocks_hero_heading_bg_bg_image_idx";
  ALTER TABLE "pages_blocks_hero_heading" DROP COLUMN "full_height";
  ALTER TABLE "pages_blocks_hero_heading" DROP COLUMN "bg_type";
  ALTER TABLE "pages_blocks_hero_heading" DROP COLUMN "bg_gradient";
  ALTER TABLE "pages_blocks_hero_heading" DROP COLUMN "bg_image_id";
  ALTER TABLE "pages_blocks_hero_heading" DROP COLUMN "bg_image_opacity";
  ALTER TABLE "pages_blocks_hero_heading" DROP COLUMN "bg_custom_class";
  ALTER TABLE "_pages_v_blocks_hero_heading" DROP COLUMN "full_height";
  ALTER TABLE "_pages_v_blocks_hero_heading" DROP COLUMN "bg_type";
  ALTER TABLE "_pages_v_blocks_hero_heading" DROP COLUMN "bg_gradient";
  ALTER TABLE "_pages_v_blocks_hero_heading" DROP COLUMN "bg_image_id";
  ALTER TABLE "_pages_v_blocks_hero_heading" DROP COLUMN "bg_image_opacity";
  ALTER TABLE "_pages_v_blocks_hero_heading" DROP COLUMN "bg_custom_class";
  DROP TYPE "public"."enum_pages_blocks_hero_heading_bg_type";
  DROP TYPE "public"."enum_pages_blocks_hero_heading_bg_gradient";
  DROP TYPE "public"."enum__pages_v_blocks_hero_heading_bg_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_heading_bg_gradient";`)
}
