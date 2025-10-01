import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   -- Create enum types for spacing if they don't exist
  DO $$ BEGIN
    CREATE TYPE "public"."enum_pages_blocks_cta_spacing" AS ENUM('compact', 'normal', 'spacious');
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
    CREATE TYPE "public"."enum_pages_blocks_content_spacing" AS ENUM('compact', 'normal', 'spacious');
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
    CREATE TYPE "public"."enum_pages_blocks_archive_spacing" AS ENUM('compact', 'normal', 'spacious');
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
    CREATE TYPE "public"."enum__pages_v_blocks_cta_spacing" AS ENUM('compact', 'normal', 'spacious');
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
    CREATE TYPE "public"."enum__pages_v_blocks_content_spacing" AS ENUM('compact', 'normal', 'spacious');
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
    CREATE TYPE "public"."enum__pages_v_blocks_archive_spacing" AS ENUM('compact', 'normal', 'spacious');
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;

  -- Add spacing columns if they don't exist
  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'pages_blocks_cta' AND column_name = 'spacing') THEN
      ALTER TABLE "pages_blocks_cta" ADD COLUMN "spacing" "enum_pages_blocks_cta_spacing" DEFAULT 'normal';
    END IF;
  END $$;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'pages_blocks_content' AND column_name = 'spacing') THEN
      ALTER TABLE "pages_blocks_content" ADD COLUMN "spacing" "enum_pages_blocks_content_spacing" DEFAULT 'normal';
    END IF;
  END $$;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'pages_blocks_archive' AND column_name = 'spacing') THEN
      ALTER TABLE "pages_blocks_archive" ADD COLUMN "spacing" "enum_pages_blocks_archive_spacing" DEFAULT 'normal';
    END IF;
  END $$;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = '_pages_v_blocks_cta' AND column_name = 'spacing') THEN
      ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "spacing" "enum__pages_v_blocks_cta_spacing" DEFAULT 'normal';
    END IF;
  END $$;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = '_pages_v_blocks_content' AND column_name = 'spacing') THEN
      ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "spacing" "enum__pages_v_blocks_content_spacing" DEFAULT 'normal';
    END IF;
  END $$;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = '_pages_v_blocks_archive' AND column_name = 'spacing') THEN
      ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN "spacing" "enum__pages_v_blocks_archive_spacing" DEFAULT 'normal';
    END IF;
  END $$;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_cta" DROP COLUMN IF EXISTS "spacing";
  ALTER TABLE "pages_blocks_content" DROP COLUMN IF EXISTS "spacing";
  ALTER TABLE "pages_blocks_archive" DROP COLUMN IF EXISTS "spacing";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN IF EXISTS "spacing";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN IF EXISTS "spacing";
  ALTER TABLE "_pages_v_blocks_archive" DROP COLUMN IF EXISTS "spacing";

  DROP TYPE IF EXISTS "public"."enum_pages_blocks_cta_spacing";
  DROP TYPE IF EXISTS "public"."enum_pages_blocks_content_spacing";
  DROP TYPE IF EXISTS "public"."enum_pages_blocks_archive_spacing";
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_cta_spacing";
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_content_spacing";
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_archive_spacing";`)
}
