import { GithubPrInfo } from '#/bin/versioning/utils';
import { GITHUB_AVAILABLE_MESSAGES } from '#/bin/versioning/utils/upsert-change-log/utils/generate-change-log-content/utils/get-change-log-content/get-change-log-content.constants';

export type GetChangeLogContentProps = Pick<GithubPrInfo, 'prTitle'>;

type ChangelogEntry = {
  title: string;
  description: string;
};

export type ChangelogContent = Record<
  (typeof GITHUB_AVAILABLE_MESSAGES)[number],
  ChangelogEntry
>;
