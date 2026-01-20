import type { DatabaseInfra } from '@/contracts/infras/database.infra'
import type { Effect } from 'effect'

import { Context } from 'effect'

export interface IPost {
  id: string
  title: string
  content: string
}

export class PostRepository extends Context.Tag('@yukine/post-repository')<
  PostRepository,
  {
    all: () => Effect.Effect<IPost[], never, DatabaseInfra>

    findOne: (id: string) => Effect.Effect<IPost | null, never, DatabaseInfra>

    create: (
      title: string,
      content: string,
    ) => Effect.Effect<IPost, never, DatabaseInfra>

    update: (
      id: string,
      title: string,
      content: string,
    ) => Effect.Effect<IPost, never, DatabaseInfra>

    delete: (id: string) => Effect.Effect<string, never, DatabaseInfra>
  }
>() {}
