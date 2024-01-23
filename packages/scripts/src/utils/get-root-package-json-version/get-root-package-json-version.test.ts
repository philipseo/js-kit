import { getPackageJson } from '#/bin/versioning/utils';
import {
  MOCK_ERROR_MESSAGE,
  MOCK_PACKAGE_JSON,
  MOCK_VERSION,
} from '#/constants';
import * as utils from '#/utils';

jest.mock('#/bin/versioning/utils/get-package-json', () => {
  return {
    getPackageJson: jest.fn().mockImplementation(() => {
      return MOCK_PACKAGE_JSON;
    }),
  };
});

describe('getRootPackageJsonVersion', () => {
  test('✅ Get root package.json version', async () => {
    jest.spyOn(utils, 'getRootPath').mockImplementationOnce(async () => {
      return '/mocked/root/path';
    });

    const result = await utils.getRootPackageJsonVersion();

    expect(utils.getRootPath).toHaveBeenCalled();
    expect(getPackageJson).toHaveBeenCalledWith({
      path: '/mocked/root/path/package.json',
    });
    expect(result).toBe(MOCK_VERSION);
  });

  test('❗ Has an error get new version', async () => {
    jest.spyOn(utils, 'getRootPath').mockImplementationOnce(async () => {
      throw new Error(MOCK_ERROR_MESSAGE);
    });

    await expect(utils.getRootPackageJsonVersion()).rejects.toThrow(
      MOCK_ERROR_MESSAGE,
    );
  });
});
