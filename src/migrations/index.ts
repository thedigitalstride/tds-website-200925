import * as migration_20250909_161006_initial from './20250909_161006_initial';
import * as migration_20250920_135157_add_nested_docs_to_pages from './20250920_135157_add_nested_docs_to_pages';

export const migrations = [
  {
    up: migration_20250909_161006_initial.up,
    down: migration_20250909_161006_initial.down,
    name: '20250909_161006_initial',
  },
  {
    up: migration_20250920_135157_add_nested_docs_to_pages.up,
    down: migration_20250920_135157_add_nested_docs_to_pages.down,
    name: '20250920_135157_add_nested_docs_to_pages'
  },
];
