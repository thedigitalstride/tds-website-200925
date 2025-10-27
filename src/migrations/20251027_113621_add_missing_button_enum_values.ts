import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // PostgreSQL doesn't support IF NOT EXISTS with ALTER TYPE ADD VALUE
  // We need to add these values without the IF NOT EXISTS clause
  // If they already exist, the migration will fail but that's okay as it means they're already there

  await db.execute(sql`
   -- Add 'primary-reversed' to all button color enums (positioned after 'primary' and before next value)
   ALTER TYPE "public"."enum_pages_blocks_hero_heading_buttons_link_uui_color" ADD VALUE 'primary-reversed' AFTER 'primary';
   ALTER TYPE "public"."enum_pages_blocks_cta_links_link_uui_color" ADD VALUE 'primary-reversed' AFTER 'primary';
   ALTER TYPE "public"."enum_pages_blocks_content_columns_link_uui_color" ADD VALUE 'primary-reversed' AFTER 'primary';
   ALTER TYPE "public"."enum_pages_blocks_card_grid_cards_link_uui_color" ADD VALUE 'primary-reversed' AFTER 'primary';
   ALTER TYPE "public"."enum_pages_blocks_features_features_link_uui_color" ADD VALUE 'primary-reversed' AFTER 'primary';
   ALTER TYPE "public"."enum_pages_blocks_latest_posts_button_config_link_uui_color" ADD VALUE 'primary-reversed' AFTER 'primary';
   ALTER TYPE "public"."enum_pages_cta_button_link_uui_color" ADD VALUE 'primary-reversed' AFTER 'primary';

   -- Add to versioned pages enums
   ALTER TYPE "public"."enum__pages_v_blocks_hero_heading_buttons_link_uui_color" ADD VALUE 'primary-reversed' AFTER 'primary';
   ALTER TYPE "public"."enum__pages_v_blocks_cta_links_link_uui_color" ADD VALUE 'primary-reversed' AFTER 'primary';
   ALTER TYPE "public"."enum__pages_v_blocks_content_columns_link_uui_color" ADD VALUE 'primary-reversed' AFTER 'primary';
   ALTER TYPE "public"."enum__pages_v_blocks_card_grid_cards_link_uui_color" ADD VALUE 'primary-reversed' AFTER 'primary';
   ALTER TYPE "public"."enum__pages_v_blocks_features_features_link_uui_color" ADD VALUE 'primary-reversed' AFTER 'primary';
   ALTER TYPE "public"."enum__pages_v_blocks_latest_posts_button_config_link_uui_color" ADD VALUE 'primary-reversed' AFTER 'primary';
   ALTER TYPE "public"."enum__pages_v_version_cta_button_link_uui_color" ADD VALUE 'primary-reversed' AFTER 'primary';

   -- Add to posts enums
   ALTER TYPE "public"."enum_posts_blocks_latest_posts_button_config_link_uui_color" ADD VALUE 'primary-reversed' AFTER 'primary';
   ALTER TYPE "public"."enum_posts_blocks_cta_links_link_uui_color" ADD VALUE 'primary-reversed' AFTER 'primary';
   ALTER TYPE "public"."enum__posts_v_blocks_latest_posts_button_config_link_uui_color" ADD VALUE 'primary-reversed' AFTER 'primary';
   ALTER TYPE "public"."enum__posts_v_blocks_cta_links_link_uui_color" ADD VALUE 'primary-reversed' AFTER 'primary';

   -- Add to posts_settings enums
   ALTER TYPE "public"."enum_posts_settings_blocks_hero_heading_buttons_link_uui_color" ADD VALUE 'primary-reversed' AFTER 'primary';
   ALTER TYPE "public"."enum_posts_settings_blocks_cta_links_link_uui_color" ADD VALUE 'primary-reversed' AFTER 'primary';
   ALTER TYPE "public"."enum_posts_settings_blocks_content_columns_link_uui_color" ADD VALUE 'primary-reversed' AFTER 'primary';

   -- Add to header enums
   ALTER TYPE "public"."enum_header_cta_button_link_uui_color" ADD VALUE 'primary-reversed' AFTER 'primary';
   ALTER TYPE "public"."enum_header_mobile_cta_button_link_uui_color" ADD VALUE 'primary-reversed' AFTER 'primary';

   -- Add to not_found enum
   ALTER TYPE "public"."enum_not_found_link_uui_color" ADD VALUE 'primary-reversed' AFTER 'primary';

   -- Add 'white' to headline color enums
   ALTER TYPE "public"."enum_pages_blocks_hero_heading_headline_color" ADD VALUE 'white' BEFORE 'brand';
   ALTER TYPE "public"."enum__pages_v_blocks_hero_heading_headline_color" ADD VALUE 'white' BEFORE 'brand';
   ALTER TYPE "public"."enum_posts_settings_blocks_hero_heading_headline_color" ADD VALUE 'white' BEFORE 'brand';

   -- Add 'primary-reversed' and 'tertiary' to hero background enums
   ALTER TYPE "public"."enum_pages_blocks_hero_heading_hero_background" ADD VALUE 'primary-reversed' AFTER 'primary';
   ALTER TYPE "public"."enum_pages_blocks_hero_heading_hero_background" ADD VALUE 'tertiary' BEFORE 'accent';
   ALTER TYPE "public"."enum__pages_v_blocks_hero_heading_hero_background" ADD VALUE 'primary-reversed' AFTER 'primary';
   ALTER TYPE "public"."enum__pages_v_blocks_hero_heading_hero_background" ADD VALUE 'tertiary' BEFORE 'accent';
   ALTER TYPE "public"."enum_posts_settings_blocks_hero_heading_hero_background" ADD VALUE 'primary-reversed' AFTER 'primary';
   ALTER TYPE "public"."enum_posts_settings_blocks_hero_heading_hero_background" ADD VALUE 'tertiary' BEFORE 'accent';

   -- Add 'primary-reversed' and 'tertiary' to card background enums
   ALTER TYPE "public"."enum_pages_blocks_card_grid_card_background" ADD VALUE 'primary-reversed' AFTER 'primary';
   ALTER TYPE "public"."enum_pages_blocks_card_grid_card_background" ADD VALUE 'tertiary' BEFORE 'accent';
   ALTER TYPE "public"."enum__pages_v_blocks_card_grid_card_background" ADD VALUE 'primary-reversed' AFTER 'primary';
   ALTER TYPE "public"."enum__pages_v_blocks_card_grid_card_background" ADD VALUE 'tertiary' BEFORE 'accent';
   ALTER TYPE "public"."enum_pages_blocks_features_layout_options_card_background" ADD VALUE 'primary-reversed' AFTER 'primary';
   ALTER TYPE "public"."enum_pages_blocks_features_layout_options_card_background" ADD VALUE 'tertiary' BEFORE 'accent';
   ALTER TYPE "public"."enum__pages_v_blocks_features_layout_options_card_background" ADD VALUE 'primary-reversed' AFTER 'primary';
   ALTER TYPE "public"."enum__pages_v_blocks_features_layout_options_card_background" ADD VALUE 'tertiary' BEFORE 'accent';

   -- Add 'primary-reversed' to icon color enums
   ALTER TYPE "public"."enum_pages_blocks_card_grid_icon_color" ADD VALUE 'primary-reversed' AFTER 'primary';
   ALTER TYPE "public"."enum__pages_v_blocks_card_grid_icon_color" ADD VALUE 'primary-reversed' AFTER 'primary';
   ALTER TYPE "public"."enum_pages_blocks_features_layout_options_icon_color" ADD VALUE 'primary-reversed' AFTER 'primary';
   ALTER TYPE "public"."enum__pages_v_blocks_features_layout_options_icon_color" ADD VALUE 'primary-reversed' AFTER 'primary';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Note: PostgreSQL doesn't support removing values from enums directly
  // The down migration would require recreating the types without the new values
  // This is left empty as it's a complex operation and these values are likely to be used
  await db.execute(sql`
   -- Removing enum values requires recreating the types
   -- This is intentionally left empty as it's a destructive operation
   -- and the added values are backward-compatible`)
}