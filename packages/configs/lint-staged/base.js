const prettier = require('./prettier');

module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --ignore-path .eslintignore'],
  ...prettier,
};
