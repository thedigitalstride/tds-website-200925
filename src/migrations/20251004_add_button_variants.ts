import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Migration to add new button color variants to existing enum types
 *
 * This migration safely adds 'link', 'accent', and 'tertiary' values to all
 * button color enum types WITHOUT removing the deprecated 'link-color' and 'link-gray'
 * values. This ensures no data corruption while allowing new code to use new variants.
 *
 * Deprecated values can be removed in a future migration after data cleanup.
 */

export async function up({ db }: MigrateUpArgs): Promise<void> {
  console.log('🔄 Starting migration: Add new button color variants...')

  // Add 'accent' value if it doesn't exist
  console.log('  → Adding "accent" to enum types...')
  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'accent' AND enumtypid = 'enum_pages_blocks_cta_links_link_uui_color'::regtype) THEN
        ALTER TYPE enum_pages_blocks_cta_links_link_uui_color ADD VALUE 'accent';
      END IF;
    END $$;
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'accent' AND enumtypid = 'enum_pages_blocks_content_columns_link_uui_color'::regtype) THEN
        ALTER TYPE enum_pages_blocks_content_columns_link_uui_color ADD VALUE 'accent';
      END IF;
    END $$;
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'accent' AND enumtypid = 'enum_pages_blocks_button_block_buttons_link_uui_color'::regtype) THEN
        ALTER TYPE enum_pages_blocks_button_block_buttons_link_uui_color ADD VALUE 'accent';
      END IF;
    END $$;
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'accent' AND enumtypid = 'enum_pages_blocks_features_features_link_uui_color'::regtype) THEN
        ALTER TYPE enum_pages_blocks_features_features_link_uui_color ADD VALUE 'accent';
      END IF;
    END $$;
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'accent' AND enumtypid = 'enum__pages_v_blocks_cta_links_link_uui_color'::regtype) THEN
        ALTER TYPE enum__pages_v_blocks_cta_links_link_uui_color ADD VALUE 'accent';
      END IF;
    END $$;
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'accent' AND enumtypid = 'enum__pages_v_blocks_content_columns_link_uui_color'::regtype) THEN
        ALTER TYPE enum__pages_v_blocks_content_columns_link_uui_color ADD VALUE 'accent';
      END IF;
    END $$;
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'accent' AND enumtypid = 'enum__pages_v_blocks_button_block_buttons_link_uui_color'::regtype) THEN
        ALTER TYPE enum__pages_v_blocks_button_block_buttons_link_uui_color ADD VALUE 'accent';
      END IF;
    END $$;
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'accent' AND enumtypid = 'enum__pages_v_blocks_features_features_link_uui_color'::regtype) THEN
        ALTER TYPE enum__pages_v_blocks_features_features_link_uui_color ADD VALUE 'accent';
      END IF;
    END $$;
  `)

  // Add 'tertiary' value if it doesn't exist
  console.log('  → Adding "tertiary" to enum types...')
  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'tertiary' AND enumtypid = 'enum_pages_blocks_cta_links_link_uui_color'::regtype) THEN
        ALTER TYPE enum_pages_blocks_cta_links_link_uui_color ADD VALUE 'tertiary';
      END IF;
    END $$;
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'tertiary' AND enumtypid = 'enum_pages_blocks_content_columns_link_uui_color'::regtype) THEN
        ALTER TYPE enum_pages_blocks_content_columns_link_uui_color ADD VALUE 'tertiary';
      END IF;
    END $$;
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'tertiary' AND enumtypid = 'enum_pages_blocks_button_block_buttons_link_uui_color'::regtype) THEN
        ALTER TYPE enum_pages_blocks_button_block_buttons_link_uui_color ADD VALUE 'tertiary';
      END IF;
    END $$;
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'tertiary' AND enumtypid = 'enum_pages_blocks_features_features_link_uui_color'::regtype) THEN
        ALTER TYPE enum_pages_blocks_features_features_link_uui_color ADD VALUE 'tertiary';
      END IF;
    END $$;
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'tertiary' AND enumtypid = 'enum__pages_v_blocks_cta_links_link_uui_color'::regtype) THEN
        ALTER TYPE enum__pages_v_blocks_cta_links_link_uui_color ADD VALUE 'tertiary';
      END IF;
    END $$;
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'tertiary' AND enumtypid = 'enum__pages_v_blocks_content_columns_link_uui_color'::regtype) THEN
        ALTER TYPE enum__pages_v_blocks_content_columns_link_uui_color ADD VALUE 'tertiary';
      END IF;
    END $$;
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'tertiary' AND enumtypid = 'enum__pages_v_blocks_button_block_buttons_link_uui_color'::regtype) THEN
        ALTER TYPE enum__pages_v_blocks_button_block_buttons_link_uui_color ADD VALUE 'tertiary';
      END IF;
    END $$;
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'tertiary' AND enumtypid = 'enum__pages_v_blocks_features_features_link_uui_color'::regtype) THEN
        ALTER TYPE enum__pages_v_blocks_features_features_link_uui_color ADD VALUE 'tertiary';
      END IF;
    END $$;
  `)

  // Add 'link' value if it doesn't exist
  console.log('  → Adding "link" to enum types...')
  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'link' AND enumtypid = 'enum_pages_blocks_cta_links_link_uui_color'::regtype) THEN
        ALTER TYPE enum_pages_blocks_cta_links_link_uui_color ADD VALUE 'link';
      END IF;
    END $$;
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'link' AND enumtypid = 'enum_pages_blocks_content_columns_link_uui_color'::regtype) THEN
        ALTER TYPE enum_pages_blocks_content_columns_link_uui_color ADD VALUE 'link';
      END IF;
    END $$;
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'link' AND enumtypid = 'enum_pages_blocks_button_block_buttons_link_uui_color'::regtype) THEN
        ALTER TYPE enum_pages_blocks_button_block_buttons_link_uui_color ADD VALUE 'link';
      END IF;
    END $$;
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'link' AND enumtypid = 'enum_pages_blocks_features_features_link_uui_color'::regtype) THEN
        ALTER TYPE enum_pages_blocks_features_features_link_uui_color ADD VALUE 'link';
      END IF;
    END $$;
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'link' AND enumtypid = 'enum__pages_v_blocks_cta_links_link_uui_color'::regtype) THEN
        ALTER TYPE enum__pages_v_blocks_cta_links_link_uui_color ADD VALUE 'link';
      END IF;
    END $$;
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'link' AND enumtypid = 'enum__pages_v_blocks_content_columns_link_uui_color'::regtype) THEN
        ALTER TYPE enum__pages_v_blocks_content_columns_link_uui_color ADD VALUE 'link';
      END IF;
    END $$;
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'link' AND enumtypid = 'enum__pages_v_blocks_button_block_buttons_link_uui_color'::regtype) THEN
        ALTER TYPE enum__pages_v_blocks_button_block_buttons_link_uui_color ADD VALUE 'link';
      END IF;
    END $$;
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'link' AND enumtypid = 'enum__pages_v_blocks_features_features_link_uui_color'::regtype) THEN
        ALTER TYPE enum__pages_v_blocks_features_features_link_uui_color ADD VALUE 'link';
      END IF;
    END $$;
  `)

  console.log('✅ Migration completed successfully!')
  console.log('   New values added: accent, tertiary, link')
  console.log('   Deprecated values preserved: link-color, link-gray (for backward compatibility)')
}

export async function down({ db: _db }: MigrateDownArgs): Promise<void> {
  console.log('⏪ Rolling back migration: Remove new button color variants...')
  console.log('   Note: PostgreSQL does not support removing enum values directly.')
  console.log('   Manual intervention required if rollback is needed.')
  console.log('✅ Rollback acknowledged (no action taken)')
}
