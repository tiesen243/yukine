import { env } from '@yukine/validators/env'
import { drizzle } from 'drizzle-orm/postgres-js'
import { Context, Effect, Layer } from 'effect'
import postgres from 'postgres'

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
    ) => Effect.Effect<T, Error, DatabaseInfra>
  }
>() {}

export const databaseInfra = Layer.succeed(
  DatabaseInfra,
  DatabaseInfra.of({
    db,
    runQuery: <T>(
      fn: (client: ReturnType<typeof createDrizzleClient>) => Promise<T>,
    ) =>
      Effect.tryPromise({
        try: () => fn(db),
        catch: () => new Error('Database operation failed', { cause: 500 }),
      }),
  }),
)
