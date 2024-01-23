import { getNewVersion, VERSION_TYPE } from '#/bin/versioning/utils';
import * as getPackageJson from '#/bin/versioning/utils/get-package-json';
import { MOCK_ERROR_MESSAGE, MOCK_PACKAGE_JSON } from '#/constants';

jest.mock('#/bin/versioning/utils/get-package-json', () => {
  return {
    getPackageJson: jest.fn().mockImplementation(() => {
      return MOCK_PACKAGE_JSON;
    }),
  };
});

describe('getNewVersion', () => {
  test('✅ Major version update', async () => {
    const result = await getNewVersion({ versionType: VERSION_TYPE.MAJOR });
    expect(result).toBe('2.0.0');
  });

  test('✅ Minor version update', async () => {
    const result = await getNewVersion({ versionType: VERSION_TYPE.MINOR });
    expect(result).toBe('1.3.0');
  });

  test('✅ Patch version update', async () => {
    const result = await getNewVersion({ versionType: VERSION_TYPE.PATCH });
    expect(result).toBe('1.2.4');
  });

  test('❗ Has an error get new version', async () => {
    jest
      .spyOn(getPackageJson, 'getPackageJson')
      .mockImplementationOnce(async () => {
        throw new Error(MOCK_ERROR_MESSAGE);
      });

    await expect(
      getNewVersion({ versionType: VERSION_TYPE.PATCH }),
    ).rejects.toThrow(MOCK_ERROR_MESSAGE);
  });
});
