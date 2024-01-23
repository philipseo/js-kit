import fs from 'node:fs';
import fsPromises from 'node:fs/promises';

import { upsertChangeLog } from '#/bin/versioning/utils';
import { generateChangelogContent } from '#/bin/versioning/utils/upsert-change-log/utils';
import {
  MOCK_ERROR_MESSAGE,
  MOCK_GITHUB_OWNER,
  MOCK_GITHUB_PR_NUMBER,
  MOCK_GITHUB_REPO,
  MOCK_PATH,
  MOCK_VERSION,
} from '#/constants';
import { getRootPath } from '#/utils';

const MOCK_PR_INFO = {
  changedFiles: ['/mock/root/path/package/file.js'],
  prTitle: 'feat: Add new feature',
};
const MOCK_CHANGE_LOG_CONTENT = 'Mock Changelog Content';

jest.mock('node:fs/promises', () => {
  return {
    readFile: jest.fn().mockImplementation(async () => {
      return '';
    }),
    writeFile: jest.fn(),
  };
});

jest.mock('#/utils', () => {
  return {
    getRootPath: jest.fn().mockImplementation(() => {
      return '/mock/root/path';
    }),
  };
});

jest.mock('#/bin/versioning/utils/upsert-change-log/utils', () => {
  return {
    generateChangelogContent: jest.fn().mockImplementation(() => {
      return MOCK_CHANGE_LOG_CONTENT;
    }),
  };
});

describe('upsertChangeLog', () => {
  afterEach(() => {});

  test('✅ Create CHANGELOG.md', async () => {
    const spyExistsSync = jest
      .spyOn(fs, 'existsSync')
      .mockImplementation(() => {
        return true;
      });

    await upsertChangeLog({
      path: MOCK_PATH,
      newVersion: MOCK_VERSION,
      prInfo: MOCK_PR_INFO,
      owner: MOCK_GITHUB_OWNER,
      repo: MOCK_GITHUB_REPO,
      prNumber: MOCK_GITHUB_PR_NUMBER,
    });

    expect(getRootPath).toHaveBeenCalled();
    expect(fs.existsSync).toHaveBeenCalledWith(`${MOCK_PATH}/CHANGELOG.md`);
    expect(fsPromises.readFile).toHaveBeenCalledWith(
      `${MOCK_PATH}/CHANGELOG.md`,
      'utf-8',
    );
    expect(generateChangelogContent).toHaveBeenCalledWith({
      isBump: false,
      owner: MOCK_GITHUB_OWNER,
      repo: MOCK_GITHUB_REPO,
      prNumber: MOCK_GITHUB_PR_NUMBER,
      prTitle: MOCK_PR_INFO.prTitle,
    });
    expect(fsPromises.writeFile).toHaveBeenCalledWith(
      `${MOCK_PATH}/CHANGELOG.md`,
      `# v${MOCK_VERSION} (${new Date().toLocaleDateString()})\n${MOCK_CHANGE_LOG_CONTENT}\n\n---\n\n`,
    );

    spyExistsSync.mockRestore();
  });

  test('✅ Update CHANGELOG.md', async () => {
    const spyExistsSync = jest
      .spyOn(fs, 'existsSync')
      .mockImplementation(() => {
        return false;
      });

    await upsertChangeLog({
      path: MOCK_PATH,
      newVersion: MOCK_VERSION,
      prInfo: MOCK_PR_INFO,
      owner: MOCK_GITHUB_OWNER,
      repo: MOCK_GITHUB_REPO,
      prNumber: MOCK_GITHUB_PR_NUMBER,
    });

    // Check if functions are called with the correct arguments
    expect(getRootPath).toHaveBeenCalled();
    expect(fs.existsSync).toHaveBeenCalledWith(`${MOCK_PATH}/CHANGELOG.md`);
    expect(generateChangelogContent).toHaveBeenCalledWith({
      isBump: false,
      owner: MOCK_GITHUB_OWNER,
      repo: MOCK_GITHUB_REPO,
      prNumber: MOCK_GITHUB_PR_NUMBER,
      prTitle: MOCK_PR_INFO.prTitle,
    });
    expect(fsPromises.writeFile).toHaveBeenCalledWith(
      `${MOCK_PATH}/CHANGELOG.md`,
      `# v${MOCK_VERSION} (${new Date().toLocaleDateString()})\n${MOCK_CHANGE_LOG_CONTENT}`,
    );

    spyExistsSync.mockRestore();
  });

  test('❗ Has an error upsert CHANGELOG.md', async () => {
    const spyExistsSync = jest
      .spyOn(fs, 'existsSync')
      .mockImplementationOnce(() => {
        return false;
      });
    const spyWriteFile = jest
      .spyOn(fsPromises, 'writeFile')
      .mockImplementationOnce(async () => {
        throw new Error(MOCK_ERROR_MESSAGE);
      });

    await expect(
      upsertChangeLog({
        path: MOCK_PATH,
        newVersion: MOCK_VERSION,
        prInfo: MOCK_PR_INFO,
        owner: MOCK_GITHUB_OWNER,
        repo: MOCK_GITHUB_REPO,
        prNumber: MOCK_GITHUB_PR_NUMBER,
      }),
    ).rejects.toThrow(MOCK_ERROR_MESSAGE);

    expect(getRootPath).toHaveBeenCalled();
    expect(fs.existsSync).toHaveBeenCalledWith(`${MOCK_PATH}/CHANGELOG.md`);
    expect(generateChangelogContent).toHaveBeenCalledWith({
      isBump: false,
      owner: MOCK_GITHUB_OWNER,
      repo: MOCK_GITHUB_REPO,
      prNumber: MOCK_GITHUB_PR_NUMBER,
      prTitle: MOCK_PR_INFO.prTitle,
    });

    spyExistsSync.mockRestore();
    spyWriteFile.mockRestore();
  });
});
