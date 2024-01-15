import { GithubPrInfo } from '#/bin/versioning/utils';
import { OctokitProps } from '#/types/octokit/octokit';

export interface GenerateChangeLogContentProps
  extends Omit<OctokitProps, 'token'>,
    Pick<GithubPrInfo, 'prTitle'> {
  /* is just bump version */
  isBump: boolean;
}
