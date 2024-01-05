import { GithubPrInfo } from '#/github-action/versioning/utils';
import { GITHUB_AVAILABLE_MESSAGES } from '#/github-action/versioning/utils/upsert-change-log/utils/generate-change-log-content/generate-change-log-content.constants';

export type GetChangeLogContentProps = Pick<GithubPrInfo, 'prTitle'>;

type ChangelogEntry = {
  title: string;
  description: string;
};

export type ChangelogContent = Record<
  (typeof GITHUB_AVAILABLE_MESSAGES)[number],
  ChangelogEntry
>;
