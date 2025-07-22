import * as migration_20250721_190057 from './20250721_190057';

export const migrations = [
  {
    up: migration_20250721_190057.up,
    down: migration_20250721_190057.down,
    name: '20250721_190057'
  },
];
