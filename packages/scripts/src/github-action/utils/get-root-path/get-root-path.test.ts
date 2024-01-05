import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { getRootPath } from '#/github-action/utils';
import { PNPM_LOCK_YAML } from '#/github-action/utils/get-root-path/get-root-path.constants';

describe('getRootPath', () => {
  test('✅ get root path', async () => {
    const rootPath = await getRootPath();
    const targetFilePath = join(rootPath, PNPM_LOCK_YAML);

    expect(existsSync(targetFilePath)).toBe(true);
  });

  test('❗Has an error get root path', async () => {
    jest.spyOn(process, 'cwd').mockImplementationOnce(() => {
      return '/';
    });

    await expect(getRootPath).rejects.toThrowError('Unable to find root path');
  });
});
