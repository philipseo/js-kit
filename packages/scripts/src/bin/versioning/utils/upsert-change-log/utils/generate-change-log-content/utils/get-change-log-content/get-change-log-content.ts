import {
  CHANGELOG_CONTENT,
  GITHUB_AVAILABLE_MESSAGES,
} from '#/bin/versioning/utils/upsert-change-log/utils/generate-change-log-content/utils/get-change-log-content/get-change-log-content.constants';
import type { GetChangeLogContentProps } from '#/bin/versioning/utils/upsert-change-log/utils/generate-change-log-content/utils/get-change-log-content/get-change-log-content.types';

function getChangeLogContent({ prTitle }: GetChangeLogContentProps) {
  const prType =
    GITHUB_AVAILABLE_MESSAGES.find((message) => {
      const splitPrTitle = prTitle?.split(':')?.[0];

      return splitPrTitle === message && splitPrTitle.length === message.length;
    }) ?? 'fix';

  return CHANGELOG_CONTENT[prType];
}

export default getChangeLogContent;
