import { VERSION_TYPE } from '#/bin/versioning/utils';
import { generateChangelogContent } from '#/bin/versioning/utils/upsert-change-log/utils';
import type { GenerateChangeLogContentProps } from '#/bin/versioning/utils/upsert-change-log/utils';
import { DEFAULT_CONTENT } from '#/bin/versioning/utils/upsert-change-log/utils/generate-change-log-content/generate-change-log-content.constants';
import { getChangeLogContent } from '#/bin/versioning/utils/upsert-change-log/utils/generate-change-log-content/utils';

type GetMockContentProps = Pick<GenerateChangeLogContentProps, 'isBump'>;

const MOCK_PROPS = {
  isBump: true,
  versionType: VERSION_TYPE.PATCH,
  owner: 'owner',
  repo: 'repo',
  prNumber: 123,
  prTitle: 'test: Test Pull Request Title',
};

function getMockContent({ isBump }: GetMockContentProps) {
  const changelogContent = getChangeLogContent({
    prTitle: MOCK_PROPS.prTitle,
  });

  return `### ${changelogContent.title}

${changelogContent.description}

---

- ${isBump ? MOCK_PROPS.prTitle : DEFAULT_CONTENT}: ([#${
    MOCK_PROPS.prNumber
  }](https://github.com/${MOCK_PROPS.owner}/${MOCK_PROPS.repo}/pull/${
    MOCK_PROPS.prNumber
  }))`;
}

describe('generateChangelogContent', () => {
  test('✅ Get changelog content when isBump is true', () => {
    const expectedContent = getMockContent({ isBump: true });
    const result = generateChangelogContent({ ...MOCK_PROPS });

    expect(result).toEqual(expectedContent);
  });

  test('✅ Get changelog content when isBump is false', () => {
    const expectedContent = getMockContent({ isBump: false });
    const result = generateChangelogContent({
      ...MOCK_PROPS,
      isBump: false,
    });

    expect(result).toEqual(expectedContent);
  });
});
