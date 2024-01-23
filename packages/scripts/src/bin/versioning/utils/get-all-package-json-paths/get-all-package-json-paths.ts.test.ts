import { getAllPackageJsonPaths } from '#/bin/versioning/utils';
import { MOCK_ERROR_MESSAGE } from '#/constants';
import * as utils from '#/utils';

describe('getAllPackageJsonPaths', () => {
  test('✅ Get all package.json paths', async () => {
    const paths = await getAllPackageJsonPaths();

    paths.forEach((path) => {
      expect(path.includes('package.json')).toBe(true);
    });
  });

  test('❗ Has an error get all package json paths', async () => {
    jest.spyOn(utils, 'getRootPath').mockImplementationOnce(async () => {
      throw new Error(MOCK_ERROR_MESSAGE);
    });
    await expect(getAllPackageJsonPaths()).rejects.toThrow(MOCK_ERROR_MESSAGE);
  });
});
