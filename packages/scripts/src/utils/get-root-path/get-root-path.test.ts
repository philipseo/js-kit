import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { getRootPath } from '#/utils';
import { PNPM_LOCK_YAML } from '#/utils/get-root-path/get-root-path.constants';

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

    await expect(getRootPath).rejects.toThrow('Unable to find root path');
  });
});
