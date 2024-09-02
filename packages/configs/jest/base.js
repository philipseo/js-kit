/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  modulePathIgnorePatterns: ['/node_modules', '/dist'],
  transformIgnorePatterns: ['/node_modules/(?!(ansi-regex)/)'],
  coverageReporters: ['json', 'text'],
  changedSince: 'origin/main',
};
