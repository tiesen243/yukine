import { Effect, Layer } from 'effect'

export const db = {
  query: <TData, TParams>(sql: string, params?: TParams[]) => {
    console.log('SQL Query:', sql, params)
    return Promise.resolve([] as TData)
  },
}

export class DatabaseInfra extends Effect.Tag('@yukine/database-infra')<
  DatabaseInfra,
  { db: typeof db }
>() {}

export const DatabaseInfraLive = Layer.succeed(
  DatabaseInfra,
  DatabaseInfra.of({ db }),
)
