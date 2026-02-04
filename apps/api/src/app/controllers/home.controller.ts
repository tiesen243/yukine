import { Effect } from 'effect'

import { controller } from '@/shared/controller'
import { DatabaseInfra } from '@/shared/infras/database.infra'

import pkg from '../../../package.json' with { type: 'json' }

export const homeController = controller({
  name: 'controller.home',
  prefix: '/api',
  tags: ['home'],
})
  .get('/', () => 'Hello from Yukine API!')

  .get('/health', ({ runtime }) =>
    runtime.runPromise(
      Effect.gen(function* () {
        const { runQuery } = yield* DatabaseInfra

        const dbStatus = yield* runQuery((client) =>
          client.execute('SELECT 1'),
        ).pipe(
          Effect.as('connected'),
          Effect.catchTag('DatabaseError', () =>
            Effect.succeed('disconnected'),
          ),
        )

        return {
          name: pkg.name,
          version: pkg.version,
          status: 'healthy',
          database: { status: dbStatus },
          timestamp: new Date().toISOString(),
        }
      }),
    ),
  )
