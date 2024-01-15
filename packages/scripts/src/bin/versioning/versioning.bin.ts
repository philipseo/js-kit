#!/usr/bin/env node
import { getPackageJson } from '#/bin/versioning/utils';
import versioning from '#/bin/versioning/versioning';
import { getRootPath } from '#/utils';

const GITHUB_TOKEN = process.argv[2];
const GITHUB_OWNER = process.argv[3];
const GITHUB_REPO = process.argv[4];
const GITHUB_PR_NUMBER = process.argv[5];

(async () => {
  const rootPath = await getRootPath();
  const rootPackageJsonPath = `${rootPath}/package.json`;
  const currentRootPackageJson = await getPackageJson({
    path: rootPackageJsonPath,
  });
  console.info('Current Version: ', currentRootPackageJson.version);

  await versioning({
    token: GITHUB_TOKEN,
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    prNumber: GITHUB_PR_NUMBER,
  });

  const newRootPackageJson = await getPackageJson({
    path: rootPackageJsonPath,
  });
  console.info('New Version: ', newRootPackageJson.version);
})();
