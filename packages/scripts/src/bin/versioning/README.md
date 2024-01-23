# versioning

Root 에 있는 package.json 버전과 PR Title 을 기준으로 모든 package.json 버전을 업데이트하고,
Version은 [SemVer](https://semver.org/lang/ko) 를 따르며,
Commit Message 를 통해 CHANGELOG.md를 자동으로 생성합니다.

아래 내용을 기반으로 Version Update 와 CHANGELOG.md를 자동으로 생성합니다.

| Type             | Version | Title               | Description                                                                               |
| ---------------- | ------- | ------------------- | ----------------------------------------------------------------------------------------- |
| Major            | Major   | ⚠️ Breaking changes | that may require migration or modification of existing functionality.                     |
| Feature          | Minor   | ✨ Feature          | Non-breaking enhancements and new functionalities.                                        |
| Feature          | Minor   | ✨ Feature          | Non-breaking enhancements and new functionalities.                                        |
| Bug Fix          | Patch   | 🐛 Bug Fix          | Fixed issues and bugs.                                                                    |
| Hotfix           | Patch   | 🔥 Hotfix           | Critical fixes for production issues.                                                     |
| Documentation    | Patch   | 📚 Documentation    | Documentation updates and improvements.                                                   |
| Style            | Patch   | 🎨 Style            | Code style and formatting changes.                                                        |
| Chore            | Patch   | 🔧 Chore            | Other changes that don't modify the production code (e.g., build scripts, tooling, etc.). |
| Work in Progress | Patch   | 🚧 Work in Progress | Work in progress, not ready for merging.                                                  |
| Refactor         | Patch   | ♻️ Refactor         | Code refactoring without adding new features or fixing bugs.                              |
| Test             | Patch   | ✅ Test             | Adding or updating tests.                                                                 |

## Usage

```bash
npx @philipseo/script versioning {GITHUB_TOKEN} {GITHUB_OWNER} {GITHUB_REPO} {GITHUB_PR_NUMBER}
ex)
```
