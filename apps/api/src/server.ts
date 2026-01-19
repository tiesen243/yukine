import { cors } from '@elysiajs/cors'
import { openapi } from '@elysiajs/openapi'
import { env } from '@yukine/validators/env'
import { CloudflareAdapter } from 'elysia/adapter/cloudflare-worker'

import { createApp } from '@/core'
import { httpException } from '@/core/plugins/http-exception'
import { timming } from '@/core/plugins/timming'
import { AppModule } from '@/modules/app.module'

export default createApp(AppModule, {
  aot: true,
  adapter: CloudflareAdapter,
  plugins: [
    cors({
      origin: env.CLIENT_ORIGINS,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
    }),
    openapi(),
    timming({ ignorePatterns: [/^(?!\/api).*/] }),
    httpException(),
  ],
}).compile()
