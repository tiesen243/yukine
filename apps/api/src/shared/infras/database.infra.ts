import { env } from '@yukine/validators/env'
import { drizzle } from 'drizzle-orm/postgres-js'
import { Context, Data, Effect, Layer } from 'effect'
import postgres from 'postgres'

export class DatabaseError extends Data.TaggedError('DatabaseError') {
  override message: string = 'A database error occurred'
  override cause = 500
}

const createDrizzleClient = () => {
  const conn = postgres(env.DATABASE_URL)
  return drizzle(conn, { casing: 'snake_case' })
}

const globalForDrizzle = globalThis as unknown as {
  db: ReturnType<typeof createDrizzleClient> | undefined
}
export const db = globalForDrizzle.db ?? createDrizzleClient()
if (env.NODE_ENV !== 'production') globalForDrizzle.db = db

export class DatabaseInfra extends Context.Tag('@yukine/database-infra')<
  DatabaseInfra,
  {
    db: ReturnType<typeof createDrizzleClient>
    runQuery: <T>(
      fn: (client: ReturnType<typeof createDrizzleClient>) => Promise<T>,
    ) => Effect.Effect<T, DatabaseError, DatabaseInfra>
  }
>() {}

export const DatabaseInfraLive = Layer.succeed(
  DatabaseInfra,
  DatabaseInfra.of({
    db,
    runQuery: <T>(
      fn: (client: ReturnType<typeof createDrizzleClient>) => Promise<T>,
    ) =>
      Effect.tryPromise({
        try: () => fn(db),
        catch: () => new DatabaseError(),
      }),
  }),
)
