import { getRootPath } from '#/github-action/utils';
import { getPackageJson, VERSION_TYPE } from '#/github-action/versioning/utils';
import type { VersionType } from '#/github-action/versioning/utils';

interface GetNewVersionProps {
  versionType: VersionType;
}

async function getNewVersion({ versionType }: GetNewVersionProps) {
  try {
    const rootPath = await getRootPath();
    const rootPackageJson = await getPackageJson({
      path: `${rootPath}/package.json`,
    });
    const currentVersion = rootPackageJson.version;
    const currentVersionSegments = currentVersion.split('.');

    switch (versionType) {
      case VERSION_TYPE.MAJOR:
        return `${Number(currentVersionSegments[0]) + 1}.0.0`;
      case VERSION_TYPE.MINOR:
        return `${currentVersionSegments[0]}.${
          Number(currentVersionSegments[1]) + 1
        }.0`;
      case VERSION_TYPE.PATCH:
      default:
        return `${currentVersionSegments[0]}.${currentVersionSegments[1]}.${
          Number(currentVersionSegments[2]) + 1
        }`;
    }
  } catch (error) {
    console.error('❗ getNewVersion Error: ', error);
    throw error;
  }
}

export default getNewVersion;
