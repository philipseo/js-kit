## TSConfig presets

Shared files only set `compilerOptions`. Set `include` / `exclude` in the
consuming project.

- `base` — no DOM, `moduleResolution: bundler`, `verbatimModuleSyntax`
- `react` — `base` plus DOM libs and `"jsx": "react-jsx"`
- `node` — `base` with `module` / `moduleResolution: nodenext` and
  `"types": ["node"]`

`node` expects `@types/node` in the consuming project.

```json
{
  "extends": "@philipseo/configs/tsconfig/base.json",
  "include": ["src"]
}
```

```json
{
  "extends": "@philipseo/configs/tsconfig/react.json",
  "include": ["src"]
}
```

```json
{
  "extends": "@philipseo/configs/tsconfig/node.json",
  "include": ["src"]
}
```
