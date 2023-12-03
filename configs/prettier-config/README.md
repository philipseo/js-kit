# @philipseo/prettier-config

Shared Prettier config

## Install

```
# npm
npm install -D @philipseo/prettier-config

# yarn
yarn add -D @philipseo/prettier-config

# pnpm
pnpm add -D @philipseo/prettier-config
```

## Usage .prettierrc.js

```
# base
const config = require('@philipseo/prettier-config');

module.exports = config;

# next.js
const config = require('@philipseo/prettier-config');

module.exports = {
  ...config,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
};
```
