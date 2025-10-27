import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Helper function to safely add enum value
  const addEnumValue = async (typeName: string, value: string, position?: { type: 'BEFORE' | 'AFTER', reference: string }) => {
    try {
      // Check if the value already exists
      const checkResult = await db.execute(sql`
        SELECT 1 FROM pg_enum
        WHERE enumtypid = (SELECT oid FROM pg_type WHERE typname = ${typeName})
        AND enumlabel = ${value}
      `)

      if (checkResult.rows.length > 0) {
        console.log(`Value '${value}' already exists in ${typeName}, skipping...`)
        return
      }

      // Add the value
      let query = `ALTER TYPE "public"."${typeName}" ADD VALUE '${value}'`
      if (position) {
        query += ` ${position.type} '${position.reference}'`
      }

      await db.execute(sql.raw(query))
      console.log(`Added '${value}' to ${typeName}`)
    } catch (error) {
      console.error(`Failed to add '${value}' to ${typeName}:`, error)
      // Continue with other additions even if one fails
    }
  }

  // Add 'primary-reversed' to all button color enums
  const buttonColorEnums = [
    'enum_pages_blocks_hero_heading_buttons_link_uui_color',
    'enum_pages_blocks_cta_links_link_uui_color',
    'enum_pages_blocks_content_columns_link_uui_color',
    'enum_pages_blocks_card_grid_cards_link_uui_color',
    'enum_pages_blocks_features_features_link_uui_color',
    'enum_pages_blocks_latest_posts_button_config_link_uui_color',
    'enum_pages_cta_button_link_uui_color',
    'enum__pages_v_blocks_hero_heading_buttons_link_uui_color',
    'enum__pages_v_blocks_cta_links_link_uui_color',
    'enum__pages_v_blocks_content_columns_link_uui_color',
    'enum__pages_v_blocks_card_grid_cards_link_uui_color',
    'enum__pages_v_blocks_features_features_link_uui_color',
    'enum__pages_v_blocks_latest_posts_button_config_link_uui_color',
    'enum__pages_v_version_cta_button_link_uui_color',
    'enum_posts_blocks_latest_posts_button_config_link_uui_color',
    'enum_posts_blocks_cta_links_link_uui_color',
    'enum__posts_v_blocks_latest_posts_button_config_link_uui_color',
    'enum__posts_v_blocks_cta_links_link_uui_color',
    'enum_posts_settings_blocks_hero_heading_buttons_link_uui_color',
    'enum_posts_settings_blocks_cta_links_link_uui_color',
    'enum_posts_settings_blocks_content_columns_link_uui_color',
    'enum_header_cta_button_link_uui_color',
    'enum_header_mobile_cta_button_link_uui_color',
    'enum_not_found_link_uui_color',
  ]

  for (const enumName of buttonColorEnums) {
    await addEnumValue(enumName, 'primary-reversed', { type: 'AFTER', reference: 'primary' })
  }

  // Add 'white' to headline color enums
  const headlineColorEnums = [
    'enum_pages_blocks_hero_heading_headline_color',
    'enum__pages_v_blocks_hero_heading_headline_color',
    'enum_posts_settings_blocks_hero_heading_headline_color',
  ]

  for (const enumName of headlineColorEnums) {
    await addEnumValue(enumName, 'white', { type: 'BEFORE', reference: 'brand' })
  }

  // Add values to hero background enums
  const heroBackgroundEnums = [
    'enum_pages_blocks_hero_heading_hero_background',
    'enum__pages_v_blocks_hero_heading_hero_background',
    'enum_posts_settings_blocks_hero_heading_hero_background',
  ]

  for (const enumName of heroBackgroundEnums) {
    await addEnumValue(enumName, 'primary-reversed', { type: 'AFTER', reference: 'primary' })
    await addEnumValue(enumName, 'tertiary', { type: 'BEFORE', reference: 'accent' })
  }

  // Add values to card background enums
  const cardBackgroundEnums = [
    'enum_pages_blocks_card_grid_card_background',
    'enum__pages_v_blocks_card_grid_card_background',
    'enum_pages_blocks_features_layout_options_card_background',
    'enum__pages_v_blocks_features_layout_options_card_background',
  ]

  for (const enumName of cardBackgroundEnums) {
    await addEnumValue(enumName, 'primary-reversed', { type: 'AFTER', reference: 'primary' })
    await addEnumValue(enumName, 'tertiary', { type: 'BEFORE', reference: 'accent' })
  }

  // Add 'primary-reversed' to icon color enums
  const iconColorEnums = [
    'enum_pages_blocks_card_grid_icon_color',
    'enum__pages_v_blocks_card_grid_icon_color',
    'enum_pages_blocks_features_layout_options_icon_color',
    'enum__pages_v_blocks_features_layout_options_icon_color',
  ]

  for (const enumName of iconColorEnums) {
    await addEnumValue(enumName, 'primary-reversed', { type: 'AFTER', reference: 'primary' })
  }
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