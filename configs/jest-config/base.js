module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  testPathIgnorePatterns: ['node_modules', 'dist'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  coverageReporters: ['json'],
};
