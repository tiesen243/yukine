import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/server.ts'],
  dts: true,
  shims: true,
  exports: true,
})
