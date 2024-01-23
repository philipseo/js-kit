import type { OctokitProps } from '#/types/octokit/octokit';

export const MOCK_GITHUB_TOKEN = 'mockGithubToken';

export const MOCK_GITHUB_OWNER = 'mockGithubOwner';

export const MOCK_GITHUB_REPO = 'mockGithubRepo';

export const MOCK_GITHUB_PR_NUMBER = 123;

export const MOCK_GITHUB_INFO: OctokitProps = {
  token: MOCK_GITHUB_TOKEN,
  owner: MOCK_GITHUB_OWNER,
  repo: MOCK_GITHUB_REPO,
  prNumber: MOCK_GITHUB_PR_NUMBER,
};

export const MOCK_VERSION = '1.2.3';

export const MOCK_NEW_VERSION = '2.0.0';

export const MOCK_PATH = '/mock/path';

export const MOCK_PACKAGE_JSON_PATH = `${MOCK_PATH}/package.json`;

export const MOCK_PACKAGE_JSON = {
  version: MOCK_VERSION,
};

export const MOCK_CHANGE_LOG_MD = 'Mocked Changelog Content';

export const MOCK_ERROR_MESSAGE = 'Mock Error';
