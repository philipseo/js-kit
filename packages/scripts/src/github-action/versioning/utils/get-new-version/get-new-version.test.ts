import { getNewVersion, VERSION_TYPE } from '#/github-action/versioning/utils';
import * as getPackageJson from '#/github-action/versioning/utils/get-package-json';

jest.mock('#/github-action/versioning/utils/get-package-json', () => {
  return {
    getPackageJson: jest.fn().mockImplementation(() => {
      return { version: '1.2.3' };
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
        throw new Error('Not found root package.json');
      });

    await expect(async () => {
      await getNewVersion({ versionType: VERSION_TYPE.PATCH });
    }).rejects.toThrowError('Not found root package.json');
  });
});
