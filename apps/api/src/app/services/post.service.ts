import { Effect, Layer } from 'effect'

import { PostRepository } from '@/contracts/repositories/post.repository'
import {
  PostNotFoundError,
  PostService,
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

    findOne: (id: string) =>
      Effect.gen(function* () {
        const postRepo = yield* PostRepository
        const post = yield* postRepo.findOne(id)
        if (!post) yield* Effect.fail(new PostNotFoundError())
        return post
      }),

    create: (title: string, content: string) =>
      Effect.gen(function* () {
        const postRepo = yield* PostRepository
        const newPost = yield* postRepo.create(title, content)
        return newPost
      }),

    update: (id: string, title: string, content: string) =>
      Effect.gen(function* () {
        const postRepo = yield* PostRepository
        const existingPost = yield* postRepo.findOne(id)
        if (!existingPost) yield* Effect.fail(new PostNotFoundError())
        const updatedPost = yield* postRepo.update(id, title, content)
        return updatedPost
      }),

    delete: (id: string) =>
      Effect.gen(function* () {
        const postRepo = yield* PostRepository
        const existingPost = yield* postRepo.findOne(id)
        if (!existingPost) yield* Effect.fail(new PostNotFoundError())
        const deletedId = yield* postRepo.delete(id)
        return deletedId
      }),
  }),
)
