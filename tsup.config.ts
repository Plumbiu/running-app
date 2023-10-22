/* eslint-disable @stylistic/quotes */
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  sourcemap: true,
  bundle: true,
  clean: true,
  dts: true,
  format: ['esm', 'cjs'],
  minify: true,
  noExternal: [/(.*)/],
  target: 'es6',
  platform: 'node',
  banner(ctx) {
    if (ctx.format === 'esm') {
      return {
        js:
          "import { createRequire as topLevelCreateRequire } from 'module';" +
          'const require = topLevelCreateRequire(import.meta.url);',
      }
    }
  },
})
