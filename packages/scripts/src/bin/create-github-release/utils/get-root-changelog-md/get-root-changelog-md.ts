import { readFile } from 'node:fs/promises';

import { getRootPath } from '#/utils';

async function getRootChangelogMd() {
  try {
    const rootPath = await getRootPath();
    const rootChangelogMdPath = `${rootPath}/CHANGELOG.md`;

    return readFile(rootChangelogMdPath, {
      encoding: 'utf8',
    });
  } catch (error) {
    console.error('❗ getRootChangelogMd Error: ', error);
    throw error;
  }
}

export default getRootChangelogMd;
