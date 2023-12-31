import { Octokit } from '@octokit/rest';

import type { OctokitProps } from '#/github-action/versioning/versioning.types';

interface CreateGithubReleaseProps extends Omit<OctokitProps, 'prNumber'> {
  newVersion: string;
  changelogContent: string;
}

async function createGithubRelease({
  changelogContent,
  newVersion,
  token,
  owner,
  repo,
}: CreateGithubReleaseProps) {
  const octokit = new Octokit({
    auth: token,
  });

  const version = `v${newVersion}`;
  await octokit.repos.createRelease({
    owner,
    repo,
    tag_name: version,
    name: version,
    body: changelogContent,
  });
}

export default createGithubRelease;
