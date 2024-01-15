import { getChangeLogContent } from '#/bin/versioning/utils/upsert-change-log/utils/generate-change-log-content/utils';
import { CHANGELOG_CONTENT } from '#/bin/versioning/utils/upsert-change-log/utils/generate-change-log-content/utils/get-change-log-content/get-change-log-content.constants';

describe('getChangeLogContent', () => {
  test('✅ All changeLog Content Test', () => {
    for (const changeLogContentKey in CHANGELOG_CONTENT) {
      const prTitle = `${changeLogContentKey}: ${changeLogContentKey} test`;
      const changeLogContent = getChangeLogContent({ prTitle });

      expect(changeLogContent).toEqual(CHANGELOG_CONTENT[changeLogContentKey]);
    }
  });

  test('✅ default to "fix" if no matching message type is found', () => {
    const changeLogContent = getChangeLogContent({
      prTitle: 'no matching',
    });

    expect(changeLogContent).toEqual(CHANGELOG_CONTENT['fix']);
  });
});
