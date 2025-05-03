/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve('@ianvs/prettier-plugin-sort-imports')],
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
  importOrder: [
    '<BUILTIN_MODULES>',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '^#/(.*)$',
    '',
    '^[.]',
  ],
};

module.exports = config;
