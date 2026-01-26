import alchemy from 'alchemy'
import { ReactRouter, Worker } from 'alchemy/cloudflare'
import { config } from 'dotenv'

config({ path: './.env', quiet: true })

const app = await alchemy('yukine')

export const web = await ReactRouter('web', {
  cwd: '../../apps/web',
  bindings: {
    VITE_API_URL: alchemy.env.VITE_API_URL ?? 'http://localhost:1337',
    VITE_WEB_URL: alchemy.env.VITE_WEB_URL ?? 'http://localhost:5173',
  },
})

export const api = await Worker('api', {
  cwd: '../../apps/api',
  entrypoint: 'src/server.ts',
  compatibilityFlags: ['nodejs_compat', 'nodejs_compat_populate_process_env'],
  bindings: {
    AUTH_SECRET: alchemy.env.AUTH_SECRET ?? '',
    AUTH_DISCORD_ID: alchemy.env.AUTH_DISCORD_ID ?? '',
    AUTH_DISCORD_SECRET: alchemy.env.AUTH_DISCORD_SECRET ?? '',

    CLIENT_ORIGINS: alchemy.env.CLIENT_ORIGINS ?? 'http://localhost:5173',

    DATABASE_URL: alchemy.env.DATABASE_URL ?? '',
  },
})

console.log(`Web -> ${web.url}`)
console.log(`API -> ${api.url}`)

await app.finalize()
