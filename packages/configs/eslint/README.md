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

```js
import baseConfig from '@philipseo/configs/eslint/base';

export default baseConfig;
```
