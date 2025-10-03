import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_not_found_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_not_found_link_uui_color" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_not_found_link_uui_size" AS ENUM('md', 'lg');
  CREATE TYPE "public"."enum_not_found_link_icon_pos" AS ENUM('leading', 'trailing');
  ALTER TYPE "public"."enum_pages_blocks_button_block_buttons_link_uui_color" ADD VALUE 'accent' BEFORE 'secondary';
  ALTER TYPE "public"."enum_pages_blocks_button_block_buttons_link_uui_color" ADD VALUE 'link' BEFORE 'link-gray';
  ALTER TYPE "public"."enum__pages_v_blocks_button_block_buttons_link_uui_color" ADD VALUE 'accent' BEFORE 'secondary';
  ALTER TYPE "public"."enum__pages_v_blocks_button_block_buttons_link_uui_color" ADD VALUE 'link' BEFORE 'link-gray';
  CREATE TABLE "not_found" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT '404' NOT NULL,
  	"subheading" varchar DEFAULT 'This page could not be found.',
  	"link_type" "enum_not_found_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_uui_color" "enum_not_found_link_uui_color" DEFAULT 'primary',
  	"link_uui_size" "enum_not_found_link_uui_size" DEFAULT 'md',
  	"link_button_icon" varchar,
  	"link_icon_pos" "enum_not_found_link_icon_pos" DEFAULT 'trailing',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "not_found_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  ALTER TABLE "not_found_rels" ADD CONSTRAINT "not_found_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."not_found"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "not_found_rels" ADD CONSTRAINT "not_found_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "not_found_rels" ADD CONSTRAINT "not_found_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "not_found_rels_order_idx" ON "not_found_rels" USING btree ("order");
  CREATE INDEX "not_found_rels_parent_idx" ON "not_found_rels" USING btree ("parent_id");
  CREATE INDEX "not_found_rels_path_idx" ON "not_found_rels" USING btree ("path");
  CREATE INDEX "not_found_rels_pages_id_idx" ON "not_found_rels" USING btree ("pages_id");
  CREATE INDEX "not_found_rels_posts_id_idx" ON "not_found_rels" USING btree ("posts_id");
  ALTER TABLE "pages_blocks_button_block_buttons" DROP COLUMN "icon";
  ALTER TABLE "pages_blocks_button_block_buttons" DROP COLUMN "icon_position";
  ALTER TABLE "_pages_v_blocks_button_block_buttons" DROP COLUMN "icon";
  ALTER TABLE "_pages_v_blocks_button_block_buttons" DROP COLUMN "icon_position";
  DROP TYPE "public"."enum_pages_blocks_button_block_buttons_icon_position";
  DROP TYPE "public"."enum__pages_v_blocks_button_block_buttons_icon_position";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_button_block_buttons_icon_position" AS ENUM('leading', 'trailing');
  CREATE TYPE "public"."enum__pages_v_blocks_button_block_buttons_icon_position" AS ENUM('leading', 'trailing');
  DROP TABLE "not_found" CASCADE;
  DROP TABLE "not_found_rels" CASCADE;
  ALTER TABLE "pages_blocks_button_block_buttons" ALTER COLUMN "link_uui_color" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_button_block_buttons" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum_pages_blocks_button_block_buttons_link_uui_color";
  CREATE TYPE "public"."enum_pages_blocks_button_block_buttons_link_uui_color" AS ENUM('primary', 'secondary', 'tertiary', 'link-gray', 'link-color', 'primary-destructive', 'secondary-destructive', 'tertiary-destructive', 'link-destructive');
  ALTER TABLE "pages_blocks_button_block_buttons" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::"public"."enum_pages_blocks_button_block_buttons_link_uui_color";
  ALTER TABLE "pages_blocks_button_block_buttons" ALTER COLUMN "link_uui_color" SET DATA TYPE "public"."enum_pages_blocks_button_block_buttons_link_uui_color" USING "link_uui_color"::"public"."enum_pages_blocks_button_block_buttons_link_uui_color";
  ALTER TABLE "_pages_v_blocks_button_block_buttons" ALTER COLUMN "link_uui_color" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_button_block_buttons" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::text;
  DROP TYPE "public"."enum__pages_v_blocks_button_block_buttons_link_uui_color";
  CREATE TYPE "public"."enum__pages_v_blocks_button_block_buttons_link_uui_color" AS ENUM('primary', 'secondary', 'tertiary', 'link-gray', 'link-color', 'primary-destructive', 'secondary-destructive', 'tertiary-destructive', 'link-destructive');
  ALTER TABLE "_pages_v_blocks_button_block_buttons" ALTER COLUMN "link_uui_color" SET DEFAULT 'primary'::"public"."enum__pages_v_blocks_button_block_buttons_link_uui_color";
  ALTER TABLE "_pages_v_blocks_button_block_buttons" ALTER COLUMN "link_uui_color" SET DATA TYPE "public"."enum__pages_v_blocks_button_block_buttons_link_uui_color" USING "link_uui_color"::"public"."enum__pages_v_blocks_button_block_buttons_link_uui_color";
  ALTER TABLE "pages_blocks_button_block_buttons" ADD COLUMN "icon" varchar;
  ALTER TABLE "pages_blocks_button_block_buttons" ADD COLUMN "icon_position" "enum_pages_blocks_button_block_buttons_icon_position" DEFAULT 'leading';
  ALTER TABLE "_pages_v_blocks_button_block_buttons" ADD COLUMN "icon" varchar;
  ALTER TABLE "_pages_v_blocks_button_block_buttons" ADD COLUMN "icon_position" "enum__pages_v_blocks_button_block_buttons_icon_position" DEFAULT 'leading';
  DROP TYPE "public"."enum_not_found_link_type";
  DROP TYPE "public"."enum_not_found_link_uui_color";
  DROP TYPE "public"."enum_not_found_link_uui_size";
  DROP TYPE "public"."enum_not_found_link_icon_pos";`)
}
