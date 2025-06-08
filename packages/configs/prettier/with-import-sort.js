import baseConfig from './base.js';

const config = {
  ...baseConfig,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: ['^nestjs', '^react', '^next', '<THIRD_PARTY_MODULES>', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export default config;