import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Update link_uui_color enum
  // Step 1: Convert column to text to allow data transformation
  await db.execute(sql`
    ALTER TABLE "footer_nav_columns_items" ALTER COLUMN "link_uui_color" SET DATA TYPE text;
  `)

  // Step 2: Transform old 'link-gray' values to 'link' (if any exist)
  await db.execute(sql`
    UPDATE "footer_nav_columns_items"
    SET "link_uui_color" = 'link'
    WHERE "link_uui_color" = 'link-gray';
  `)

  // Step 3: Drop old enum type and create new one
  await db.execute(sql`
    DROP TYPE IF EXISTS "public"."enum_footer_nav_columns_items_link_uui_color" CASCADE;
  `)

  await db.execute(sql`
    CREATE TYPE "public"."enum_footer_nav_columns_items_link_uui_color" AS ENUM('link');
  `)

  // Step 4: Convert column back to enum with new type
  await db.execute(sql`
    ALTER TABLE "footer_nav_columns_items"
      ALTER COLUMN "link_uui_color"
        SET DATA TYPE "public"."enum_footer_nav_columns_items_link_uui_color"
        USING "link_uui_color"::"public"."enum_footer_nav_columns_items_link_uui_color",
      ALTER COLUMN "link_uui_color" SET DEFAULT 'link';
  `)

  // Update link_uui_size enum to add sm, md, xl options
  // Note: In PostgreSQL, ALTER TYPE ADD VALUE cannot be executed inside a transaction block
  // with other statements that reference the enum. We need to add values first, then use them.

  // Check if 'sm' value exists, add if not
  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_enum
        WHERE enumlabel = 'sm'
        AND enumtypid = (
          SELECT oid FROM pg_type WHERE typname = 'enum_footer_nav_columns_items_link_uui_size'
        )
      ) THEN
        ALTER TYPE "public"."enum_footer_nav_columns_items_link_uui_size" ADD VALUE 'sm';
      END IF;
    END $$;
  `)

  // Check if 'md' value exists, add if not
  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_enum
        WHERE enumlabel = 'md'
        AND enumtypid = (
          SELECT oid FROM pg_type WHERE typname = 'enum_footer_nav_columns_items_link_uui_size'
        )
      ) THEN
        ALTER TYPE "public"."enum_footer_nav_columns_items_link_uui_size" ADD VALUE 'md';
      END IF;
    END $$;
  `)

  // Check if 'xl' value exists, add if not
  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_enum
        WHERE enumlabel = 'xl'
        AND enumtypid = (
          SELECT oid FROM pg_type WHERE typname = 'enum_footer_nav_columns_items_link_uui_size'
        )
      ) THEN
        ALTER TYPE "public"."enum_footer_nav_columns_items_link_uui_size" ADD VALUE 'xl';
      END IF;
    END $$;
  `)

  // Now we can safely change the default to 'md'
  await db.execute(sql`
    ALTER TABLE "footer_nav_columns_items" ALTER COLUMN "link_uui_size" SET DEFAULT 'md';
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_footer_nav_columns_items_link_uui_color" ADD VALUE 'primary' BEFORE 'link';
  ALTER TYPE "public"."enum_footer_nav_columns_items_link_uui_color" ADD VALUE 'accent' BEFORE 'link';
  ALTER TYPE "public"."enum_footer_nav_columns_items_link_uui_color" ADD VALUE 'secondary' BEFORE 'link';
  ALTER TYPE "public"."enum_footer_nav_columns_items_link_uui_color" ADD VALUE 'tertiary' BEFORE 'link';
  ALTER TABLE "footer_nav_columns_items" ALTER COLUMN "link_uui_size" SET DEFAULT 'lg';`)
}
