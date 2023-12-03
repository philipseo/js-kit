module.exports = {
  extends: ['stylelint-config-standard'],
  overrides: [
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      customSyntax: 'postcss-lit',
    },
  ],
};
