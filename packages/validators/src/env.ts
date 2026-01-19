// oxlint-disable-next-line triple-slash-reference
/// <reference path="../env.d.ts" />

import { createEnv } from '@yukine/lib/create-env'
import { env as cfEnv } from 'cloudflare:workers'
import * as z from 'zod/mini'

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

  runtimeEnv: cfEnv,

  emptyStringAsUndefined: true,
  skipValidation: true,
})
