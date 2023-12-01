/** @type {import("prettier").Config} */
const config = {
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  useTabs: false,
  semi: true,
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  trailingComma: 'all',
  endOfLine: 'lf',
  arrowParens: 'always',
  importOrder: ['^#/(.*)$', '^[./]'],
  importOrderSeparation: true,
};

module.exports = config;
