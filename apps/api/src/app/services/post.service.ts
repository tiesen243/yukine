import { Effect, Layer } from 'effect'

import { PostRepository } from '@/contracts/repositories/post.repository'
import {
  PostCreationError,
  PostDeletionError,
  PostNotFoundError,
  PostService,
  PostUpdationError,
} from '@/contracts/services/post.service'

export const PostServiceLive = Layer.succeed(
  PostService,
  PostService.of({
    all: () =>
      Effect.gen(function* () {
        const postRepo = yield* PostRepository

        const posts = yield* postRepo.all()
        return posts
      }),

    findOne: (id) =>
      Effect.gen(function* () {
        const postRepo = yield* PostRepository

        const post = yield* postRepo.findOne(id)
        if (!post) return yield* Effect.fail(new PostNotFoundError())

        return post
      }),

    create: (data) =>
      Effect.gen(function* () {
        const postRepo = yield* PostRepository

        const newPost = yield* postRepo.create(data)
        if (!newPost) return yield* Effect.fail(new PostCreationError())

        return newPost
      }),

    update: (data) =>
      Effect.gen(function* () {
        const postRepo = yield* PostRepository

        const existingPost = yield* postRepo.findOne(data.id)
        if (!existingPost) return yield* Effect.fail(new PostNotFoundError())

        const updatedPost = yield* postRepo.update(data)
        if (!updatedPost) return yield* Effect.fail(new PostUpdationError())

        return updatedPost
      }),

    delete: (id) =>
      Effect.gen(function* () {
        const postRepo = yield* PostRepository

        const existingPost = yield* postRepo.findOne(id)
        if (!existingPost) return yield* Effect.fail(new PostNotFoundError())

        const deletedId = yield* postRepo.delete(id)
        if (!deletedId) return yield* Effect.fail(new PostDeletionError())

        return deletedId
      }),
  }),
)
