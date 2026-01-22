// oxlint-disable max-classes-per-file

import { env } from '@yukine/validators/env'
import { drizzle } from 'drizzle-orm/d1'
import { Context, Data, Effect, Layer } from 'effect'

export class DatabaseError extends Data.TaggedError('DatabaseError')<{
  message: string
  cause: Error
}> {}

export class DatabaseInfra extends Context.Tag('@yukine/database-infra')<
  DatabaseInfra,
  {
    db: ReturnType<typeof drizzle>
    runQuery: <T>(
      fn: (client: ReturnType<typeof drizzle>) => Promise<T>,
    ) => Effect.Effect<T, DatabaseError, DatabaseInfra>
  }
>() {}

const db = drizzle(env.DB)

export const DatabaseInfraLive = Layer.succeed(
  DatabaseInfra,
  DatabaseInfra.of({
    db,
    runQuery: <T>(fn: (client: typeof db) => Promise<T>) =>
      Effect.tryPromise({
        try: () => fn(db),
        catch: (error) =>
          new DatabaseError({
            message: 'Database query failed',
            cause: error as Error,
          }),
      }),
  }),
)
