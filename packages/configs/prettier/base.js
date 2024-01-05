/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve('@ianvs/prettier-plugin-sort-imports')],
  useTabs: false,
  semi: true,
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  trailingComma: 'all',
  endOfLine: 'lf',
  arrowParens: 'always',
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
