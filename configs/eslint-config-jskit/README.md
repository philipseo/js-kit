# @philipseo/eslint-config-jskit

Shared ESLint config

## Install

```
# npm
npm install -D @philipseo/eslint-config-jskit

# yarn
yarn add -D @philipseo/eslint-config-jskit

# pnpm
pnpm add -D @philipseo/eslint-config-jskit
```

## Usage .eslintrc.js

```
# base
module.exports = {
  extends: ['@philipseo/eslint-config-jskit']
}

# reactjs.js
module.exports = {
  extends: ['@philipseo/eslint-config-jskit/react']
}

# nextjs.js
module.exports = {
  extends: ['@philipseo/eslint-config-jskit/next']
}
```
