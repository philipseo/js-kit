import { writeFile } from 'node:fs/promises';

import * as utils from '#/bin/versioning/utils';
import {
  MOCK_ERROR_MESSAGE,
  MOCK_NEW_VERSION,
  MOCK_PACKAGE_JSON,
  MOCK_PACKAGE_JSON_PATH,
} from '#/constants';

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

    await utils.updateVersion({
      path: MOCK_PACKAGE_JSON_PATH,
      newVersion: MOCK_NEW_VERSION,
    });

    expect(utils.getPackageJson).toHaveBeenCalledWith({
      path: MOCK_PACKAGE_JSON_PATH,
    });

    expect(writeFile).toHaveBeenCalledWith(
      MOCK_PACKAGE_JSON_PATH,
      JSON.stringify({ version: MOCK_NEW_VERSION }, null, 2).replace(
        /\r\n/g,
        '\n',
      ),
      { encoding: 'utf-8' },
    );

    spyGetPackageJson.mockRestore();
  });

  test('❗ Has an error update version', async () => {
    const spyGetPackageJson = jest
      .spyOn(utils, 'getPackageJson')
      .mockRejectedValue(new Error(MOCK_ERROR_MESSAGE));

    await expect(
      utils.updateVersion({
        path: MOCK_PACKAGE_JSON_PATH,
        newVersion: MOCK_NEW_VERSION,
      }),
    ).rejects.toThrow(MOCK_ERROR_MESSAGE);

    spyGetPackageJson.mockRestore();
  });
});
