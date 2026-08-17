import sortImports from '@trivago/prettier-plugin-sort-imports';

/** @type {import("prettier").Config} */
const config = {
  arrowParens: 'always',
  bracketSpacing: true,
  htmlWhitespaceSensitivity: 'css',
  insertPragma: false,
  bracketSameLine: false,
  proseWrap: 'always',
  quoteProps: 'as-needed',
  requirePragma: false,
  useTabs: false,
  semi: true,
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  trailingComma: 'all',
  endOfLine: 'lf',
  plugins: [sortImports],
  importOrder: ['^nestjs', '^react', '^next', '<THIRD_PARTY_MODULES>', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export default config;
