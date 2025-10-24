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
import * as migration_20251005_163000_add_features_block from './20251005_163000_add_features_block';
import * as migration_20251005_164500_fix_features_enums from './20251005_164500_fix_features_enums';
import * as migration_20251005_222355_add_latest_posts_block from './20251005_222355_add_latest_posts_block';
import * as migration_20251006_153732 from './20251006_153732';
import * as migration_20251006_172209 from './20251006_172209';
import * as migration_20251007_154811 from './20251007_154811';
import * as migration_20251007_172800 from './20251007_172800';
import * as migration_20251008_135809 from './20251008_135809';
import * as migration_20251008_184058 from './20251008_184058';
import * as migration_20251009_181822 from './20251009_181822';
import * as migration_20251009_210214 from './20251009_210214';
import * as migration_20251011_154900 from './20251011_154900';
import * as migration_20251011_190000_add_accent_enum from './20251011_190000_add_accent_enum';
import * as migration_20251012_074055 from './20251012_074055';
import * as migration_20251012_162701 from './20251012_162701';
import * as migration_20251012_181348 from './20251012_181348';
import * as migration_20251013_102956 from './20251013_102956';
import * as migration_20251015_081708 from './20251015_081708';
import * as migration_20251020_114557 from './20251020_114557';
import * as migration_20251020_173501 from './20251020_173501';
import * as migration_20251020_211144 from './20251020_211144';
import * as migration_20251021_155105 from './20251021_155105';
import * as migration_20251021_170614 from './20251021_170614';
import * as migration_20251022_133849 from './20251022_133849';
import * as migration_20251022_163528 from './20251022_163528';
import * as migration_20251022_183632 from './20251022_183632';
import * as migration_20251023_104410 from './20251023_104410';
import * as migration_20251023_114744 from './20251023_114744';
import * as migration_20251023_191326 from './20251023_191326';
import * as migration_20251024_142123 from './20251024_142123';
import * as migration_20251024_155919 from './20251024_155919';
import * as migration_20251024_223505 from './20251024_223505';

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
    up: migration_20251005_163000_add_features_block.up,
    down: migration_20251005_163000_add_features_block.down,
    name: '20251005_163000_add_features_block',
  },
  {
    up: migration_20251005_164500_fix_features_enums.up,
    down: migration_20251005_164500_fix_features_enums.down,
    name: '20251005_164500_fix_features_enums',
  },
  {
    up: migration_20251005_222355_add_latest_posts_block.up,
    down: migration_20251005_222355_add_latest_posts_block.down,
    name: '20251005_222355_add_latest_posts_block',
  },
  {
    up: migration_20251006_153732.up,
    down: migration_20251006_153732.down,
    name: '20251006_153732',
  },
  {
    up: migration_20251006_172209.up,
    down: migration_20251006_172209.down,
    name: '20251006_172209',
  },
  {
    up: migration_20251007_154811.up,
    down: migration_20251007_154811.down,
    name: '20251007_154811',
  },
  {
    up: migration_20251007_172800.up,
    down: migration_20251007_172800.down,
    name: '20251007_172800',
  },
  {
    up: migration_20251008_135809.up,
    down: migration_20251008_135809.down,
    name: '20251008_135809',
  },
  {
    up: migration_20251008_184058.up,
    down: migration_20251008_184058.down,
    name: '20251008_184058',
  },
  {
    up: migration_20251009_181822.up,
    down: migration_20251009_181822.down,
    name: '20251009_181822',
  },
  {
    up: migration_20251009_210214.up,
    down: migration_20251009_210214.down,
    name: '20251009_210214',
  },
  {
    up: migration_20251011_154900.up,
    down: migration_20251011_154900.down,
    name: '20251011_154900',
  },
  {
    up: migration_20251011_190000_add_accent_enum.up,
    down: migration_20251011_190000_add_accent_enum.down,
    name: '20251011_190000_add_accent_enum',
  },
  {
    up: migration_20251012_074055.up,
    down: migration_20251012_074055.down,
    name: '20251012_074055',
  },
  {
    up: migration_20251012_162701.up,
    down: migration_20251012_162701.down,
    name: '20251012_162701',
  },
  {
    up: migration_20251012_181348.up,
    down: migration_20251012_181348.down,
    name: '20251012_181348',
  },
  {
    up: migration_20251013_102956.up,
    down: migration_20251013_102956.down,
    name: '20251013_102956',
  },
  {
    up: migration_20251015_081708.up,
    down: migration_20251015_081708.down,
    name: '20251015_081708',
  },
  {
    up: migration_20251020_114557.up,
    down: migration_20251020_114557.down,
    name: '20251020_114557',
  },
  {
    up: migration_20251020_173501.up,
    down: migration_20251020_173501.down,
    name: '20251020_173501',
  },
  {
    up: migration_20251020_211144.up,
    down: migration_20251020_211144.down,
    name: '20251020_211144',
  },
  {
    up: migration_20251021_155105.up,
    down: migration_20251021_155105.down,
    name: '20251021_155105',
  },
  {
    up: migration_20251021_170614.up,
    down: migration_20251021_170614.down,
    name: '20251021_170614',
  },
  {
    up: migration_20251022_133849.up,
    down: migration_20251022_133849.down,
    name: '20251022_133849',
  },
  {
    up: migration_20251022_163528.up,
    down: migration_20251022_163528.down,
    name: '20251022_163528',
  },
  {
    up: migration_20251022_183632.up,
    down: migration_20251022_183632.down,
    name: '20251022_183632',
  },
  {
    up: migration_20251023_104410.up,
    down: migration_20251023_104410.down,
    name: '20251023_104410',
  },
  {
    up: migration_20251023_114744.up,
    down: migration_20251023_114744.down,
    name: '20251023_114744',
  },
  {
    up: migration_20251023_191326.up,
    down: migration_20251023_191326.down,
    name: '20251023_191326',
  },
  {
    up: migration_20251024_142123.up,
    down: migration_20251024_142123.down,
    name: '20251024_142123',
  },
  {
    up: migration_20251024_155919.up,
    down: migration_20251024_155919.down,
    name: '20251024_155919',
  },
  {
    up: migration_20251024_223505.up,
    down: migration_20251024_223505.down,
    name: '20251024_223505'
  },
];
