export interface OctokitProps {
  /* GitHub Token */
  token: string;
  /* Repository Owner */
  owner: string;
  /* Repository Name */
  repo: string;
  /* Pull Request Number */
  prNumber: string | number;
}
