// oxlint-disable max-classes-per-file

import type {
  IPost,
  PostRepository,
} from '@/contracts/repositories/post.repository'
import type {
  DatabaseError,
  DatabaseInfra,
} from '@/shared/infras/database.infra'
import type { AllPostsDto } from '@yukine/validators/post'

import { Context, Data, Effect } from 'effect'

export class PostService extends Context.Tag('@yukine/post-service')<
  PostService,
  {
    all: (
      query: AllPostsDto['query'],
    ) => Effect.Effect<
      { posts: IPost[]; page: number; totalPages: number; limit: number },
      DatabaseError,
      PostRepository | DatabaseInfra
    >

    findOne: (
      id: IPost['id'],
    ) => Effect.Effect<
      IPost,
      DatabaseError | PostNotFoundError,
      PostRepository | DatabaseInfra
    >

    create: (
      data: Pick<IPost, 'title' | 'content'>,
    ) => Effect.Effect<
      IPost['id'],
      DatabaseError | PostCreationError,
      PostRepository | DatabaseInfra
    >

    update: (
      data: Omit<IPost, 'createdAt'>,
    ) => Effect.Effect<
      IPost['id'],
      DatabaseError | PostNotFoundError | PostUpdationError,
      PostRepository | DatabaseInfra
    >

    delete: (
      id: IPost['id'],
    ) => Effect.Effect<
      IPost['id'],
      DatabaseError | PostNotFoundError | PostDeletionError,
      PostRepository | DatabaseInfra
    >
  }
>() {}

export class PostNotFoundError extends Data.TaggedError('PostNotFoundError') {
  status = 404
}
export class PostCreationError extends Data.TaggedError('PostCreationError') {
  status = 500
}

export class PostUpdationError extends Data.TaggedError('PostUpdateError') {
  status = 500
}
export class PostDeletionError extends Data.TaggedError('PostDeletionError') {
  status = 500
}
