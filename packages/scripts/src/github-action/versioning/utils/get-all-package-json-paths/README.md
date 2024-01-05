# get-all-package-json-paths

Root 부터 .gitignore 등에 ignore 되지 않는 모든 디렉토리를 순회하며 모든 package.json 파일의 경로를 반환합니다.

## Usage

```typescript
const allPackageJsonPaths = await getAllPackageJsonPaths();
```
