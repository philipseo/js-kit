import fs from 'node:fs/promises';

import { getRootChangelogMd } from '#/bin/create-github-release/utils';
import { MOCK_CHANGE_LOG_MD, MOCK_ERROR_MESSAGE, MOCK_PATH } from '#/constants';
import * as utils from '#/utils';

describe('getRootChangelogMd', () => {
  test('✅ Get Root CHANGELOG.md', async () => {
    jest.spyOn(utils, 'getRootPath').mockImplementationOnce(async () => {
      return MOCK_PATH;
    });
    jest.spyOn(fs, 'readFile').mockImplementationOnce(async () => {
      return MOCK_CHANGE_LOG_MD;
    });

    const result = await getRootChangelogMd();
    expect(utils.getRootPath).toHaveBeenCalled();
    expect(fs.readFile).toHaveBeenCalledWith(`${MOCK_PATH}/CHANGELOG.md`, {
      encoding: 'utf8',
    });
    expect(result).toBe('Mocked Changelog Content');
  });

  test('❗ Has an error get root CHANGELOG.md', async () => {
    jest.spyOn(utils, 'getRootPath').mockImplementationOnce(async () => {
      throw new Error(MOCK_ERROR_MESSAGE);
    });

    await expect(getRootChangelogMd()).rejects.toThrow(MOCK_ERROR_MESSAGE);
  });
});
