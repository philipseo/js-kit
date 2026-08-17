## TSConfig presets

- `base` — no DOM, `moduleResolution: bundler`
- `dom` — `base` plus DOM libs
- `node` — `base` with `module` / `moduleResolution: nodenext`

```json
{
  "extends": "@philipseo/configs/tsconfig/base.json"
}
```

```json
{
  "extends": "@philipseo/configs/tsconfig/dom.json"
}
```

```json
{
  "extends": "@philipseo/configs/tsconfig/node.json"
}
```
