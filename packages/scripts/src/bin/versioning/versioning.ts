import {
  getAllPackageJsonPaths,
  getGithubPrInfo,
  getNewVersion,
  getVersionType,
  updateVersion,
  upsertChangeLog,
} from '#/bin/versioning/utils';
import { OctokitProps } from '#/types/octokit/octokit';

async function versioning({ token, owner, repo, prNumber }: OctokitProps) {
  try {
    const githubPrInfo = await getGithubPrInfo({
      token,
      owner,
      repo,
      prNumber,
    });
    const versionType = getVersionType({ prTitle: githubPrInfo.prTitle });
    const newVersion = await getNewVersion({ versionType });
    const packageJsonPaths = await getAllPackageJsonPaths();

    for await (const packageJsonPath of packageJsonPaths) {
      await updateVersion({ path: packageJsonPath, newVersion });
      await upsertChangeLog({
        path: packageJsonPath.replace('/package.json', ''),
        newVersion,
        prInfo: githubPrInfo,
        owner,
        repo,
        prNumber,
      });
    }
  } catch (error) {
    console.error('❗ updatePackageVersion Error: ', error);
    throw error;
  }
}

export default versioning;
