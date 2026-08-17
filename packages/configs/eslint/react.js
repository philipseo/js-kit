import reactHooks from 'eslint-plugin-react-hooks';
import { reactRefresh } from 'eslint-plugin-react-refresh';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

import baseConfig from './base.js';

export default defineConfig({
  files: ['**/*.{mjs,js,cjs,jsx,mts,ts,cts,tsx}'],
  extends: [
    baseConfig,
    reactHooks.configs.flat.recommended,
    reactRefresh.configs.vite(),
  ],
  languageOptions: {
    globals: globals.browser,
  },
});
