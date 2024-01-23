#!/usr/bin/env node
import createGithubRelease from '#/bin/create-github-release/create-github-release';

const GITHUB_TOKEN = process.argv[2];
const GITHUB_REPOSITORY_OWNER = process.argv[3];
const GITHUB_REPOSITORY_NAME = process.argv[4];

(async () => {
  await createGithubRelease({
    token: GITHUB_TOKEN,
    owner: GITHUB_REPOSITORY_OWNER,
    repo: GITHUB_REPOSITORY_NAME,
  });
})();
