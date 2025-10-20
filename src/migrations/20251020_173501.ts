import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Create new enum types for hero_background if they don't exist
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_hero_heading_hero_background" AS ENUM('primary', 'secondary', 'accent');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_hero_heading_hero_background" AS ENUM('primary', 'secondary', 'accent');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `)

  // Add new enum value to hero_layout if it doesn't exist
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TYPE "public"."enum_pages_blocks_hero_heading_hero_layout" ADD VALUE IF NOT EXISTS 'standardContained';
    EXCEPTION
      WHEN others THEN null;
    END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TYPE "public"."enum__pages_v_blocks_hero_heading_hero_layout" ADD VALUE IF NOT EXISTS 'standardContained';
    EXCEPTION
      WHEN others THEN null;
    END $$;
  `)

  // Update features block enums - pages_blocks_features card_background
  // Step 1: Convert column to text to allow data transformation
  await db.execute(sql`
    ALTER TABLE "pages_blocks_features" ALTER COLUMN "layout_options_card_background" SET DATA TYPE text;
  `)

  // Step 2: Transform old enum values to new ones
  await db.execute(sql`
    UPDATE "pages_blocks_features"
    SET "layout_options_card_background" = CASE
      WHEN "layout_options_card_background" = 'brand' THEN 'primary'
      WHEN "layout_options_card_background" = 'grey' THEN 'secondary'
      WHEN "layout_options_card_background" = 'outline' THEN 'line'
      ELSE "layout_options_card_background"
    END
    WHERE "layout_options_card_background" IN ('brand', 'grey', 'outline');
  `)

  // Step 3: Drop old enum type and create new one
  await db.execute(sql`
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_features_layout_options_card_background" CASCADE;
  `)

  await db.execute(sql`
    CREATE TYPE "public"."enum_pages_blocks_features_layout_options_card_background" AS ENUM('primary', 'secondary', 'accent', 'line');
  `)

  // Step 4: Convert column back to enum with new type
  await db.execute(sql`
    ALTER TABLE "pages_blocks_features"
      ALTER COLUMN "layout_options_card_background" SET DATA TYPE "public"."enum_pages_blocks_features_layout_options_card_background"
      USING "layout_options_card_background"::"public"."enum_pages_blocks_features_layout_options_card_background",
      ALTER COLUMN "layout_options_card_background" SET DEFAULT 'primary';
  `)

  // Update features block enums - pages_blocks_features icon_color
  // Step 1: Convert column to text to allow data transformation
  await db.execute(sql`
    ALTER TABLE "pages_blocks_features" ALTER COLUMN "layout_options_icon_color" SET DATA TYPE text;
  `)

  // Step 2: Transform old enum values to new ones
  await db.execute(sql`
    UPDATE "pages_blocks_features"
    SET "layout_options_icon_color" = CASE
      WHEN "layout_options_icon_color" = 'brand' THEN 'primary'
      ELSE "layout_options_icon_color"
    END
    WHERE "layout_options_icon_color" = 'brand';
  `)

  // Step 3: Drop old enum type and create new one
  await db.execute(sql`
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_features_layout_options_icon_color" CASCADE;
  `)

  await db.execute(sql`
    CREATE TYPE "public"."enum_pages_blocks_features_layout_options_icon_color" AS ENUM('primary', 'secondary', 'tertiary', 'accent');
  `)

  // Step 4: Convert column back to enum with new type
  await db.execute(sql`
    ALTER TABLE "pages_blocks_features"
      ALTER COLUMN "layout_options_icon_color" SET DATA TYPE "public"."enum_pages_blocks_features_layout_options_icon_color"
      USING "layout_options_icon_color"::"public"."enum_pages_blocks_features_layout_options_icon_color",
      ALTER COLUMN "layout_options_icon_color" SET DEFAULT 'primary';
  `)

  // Update features block enums - _pages_v_blocks_features card_background
  // Step 1: Convert column to text to allow data transformation
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_features" ALTER COLUMN "layout_options_card_background" SET DATA TYPE text;
  `)

  // Step 2: Transform old enum values to new ones
  await db.execute(sql`
    UPDATE "_pages_v_blocks_features"
    SET "layout_options_card_background" = CASE
      WHEN "layout_options_card_background" = 'brand' THEN 'primary'
      WHEN "layout_options_card_background" = 'grey' THEN 'secondary'
      WHEN "layout_options_card_background" = 'outline' THEN 'line'
      ELSE "layout_options_card_background"
    END
    WHERE "layout_options_card_background" IN ('brand', 'grey', 'outline');
  `)

  // Step 3: Drop old enum type and create new one
  await db.execute(sql`
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_features_layout_options_card_background" CASCADE;
  `)

  await db.execute(sql`
    CREATE TYPE "public"."enum__pages_v_blocks_features_layout_options_card_background" AS ENUM('primary', 'secondary', 'accent', 'line');
  `)

  // Step 4: Convert column back to enum with new type
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_features"
      ALTER COLUMN "layout_options_card_background" SET DATA TYPE "public"."enum__pages_v_blocks_features_layout_options_card_background"
      USING "layout_options_card_background"::"public"."enum__pages_v_blocks_features_layout_options_card_background",
      ALTER COLUMN "layout_options_card_background" SET DEFAULT 'primary';
  `)

  // Update features block enums - _pages_v_blocks_features icon_color
  // Step 1: Convert column to text to allow data transformation
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_features" ALTER COLUMN "layout_options_icon_color" SET DATA TYPE text;
  `)

  // Step 2: Transform old enum values to new ones
  await db.execute(sql`
    UPDATE "_pages_v_blocks_features"
    SET "layout_options_icon_color" = CASE
      WHEN "layout_options_icon_color" = 'brand' THEN 'primary'
      ELSE "layout_options_icon_color"
    END
    WHERE "layout_options_icon_color" = 'brand';
  `)

  // Step 3: Drop old enum type and create new one
  await db.execute(sql`
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_features_layout_options_icon_color" CASCADE;
  `)

  await db.execute(sql`
    CREATE TYPE "public"."enum__pages_v_blocks_features_layout_options_icon_color" AS ENUM('primary', 'secondary', 'tertiary', 'accent');
  `)

  // Step 4: Convert column back to enum with new type
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_features"
      ALTER COLUMN "layout_options_icon_color" SET DATA TYPE "public"."enum__pages_v_blocks_features_layout_options_icon_color"
      USING "layout_options_icon_color"::"public"."enum__pages_v_blocks_features_layout_options_icon_color",
      ALTER COLUMN "layout_options_icon_color" SET DEFAULT 'primary';
  `)

  // Add new columns
  await db.execute(sql`
    ALTER TABLE "pages_blocks_hero_heading" ADD COLUMN IF NOT EXISTS "hero_background" "enum_pages_blocks_hero_heading_hero_background" DEFAULT 'primary';
  `)

  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_hero_heading" ADD COLUMN IF NOT EXISTS "hero_background" "enum__pages_v_blocks_hero_heading_hero_background" DEFAULT 'primary';
  `)

  // Drop columns if they exist
  await db.execute(sql`
    ALTER TABLE "pages_blocks_hero_heading" DROP COLUMN IF EXISTS "split_image_alt";
  `)

  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_hero_heading" DROP COLUMN IF EXISTS "split_image_alt";
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_heading" ALTER COLUMN "hero_layout" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_hero_heading" ALTER COLUMN "hero_layout" SET DEFAULT 'standard'::text;
  DROP TYPE "public"."enum_pages_blocks_hero_heading_hero_layout";
  CREATE TYPE "public"."enum_pages_blocks_hero_heading_hero_layout" AS ENUM('standard', 'splitImage');
  ALTER TABLE "pages_blocks_hero_heading" ALTER COLUMN "hero_layout" SET DEFAULT 'standard'::"public"."enum_pages_blocks_hero_heading_hero_layout";
  ALTER TABLE "pages_blocks_hero_heading" ALTER COLUMN "hero_layout" SET DATA TYPE "public"."enum_pages_blocks_hero_heading_hero_layout" USING "hero_layout"::"public"."enum_pages_blocks_hero_heading_hero_layout";
  ALTER TABLE "pages_blocks_features" ALTER COLUMN "layout_options_card_background" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_features" ALTER COLUMN "layout_options_card_background" SET DEFAULT 'brand'::text;
  DROP TYPE "public"."enum_pages_blocks_features_layout_options_card_background";
  CREATE TYPE "public"."enum_pages_blocks_features_layout_options_card_background" AS ENUM('brand', 'accent', 'outline', 'line', 'grey');
  ALTER TABLE "pages_blocks_features" ALTER COLUMN "layout_options_card_background" SET DEFAULT 'brand'::"public"."enum_pages_blocks_features_layout_options_card_background";
  ALTER TABLE "pages_blocks_features" ALTER COLUMN "layout_options_card_background" SET DATA TYPE "public"."enum_pages_blocks_features_layout_options_card_background" USING "layout_options_card_background"::"public"."enum_pages_blocks_features_layout_options_card_background";
  ALTER TABLE "pages_blocks_features" ALTER COLUMN "layout_options_icon_color" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_features" ALTER COLUMN "layout_options_icon_color" SET DEFAULT 'brand'::text;
  DROP TYPE "public"."enum_pages_blocks_features_layout_options_icon_color";
  CREATE TYPE "public"."enum_pages_blocks_features_layout_options_icon_color" AS ENUM('brand', 'accent', 'secondary', 'tertiary');
  ALTER TABLE "pages_blocks_features" ALTER COLUMN "layout_options_icon_color" SET DEFAULT 'brand'::"public"."enum_pages_blocks_features_layout_options_icon_color";
  ALTER TABLE "pages_blocks_features" ALTER COLUMN "layout_options_icon_color" SET DATA TYPE "public"."enum_pages_blocks_features_layout_options_icon_color" USING "layout_options_icon_color"::"public"."enum_pages_blocks_features_layout_options_icon_color";
  ALTER TABLE "_pages_v_blocks_hero_heading" ALTER COLUMN "hero_layout" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_hero_heading" ALTER COLUMN "hero_layout" SET DEFAULT 'standard'::text;
  DROP TYPE "public"."enum__pages_v_blocks_hero_heading_hero_layout";
  CREATE TYPE "public"."enum__pages_v_blocks_hero_heading_hero_layout" AS ENUM('standard', 'splitImage');
  ALTER TABLE "_pages_v_blocks_hero_heading" ALTER COLUMN "hero_layout" SET DEFAULT 'standard'::"public"."enum__pages_v_blocks_hero_heading_hero_layout";
  ALTER TABLE "_pages_v_blocks_hero_heading" ALTER COLUMN "hero_layout" SET DATA TYPE "public"."enum__pages_v_blocks_hero_heading_hero_layout" USING "hero_layout"::"public"."enum__pages_v_blocks_hero_heading_hero_layout";
  ALTER TABLE "_pages_v_blocks_features" ALTER COLUMN "layout_options_card_background" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_features" ALTER COLUMN "layout_options_card_background" SET DEFAULT 'brand'::text;
  DROP TYPE "public"."enum__pages_v_blocks_features_layout_options_card_background";
  CREATE TYPE "public"."enum__pages_v_blocks_features_layout_options_card_background" AS ENUM('brand', 'accent', 'outline', 'line', 'grey');
  ALTER TABLE "_pages_v_blocks_features" ALTER COLUMN "layout_options_card_background" SET DEFAULT 'brand'::"public"."enum__pages_v_blocks_features_layout_options_card_background";
  ALTER TABLE "_pages_v_blocks_features" ALTER COLUMN "layout_options_card_background" SET DATA TYPE "public"."enum__pages_v_blocks_features_layout_options_card_background" USING "layout_options_card_background"::"public"."enum__pages_v_blocks_features_layout_options_card_background";
  ALTER TABLE "_pages_v_blocks_features" ALTER COLUMN "layout_options_icon_color" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_features" ALTER COLUMN "layout_options_icon_color" SET DEFAULT 'brand'::text;
  DROP TYPE "public"."enum__pages_v_blocks_features_layout_options_icon_color";
  CREATE TYPE "public"."enum__pages_v_blocks_features_layout_options_icon_color" AS ENUM('brand', 'accent', 'secondary', 'tertiary');
  ALTER TABLE "_pages_v_blocks_features" ALTER COLUMN "layout_options_icon_color" SET DEFAULT 'brand'::"public"."enum__pages_v_blocks_features_layout_options_icon_color";
  ALTER TABLE "_pages_v_blocks_features" ALTER COLUMN "layout_options_icon_color" SET DATA TYPE "public"."enum__pages_v_blocks_features_layout_options_icon_color" USING "layout_options_icon_color"::"public"."enum__pages_v_blocks_features_layout_options_icon_color";
  ALTER TABLE "pages_blocks_hero_heading" ADD COLUMN "split_image_alt" varchar;
  ALTER TABLE "_pages_v_blocks_hero_heading" ADD COLUMN "split_image_alt" varchar;
  ALTER TABLE "pages_blocks_hero_heading" DROP COLUMN "hero_background";
  ALTER TABLE "_pages_v_blocks_hero_heading" DROP COLUMN "hero_background";
  DROP TYPE "public"."enum_pages_blocks_hero_heading_hero_background";
  DROP TYPE "public"."enum__pages_v_blocks_hero_heading_hero_background";`)
}
