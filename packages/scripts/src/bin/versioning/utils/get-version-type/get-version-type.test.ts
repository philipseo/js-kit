import { getVersionType } from '#/bin/versioning/utils';

describe('getVersionType', () => {
  test('✅ Checking if a GitHub PR title indicates a major version', () => {
    expect(getVersionType({ prTitle: 'major: test' })).toBe('major');
  });

  test('✅ Checking if a GitHub PR title indicates a minor version', () => {
    expect(getVersionType({ prTitle: 'feature: test' })).toBe('minor');
    expect(getVersionType({ prTitle: 'feat: test' })).toBe('minor');
  });

  test('✅ Checking if a GitHub PR title indicates a patch version', () => {
    expect(getVersionType({ prTitle: 'fix: test' })).toBe('patch');
    expect(getVersionType({ prTitle: 'patch: test' })).toBe('patch');
    expect(getVersionType({ prTitle: 'unknown: test' })).toBe('patch');
  });

  test('❗ Has an error get version type', () => {
    expect(() => {
      getVersionType({ prTitle: '' });
    }).toThrowError('PR Title is invalid');
  });
});
