import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';

import { getRootPath } from '#/github-action/utils';
import type { GithubPrInfo } from '#/github-action/versioning/utils';
import type { GenerateChangeLogContentProps } from '#/github-action/versioning/utils/upsert-change-log/utils';
import { generateChangelogContent } from '#/github-action/versioning/utils/upsert-change-log/utils';

interface UpsertChangeLogProps
  extends Omit<GenerateChangeLogContentProps, 'prTitle' | 'isBump'> {
  /* upsert changelog path */
  path: string;
  /* new version */
  newVersion: string;
  prInfo: GithubPrInfo;
}

async function upsertChangeLog({
  path,
  newVersion,
  prInfo: { changedFiles, prTitle },
  owner,
  repo,
  prNumber,
}: UpsertChangeLogProps) {
  try {
    const rootPath = await getRootPath();
    const isRootPath = path === rootPath;
    const purePath = path.replace(rootPath, '');
    const isBump = isRootPath || changedFiles.includes(purePath);
    const isExistChangelog = existsSync(`${path}/CHANGELOG.md`);
    const changelogTitle = `# v${newVersion} (${new Date().toLocaleDateString()})`;
    const changelogContent = generateChangelogContent({
      isBump,
      owner,
      repo,
      prNumber,
      prTitle,
    });
    const changelogContentWithTitle = `${changelogTitle}\n${changelogContent}`;

    if (isExistChangelog) {
      const originalContent = await readFile(`${path}/CHANGELOG.md`, 'utf-8');
      const newContent = `${changelogContentWithTitle}\n\n---\n\n${originalContent}`;
      await writeFile(`${path}/CHANGELOG.md`, newContent);
    } else {
      await writeFile(`${path}/CHANGELOG.md`, changelogContentWithTitle);
    }
  } catch (error) {
    console.error('❗ upsertChangeLog Error: ', error);
    throw error;
  }
}

export default upsertChangeLog;
