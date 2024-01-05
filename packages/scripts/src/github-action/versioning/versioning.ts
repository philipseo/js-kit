import {
  getAllPackageJsonPaths,
  getGithubPrInfo,
  getNewVersion,
  getVersionType,
  updateVersion,
  upsertChangeLog,
} from '#/github-action/versioning/utils';

const GITHUB_TOKEN = process.argv[2];
const GITHUB_OWNER = process.argv[3];
const GITHUB_REPO = process.argv[4];
const GITHUB_PR_NUMBER = process.argv[5];

async function versioning() {
  try {
    const githubPrInfo = await getGithubPrInfo({
      token: GITHUB_TOKEN,
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      prNumber: GITHUB_PR_NUMBER,
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
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        prNumber: GITHUB_PR_NUMBER,
      });
    }
  } catch (error) {
    console.error('❗ updatePackageVersion Error: ', error);
    throw error;
  }
}

export default versioning;
