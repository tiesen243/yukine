import { eq } from 'drizzle-orm'
import { Effect, Layer } from 'effect'

import { posts } from '@/app/entities/post.entity'
import { PostRepository } from '@/contracts/repositories/post.repository'
import { DatabaseInfra } from '@/shared/infras/database.infra'

export const PostRepositoryLive = Layer.succeed(
  PostRepository,
  PostRepository.of({
    all: () =>
      Effect.gen(function* () {
        const { runQuery } = yield* DatabaseInfra
        const postList = yield* runQuery((client) =>
          client.select().from(posts),
        )

        return postList
      }),

    findOne: (id) =>
      Effect.gen(function* () {
        const { runQuery } = yield* DatabaseInfra
        const [post] = yield* runQuery((client) =>
          client.select().from(posts).where(eq(posts.id, id)).limit(1),
        )

        return post ?? null
      }),

    create: (data) =>
      Effect.gen(function* () {
        const { runQuery } = yield* DatabaseInfra
        const [newPost] = yield* runQuery((client) =>
          client.insert(posts).values(data).returning({ id: posts.id }),
        )

        return newPost?.id ?? null
      }),

    update: (data) =>
      Effect.gen(function* () {
        const { runQuery } = yield* DatabaseInfra
        const [updatedPost] = yield* runQuery((client) =>
          client
            .update(posts)
            .set({ title: data.title, content: data.content })
            .where(eq(posts.id, data.id))
            .returning({ id: posts.id }),
        )

        return updatedPost?.id ?? null
      }),

    delete: (id) =>
      Effect.gen(function* () {
        const { runQuery } = yield* DatabaseInfra
        const [deletedPost] = yield* runQuery((client) =>
          client
            .delete(posts)
            .where(eq(posts.id, id))
            .returning({ id: posts.id }),
        )

        return deletedPost?.id ?? null
      }),
  }),
)
