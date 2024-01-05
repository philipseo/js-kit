import { access, constants } from 'node:fs/promises';
import { dirname, join, parse } from 'node:path';

import { PNPM_LOCK_YAML } from '#/github-action/utils/get-root-path/get-root-path.constants';

async function getRootPath() {
  try {
    const currentCwd = process.cwd();
    const rootPath = parse(currentCwd).root;
    let lastCwd = currentCwd;

    while (lastCwd !== rootPath && lastCwd !== '/') {
      try {
        const currentTargetPath = join(lastCwd, PNPM_LOCK_YAML);
        await access(currentTargetPath, constants.R_OK);

        return dirname(currentTargetPath);
      } catch (error) {
        lastCwd = dirname(lastCwd);
      }
    }

    throw new Error('Unable to find root path');
  } catch (error) {
    console.error('❗ getRootPath Failed: ', error);
    throw error;
  }
}

export default getRootPath;
