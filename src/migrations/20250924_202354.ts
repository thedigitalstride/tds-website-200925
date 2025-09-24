import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_footer_nav_columns_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_nav_columns_items_link_uui_color" AS ENUM('link-gray');
  CREATE TYPE "public"."enum_footer_nav_columns_items_link_uui_size" AS ENUM('lg');
  CREATE TYPE "public"."enum_footer_nav_columns_items_badge_color" AS ENUM('gray');
  CREATE TYPE "public"."enum_footer_social_links_platform" AS ENUM('x', 'linkedin', 'facebook', 'github', 'angellist', 'dribbble', 'layers');
  CREATE TABLE "footer_nav_columns_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_nav_columns_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_uui_color" "enum_footer_nav_columns_items_link_uui_color" DEFAULT 'link-gray',
  	"link_uui_size" "enum_footer_nav_columns_items_link_uui_size" DEFAULT 'lg',
  	"badge_text" varchar,
  	"badge_color" "enum_footer_nav_columns_items_badge_color" DEFAULT 'gray'
  );
  
  CREATE TABLE "footer_nav_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_footer_social_links_platform" DEFAULT 'x',
  	"url" varchar
  );
  
  DROP TABLE "footer_nav_items" CASCADE;
  ALTER TABLE "footer" ADD COLUMN "company_info_description" varchar DEFAULT 'Happy Team, Happy Customers.';
  ALTER TABLE "footer" ADD COLUMN "copyright_text" varchar DEFAULT '© 2025 The Digital Stride, a trading name of Miromedia Limited. All rights reserved.';
  ALTER TABLE "footer_nav_columns_items" ADD CONSTRAINT "footer_nav_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_nav_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_nav_columns" ADD CONSTRAINT "footer_nav_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_social_links" ADD CONSTRAINT "footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "footer_nav_columns_items_order_idx" ON "footer_nav_columns_items" USING btree ("_order");
  CREATE INDEX "footer_nav_columns_items_parent_id_idx" ON "footer_nav_columns_items" USING btree ("_parent_id");
  CREATE INDEX "footer_nav_columns_order_idx" ON "footer_nav_columns" USING btree ("_order");
  CREATE INDEX "footer_nav_columns_parent_id_idx" ON "footer_nav_columns" USING btree ("_parent_id");
  CREATE INDEX "footer_social_links_order_idx" ON "footer_social_links" USING btree ("_order");
  CREATE INDEX "footer_social_links_parent_id_idx" ON "footer_social_links" USING btree ("_parent_id");
  DROP TYPE "public"."enum_footer_nav_items_link_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_footer_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE "footer_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  DROP TABLE "footer_nav_columns_items" CASCADE;
  DROP TABLE "footer_nav_columns" CASCADE;
  DROP TABLE "footer_social_links" CASCADE;
  ALTER TABLE "footer_nav_items" ADD CONSTRAINT "footer_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "footer_nav_items_order_idx" ON "footer_nav_items" USING btree ("_order");
  CREATE INDEX "footer_nav_items_parent_id_idx" ON "footer_nav_items" USING btree ("_parent_id");
  ALTER TABLE "footer" DROP COLUMN "company_info_description";
  ALTER TABLE "footer" DROP COLUMN "copyright_text";
  DROP TYPE "public"."enum_footer_nav_columns_items_link_type";
  DROP TYPE "public"."enum_footer_nav_columns_items_link_uui_color";
  DROP TYPE "public"."enum_footer_nav_columns_items_link_uui_size";
  DROP TYPE "public"."enum_footer_nav_columns_items_badge_color";
  DROP TYPE "public"."enum_footer_social_links_platform";`)
}
