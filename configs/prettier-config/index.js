/** @type {import("prettier").Config} */
const config = {
  useTabs: false,
  semi: true,
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  trailingComma: 'all',
  endOfLine: 'lf',
  arrowParens: 'always',
  importOrder: ['<THIRD_PARTY_MODULES>', '^#/(.*)$', '^[./]'],
  importOrderSeparation: true,
};

module.exports = config;
