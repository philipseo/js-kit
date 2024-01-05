import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import { getGithubPrInfo } from '#/github-action/versioning/utils';

const MOCK_TOKEN = 'token';
const MOCK_OWNER = 'owner';
const MOCK_REPO = 'repo';
const MOCK_PR_NUMBER = '1';
const MOCK_PR_TITLE = 'Sample PR Title';
const MOCK_CHANGE_FILES = [{ filename: 'file1.txt' }, { filename: 'file2.js' }];
const server = setupServer(
  http.get(
    `https://api.github.com/repos/${MOCK_OWNER}/${MOCK_REPO}/pulls/${MOCK_PR_NUMBER}`,
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
    `https://api.github.com/repos/${MOCK_OWNER}/${MOCK_REPO}/pulls/${MOCK_PR_NUMBER}/files`,
    () => {
      return HttpResponse.json(MOCK_CHANGE_FILES);
    },
  ),
);

describe('getGithubPrInfo', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  test('✅ Get GitHub prInfo', async () => {
    const githubPrInfo = await getGithubPrInfo({
      token: MOCK_TOKEN,
      owner: MOCK_OWNER,
      repo: MOCK_REPO,
      prNumber: MOCK_PR_NUMBER,
    });

    expect(githubPrInfo).toEqual({
      prTitle: MOCK_PR_TITLE,
      changedFiles: MOCK_CHANGE_FILES.map((file) => file.filename),
    });
  });

  test('❗ Has an error getGithubPrInfo', async () => {
    await expect(
      getGithubPrInfo({
        token: 'test',
        owner: MOCK_OWNER,
        repo: MOCK_REPO,
        prNumber: MOCK_PR_NUMBER,
      }),
    ).rejects.toThrowError('Failed to fetch');
  });
});
