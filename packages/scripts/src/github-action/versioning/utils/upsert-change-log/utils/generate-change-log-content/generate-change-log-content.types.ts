import { GithubPrInfo } from '#/github-action/versioning/utils';
import type { OctokitProps } from '#/github-action/versioning/versioning.types';

export interface GenerateChangeLogContentProps
  extends Omit<OctokitProps, 'token'>,
    Pick<GithubPrInfo, 'prTitle'> {
  /* is just bump version */
  isBump: boolean;
}
