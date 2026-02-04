import { cors } from '@elysiajs/cors'
import { openapi } from '@elysiajs/openapi'
import { env } from '@yukine/validators/env'
import { Elysia } from 'elysia'
import { CloudflareAdapter } from 'elysia/adapter/cloudflare-worker'

import { homeController } from '@/app/controllers/home.controller'
import { v1Controller } from '@/app/controllers/v1'
import { httpException } from '@/shared/plugins/http-exception'
import { timming } from '@/shared/plugins/timming'

export default new Elysia({
  aot: true,
  adapter: CloudflareAdapter,
})
  .use(
    cors({
      origin: env.CORS_ORIGINS,
      methods: env.CORS_METHODS,
      allowedHeaders: env.CORS_HEADERS,
      credentials: env.CORS_CREDENTIALS,
    }),
  )
  .use(openapi())
  .use(timming({ ignorePatterns: [/^(?!\/api).*/] }))
  .use(httpException())

  .get('/', ({ redirect }) => redirect('/api'))
  .use(homeController)
  .use(v1Controller)

  .compile()
