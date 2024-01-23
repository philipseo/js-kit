import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import createGithubRelease from '#/bin/create-github-release/create-github-release';
import * as createGithubReleaseUtils from '#/bin/create-github-release/utils';
import {
  MOCK_CHANGE_LOG_MD,
  MOCK_GITHUB_OWNER,
  MOCK_GITHUB_REPO,
  MOCK_GITHUB_TOKEN,
  MOCK_VERSION,
} from '#/constants';
import * as utils from '#/utils';

const server = setupServer(
  http.post(
    `https://api.github.com/repos/${MOCK_GITHUB_OWNER}/${MOCK_GITHUB_REPO}/releases`,
    (req) => {
      const token = req.request.headers.get('authorization');

      if (token?.includes('test')) {
        return HttpResponse.error();
      } else {
        return HttpResponse.json({
          status: 200,
        });
      }
    },
  ),
);

jest.mock('#/utils', () => {
  return {
    getRootPackageJsonVersion: jest.fn().mockImplementation(() => {
      return MOCK_VERSION;
    }),
  };
});

jest.mock('#/bin/create-github-release/utils', () => {
  return {
    getRootChangelogMd: jest.fn().mockImplementation(() => {
      return;
    }),
  };
});

describe('createGithubRelease', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  test('✅ Create GitHub release', async () => {
    jest
      .spyOn(createGithubReleaseUtils, 'getRootChangelogMd')
      .mockImplementationOnce(async () => {
        return MOCK_CHANGE_LOG_MD;
      });
    jest
      .spyOn(utils, 'getRootPackageJsonVersion')
      .mockImplementationOnce(async () => {
        return MOCK_VERSION;
      });

    const MOCK_GITHUB_RELEASE_PARAMS = {
      token: MOCK_GITHUB_TOKEN,
      owner: MOCK_GITHUB_OWNER,
      repo: MOCK_GITHUB_REPO,
    };

    await expect(
      createGithubRelease(MOCK_GITHUB_RELEASE_PARAMS),
    ).resolves.toBeUndefined();

    expect(createGithubReleaseUtils.getRootChangelogMd).toHaveBeenCalled();
    expect(utils.getRootPackageJsonVersion).toHaveBeenCalled();
  });

  test('❗ Has an error create github release', async () => {
    await expect(
      createGithubRelease({
        token: 'test',
        owner: MOCK_GITHUB_OWNER,
        repo: MOCK_GITHUB_REPO,
      }),
    ).rejects.toThrow('Failed to fetch');
  });
});
