import { writeFile } from 'node:fs/promises';

import { getPackageJson } from '#/github-action/versioning/utils';

interface UpdateVersionProps {
  /* package.json path */
  path: string;
  /* new version */
  newVersion: string;
}

async function updateVersion({ path, newVersion }: UpdateVersionProps) {
  try {
    const packageJsonContent = await getPackageJson({
      path,
    });
    packageJsonContent.version = newVersion;

    await writeFile(
      path,
      JSON.stringify(packageJsonContent, null, 2).replace(/\r\n/g, '\n'),
      {
        encoding: 'utf-8',
      },
    );
  } catch (error) {
    console.error('❗ updateVersion Error: ', error);
    throw error;
  }
}

export default updateVersion;
