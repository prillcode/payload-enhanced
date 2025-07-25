import * as migration_20250721_190057 from './20250721_190057';
import * as migration_20250723_202858 from './20250723_202858';
import * as migration_20250723_215707 from './20250723_215707';
import * as migration_20250725_114431 from './20250725_114431';

export const migrations = [
  {
    up: migration_20250721_190057.up,
    down: migration_20250721_190057.down,
    name: '20250721_190057',
  },
  {
    up: migration_20250723_202858.up,
    down: migration_20250723_202858.down,
    name: '20250723_202858',
  },
  {
    up: migration_20250723_215707.up,
    down: migration_20250723_215707.down,
    name: '20250723_215707',
  },
  {
    up: migration_20250725_114431.up,
    down: migration_20250725_114431.down,
    name: '20250725_114431'
  },
];
