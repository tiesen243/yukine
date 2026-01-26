// oxlint-disable no-process-env

import alchemy from 'alchemy'
import { ReactRouter, Worker } from 'alchemy/cloudflare'
import { config } from 'dotenv'

config({ path: '../../apps/api/.env', quiet: true })
config({ path: '../../apps/web/.env', quiet: true })
config({ path: './.env', quiet: true, override: true })

const app = await alchemy('yukine')

export const api = await Worker('api', {
  cwd: '../../apps/api',
  entrypoint: 'src/server.ts',
  compatibilityFlags: ['nodejs_compat', 'nodejs_compat_populate_process_env'],
  bindings: {
    AUTH_SECRET: alchemy.secret(process.env.AUTH_SECRET),
    AUTH_DISCORD_ID: alchemy.secret(process.env.AUTH_DISCORD_ID),
    AUTH_DISCORD_SECRET: alchemy.secret(process.env.AUTH_DISCORD_SECRET),

    CORS_ORIGINS: alchemy.env.CORS_ORIGINS ?? '',
    CORS_METHODS: alchemy.env.CORS_METHODS ?? '',
    CORS_HEADERS: alchemy.env.CORS_HEADERS ?? '',
    CORS_CREDENTIALS: alchemy.env.CORS_CREDENTIALS ?? '',

    DATABASE_URL: alchemy.secret(process.env.DATABASE_URL),
  },
})

export const web = await ReactRouter('web', {
  cwd: '../../apps/web',
  bindings: {
    VITE_API_URL: alchemy.env.VITE_API_URL ?? '',
    VITE_WEB_URL: alchemy.env.VITE_WEB_URL ?? '',
  },
})

console.log(`API -> ${api.url}`)
console.log(`Web -> ${web.url}`)

await app.finalize()
