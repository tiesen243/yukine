import { createEnv } from '@yukine/lib/create-env'
import * as z from 'zod/mini'

export const env = createEnv({
  shared: {
    NODE_ENV: z._default(
      z.enum(['development', 'production', 'test']),
      'development',
    ),
  },

  server: {},

  clientPrefix: 'VITE_',
  client: {
    VITE_API_URL: z._default(z.string(), 'http://localhost:3000'),
    VITE_WEB_URL: z._default(z.string(), 'http://localhost:5173'),
  },

  runtimeEnv: {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    VITE_WEB_URL: import.meta.env.VITE_WEB_URL,
  },

  emptyStringAsUndefined: true,
  skipValidation: true,
})

declare global {
  interface ImportMeta {
    readonly env: Record<string, string | undefined>
  }
}
