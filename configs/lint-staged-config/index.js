module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint', 'prettier --check'],
  '*.{js,jsx,ts,tsx,css,scss}': ['stylelint'],
  '*.{md,mdx,html,json,yml,yaml}': ['prettier --check'],
};
