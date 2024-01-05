import { writeFile } from 'node:fs/promises';

import * as utils from '#/github-action/versioning/utils';

const MOCK_PATH = '/path/package.json';
const MOCK_NEW_VERSION = '2.0.0';
const MOCK_PACKAGE_JSON = {
  version: '1.0.0',
};

jest.mock('node:fs/promises', () => {
  return {
    writeFile: jest.fn(),
  };
});

describe('updateVersion', () => {
  test('✅ update version in package.json file', async () => {
    const spyGetPackageJson = jest
      .spyOn(utils, 'getPackageJson')
      .mockResolvedValue(MOCK_PACKAGE_JSON);

    const newVersion = '2.0.0';

    await utils.updateVersion({
      path: MOCK_PATH,
      newVersion: MOCK_NEW_VERSION,
    });

    expect(utils.getPackageJson).toHaveBeenCalledWith({
      path: MOCK_PATH,
    });

    expect(writeFile).toHaveBeenCalledWith(
      MOCK_PATH,
      JSON.stringify({ version: newVersion }, null, 2).replace(/\r\n/g, '\n'),
      { encoding: 'utf-8' },
    );

    spyGetPackageJson.mockRestore();
  });

  test('❗ Has an error update version', async () => {
    const spyGetPackageJson = jest
      .spyOn(utils, 'getPackageJson')
      .mockRejectedValue(new Error('Mocked getPackageJson error'));

    await expect(
      utils.updateVersion({ path: MOCK_PATH, newVersion: MOCK_NEW_VERSION }),
    ).rejects.toThrow();

    spyGetPackageJson.mockRestore();
  });
});
