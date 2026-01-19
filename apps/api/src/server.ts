import { cors } from '@elysiajs/cors'
import { openapi } from '@elysiajs/openapi'
// import { env } from '@yukine/validators/env'
import { Elysia } from 'elysia'
import { CloudflareAdapter } from 'elysia/adapter/cloudflare-worker'

import { appRouter } from '@/modules/app'
import { postRouter } from '@/modules/post'
import { httpException } from '@/shared/plugins/http-exception'
import { timming } from '@/shared/plugins/timming'

export default new Elysia({
  aot: true,
  adapter: CloudflareAdapter,
  prefix: '/api',
})
  .use(
    cors({
      // origin: env.CLIENT_ORIGINS,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
    }),
  )
  .use(openapi())
  .use(timming({ ignorePatterns: [/^(?!\/api).*/] }))
  .use(httpException())
  .use(appRouter)
  .use(postRouter)
  .compile()
