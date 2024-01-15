import { defineConfig } from 'tsup';

export default defineConfig(() => ({
  entry: ['src/bin/**/*.bin.ts'],
  format: ['cjs'],
  dts: true,
  clean: true,
  minify: true,
}));
