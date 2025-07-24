## 📦 Available ESLint Configurations

This package provides multiple ESLint configuration presets:

- `base` (`eslint/base.js`)  
  Basic ESLint rules. This is the default export when you import from the
  package root.

- `nest` (`eslint/nest.js`)  
  Extends the `base` config with additional rules for NestJS projects.

- `react` (`eslint/react.js`)  
  Extends the `base` config with additional rules for React projects.

---

## 🔧 Usage

Install peer dependencies first.

```bash
pnpm add -D @eslint/js eslint eslint-config-prettier prettier typescript-eslint
```

### Base

```js
import baseConfig from '@philipseo/configs/eslint/base';

export default baseConfig;
```

### Nest

Install peer dependencies first.

```bash
pnpm add -D globals
```

```js
import nestConfig from '@philipseo/configs/eslint/nest';

export default nestConfig;
```

### React

Install peer dependencies first.

```bash
pnpm add -D @trivago/prettier-plugin-sort-imports globals eslint-plugin-react-hooks eslint-plugin-react-refresh
```

```js
import reactConfig from '@philipseo/configs/eslint/react';

export default reactConfig;
```

