# @philipseo/tsconfig

Shared tsconfig

## Install

```
# npm
npm install -D @philipseo/tsconfig

# yarn
yarn add -D @philipseo/tsconfig

# pnpm
pnpm add -D @philipseo/tsconfig
```

## Usage tsconfig.json

```
# base
{
  "extends": "@philipseo/tsconfig"
}

# reactjs.js
{
  "extends": "@philipseo/tsconfig/reactjs"
}

# nextjs.js
{
  "extends": "@philipseo/tsconfig/nextjs",
  "compilerOptions": {
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": [
    "next-env.d.ts",
    "next.config.js",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ]
}
```
