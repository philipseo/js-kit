import fs from 'node:fs/promises';

import { MOCK_ERROR_MESSAGE } from '#/constants';
import { getRootGitIgnorePatterns } from '#/utils';

describe('getRootGitIgnorePatterns function', () => {
  test('✅ get ignore patterns from root .gitignore', async () => {
    const rootGitIgnorePatterns = await getRootGitIgnorePatterns();

    expect(rootGitIgnorePatterns).not.toBeNull();
  });

  test('❗Has an Error get root git ignore patterns ', async () => {
    jest.spyOn(fs, 'readFile').mockImplementationOnce(() => {
      throw new Error(MOCK_ERROR_MESSAGE);
    });

    await expect(getRootGitIgnorePatterns).rejects.toThrow(MOCK_ERROR_MESSAGE);
  });
});
