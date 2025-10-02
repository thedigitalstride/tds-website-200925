import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "posts_populated_contributors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"nickname" varchar,
  	"avatar_id" integer
  );
  
  CREATE TABLE "_posts_v_version_populated_contributors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"name" varchar,
  	"nickname" varchar,
  	"avatar_id" integer
  );
  
  ALTER TABLE "posts_populated_authors" ADD COLUMN "avatar_id" integer;
  ALTER TABLE "_posts_v_version_populated_authors" ADD COLUMN "avatar_id" integer;
  ALTER TABLE "posts_populated_contributors" ADD CONSTRAINT "posts_populated_contributors_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_populated_contributors" ADD CONSTRAINT "posts_populated_contributors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_populated_contributors" ADD CONSTRAINT "_posts_v_version_populated_contributors_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_version_populated_contributors" ADD CONSTRAINT "_posts_v_version_populated_contributors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_populated_contributors_order_idx" ON "posts_populated_contributors" USING btree ("_order");
  CREATE INDEX "posts_populated_contributors_parent_id_idx" ON "posts_populated_contributors" USING btree ("_parent_id");
  CREATE INDEX "posts_populated_contributors_avatar_idx" ON "posts_populated_contributors" USING btree ("avatar_id");
  CREATE INDEX "_posts_v_version_populated_contributors_order_idx" ON "_posts_v_version_populated_contributors" USING btree ("_order");
  CREATE INDEX "_posts_v_version_populated_contributors_parent_id_idx" ON "_posts_v_version_populated_contributors" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_populated_contributors_avatar_idx" ON "_posts_v_version_populated_contributors" USING btree ("avatar_id");
  ALTER TABLE "posts_populated_authors" ADD CONSTRAINT "posts_populated_authors_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_version_populated_authors" ADD CONSTRAINT "_posts_v_version_populated_authors_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "posts_populated_authors_avatar_idx" ON "posts_populated_authors" USING btree ("avatar_id");
  CREATE INDEX "_posts_v_version_populated_authors_avatar_idx" ON "_posts_v_version_populated_authors" USING btree ("avatar_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts_populated_contributors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_version_populated_contributors" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "posts_populated_contributors" CASCADE;
  DROP TABLE "_posts_v_version_populated_contributors" CASCADE;
  ALTER TABLE "posts_populated_authors" DROP CONSTRAINT "posts_populated_authors_avatar_id_media_id_fk";
  
  ALTER TABLE "_posts_v_version_populated_authors" DROP CONSTRAINT "_posts_v_version_populated_authors_avatar_id_media_id_fk";
  
  DROP INDEX "posts_populated_authors_avatar_idx";
  DROP INDEX "_posts_v_version_populated_authors_avatar_idx";
  ALTER TABLE "posts_populated_authors" DROP COLUMN "avatar_id";
  ALTER TABLE "_posts_v_version_populated_authors" DROP COLUMN "avatar_id";`)
}
