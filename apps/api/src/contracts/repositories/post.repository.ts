import type { posts } from '@/app/entities/post.entity'
import type {
  DatabaseError,
  DatabaseInfra,
} from '@/shared/infras/database.infra'
import type { AllPostsDto } from '@yukine/validators/post'
import type { Effect } from 'effect'

import { Context } from 'effect'

export type IPost = (typeof posts)['$inferSelect']

export class PostRepository extends Context.Tag('@yukine/post-repository')<
  PostRepository,
  {
    all: (
      query: AllPostsDto['query'],
    ) => Effect.Effect<IPost[], DatabaseError, DatabaseInfra>

    findOne: (
      id: IPost['id'],
    ) => Effect.Effect<IPost | null, DatabaseError, DatabaseInfra>

    create: (
      data: Pick<IPost, 'title' | 'content'>,
    ) => Effect.Effect<IPost['id'] | null, DatabaseError, DatabaseInfra>

    update: (
      data: Omit<IPost, 'createdAt'>,
    ) => Effect.Effect<IPost['id'] | null, DatabaseError, DatabaseInfra>

    delete: (
      id: IPost['id'],
    ) => Effect.Effect<IPost['id'] | null, DatabaseError, DatabaseInfra>
  }
>() {}
