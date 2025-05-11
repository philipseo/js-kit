## 📦 Available ESLint Configurations

This package provides multiple ESLint configuration presets:

- `base` (`eslint/index.js`)  
  Basic ESLint rules. This is the default export when you import from the
  package root.

- `nest` (`eslint/nest.js`)  
  Extends the `base` config with additional rules for NestJS projects.

---

## 🔧 Usage

```js
import eslint from '@philipseo/configs/eslint';

export default eslint;
```
