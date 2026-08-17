## ESLint presets

- `base` — ESLint recommended + typescript-eslint recommended + prettier
- `react` — `base` plus React hooks and React Refresh (Vite)
- `nest` — `base` plus Node and Jest globals

Peer dependencies: `eslint`, `prettier`, `typescript`.

```js
import baseConfig from '@philipseo/configs/eslint/base';
import { defineConfig } from 'eslint/config';

export default defineConfig({
  extends: [baseConfig],
});
```

```js
import reactConfig from '@philipseo/configs/eslint/react';

export default reactConfig;
```

```js
import nestConfig from '@philipseo/configs/eslint/nest';

export default nestConfig;
```
