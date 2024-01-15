import type { GithubPrInfo } from '#/bin/versioning/utils';
import type { VersionType } from '#/bin/versioning/utils/get-version-type/get-version-type.types';

type GetVersionTypeProps = Pick<GithubPrInfo, 'prTitle'>;

type GetVersionTypeReturn = VersionType;

function getVersionType({
  prTitle,
}: GetVersionTypeProps): GetVersionTypeReturn {
  try {
    const splitPrTitle = prTitle.split(':');

    if (splitPrTitle.length <= 1) {
      throw new Error('PR Title is invalid');
    } else {
      const prefix = splitPrTitle[0].trim().toLowerCase();

      switch (prefix) {
        case 'major':
          return 'major';
        case 'feature':
        case 'feat':
          return 'minor';
        default:
          return 'patch';
      }
    }
  } catch (error) {
    console.error('❗ getVersionType Failed: ', error);
    throw error;
  }
}

export default getVersionType;
