import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/app/entities/*.entity.ts',
  dialect: 'sqlite',
  out: './migrations',
})
