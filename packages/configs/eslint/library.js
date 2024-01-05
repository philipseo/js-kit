module.exports = {
  extends: [require.resolve('./node'), require.resolve('./typescript')],
  ignorePatterns: ['!.*.js', 'node_modules/', 'dist/'],
};
