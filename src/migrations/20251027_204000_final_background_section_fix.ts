import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Drop existing tables if they exist (they might be partial/incorrect from failed migrations)
  // This ensures we start fresh with the correct schema
  await db.execute(sql`
    DROP TABLE IF EXISTS "pages_blocks_background_section_content_blocks" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_background_section_content_blocks" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_background_section" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_background_section" CASCADE;
  `);

  // Create enum types if they don't exist
  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_pages_blocks_background_section_header_header_alignment') THEN
        CREATE TYPE "public"."enum_pages_blocks_background_section_header_header_alignment" AS ENUM('left', 'center');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_pages_blocks_background_section_header_text_color') THEN
        CREATE TYPE "public"."enum_pages_blocks_background_section_header_text_color" AS ENUM('auto', 'light', 'dark');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_pages_blocks_background_section_background_type') THEN
        CREATE TYPE "public"."enum_pages_blocks_background_section_background_type" AS ENUM('none', 'solid', 'gradient', 'image', 'custom');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_pages_blocks_background_section_solid_color') THEN
        CREATE TYPE "public"."enum_pages_blocks_background_section_solid_color" AS ENUM('primary', 'primary-reversed', 'secondary', 'tertiary', 'accent', 'white', 'dark');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_pages_blocks_background_section_gradient') THEN
        CREATE TYPE "public"."enum_pages_blocks_background_section_gradient" AS ENUM('brand-radial', 'accent-gradient', 'dark-light', 'sunrise', 'ocean', 'purple-haze');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_pages_blocks_background_section_image_overlay') THEN
        CREATE TYPE "public"."enum_pages_blocks_background_section_image_overlay" AS ENUM('none', 'light-20', 'light-40', 'light-60', 'dark-20', 'dark-40', 'dark-60', 'dark-80', 'brand-40', 'brand-60');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_pages_blocks_background_section_image_position') THEN
        CREATE TYPE "public"."enum_pages_blocks_background_section_image_position" AS ENUM('center', 'top', 'bottom', 'left', 'right');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_pages_blocks_background_section_spacing') THEN
        CREATE TYPE "public"."enum_pages_blocks_background_section_spacing" AS ENUM('none', 'compact', 'normal', 'spacious', 'extra');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_pages_blocks_background_section_content_width') THEN
        CREATE TYPE "public"."enum_pages_blocks_background_section_content_width" AS ENUM('container', 'wide', 'full');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_pages_blocks_background_section_color_mode') THEN
        CREATE TYPE "public"."enum_pages_blocks_background_section_color_mode" AS ENUM('auto', 'light', 'dark');
      END IF;
      -- Version table enums
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__pages_v_blocks_background_section_header_header_alignment') THEN
        CREATE TYPE "public"."enum__pages_v_blocks_background_section_header_header_alignment" AS ENUM('left', 'center');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__pages_v_blocks_background_section_header_text_color') THEN
        CREATE TYPE "public"."enum__pages_v_blocks_background_section_header_text_color" AS ENUM('auto', 'light', 'dark');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__pages_v_blocks_background_section_background_type') THEN
        CREATE TYPE "public"."enum__pages_v_blocks_background_section_background_type" AS ENUM('none', 'solid', 'gradient', 'image', 'custom');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__pages_v_blocks_background_section_solid_color') THEN
        CREATE TYPE "public"."enum__pages_v_blocks_background_section_solid_color" AS ENUM('primary', 'primary-reversed', 'secondary', 'tertiary', 'accent', 'white', 'dark');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__pages_v_blocks_background_section_gradient') THEN
        CREATE TYPE "public"."enum__pages_v_blocks_background_section_gradient" AS ENUM('brand-radial', 'accent-gradient', 'dark-light', 'sunrise', 'ocean', 'purple-haze');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__pages_v_blocks_background_section_image_overlay') THEN
        CREATE TYPE "public"."enum__pages_v_blocks_background_section_image_overlay" AS ENUM('none', 'light-20', 'light-40', 'light-60', 'dark-20', 'dark-40', 'dark-60', 'dark-80', 'brand-40', 'brand-60');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__pages_v_blocks_background_section_image_position') THEN
        CREATE TYPE "public"."enum__pages_v_blocks_background_section_image_position" AS ENUM('center', 'top', 'bottom', 'left', 'right');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__pages_v_blocks_background_section_spacing') THEN
        CREATE TYPE "public"."enum__pages_v_blocks_background_section_spacing" AS ENUM('none', 'compact', 'normal', 'spacious', 'extra');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__pages_v_blocks_background_section_content_width') THEN
        CREATE TYPE "public"."enum__pages_v_blocks_background_section_content_width" AS ENUM('container', 'wide', 'full');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__pages_v_blocks_background_section_color_mode') THEN
        CREATE TYPE "public"."enum__pages_v_blocks_background_section_color_mode" AS ENUM('auto', 'light', 'dark');
      END IF;
    END
    $$;
  `);

  // Create tables with CORRECT column names based on the config structure
  // Break into smaller execute statements to avoid query truncation

  // Create first table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_background_section_content_blocks" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_type" text
    );
  `);

  // Create second table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_background_section_content_blocks" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_uuid" varchar,
      "block_type" text
    );
  `);

  // Create main table with ALL required columns including background_image_id
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_background_section" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "header_show_header" boolean DEFAULT false,
      "header_eyebrow" varchar,
      "header_heading" varchar,
      "header_description" varchar,
      "header_header_alignment" "public"."enum_pages_blocks_background_section_header_header_alignment" DEFAULT 'left',
      "header_text_color" "public"."enum_pages_blocks_background_section_header_text_color" DEFAULT 'auto',
      "background_type" "public"."enum_pages_blocks_background_section_background_type" DEFAULT 'none',
      "solid_color" "public"."enum_pages_blocks_background_section_solid_color" DEFAULT 'primary',
      "gradient" "public"."enum_pages_blocks_background_section_gradient" DEFAULT 'brand-radial',
      "background_image_id" integer,
      "image_overlay" "public"."enum_pages_blocks_background_section_image_overlay" DEFAULT 'none',
      "image_position" "public"."enum_pages_blocks_background_section_image_position" DEFAULT 'center',
      "enable_parallax" boolean DEFAULT false,
      "custom_class_name" varchar,
      "spacing" "public"."enum_pages_blocks_background_section_spacing" DEFAULT 'normal',
      "content_width" "public"."enum_pages_blocks_background_section_content_width" DEFAULT 'container',
      "color_mode" "public"."enum_pages_blocks_background_section_color_mode" DEFAULT 'auto',
      "animation_enabled" boolean DEFAULT false,
      "animation_config_type" varchar DEFAULT 'subtle',
      "animation_config_speed" numeric DEFAULT 1,
      "animation_config_intensity" numeric DEFAULT 0.5,
      "block_name" varchar
    );
  `);

  // Create version table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_background_section" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "header_show_header" boolean DEFAULT false,
      "header_eyebrow" varchar,
      "header_heading" varchar,
      "header_description" varchar,
      "header_header_alignment" "public"."enum__pages_v_blocks_background_section_header_header_alignment" DEFAULT 'left',
      "header_text_color" "public"."enum__pages_v_blocks_background_section_header_text_color" DEFAULT 'auto',
      "background_type" "public"."enum__pages_v_blocks_background_section_background_type" DEFAULT 'none',
      "solid_color" "public"."enum__pages_v_blocks_background_section_solid_color" DEFAULT 'primary',
      "gradient" "public"."enum__pages_v_blocks_background_section_gradient" DEFAULT 'brand-radial',
      "background_image_id" integer,
      "image_overlay" "public"."enum__pages_v_blocks_background_section_image_overlay" DEFAULT 'none',
      "image_position" "public"."enum__pages_v_blocks_background_section_image_position" DEFAULT 'center',
      "enable_parallax" boolean DEFAULT false,
      "custom_class_name" varchar,
      "spacing" "public"."enum__pages_v_blocks_background_section_spacing" DEFAULT 'normal',
      "content_width" "public"."enum__pages_v_blocks_background_section_content_width" DEFAULT 'container',
      "color_mode" "public"."enum__pages_v_blocks_background_section_color_mode" DEFAULT 'auto',
      "animation_enabled" boolean DEFAULT false,
      "animation_config_type" varchar DEFAULT 'subtle',
      "animation_config_speed" numeric DEFAULT 1,
      "animation_config_intensity" numeric DEFAULT 0.5,
      "_uuid" varchar,
      "block_name" varchar
    );
  `);

  // Add foreign key constraints
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_background_section_content_blocks" ADD CONSTRAINT "pages_blocks_background_section_content_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_background_section"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `);

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_background_section_content_blocks" ADD CONSTRAINT "_pages_v_blocks_background_section_content_blocks_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_background_section"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `);

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_background_section" ADD CONSTRAINT "pages_blocks_background_section_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `);

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_background_section" ADD CONSTRAINT "pages_blocks_background_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `);

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_background_section" ADD CONSTRAINT "_pages_v_blocks_background_section_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `);

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_background_section" ADD CONSTRAINT "_pages_v_blocks_background_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `);

  // Create indexes - split into multiple statements
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "pages_blocks_background_section_content_blocks_order_idx" ON "pages_blocks_background_section_content_blocks" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_background_section_content_blocks_parent_id_idx" ON "pages_blocks_background_section_content_blocks" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_background_section_content_blocks_path_idx" ON "pages_blocks_background_section_content_blocks" USING btree ("_path");
  `);

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_background_section_content_blocks_order_idx" ON "_pages_v_blocks_background_section_content_blocks" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_background_section_content_blocks_parent_idx" ON "_pages_v_blocks_background_section_content_blocks" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_background_section_content_blocks_path_idx" ON "_pages_v_blocks_background_section_content_blocks" USING btree ("_path");
  `);

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "pages_blocks_background_section_order_idx" ON "pages_blocks_background_section" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_background_section_parent_id_idx" ON "pages_blocks_background_section" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_background_section_path_idx" ON "pages_blocks_background_section" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_background_section_background_image_idx" ON "pages_blocks_background_section" USING btree ("background_image_id");
  `);

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_background_section_order_idx" ON "_pages_v_blocks_background_section" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_background_section_parent_id_idx" ON "_pages_v_blocks_background_section" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_background_section_path_idx" ON "_pages_v_blocks_background_section" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_background_section_background_image_idx" ON "_pages_v_blocks_background_section" USING btree ("background_image_id");
  `);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE IF EXISTS "pages_blocks_background_section_content_blocks" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_background_section_content_blocks" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_background_section" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_background_section" CASCADE;
  DROP TYPE IF EXISTS "public"."enum_pages_blocks_background_section_header_header_alignment" CASCADE;
  DROP TYPE IF EXISTS "public"."enum_pages_blocks_background_section_header_text_color" CASCADE;
  DROP TYPE IF EXISTS "public"."enum_pages_blocks_background_section_background_type" CASCADE;
  DROP TYPE IF EXISTS "public"."enum_pages_blocks_background_section_solid_color" CASCADE;
  DROP TYPE IF EXISTS "public"."enum_pages_blocks_background_section_gradient" CASCADE;
  DROP TYPE IF EXISTS "public"."enum_pages_blocks_background_section_image_overlay" CASCADE;
  DROP TYPE IF EXISTS "public"."enum_pages_blocks_background_section_image_position" CASCADE;
  DROP TYPE IF EXISTS "public"."enum_pages_blocks_background_section_spacing" CASCADE;
  DROP TYPE IF EXISTS "public"."enum_pages_blocks_background_section_content_width" CASCADE;
  DROP TYPE IF EXISTS "public"."enum_pages_blocks_background_section_color_mode" CASCADE;
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_background_section_header_header_alignment" CASCADE;
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_background_section_header_text_color" CASCADE;
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_background_section_background_type" CASCADE;
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_background_section_solid_color" CASCADE;
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_background_section_gradient" CASCADE;
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_background_section_image_overlay" CASCADE;
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_background_section_image_position" CASCADE;
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_background_section_spacing" CASCADE;
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_background_section_content_width" CASCADE;
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_background_section_color_mode" CASCADE;`);
}