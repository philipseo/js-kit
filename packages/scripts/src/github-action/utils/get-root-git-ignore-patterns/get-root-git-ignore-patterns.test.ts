import fs from 'node:fs/promises';

import { getRootGitIgnorePatterns } from '#/github-action/utils';

describe('getRootGitIgnorePatterns function', () => {
  test('✅ get ignore patterns from root .gitignore', async () => {
    const rootGitIgnorePatterns = await getRootGitIgnorePatterns();

    expect(rootGitIgnorePatterns).not.toBeNull();
  });

  test('❗Has an Error get root git ignore patterns ', async () => {
    jest.spyOn(fs, 'readFile').mockImplementationOnce(() => {
      throw new Error('File Not Found');
    });

    await expect(getRootGitIgnorePatterns).rejects.toThrowError(
      'File Not Found',
    );
  });
});
