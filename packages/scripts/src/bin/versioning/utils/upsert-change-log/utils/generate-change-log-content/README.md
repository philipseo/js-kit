# generate-change-log-content

PR 정보에 따른 CHANGELOG.md content generator.

## Usage

```typescript
const content = generateChangeLogContent({
  isUpdatePackage,
  versionType,
  owner,
  repo,
  prNumber,
  prTitle,
});
```
