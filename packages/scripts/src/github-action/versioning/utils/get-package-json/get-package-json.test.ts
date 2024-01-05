import fs from 'node:fs/promises';

import { getRootPath } from '#/github-action/utils';
import { getPackageJson } from '#/github-action/versioning/utils';

describe('getPackageJsonPath function', () => {
  test('✅ Get Package Json Path', async () => {
    const ROOT_PATH = await getRootPath();
    const ROOT_PACKAGE_JSON = await getPackageJson({
      path: `${ROOT_PATH}/package.json`,
    });

    expect(ROOT_PACKAGE_JSON.name).toBe('@philipseo/js-kit');
  });

  test('❗ Has an error get package.json path', async () => {
    jest.spyOn(fs, 'readFile').mockImplementationOnce(() => {
      throw new Error('File Not Found');
    });

    await expect(async () => {
      await getPackageJson({ path: '' });
    }).rejects.toThrowError('File Not Found');
  });
});
