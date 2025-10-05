import * as migration_20250909_161006_initial from './20250909_161006_initial';
import * as migration_20250920_135157_add_nested_docs_to_pages from './20250920_135157_add_nested_docs_to_pages';
import * as migration_20250921_104510 from './20250921_104510';
import * as migration_20250924_202354 from './20250924_202354';
import * as migration_20250924_204556_header_navigation_cms from './20250924_204556_header_navigation_cms';
import * as migration_20250925_195747 from './20250925_195747';
import * as migration_20250925_204703 from './20250925_204703';
import * as migration_20250925_205027 from './20250925_205027';
import * as migration_20250926_194105 from './20250926_194105';
import * as migration_20250929_213200_add_button_block from './20250929_213200_add_button_block';
import * as migration_20250929_215500_header_dropdown_icon_to_varchar from './20250929_215500_header_dropdown_icon_to_varchar';
import * as migration_20251002_095731 from './20251002_095731';
import * as migration_20251004_222500_update_icon_theme_enum from './20251004_222500_update_icon_theme_enum';
import * as migration_20251004_add_button_variants from './20251004_add_button_variants';
import * as migration_20251005_073233 from './20251005_073233';

export const migrations = [
  {
    up: migration_20250909_161006_initial.up,
    down: migration_20250909_161006_initial.down,
    name: '20250909_161006_initial',
  },
  {
    up: migration_20250920_135157_add_nested_docs_to_pages.up,
    down: migration_20250920_135157_add_nested_docs_to_pages.down,
    name: '20250920_135157_add_nested_docs_to_pages',
  },
  {
    up: migration_20250921_104510.up,
    down: migration_20250921_104510.down,
    name: '20250921_104510',
  },
  {
    up: migration_20250924_202354.up,
    down: migration_20250924_202354.down,
    name: '20250924_202354',
  },
  {
    up: migration_20250924_204556_header_navigation_cms.up,
    down: migration_20250924_204556_header_navigation_cms.down,
    name: '20250924_204556_header_navigation_cms',
  },
  {
    up: migration_20250925_195747.up,
    down: migration_20250925_195747.down,
    name: '20250925_195747',
  },
  {
    up: migration_20250925_204703.up,
    down: migration_20250925_204703.down,
    name: '20250925_204703',
  },
  {
    up: migration_20250925_205027.up,
    down: migration_20250925_205027.down,
    name: '20250925_205027',
  },
  {
    up: migration_20250926_194105.up,
    down: migration_20250926_194105.down,
    name: '20250926_194105',
  },
  {
    up: migration_20250929_213200_add_button_block.up,
    down: migration_20250929_213200_add_button_block.down,
    name: '20250929_213200_add_button_block',
  },
  {
    up: migration_20250929_215500_header_dropdown_icon_to_varchar.up,
    down: migration_20250929_215500_header_dropdown_icon_to_varchar.down,
    name: '20250929_215500_header_dropdown_icon_to_varchar',
  },
  {
    up: migration_20251002_095731.up,
    down: migration_20251002_095731.down,
    name: '20251002_095731',
  },
  {
    up: migration_20251004_222500_update_icon_theme_enum.up,
    down: migration_20251004_222500_update_icon_theme_enum.down,
    name: '20251004_222500_update_icon_theme_enum',
  },
  {
    up: migration_20251004_add_button_variants.up,
    down: migration_20251004_add_button_variants.down,
    name: '20251004_add_button_variants',
  },
  {
    up: migration_20251005_073233.up,
    down: migration_20251005_073233.down,
    name: '20251005_073233'
  },
];
