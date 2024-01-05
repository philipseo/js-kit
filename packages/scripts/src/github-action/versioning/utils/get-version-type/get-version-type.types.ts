import { VERSION_TYPE } from '#/github-action/versioning/utils/get-version-type/get-version-type.constants';

/* minor | major | patch */
export type VersionType = (typeof VERSION_TYPE)[keyof typeof VERSION_TYPE];
