import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."btn_icon_pos" AS ENUM('leading', 'trailing');
  ALTER TABLE "pages_blocks_hero_heading_buttons" ALTER COLUMN "link_icon_pos" DROP DEFAULT;
  ALTER TABLE "pages_blocks_card_grid_cards" ALTER COLUMN "link_icon_pos" DROP DEFAULT;
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_icon_pos" DROP DEFAULT;
  ALTER TABLE "pages_blocks_features_features" ALTER COLUMN "link_icon_pos" DROP DEFAULT;
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_icon_pos" DROP DEFAULT;
  ALTER TABLE "pages_blocks_latest_posts" ALTER COLUMN "button_config_link_icon_pos" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_hero_heading_buttons" ALTER COLUMN "link_icon_pos" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ALTER COLUMN "link_icon_pos" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_icon_pos" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_features_features" ALTER COLUMN "link_icon_pos" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_icon_pos" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_latest_posts" ALTER COLUMN "button_config_link_icon_pos" DROP DEFAULT;
  ALTER TABLE "posts_blocks_latest_posts" ALTER COLUMN "button_config_link_icon_pos" DROP DEFAULT;
  ALTER TABLE "posts_blocks_cta_links" ALTER COLUMN "link_icon_pos" DROP DEFAULT;
  ALTER TABLE "_posts_v_blocks_latest_posts" ALTER COLUMN "button_config_link_icon_pos" DROP DEFAULT;
  ALTER TABLE "_posts_v_blocks_cta_links" ALTER COLUMN "link_icon_pos" DROP DEFAULT;
  ALTER TABLE "header" ALTER COLUMN "cta_button_link_icon_pos" DROP DEFAULT;
  ALTER TABLE "header" ALTER COLUMN "mobile_cta_button_link_icon_pos" DROP DEFAULT;
  ALTER TABLE "footer_nav_columns_items" ALTER COLUMN "link_icon_pos" DROP DEFAULT;
  ALTER TABLE "not_found" ALTER COLUMN "link_icon_pos" DROP DEFAULT;
  ALTER TABLE "posts_settings_blocks_hero_heading_buttons" ALTER COLUMN "link_icon_pos" DROP DEFAULT;
  ALTER TABLE "posts_settings_blocks_cta_links" ALTER COLUMN "link_icon_pos" DROP DEFAULT;
  ALTER TABLE "posts_settings_blocks_content_columns" ALTER COLUMN "link_icon_pos" DROP DEFAULT;
  ALTER TABLE "pages_blocks_hero_heading_buttons" ADD COLUMN "link_button_icon_config_icon_id" integer;
  ALTER TABLE "pages_blocks_hero_heading_buttons" ADD COLUMN "link_button_icon_config_position" "btn_icon_pos" DEFAULT 'trailing';
  ALTER TABLE "pages_blocks_card_grid_cards" ADD COLUMN "icon_id" integer;
  ALTER TABLE "pages_blocks_card_grid_cards" ADD COLUMN "link_button_icon_config_icon_id" integer;
  ALTER TABLE "pages_blocks_card_grid_cards" ADD COLUMN "link_button_icon_config_position" "btn_icon_pos" DEFAULT 'trailing';
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "link_button_icon_config_icon_id" integer;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "link_button_icon_config_position" "btn_icon_pos" DEFAULT 'trailing';
  ALTER TABLE "pages_blocks_features_features" ADD COLUMN "icon_id" integer;
  ALTER TABLE "pages_blocks_features_features" ADD COLUMN "link_button_icon_config_icon_id" integer;
  ALTER TABLE "pages_blocks_features_features" ADD COLUMN "link_button_icon_config_position" "btn_icon_pos" DEFAULT 'trailing';
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN "link_button_icon_config_icon_id" integer;
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN "link_button_icon_config_position" "btn_icon_pos" DEFAULT 'trailing';
  ALTER TABLE "pages_blocks_latest_posts" ADD COLUMN "button_config_link_button_icon_config_icon_id" integer;
  ALTER TABLE "pages_blocks_latest_posts" ADD COLUMN "button_config_link_button_icon_config_position" "btn_icon_pos" DEFAULT 'trailing';
  ALTER TABLE "_pages_v_blocks_hero_heading_buttons" ADD COLUMN "link_button_icon_config_icon_id" integer;
  ALTER TABLE "_pages_v_blocks_hero_heading_buttons" ADD COLUMN "link_button_icon_config_position" "btn_icon_pos" DEFAULT 'trailing';
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ADD COLUMN "icon_id" integer;
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ADD COLUMN "link_button_icon_config_icon_id" integer;
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ADD COLUMN "link_button_icon_config_position" "btn_icon_pos" DEFAULT 'trailing';
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "link_button_icon_config_icon_id" integer;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "link_button_icon_config_position" "btn_icon_pos" DEFAULT 'trailing';
  ALTER TABLE "_pages_v_blocks_features_features" ADD COLUMN "icon_id" integer;
  ALTER TABLE "_pages_v_blocks_features_features" ADD COLUMN "link_button_icon_config_icon_id" integer;
  ALTER TABLE "_pages_v_blocks_features_features" ADD COLUMN "link_button_icon_config_position" "btn_icon_pos" DEFAULT 'trailing';
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN "link_button_icon_config_icon_id" integer;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN "link_button_icon_config_position" "btn_icon_pos" DEFAULT 'trailing';
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD COLUMN "button_config_link_button_icon_config_icon_id" integer;
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD COLUMN "button_config_link_button_icon_config_position" "btn_icon_pos" DEFAULT 'trailing';
  ALTER TABLE "posts_blocks_latest_posts" ADD COLUMN "button_config_link_button_icon_config_icon_id" integer;
  ALTER TABLE "posts_blocks_latest_posts" ADD COLUMN "button_config_link_button_icon_config_position" "btn_icon_pos" DEFAULT 'trailing';
  ALTER TABLE "posts_blocks_cta_links" ADD COLUMN "link_button_icon_config_icon_id" integer;
  ALTER TABLE "posts_blocks_cta_links" ADD COLUMN "link_button_icon_config_position" "btn_icon_pos" DEFAULT 'trailing';
  ALTER TABLE "_posts_v_blocks_latest_posts" ADD COLUMN "button_config_link_button_icon_config_icon_id" integer;
  ALTER TABLE "_posts_v_blocks_latest_posts" ADD COLUMN "button_config_link_button_icon_config_position" "btn_icon_pos" DEFAULT 'trailing';
  ALTER TABLE "_posts_v_blocks_cta_links" ADD COLUMN "link_button_icon_config_icon_id" integer;
  ALTER TABLE "_posts_v_blocks_cta_links" ADD COLUMN "link_button_icon_config_position" "btn_icon_pos" DEFAULT 'trailing';
  ALTER TABLE "header_nav_items_dropdown_items" ADD COLUMN "icon_id" integer;
  ALTER TABLE "header" ADD COLUMN "cta_button_link_button_icon_config_icon_id" integer;
  ALTER TABLE "header" ADD COLUMN "cta_button_link_button_icon_config_position" "btn_icon_pos" DEFAULT 'trailing';
  ALTER TABLE "header" ADD COLUMN "mobile_cta_button_link_button_icon_config_icon_id" integer;
  ALTER TABLE "header" ADD COLUMN "mobile_cta_button_link_button_icon_config_position" "btn_icon_pos" DEFAULT 'trailing';
  ALTER TABLE "footer_nav_columns_items" ADD COLUMN "link_button_icon_config_icon_id" integer;
  ALTER TABLE "footer_nav_columns_items" ADD COLUMN "link_button_icon_config_position" "btn_icon_pos" DEFAULT 'trailing';
  ALTER TABLE "not_found" ADD COLUMN "link_button_icon_config_icon_id" integer;
  ALTER TABLE "not_found" ADD COLUMN "link_button_icon_config_position" "btn_icon_pos" DEFAULT 'trailing';
  ALTER TABLE "posts_settings_blocks_hero_heading_buttons" ADD COLUMN "link_button_icon_config_icon_id" integer;
  ALTER TABLE "posts_settings_blocks_hero_heading_buttons" ADD COLUMN "link_button_icon_config_position" "btn_icon_pos" DEFAULT 'trailing';
  ALTER TABLE "posts_settings_blocks_cta_links" ADD COLUMN "link_button_icon_config_icon_id" integer;
  ALTER TABLE "posts_settings_blocks_cta_links" ADD COLUMN "link_button_icon_config_position" "btn_icon_pos" DEFAULT 'trailing';
  ALTER TABLE "posts_settings_blocks_content_columns" ADD COLUMN "link_button_icon_config_icon_id" integer;
  ALTER TABLE "posts_settings_blocks_content_columns" ADD COLUMN "link_button_icon_config_position" "btn_icon_pos" DEFAULT 'trailing';
  ALTER TABLE "pages_blocks_hero_heading_buttons" ADD CONSTRAINT "pages_blocks_hero_heading_buttons_link_button_icon_config_icon_id_icons_id_fk" FOREIGN KEY ("link_button_icon_config_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid_cards" ADD CONSTRAINT "pages_blocks_card_grid_cards_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid_cards" ADD CONSTRAINT "pages_blocks_card_grid_cards_link_button_icon_config_icon_id_icons_id_fk" FOREIGN KEY ("link_button_icon_config_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_columns" ADD CONSTRAINT "pages_blocks_content_columns_link_button_icon_config_icon_id_icons_id_fk" FOREIGN KEY ("link_button_icon_config_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_features_features" ADD CONSTRAINT "pages_blocks_features_features_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_features_features" ADD CONSTRAINT "pages_blocks_features_features_link_button_icon_config_icon_id_icons_id_fk" FOREIGN KEY ("link_button_icon_config_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_links" ADD CONSTRAINT "pages_blocks_cta_links_link_button_icon_config_icon_id_icons_id_fk" FOREIGN KEY ("link_button_icon_config_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_latest_posts" ADD CONSTRAINT "pages_blocks_latest_posts_button_config_link_button_icon_config_icon_id_icons_id_fk" FOREIGN KEY ("button_config_link_button_icon_config_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_heading_buttons" ADD CONSTRAINT "_pages_v_blocks_hero_heading_buttons_link_button_icon_config_icon_id_icons_id_fk" FOREIGN KEY ("link_button_icon_config_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ADD CONSTRAINT "_pages_v_blocks_card_grid_cards_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ADD CONSTRAINT "_pages_v_blocks_card_grid_cards_link_button_icon_config_icon_id_icons_id_fk" FOREIGN KEY ("link_button_icon_config_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD CONSTRAINT "_pages_v_blocks_content_columns_link_button_icon_config_icon_id_icons_id_fk" FOREIGN KEY ("link_button_icon_config_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features_features" ADD CONSTRAINT "_pages_v_blocks_features_features_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features_features" ADD CONSTRAINT "_pages_v_blocks_features_features_link_button_icon_config_icon_id_icons_id_fk" FOREIGN KEY ("link_button_icon_config_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD CONSTRAINT "_pages_v_blocks_cta_links_link_button_icon_config_icon_id_icons_id_fk" FOREIGN KEY ("link_button_icon_config_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_latest_posts" ADD CONSTRAINT "_pages_v_blocks_latest_posts_button_config_link_button_icon_config_icon_id_icons_id_fk" FOREIGN KEY ("button_config_link_button_icon_config_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_latest_posts" ADD CONSTRAINT "posts_blocks_latest_posts_button_config_link_button_icon_config_icon_id_icons_id_fk" FOREIGN KEY ("button_config_link_button_icon_config_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_cta_links" ADD CONSTRAINT "posts_blocks_cta_links_link_button_icon_config_icon_id_icons_id_fk" FOREIGN KEY ("link_button_icon_config_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_latest_posts" ADD CONSTRAINT "_posts_v_blocks_latest_posts_button_config_link_button_icon_config_icon_id_icons_id_fk" FOREIGN KEY ("button_config_link_button_icon_config_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_cta_links" ADD CONSTRAINT "_posts_v_blocks_cta_links_link_button_icon_config_icon_id_icons_id_fk" FOREIGN KEY ("link_button_icon_config_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_nav_items_dropdown_items" ADD CONSTRAINT "header_nav_items_dropdown_items_icon_id_icons_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_cta_button_link_button_icon_config_icon_id_icons_id_fk" FOREIGN KEY ("cta_button_link_button_icon_config_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_mobile_cta_button_link_button_icon_config_icon_id_icons_id_fk" FOREIGN KEY ("mobile_cta_button_link_button_icon_config_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_nav_columns_items" ADD CONSTRAINT "footer_nav_columns_items_link_button_icon_config_icon_id_icons_id_fk" FOREIGN KEY ("link_button_icon_config_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "not_found" ADD CONSTRAINT "not_found_link_button_icon_config_icon_id_icons_id_fk" FOREIGN KEY ("link_button_icon_config_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_settings_blocks_hero_heading_buttons" ADD CONSTRAINT "posts_settings_blocks_hero_heading_buttons_link_button_icon_config_icon_id_icons_id_fk" FOREIGN KEY ("link_button_icon_config_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_settings_blocks_cta_links" ADD CONSTRAINT "posts_settings_blocks_cta_links_link_button_icon_config_icon_id_icons_id_fk" FOREIGN KEY ("link_button_icon_config_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_settings_blocks_content_columns" ADD CONSTRAINT "posts_settings_blocks_content_columns_link_button_icon_config_icon_id_icons_id_fk" FOREIGN KEY ("link_button_icon_config_icon_id") REFERENCES "public"."icons"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_heading_buttons_link_button_icon_confi_idx" ON "pages_blocks_hero_heading_buttons" USING btree ("link_button_icon_config_icon_id");
  CREATE INDEX "pages_blocks_card_grid_cards_icon_idx" ON "pages_blocks_card_grid_cards" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_card_grid_cards_link_button_icon_config_lin_idx" ON "pages_blocks_card_grid_cards" USING btree ("link_button_icon_config_icon_id");
  CREATE INDEX "pages_blocks_content_columns_link_button_icon_config_lin_idx" ON "pages_blocks_content_columns" USING btree ("link_button_icon_config_icon_id");
  CREATE INDEX "pages_blocks_features_features_icon_idx" ON "pages_blocks_features_features" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_features_features_link_button_icon_config_l_idx" ON "pages_blocks_features_features" USING btree ("link_button_icon_config_icon_id");
  CREATE INDEX "pages_blocks_cta_links_link_button_icon_config_link_butt_idx" ON "pages_blocks_cta_links" USING btree ("link_button_icon_config_icon_id");
  CREATE INDEX "pages_blocks_latest_posts_button_config_link_button_icon_idx" ON "pages_blocks_latest_posts" USING btree ("button_config_link_button_icon_config_icon_id");
  CREATE INDEX "_pages_v_blocks_hero_heading_buttons_link_button_icon_co_idx" ON "_pages_v_blocks_hero_heading_buttons" USING btree ("link_button_icon_config_icon_id");
  CREATE INDEX "_pages_v_blocks_card_grid_cards_icon_idx" ON "_pages_v_blocks_card_grid_cards" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_card_grid_cards_link_button_icon_config__idx" ON "_pages_v_blocks_card_grid_cards" USING btree ("link_button_icon_config_icon_id");
  CREATE INDEX "_pages_v_blocks_content_columns_link_button_icon_config__idx" ON "_pages_v_blocks_content_columns" USING btree ("link_button_icon_config_icon_id");
  CREATE INDEX "_pages_v_blocks_features_features_icon_idx" ON "_pages_v_blocks_features_features" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_features_features_link_button_icon_confi_idx" ON "_pages_v_blocks_features_features" USING btree ("link_button_icon_config_icon_id");
  CREATE INDEX "_pages_v_blocks_cta_links_link_button_icon_config_link_b_idx" ON "_pages_v_blocks_cta_links" USING btree ("link_button_icon_config_icon_id");
  CREATE INDEX "_pages_v_blocks_latest_posts_button_config_link_button_i_idx" ON "_pages_v_blocks_latest_posts" USING btree ("button_config_link_button_icon_config_icon_id");
  CREATE INDEX "posts_blocks_latest_posts_button_config_link_button_icon_idx" ON "posts_blocks_latest_posts" USING btree ("button_config_link_button_icon_config_icon_id");
  CREATE INDEX "posts_blocks_cta_links_link_button_icon_config_link_butt_idx" ON "posts_blocks_cta_links" USING btree ("link_button_icon_config_icon_id");
  CREATE INDEX "_posts_v_blocks_latest_posts_button_config_link_button_i_idx" ON "_posts_v_blocks_latest_posts" USING btree ("button_config_link_button_icon_config_icon_id");
  CREATE INDEX "_posts_v_blocks_cta_links_link_button_icon_config_link_b_idx" ON "_posts_v_blocks_cta_links" USING btree ("link_button_icon_config_icon_id");
  CREATE INDEX "header_nav_items_dropdown_items_icon_idx" ON "header_nav_items_dropdown_items" USING btree ("icon_id");
  CREATE INDEX "header_cta_button_link_button_icon_config_cta_button_lin_idx" ON "header" USING btree ("cta_button_link_button_icon_config_icon_id");
  CREATE INDEX "header_mobile_cta_button_link_button_icon_config_mobile__idx" ON "header" USING btree ("mobile_cta_button_link_button_icon_config_icon_id");
  CREATE INDEX "footer_nav_columns_items_link_button_icon_config_link_bu_idx" ON "footer_nav_columns_items" USING btree ("link_button_icon_config_icon_id");
  CREATE INDEX "not_found_link_button_icon_config_link_button_icon_confi_idx" ON "not_found" USING btree ("link_button_icon_config_icon_id");
  CREATE INDEX "posts_settings_blocks_hero_heading_buttons_link_button_i_idx" ON "posts_settings_blocks_hero_heading_buttons" USING btree ("link_button_icon_config_icon_id");
  CREATE INDEX "posts_settings_blocks_cta_links_link_button_icon_config__idx" ON "posts_settings_blocks_cta_links" USING btree ("link_button_icon_config_icon_id");
  CREATE INDEX "posts_settings_blocks_content_columns_link_button_icon_c_idx" ON "posts_settings_blocks_content_columns" USING btree ("link_button_icon_config_icon_id");
  ALTER TABLE "pages_blocks_card_grid_cards" DROP COLUMN "icon";
  ALTER TABLE "pages_blocks_features_features" DROP COLUMN "icon";
  ALTER TABLE "_pages_v_blocks_card_grid_cards" DROP COLUMN "icon";
  ALTER TABLE "_pages_v_blocks_features_features" DROP COLUMN "icon";
  ALTER TABLE "header_nav_items_dropdown_items" DROP COLUMN "icon";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_heading_buttons" DROP CONSTRAINT "pages_blocks_hero_heading_buttons_link_button_icon_config_icon_id_icons_id_fk";
  
  ALTER TABLE "pages_blocks_card_grid_cards" DROP CONSTRAINT "pages_blocks_card_grid_cards_icon_id_icons_id_fk";
  
  ALTER TABLE "pages_blocks_card_grid_cards" DROP CONSTRAINT "pages_blocks_card_grid_cards_link_button_icon_config_icon_id_icons_id_fk";
  
  ALTER TABLE "pages_blocks_content_columns" DROP CONSTRAINT "pages_blocks_content_columns_link_button_icon_config_icon_id_icons_id_fk";
  
  ALTER TABLE "pages_blocks_features_features" DROP CONSTRAINT "pages_blocks_features_features_icon_id_icons_id_fk";
  
  ALTER TABLE "pages_blocks_features_features" DROP CONSTRAINT "pages_blocks_features_features_link_button_icon_config_icon_id_icons_id_fk";
  
  ALTER TABLE "pages_blocks_cta_links" DROP CONSTRAINT "pages_blocks_cta_links_link_button_icon_config_icon_id_icons_id_fk";
  
  ALTER TABLE "pages_blocks_latest_posts" DROP CONSTRAINT "pages_blocks_latest_posts_button_config_link_button_icon_config_icon_id_icons_id_fk";
  
  ALTER TABLE "_pages_v_blocks_hero_heading_buttons" DROP CONSTRAINT "_pages_v_blocks_hero_heading_buttons_link_button_icon_config_icon_id_icons_id_fk";
  
  ALTER TABLE "_pages_v_blocks_card_grid_cards" DROP CONSTRAINT "_pages_v_blocks_card_grid_cards_icon_id_icons_id_fk";
  
  ALTER TABLE "_pages_v_blocks_card_grid_cards" DROP CONSTRAINT "_pages_v_blocks_card_grid_cards_link_button_icon_config_icon_id_icons_id_fk";
  
  ALTER TABLE "_pages_v_blocks_content_columns" DROP CONSTRAINT "_pages_v_blocks_content_columns_link_button_icon_config_icon_id_icons_id_fk";
  
  ALTER TABLE "_pages_v_blocks_features_features" DROP CONSTRAINT "_pages_v_blocks_features_features_icon_id_icons_id_fk";
  
  ALTER TABLE "_pages_v_blocks_features_features" DROP CONSTRAINT "_pages_v_blocks_features_features_link_button_icon_config_icon_id_icons_id_fk";
  
  ALTER TABLE "_pages_v_blocks_cta_links" DROP CONSTRAINT "_pages_v_blocks_cta_links_link_button_icon_config_icon_id_icons_id_fk";
  
  ALTER TABLE "_pages_v_blocks_latest_posts" DROP CONSTRAINT "_pages_v_blocks_latest_posts_button_config_link_button_icon_config_icon_id_icons_id_fk";
  
  ALTER TABLE "posts_blocks_latest_posts" DROP CONSTRAINT "posts_blocks_latest_posts_button_config_link_button_icon_config_icon_id_icons_id_fk";
  
  ALTER TABLE "posts_blocks_cta_links" DROP CONSTRAINT "posts_blocks_cta_links_link_button_icon_config_icon_id_icons_id_fk";
  
  ALTER TABLE "_posts_v_blocks_latest_posts" DROP CONSTRAINT "_posts_v_blocks_latest_posts_button_config_link_button_icon_config_icon_id_icons_id_fk";
  
  ALTER TABLE "_posts_v_blocks_cta_links" DROP CONSTRAINT "_posts_v_blocks_cta_links_link_button_icon_config_icon_id_icons_id_fk";
  
  ALTER TABLE "header_nav_items_dropdown_items" DROP CONSTRAINT "header_nav_items_dropdown_items_icon_id_icons_id_fk";
  
  ALTER TABLE "header" DROP CONSTRAINT "header_cta_button_link_button_icon_config_icon_id_icons_id_fk";
  
  ALTER TABLE "header" DROP CONSTRAINT "header_mobile_cta_button_link_button_icon_config_icon_id_icons_id_fk";
  
  ALTER TABLE "footer_nav_columns_items" DROP CONSTRAINT "footer_nav_columns_items_link_button_icon_config_icon_id_icons_id_fk";
  
  ALTER TABLE "not_found" DROP CONSTRAINT "not_found_link_button_icon_config_icon_id_icons_id_fk";
  
  ALTER TABLE "posts_settings_blocks_hero_heading_buttons" DROP CONSTRAINT "posts_settings_blocks_hero_heading_buttons_link_button_icon_config_icon_id_icons_id_fk";
  
  ALTER TABLE "posts_settings_blocks_cta_links" DROP CONSTRAINT "posts_settings_blocks_cta_links_link_button_icon_config_icon_id_icons_id_fk";
  
  ALTER TABLE "posts_settings_blocks_content_columns" DROP CONSTRAINT "posts_settings_blocks_content_columns_link_button_icon_config_icon_id_icons_id_fk";
  
  DROP INDEX "pages_blocks_hero_heading_buttons_link_button_icon_confi_idx";
  DROP INDEX "pages_blocks_card_grid_cards_icon_idx";
  DROP INDEX "pages_blocks_card_grid_cards_link_button_icon_config_lin_idx";
  DROP INDEX "pages_blocks_content_columns_link_button_icon_config_lin_idx";
  DROP INDEX "pages_blocks_features_features_icon_idx";
  DROP INDEX "pages_blocks_features_features_link_button_icon_config_l_idx";
  DROP INDEX "pages_blocks_cta_links_link_button_icon_config_link_butt_idx";
  DROP INDEX "pages_blocks_latest_posts_button_config_link_button_icon_idx";
  DROP INDEX "_pages_v_blocks_hero_heading_buttons_link_button_icon_co_idx";
  DROP INDEX "_pages_v_blocks_card_grid_cards_icon_idx";
  DROP INDEX "_pages_v_blocks_card_grid_cards_link_button_icon_config__idx";
  DROP INDEX "_pages_v_blocks_content_columns_link_button_icon_config__idx";
  DROP INDEX "_pages_v_blocks_features_features_icon_idx";
  DROP INDEX "_pages_v_blocks_features_features_link_button_icon_confi_idx";
  DROP INDEX "_pages_v_blocks_cta_links_link_button_icon_config_link_b_idx";
  DROP INDEX "_pages_v_blocks_latest_posts_button_config_link_button_i_idx";
  DROP INDEX "posts_blocks_latest_posts_button_config_link_button_icon_idx";
  DROP INDEX "posts_blocks_cta_links_link_button_icon_config_link_butt_idx";
  DROP INDEX "_posts_v_blocks_latest_posts_button_config_link_button_i_idx";
  DROP INDEX "_posts_v_blocks_cta_links_link_button_icon_config_link_b_idx";
  DROP INDEX "header_nav_items_dropdown_items_icon_idx";
  DROP INDEX "header_cta_button_link_button_icon_config_cta_button_lin_idx";
  DROP INDEX "header_mobile_cta_button_link_button_icon_config_mobile__idx";
  DROP INDEX "footer_nav_columns_items_link_button_icon_config_link_bu_idx";
  DROP INDEX "not_found_link_button_icon_config_link_button_icon_confi_idx";
  DROP INDEX "posts_settings_blocks_hero_heading_buttons_link_button_i_idx";
  DROP INDEX "posts_settings_blocks_cta_links_link_button_icon_config__idx";
  DROP INDEX "posts_settings_blocks_content_columns_link_button_icon_c_idx";
  ALTER TABLE "pages_blocks_hero_heading_buttons" ALTER COLUMN "link_icon_pos" SET DEFAULT 'trailing';
  ALTER TABLE "pages_blocks_card_grid_cards" ALTER COLUMN "link_icon_pos" SET DEFAULT 'trailing';
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "link_icon_pos" SET DEFAULT 'trailing';
  ALTER TABLE "pages_blocks_features_features" ALTER COLUMN "link_icon_pos" SET DEFAULT 'trailing';
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "link_icon_pos" SET DEFAULT 'trailing';
  ALTER TABLE "pages_blocks_latest_posts" ALTER COLUMN "button_config_link_icon_pos" SET DEFAULT 'trailing';
  ALTER TABLE "_pages_v_blocks_hero_heading_buttons" ALTER COLUMN "link_icon_pos" SET DEFAULT 'trailing';
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ALTER COLUMN "link_icon_pos" SET DEFAULT 'trailing';
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "link_icon_pos" SET DEFAULT 'trailing';
  ALTER TABLE "_pages_v_blocks_features_features" ALTER COLUMN "link_icon_pos" SET DEFAULT 'trailing';
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "link_icon_pos" SET DEFAULT 'trailing';
  ALTER TABLE "_pages_v_blocks_latest_posts" ALTER COLUMN "button_config_link_icon_pos" SET DEFAULT 'trailing';
  ALTER TABLE "posts_blocks_latest_posts" ALTER COLUMN "button_config_link_icon_pos" SET DEFAULT 'trailing';
  ALTER TABLE "posts_blocks_cta_links" ALTER COLUMN "link_icon_pos" SET DEFAULT 'trailing';
  ALTER TABLE "_posts_v_blocks_latest_posts" ALTER COLUMN "button_config_link_icon_pos" SET DEFAULT 'trailing';
  ALTER TABLE "_posts_v_blocks_cta_links" ALTER COLUMN "link_icon_pos" SET DEFAULT 'trailing';
  ALTER TABLE "header" ALTER COLUMN "cta_button_link_icon_pos" SET DEFAULT 'trailing';
  ALTER TABLE "header" ALTER COLUMN "mobile_cta_button_link_icon_pos" SET DEFAULT 'trailing';
  ALTER TABLE "footer_nav_columns_items" ALTER COLUMN "link_icon_pos" SET DEFAULT 'trailing';
  ALTER TABLE "not_found" ALTER COLUMN "link_icon_pos" SET DEFAULT 'trailing';
  ALTER TABLE "posts_settings_blocks_hero_heading_buttons" ALTER COLUMN "link_icon_pos" SET DEFAULT 'trailing';
  ALTER TABLE "posts_settings_blocks_cta_links" ALTER COLUMN "link_icon_pos" SET DEFAULT 'trailing';
  ALTER TABLE "posts_settings_blocks_content_columns" ALTER COLUMN "link_icon_pos" SET DEFAULT 'trailing';
  ALTER TABLE "pages_blocks_card_grid_cards" ADD COLUMN "icon" varchar;
  ALTER TABLE "pages_blocks_features_features" ADD COLUMN "icon" varchar;
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ADD COLUMN "icon" varchar;
  ALTER TABLE "_pages_v_blocks_features_features" ADD COLUMN "icon" varchar;
  ALTER TABLE "header_nav_items_dropdown_items" ADD COLUMN "icon" varchar;
  ALTER TABLE "pages_blocks_hero_heading_buttons" DROP COLUMN "link_button_icon_config_icon_id";
  ALTER TABLE "pages_blocks_hero_heading_buttons" DROP COLUMN "link_button_icon_config_position";
  ALTER TABLE "pages_blocks_card_grid_cards" DROP COLUMN "icon_id";
  ALTER TABLE "pages_blocks_card_grid_cards" DROP COLUMN "link_button_icon_config_icon_id";
  ALTER TABLE "pages_blocks_card_grid_cards" DROP COLUMN "link_button_icon_config_position";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "link_button_icon_config_icon_id";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "link_button_icon_config_position";
  ALTER TABLE "pages_blocks_features_features" DROP COLUMN "icon_id";
  ALTER TABLE "pages_blocks_features_features" DROP COLUMN "link_button_icon_config_icon_id";
  ALTER TABLE "pages_blocks_features_features" DROP COLUMN "link_button_icon_config_position";
  ALTER TABLE "pages_blocks_cta_links" DROP COLUMN "link_button_icon_config_icon_id";
  ALTER TABLE "pages_blocks_cta_links" DROP COLUMN "link_button_icon_config_position";
  ALTER TABLE "pages_blocks_latest_posts" DROP COLUMN "button_config_link_button_icon_config_icon_id";
  ALTER TABLE "pages_blocks_latest_posts" DROP COLUMN "button_config_link_button_icon_config_position";
  ALTER TABLE "_pages_v_blocks_hero_heading_buttons" DROP COLUMN "link_button_icon_config_icon_id";
  ALTER TABLE "_pages_v_blocks_hero_heading_buttons" DROP COLUMN "link_button_icon_config_position";
  ALTER TABLE "_pages_v_blocks_card_grid_cards" DROP COLUMN "icon_id";
  ALTER TABLE "_pages_v_blocks_card_grid_cards" DROP COLUMN "link_button_icon_config_icon_id";
  ALTER TABLE "_pages_v_blocks_card_grid_cards" DROP COLUMN "link_button_icon_config_position";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "link_button_icon_config_icon_id";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "link_button_icon_config_position";
  ALTER TABLE "_pages_v_blocks_features_features" DROP COLUMN "icon_id";
  ALTER TABLE "_pages_v_blocks_features_features" DROP COLUMN "link_button_icon_config_icon_id";
  ALTER TABLE "_pages_v_blocks_features_features" DROP COLUMN "link_button_icon_config_position";
  ALTER TABLE "_pages_v_blocks_cta_links" DROP COLUMN "link_button_icon_config_icon_id";
  ALTER TABLE "_pages_v_blocks_cta_links" DROP COLUMN "link_button_icon_config_position";
  ALTER TABLE "_pages_v_blocks_latest_posts" DROP COLUMN "button_config_link_button_icon_config_icon_id";
  ALTER TABLE "_pages_v_blocks_latest_posts" DROP COLUMN "button_config_link_button_icon_config_position";
  ALTER TABLE "posts_blocks_latest_posts" DROP COLUMN "button_config_link_button_icon_config_icon_id";
  ALTER TABLE "posts_blocks_latest_posts" DROP COLUMN "button_config_link_button_icon_config_position";
  ALTER TABLE "posts_blocks_cta_links" DROP COLUMN "link_button_icon_config_icon_id";
  ALTER TABLE "posts_blocks_cta_links" DROP COLUMN "link_button_icon_config_position";
  ALTER TABLE "_posts_v_blocks_latest_posts" DROP COLUMN "button_config_link_button_icon_config_icon_id";
  ALTER TABLE "_posts_v_blocks_latest_posts" DROP COLUMN "button_config_link_button_icon_config_position";
  ALTER TABLE "_posts_v_blocks_cta_links" DROP COLUMN "link_button_icon_config_icon_id";
  ALTER TABLE "_posts_v_blocks_cta_links" DROP COLUMN "link_button_icon_config_position";
  ALTER TABLE "header_nav_items_dropdown_items" DROP COLUMN "icon_id";
  ALTER TABLE "header" DROP COLUMN "cta_button_link_button_icon_config_icon_id";
  ALTER TABLE "header" DROP COLUMN "cta_button_link_button_icon_config_position";
  ALTER TABLE "header" DROP COLUMN "mobile_cta_button_link_button_icon_config_icon_id";
  ALTER TABLE "header" DROP COLUMN "mobile_cta_button_link_button_icon_config_position";
  ALTER TABLE "footer_nav_columns_items" DROP COLUMN "link_button_icon_config_icon_id";
  ALTER TABLE "footer_nav_columns_items" DROP COLUMN "link_button_icon_config_position";
  ALTER TABLE "not_found" DROP COLUMN "link_button_icon_config_icon_id";
  ALTER TABLE "not_found" DROP COLUMN "link_button_icon_config_position";
  ALTER TABLE "posts_settings_blocks_hero_heading_buttons" DROP COLUMN "link_button_icon_config_icon_id";
  ALTER TABLE "posts_settings_blocks_hero_heading_buttons" DROP COLUMN "link_button_icon_config_position";
  ALTER TABLE "posts_settings_blocks_cta_links" DROP COLUMN "link_button_icon_config_icon_id";
  ALTER TABLE "posts_settings_blocks_cta_links" DROP COLUMN "link_button_icon_config_position";
  ALTER TABLE "posts_settings_blocks_content_columns" DROP COLUMN "link_button_icon_config_icon_id";
  ALTER TABLE "posts_settings_blocks_content_columns" DROP COLUMN "link_button_icon_config_position";
  DROP TYPE "public"."btn_icon_pos";`)
}
