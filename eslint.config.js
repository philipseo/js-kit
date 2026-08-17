import baseConfig from '@philipseo/configs/eslint/base';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '.pnpm-store/**',
      '.turbo/**',
    ],
  },
  {
    extends: [baseConfig],
  },
]);
