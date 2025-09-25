import * as migration_20250909_161006_initial from './20250909_161006_initial';
import * as migration_20250920_135157_add_nested_docs_to_pages from './20250920_135157_add_nested_docs_to_pages';
import * as migration_20250921_104510 from './20250921_104510';
import * as migration_20250924_202354 from './20250924_202354';
import * as migration_20250924_204556_header_navigation_cms from './20250924_204556_header_navigation_cms';

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
    name: '20250924_204556_header_navigation_cms'
  },
];
