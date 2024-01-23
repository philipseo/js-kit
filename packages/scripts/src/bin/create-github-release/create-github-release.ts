import { Octokit } from '@octokit/rest';

import { getRootChangelogMd } from '#/bin/create-github-release/utils';
import type { OctokitProps } from '#/types/octokit/octokit';
import { getRootPackageJsonVersion } from '#/utils';

type CreateGithubReleaseProps = Omit<OctokitProps, 'prNumber'>;

async function createGithubRelease({
  token,
  owner,
  repo,
}: CreateGithubReleaseProps) {
  try {
    const octokit = new Octokit({
      auth: token,
    });
    const rootChangelogMd = await getRootChangelogMd();
    const rootPackageJsonVersion = await getRootPackageJsonVersion();
    const currentVersion = `v${rootPackageJsonVersion}`;

    await octokit.repos.createRelease({
      owner,
      repo,
      tag_name: currentVersion,
      name: currentVersion,
      body: rootChangelogMd,
    });
  } catch (error) {
    console.error('❗ createGithubRelease Error: ', error);
    throw error;
  }
}

export default createGithubRelease;
