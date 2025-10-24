import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_heading" ALTER COLUMN "spacing" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_hero_heading" ALTER COLUMN "spacing" SET DEFAULT 'normal'::text;
  DROP TYPE "public"."enum_pages_blocks_hero_heading_spacing";
  CREATE TYPE "public"."enum_pages_blocks_hero_heading_spacing" AS ENUM('spacious', 'normal', 'compact', 'minimal');
  ALTER TABLE "pages_blocks_hero_heading" ALTER COLUMN "spacing" SET DEFAULT 'normal'::"public"."enum_pages_blocks_hero_heading_spacing";
  ALTER TABLE "pages_blocks_hero_heading" ALTER COLUMN "spacing" SET DATA TYPE "public"."enum_pages_blocks_hero_heading_spacing" USING "spacing"::"public"."enum_pages_blocks_hero_heading_spacing";
  ALTER TABLE "_pages_v_blocks_hero_heading" ALTER COLUMN "spacing" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_hero_heading" ALTER COLUMN "spacing" SET DEFAULT 'normal'::text;
  DROP TYPE "public"."enum__pages_v_blocks_hero_heading_spacing";
  CREATE TYPE "public"."enum__pages_v_blocks_hero_heading_spacing" AS ENUM('spacious', 'normal', 'compact', 'minimal');
  ALTER TABLE "_pages_v_blocks_hero_heading" ALTER COLUMN "spacing" SET DEFAULT 'normal'::"public"."enum__pages_v_blocks_hero_heading_spacing";
  ALTER TABLE "_pages_v_blocks_hero_heading" ALTER COLUMN "spacing" SET DATA TYPE "public"."enum__pages_v_blocks_hero_heading_spacing" USING "spacing"::"public"."enum__pages_v_blocks_hero_heading_spacing";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_heading" ALTER COLUMN "spacing" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_hero_heading" ALTER COLUMN "spacing" SET DEFAULT 'normal'::text;
  DROP TYPE "public"."enum_pages_blocks_hero_heading_spacing";
  CREATE TYPE "public"."enum_pages_blocks_hero_heading_spacing" AS ENUM('compact', 'normal', 'spacious');
  ALTER TABLE "pages_blocks_hero_heading" ALTER COLUMN "spacing" SET DEFAULT 'normal'::"public"."enum_pages_blocks_hero_heading_spacing";
  ALTER TABLE "pages_blocks_hero_heading" ALTER COLUMN "spacing" SET DATA TYPE "public"."enum_pages_blocks_hero_heading_spacing" USING "spacing"::"public"."enum_pages_blocks_hero_heading_spacing";
  ALTER TABLE "_pages_v_blocks_hero_heading" ALTER COLUMN "spacing" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_hero_heading" ALTER COLUMN "spacing" SET DEFAULT 'normal'::text;
  DROP TYPE "public"."enum__pages_v_blocks_hero_heading_spacing";
  CREATE TYPE "public"."enum__pages_v_blocks_hero_heading_spacing" AS ENUM('compact', 'normal', 'spacious');
  ALTER TABLE "_pages_v_blocks_hero_heading" ALTER COLUMN "spacing" SET DEFAULT 'normal'::"public"."enum__pages_v_blocks_hero_heading_spacing";
  ALTER TABLE "_pages_v_blocks_hero_heading" ALTER COLUMN "spacing" SET DATA TYPE "public"."enum__pages_v_blocks_hero_heading_spacing" USING "spacing"::"public"."enum__pages_v_blocks_hero_heading_spacing";`)
}
