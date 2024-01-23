import fs from 'node:fs';

import * as versioningUtils from '#/bin/versioning/utils';
import versioning from '#/bin/versioning/versioning';
import {
  MOCK_ERROR_MESSAGE,
  MOCK_GITHUB_INFO,
  MOCK_GITHUB_OWNER,
  MOCK_GITHUB_PR_NUMBER,
  MOCK_GITHUB_REPO,
  MOCK_NEW_VERSION,
  MOCK_PACKAGE_JSON,
  MOCK_PACKAGE_JSON_PATH,
  MOCK_PATH,
} from '#/constants';
import * as utils from '#/utils';

jest.mock('node:fs/promises', () => {
  return {
    readFile: jest.fn().mockImplementation(async () => {
      return '';
    }),
    writeFile: jest.fn(),
  };
});

describe('versioning', () => {
  test('✅ Update all package.json & Upsert CHANGELOG.md', async () => {
    const MOCK_GITHUB_PR_INFO = {
      prTitle: 'major: PR Title',
      changedFiles: [],
    };
    const MOCK_VERSION_TYPE = 'major';
    const MOCK_PACKAGE_JSON_PATHS = [MOCK_PACKAGE_JSON_PATH];

    jest.spyOn(fs, 'existsSync').mockImplementation(() => {
      return true;
    });

    jest.spyOn(utils, 'getRootPath').mockImplementation(async () => {
      return MOCK_PATH;
    });

    jest
      .spyOn(versioningUtils, 'getPackageJson')
      .mockImplementation(async () => {
        return MOCK_PACKAGE_JSON;
      });

    jest
      .spyOn(versioningUtils, 'getGithubPrInfo')
      .mockImplementationOnce(async () => {
        return MOCK_GITHUB_PR_INFO;
      });

    jest.spyOn(versioningUtils, 'getVersionType').mockImplementationOnce(() => {
      return MOCK_VERSION_TYPE;
    });

    jest
      .spyOn(versioningUtils, 'getNewVersion')
      .mockImplementationOnce(async () => {
        return MOCK_NEW_VERSION;
      });

    jest
      .spyOn(versioningUtils, 'getAllPackageJsonPaths')
      .mockImplementationOnce(async () => {
        return MOCK_PACKAGE_JSON_PATHS;
      });

    jest
      .spyOn(versioningUtils, 'updateVersion')
      .mockImplementationOnce(async () => {
        return;
      });

    jest
      .spyOn(versioningUtils, 'upsertChangeLog')
      .mockImplementationOnce(async () => {
        return;
      });

    await expect(versioning(MOCK_GITHUB_INFO)).resolves.toBeUndefined();

    expect(versioningUtils.getGithubPrInfo).toHaveBeenCalledWith(
      MOCK_GITHUB_INFO,
    );
    expect(versioningUtils.getVersionType).toHaveBeenCalledWith({
      prTitle: MOCK_GITHUB_PR_INFO.prTitle,
    });
    expect(versioningUtils.getNewVersion).toHaveBeenCalledWith({
      versionType: MOCK_VERSION_TYPE,
    });
    expect(versioningUtils.getAllPackageJsonPaths).toHaveBeenCalled();
    expect(versioningUtils.updateVersion).toHaveBeenCalledWith({
      path: MOCK_PACKAGE_JSON_PATH,
      newVersion: MOCK_NEW_VERSION,
    });
    expect(versioningUtils.upsertChangeLog).toHaveBeenCalledWith({
      path: MOCK_PATH,
      newVersion: MOCK_NEW_VERSION,
      prInfo: MOCK_GITHUB_PR_INFO,
      owner: MOCK_GITHUB_OWNER,
      repo: MOCK_GITHUB_REPO,
      prNumber: MOCK_GITHUB_PR_NUMBER,
    });
  });

  test('❗ Has an error versioning', async () => {
    jest
      .spyOn(versioningUtils, 'getGithubPrInfo')
      .mockImplementationOnce(async () => {
        throw new Error(MOCK_ERROR_MESSAGE);
      });

    await expect(versioning(MOCK_GITHUB_INFO)).rejects.toThrow(
      MOCK_ERROR_MESSAGE,
    );
  });
});
