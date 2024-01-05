module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/react',
    require.resolve('./typescript'),
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
