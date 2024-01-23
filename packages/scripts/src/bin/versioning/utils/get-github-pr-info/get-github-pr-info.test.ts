import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import { getGithubPrInfo } from '#/bin/versioning/utils';
import {
  MOCK_GITHUB_INFO,
  MOCK_GITHUB_OWNER,
  MOCK_GITHUB_PR_NUMBER,
  MOCK_GITHUB_REPO,
} from '#/constants';

const MOCK_PR_TITLE = 'Sample PR Title';
const MOCK_CHANGE_FILES = [{ filename: 'file1.txt' }, { filename: 'file2.js' }];
const server = setupServer(
  http.get(
    `https://api.github.com/repos/${MOCK_GITHUB_OWNER}/${MOCK_GITHUB_REPO}/pulls/${MOCK_GITHUB_PR_NUMBER}`,
    (req) => {
      const token = req.request.headers.get('authorization');

      if (token?.includes('test')) {
        return HttpResponse.error();
      } else {
        return HttpResponse.json({
          title: MOCK_PR_TITLE,
        });
      }
    },
  ),
  http.get(
    `https://api.github.com/repos/${MOCK_GITHUB_OWNER}/${MOCK_GITHUB_REPO}/pulls/${MOCK_GITHUB_PR_NUMBER}/files`,
    () => {
      return HttpResponse.json(MOCK_CHANGE_FILES);
    },
  ),
);

describe('getGithubPrInfo', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  test('✅ Get GitHub prInfo', async () => {
    const githubPrInfo = await getGithubPrInfo(MOCK_GITHUB_INFO);

    expect(githubPrInfo).toEqual({
      prTitle: MOCK_PR_TITLE,
      changedFiles: MOCK_CHANGE_FILES.map((file) => file.filename),
    });
  });

  test('❗ Has an error getGithubPrInfo', async () => {
    await expect(
      getGithubPrInfo({
        ...MOCK_GITHUB_INFO,
        token: 'test',
      }),
    ).rejects.toThrow('Failed to fetch');
  });
});
