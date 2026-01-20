import type { DatabaseInfra } from '@/contracts/infras/database.infra'
import type {
  IPost,
  PostRepository,
} from '@/contracts/repositories/post.repository'

import { Context, Data, Effect } from 'effect'

export class PostService extends Context.Tag('@yukine/post-service')<
  PostService,
  {
    all: () => Effect.Effect<IPost[], never, PostRepository | DatabaseInfra>

    findOne: (
      id: string,
    ) => Effect.Effect<
      IPost | null,
      PostNotFoundError,
      PostRepository | DatabaseInfra
    >

    create: (
      title: string,
      content: string,
    ) => Effect.Effect<IPost, never, PostRepository | DatabaseInfra>

    update: (
      id: string,
      title: string,
      content: string,
    ) => Effect.Effect<IPost, PostNotFoundError, PostRepository | DatabaseInfra>

    delete: (
      id: string,
    ) => Effect.Effect<
      string,
      PostNotFoundError,
      PostRepository | DatabaseInfra
    >
  }
>() {}

// oxlint-disable-next-line max-classes-per-file
export class PostNotFoundError extends Data.TaggedError('PostNotFoundError') {}
