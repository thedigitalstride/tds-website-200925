import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   -- Convert icon column from enum to varchar to support all UntitledUI icons dynamically
  ALTER TABLE "header_nav_items_dropdown_items" ALTER COLUMN "icon" DROP DEFAULT;
  ALTER TABLE "header_nav_items_dropdown_items" ALTER COLUMN "icon" TYPE varchar USING "icon"::text;

  -- Drop the old enum since it's no longer needed
  DROP TYPE IF EXISTS "public"."enum_header_nav_items_dropdown_items_icon";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   -- Recreate the enum with original 14 icons
  CREATE TYPE "public"."enum_header_nav_items_dropdown_items_icon" AS ENUM('TrendUp01', 'Users01', 'SearchLg', 'Mail01', 'InfoCircle', 'Briefcase01', 'File01', 'BarChart01', 'Globe01', 'Settings01', 'Target01', 'Star01', 'Shield01', 'Code01');

  -- Convert icon column back to enum (values outside the enum will be set to NULL)
  ALTER TABLE "header_nav_items_dropdown_items" ALTER COLUMN "icon" TYPE "public"."enum_header_nav_items_dropdown_items_icon" USING
    CASE
      WHEN "icon" IN ('TrendUp01', 'Users01', 'SearchLg', 'Mail01', 'InfoCircle', 'Briefcase01', 'File01', 'BarChart01', 'Globe01', 'Settings01', 'Target01', 'Star01', 'Shield01', 'Code01')
      THEN "icon"::"public"."enum_header_nav_items_dropdown_items_icon"
      ELSE NULL
    END;`)
}