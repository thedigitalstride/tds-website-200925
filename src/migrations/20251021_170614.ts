import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "footer_nav_columns_items" ALTER COLUMN "link_uui_color" SET DATA TYPE text;
  ALTER TABLE "footer_nav_columns_items" ALTER COLUMN "link_uui_color" SET DEFAULT 'link'::text;
  DROP TYPE "public"."enum_footer_nav_columns_items_link_uui_color";
  CREATE TYPE "public"."enum_footer_nav_columns_items_link_uui_color" AS ENUM('link');
  ALTER TABLE "footer_nav_columns_items" ALTER COLUMN "link_uui_color" SET DEFAULT 'link'::"public"."enum_footer_nav_columns_items_link_uui_color";
  ALTER TABLE "footer_nav_columns_items" ALTER COLUMN "link_uui_color" SET DATA TYPE "public"."enum_footer_nav_columns_items_link_uui_color" USING "link_uui_color"::"public"."enum_footer_nav_columns_items_link_uui_color";
  ALTER TABLE "footer_nav_columns_items" ALTER COLUMN "link_uui_size" SET DEFAULT 'md';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_footer_nav_columns_items_link_uui_color" ADD VALUE 'primary' BEFORE 'link';
  ALTER TYPE "public"."enum_footer_nav_columns_items_link_uui_color" ADD VALUE 'accent' BEFORE 'link';
  ALTER TYPE "public"."enum_footer_nav_columns_items_link_uui_color" ADD VALUE 'secondary' BEFORE 'link';
  ALTER TYPE "public"."enum_footer_nav_columns_items_link_uui_color" ADD VALUE 'tertiary' BEFORE 'link';
  ALTER TABLE "footer_nav_columns_items" ALTER COLUMN "link_uui_size" SET DEFAULT 'lg';`)
}
