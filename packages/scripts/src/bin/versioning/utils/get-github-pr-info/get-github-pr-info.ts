import { Octokit } from '@octokit/rest';

import type { GithubPrInfo } from '#/bin/versioning/utils/get-github-pr-info/get-github-pr-info.types';
import { OctokitProps } from '#/types/octokit/octokit';

export type GetGithubPrInfoReturn = Promise<GithubPrInfo>;

async function getGithubPrInfo({
  token,
  owner,
  repo,
  prNumber,
}: OctokitProps): GetGithubPrInfoReturn {
  try {
    const octokit = new Octokit({
      auth: token,
    });

    // Get PR Info and changed files
    const [prInfoResponse, changedFilesResponse] = await Promise.all([
      octokit.pulls.get({
        owner,
        repo,
        pull_number: Number(prNumber),
      }),
      octokit.pulls.listFiles({
        owner,
        repo,
        pull_number: Number(prNumber),
      }),
    ]);

    return {
      prTitle: prInfoResponse?.data?.title,
      changedFiles: changedFilesResponse?.data?.map((file) => file.filename),
    };
  } catch (error) {
    console.error('❗ getGithubPrInfo Error: ' + error);
    throw error;
  }
}

export default getGithubPrInfo;
