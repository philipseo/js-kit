import { existsSync, statSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

import { DEFAULT_IGNORE_PATTERNS } from '#/github-action/constants';
import {
  getRootGitIgnorePatterns,
  getRootPath,
  isIgnoredPattern,
} from '#/github-action/utils';

async function getAllPackageJsonPaths() {
  try {
    const rootPath = await getRootPath();
    const rootGitIgnorePatterns = await getRootGitIgnorePatterns();
    const ignorePatterns = [
      ...DEFAULT_IGNORE_PATTERNS,
      ...rootGitIgnorePatterns,
    ];
    const paths: string[] = [];

    // eslint-disable-next-line no-inner-declarations
    async function recursiveGetPackageJsonPaths(currentDirectoryPath: string) {
      const currentDirectoryPackageJsonPath = path.join(
        currentDirectoryPath,
        'package.json',
      );

      if (existsSync(currentDirectoryPackageJsonPath)) {
        paths.push(currentDirectoryPackageJsonPath);
      }

      const subItems = await readdir(currentDirectoryPath);

      for (const subItem of subItems) {
        const isDirectory = statSync(
          path.join(currentDirectoryPath, subItem),
        ).isDirectory();

        if (
          !isIgnoredPattern({
            ignorePatterns: ignorePatterns,
            pattern: subItem,
          }) &&
          isDirectory
        ) {
          await recursiveGetPackageJsonPaths(
            path.join(currentDirectoryPath, subItem),
          );
        }
      }
    }

    await recursiveGetPackageJsonPaths(rootPath);

    return paths;
  } catch (error) {
    console.error('❗ getAllPackageJsonPaths Error: ', error);
    throw error;
  }
}

export default getAllPackageJsonPaths;
