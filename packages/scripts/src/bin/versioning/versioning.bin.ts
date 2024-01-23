#!/usr/bin/env node
import versioning from '#/bin/versioning/versioning';

const GITHUB_TOKEN = process.argv[2];
const GITHUB_REPOSITORY_OWNER = process.argv[3];
const GITHUB_REPOSITORY_NAME = process.argv[4];
const GITHUB_PULL_REQUEST_NUMBER = process.argv[5];

(async () => {
  await versioning({
    token: GITHUB_TOKEN,
    owner: GITHUB_REPOSITORY_OWNER,
    repo: GITHUB_REPOSITORY_NAME,
    prNumber: GITHUB_PULL_REQUEST_NUMBER,
  });
})();
