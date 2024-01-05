module.exports = {
  env: {
    es2024: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'prettier',
    require.resolve('./rules/import'),
  ],
  parserOptions: {
    ecmaVersion: 2024,
  },
  ignorePatterns: ['!.*.js', 'node_modules/'],
};
