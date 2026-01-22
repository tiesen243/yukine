/// <reference types="../env.d.ts" />

import { createEnv } from '@yukine/lib/create-env'
import * as z from 'zod/mini'

let baseEnv: Record<string, unknown>
try {
  const { env } = await import('cloudflare:workers')
  baseEnv = env
} catch {
  baseEnv = process.env
}

export const env = createEnv({
  shared: {
    NODE_ENV: z._default(
      z.enum(['development', 'production', 'test']),
      'development',
    ),
  },

  server: {
    CLIENT_ORIGINS: z.pipe(
      z._default(z.string(), 'http://localhost:5173'),
      z.transform((val) => val.split(',').map((s) => s.trim())),
    ),
  },

  clientPrefix: 'VITE_',
  client: {},

  runtimeEnv: baseEnv,

  emptyStringAsUndefined: true,
  skipValidation: true,

  deriveEnv: () => ({
    DB: baseEnv.DB,
  }),
})
