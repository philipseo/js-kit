import { DEFAULT_CONTENT } from '#/github-action/versioning/utils/upsert-change-log/utils/generate-change-log-content/generate-change-log-content.constants';
import type { GenerateChangeLogContentProps } from '#/github-action/versioning/utils/upsert-change-log/utils/generate-change-log-content/generate-change-log-content.types';
import { getChangeLogContent } from '#/github-action/versioning/utils/upsert-change-log/utils/generate-change-log-content/utils';

function generateChangelogContent({
  isBump,
  owner,
  repo,
  prNumber,
  prTitle,
}: GenerateChangeLogContentProps) {
  const changelogContent = getChangeLogContent({ prTitle });

  return `### ${changelogContent.title}

${changelogContent.description}

---

- ${
    isBump ? prTitle : DEFAULT_CONTENT
  }: ([#${prNumber}](https://github.com/${owner}/${repo}/pull/${prNumber}))`;
}

export default generateChangelogContent;
