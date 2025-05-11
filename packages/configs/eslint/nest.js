import { defineConfig } from 'eslint/config';
import globals from 'globals';

import baseConfig from './index';

export default defineConfig([
  {
    extends: [baseConfig],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
