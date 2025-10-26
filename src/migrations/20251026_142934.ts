import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_sitemap_changefreq" AS ENUM('always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never');
  CREATE TYPE "public"."enum__pages_v_version_sitemap_changefreq" AS ENUM('always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never');
  CREATE TYPE "public"."enum_posts_sitemap_changefreq" AS ENUM('always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never');
  CREATE TYPE "public"."enum__posts_v_version_sitemap_changefreq" AS ENUM('always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never');
  ALTER TABLE "pages" ALTER COLUMN "slug_lock" SET DEFAULT false;
  ALTER TABLE "_pages_v" ALTER COLUMN "version_slug_lock" SET DEFAULT false;
  ALTER TABLE "posts" ALTER COLUMN "slug_lock" SET DEFAULT false;
  ALTER TABLE "_posts_v" ALTER COLUMN "version_slug_lock" SET DEFAULT false;
  ALTER TABLE "pages" ADD COLUMN "exclude_from_sitemap" boolean DEFAULT false;
  ALTER TABLE "pages" ADD COLUMN "sitemap_priority" numeric;
  ALTER TABLE "pages" ADD COLUMN "sitemap_changefreq" "enum_pages_sitemap_changefreq";
  ALTER TABLE "_pages_v" ADD COLUMN "version_exclude_from_sitemap" boolean DEFAULT false;
  ALTER TABLE "_pages_v" ADD COLUMN "version_sitemap_priority" numeric;
  ALTER TABLE "_pages_v" ADD COLUMN "version_sitemap_changefreq" "enum__pages_v_version_sitemap_changefreq";
  ALTER TABLE "posts" ADD COLUMN "exclude_from_sitemap" boolean DEFAULT false;
  ALTER TABLE "posts" ADD COLUMN "sitemap_priority" numeric;
  ALTER TABLE "posts" ADD COLUMN "sitemap_changefreq" "enum_posts_sitemap_changefreq";
  ALTER TABLE "_posts_v" ADD COLUMN "version_exclude_from_sitemap" boolean DEFAULT false;
  ALTER TABLE "_posts_v" ADD COLUMN "version_sitemap_priority" numeric;
  ALTER TABLE "_posts_v" ADD COLUMN "version_sitemap_changefreq" "enum__posts_v_version_sitemap_changefreq";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" ALTER COLUMN "slug_lock" SET DEFAULT true;
  ALTER TABLE "_pages_v" ALTER COLUMN "version_slug_lock" SET DEFAULT true;
  ALTER TABLE "posts" ALTER COLUMN "slug_lock" SET DEFAULT true;
  ALTER TABLE "_posts_v" ALTER COLUMN "version_slug_lock" SET DEFAULT true;
  ALTER TABLE "pages" DROP COLUMN "exclude_from_sitemap";
  ALTER TABLE "pages" DROP COLUMN "sitemap_priority";
  ALTER TABLE "pages" DROP COLUMN "sitemap_changefreq";
  ALTER TABLE "_pages_v" DROP COLUMN "version_exclude_from_sitemap";
  ALTER TABLE "_pages_v" DROP COLUMN "version_sitemap_priority";
  ALTER TABLE "_pages_v" DROP COLUMN "version_sitemap_changefreq";
  ALTER TABLE "posts" DROP COLUMN "exclude_from_sitemap";
  ALTER TABLE "posts" DROP COLUMN "sitemap_priority";
  ALTER TABLE "posts" DROP COLUMN "sitemap_changefreq";
  ALTER TABLE "_posts_v" DROP COLUMN "version_exclude_from_sitemap";
  ALTER TABLE "_posts_v" DROP COLUMN "version_sitemap_priority";
  ALTER TABLE "_posts_v" DROP COLUMN "version_sitemap_changefreq";
  DROP TYPE "public"."enum_pages_sitemap_changefreq";
  DROP TYPE "public"."enum__pages_v_version_sitemap_changefreq";
  DROP TYPE "public"."enum_posts_sitemap_changefreq";
  DROP TYPE "public"."enum__posts_v_version_sitemap_changefreq";`)
}
