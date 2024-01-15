import { ChangelogContent } from '#/bin/versioning/utils/upsert-change-log/utils/generate-change-log-content/utils/get-change-log-content/get-change-log-content.types';

export const GITHUB_AVAILABLE_MESSAGES = [
  'major',
  'feature',
  'feat',
  'fix',
  'hotfix',
  'docs',
  'style',
  'chore',
  'wip',
  'refactor',
  'test',
];

export const CHANGELOG_CONTENT: ChangelogContent = {
  major: {
    title: '⚠️ Major',
    description:
      'Breaking changes that may require migration or modification of existing functionality.',
  },
  feature: {
    title: '✨ Feature',
    description: 'Non-breaking enhancements and new functionalities.',
  },
  feat: {
    title: '✨ Feature',
    description: 'Non-breaking enhancements and new functionalities.',
  },
  fix: {
    title: '🐛 Bug Fix',
    description: 'Fixed issues and bugs.',
  },
  hotfix: {
    title: '🔥 Hotfix',
    description: 'Critical fixes for production issues.',
  },
  docs: {
    title: '📚 Documentation',
    description: 'Documentation updates and improvements.',
  },
  style: {
    title: '🎨 Style',
    description: 'Code style and formatting changes.',
  },
  chore: {
    title: '🔧 Chore',
    description:
      "Other changes that don't modify the production code (e.g., build scripts, tooling, etc.).",
  },
  wip: {
    title: '🚧 Work in Progress',
    description: 'Work in progress, not ready for merging.',
  },
  refactor: {
    title: '♻️ Refactor',
    description: 'Code refactoring without adding new features or fixing bugs.',
  },
  test: {
    title: '✅ Test',
    description: 'Adding or updating tests.',
  },
};
