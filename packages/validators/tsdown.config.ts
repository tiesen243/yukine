import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/*.ts'],
  external: ['cloudflare:workers'],
  dts: true,
  shims: true,
  exports: true,
})
