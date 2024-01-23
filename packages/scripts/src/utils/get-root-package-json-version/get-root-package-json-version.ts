import { getPackageJson } from '#/bin/versioning/utils';
import { getRootPath } from '#/utils';

async function getRootPackageJsonVersion() {
  try {
    const rootPath = await getRootPath();
    const rootPackageJsonPath = `${rootPath}/package.json`;
    const currentRootPackageJson = await getPackageJson({
      path: rootPackageJsonPath,
    });

    return currentRootPackageJson.version;
  } catch (error) {
    console.error('❗ getRootPackageJsonVersion Error: ', error);
    throw error;
  }
}

export default getRootPackageJsonVersion;
