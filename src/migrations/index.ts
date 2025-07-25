import * as migration_20250725_191612 from './20250725_191612';

export const migrations = [
  {
    up: migration_20250725_191612.up,
    down: migration_20250725_191612.down,
    name: '20250725_191612'
  },
];
