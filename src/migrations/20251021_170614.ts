import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
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

  // Step 4: Convert column back to enum with new type and update defaults
  await db.execute(sql`
    ALTER TABLE "footer_nav_columns_items"
      ALTER COLUMN "link_uui_color"
        SET DATA TYPE "public"."enum_footer_nav_columns_items_link_uui_color"
        USING "link_uui_color"::"public"."enum_footer_nav_columns_items_link_uui_color",
      ALTER COLUMN "link_uui_color" SET DEFAULT 'link',
      ALTER COLUMN "link_uui_size" SET DEFAULT 'md';
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
