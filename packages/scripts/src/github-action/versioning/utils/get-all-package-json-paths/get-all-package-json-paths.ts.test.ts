import * as utils from '#/github-action/utils';
import { getAllPackageJsonPaths } from '#/github-action/versioning/utils';

describe('getAllPackageJsonPaths', () => {
  test('✅ Get all package.json paths', async () => {
    const paths = await getAllPackageJsonPaths();

    paths.forEach((path) => {
      expect(path.includes('package.json')).toBe(true);
    });
  });

  test('❗ Has an error get all package json paths', async () => {
    jest.spyOn(utils, 'getRootPath').mockImplementationOnce(async () => {
      throw new Error('Not found root path');
    });
    await expect(getAllPackageJsonPaths()).rejects.toThrowError(
      'Not found root path',
    );
  });
});
