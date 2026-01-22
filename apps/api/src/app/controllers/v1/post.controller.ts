import {
  allPostsDto,
  onePostDto,
  createPostDto,
  updatePostDto,
} from '@yukine/validators/post'
import { Effect } from 'effect'

import { PostService } from '@/contracts/services/post.service'
import { controller } from '@/shared/controller'

export const postController = controller({
  name: 'controller.post',
  prefix: '/posts',
  tags: ['posts'],
})
  .get(
    '/',
    ({ runtime }) =>
      runtime.runPromise(
        Effect.gen(function* () {
          const postService = yield* PostService

          const posts = yield* postService.all()
          return posts
        }),
      ),
    allPostsDto,
  )

  .get(
    '/:id',
    ({ params, runtime }) =>
      Effect.gen(function* () {
        const postService = yield* PostService

        const post = yield* postService.findOne(params.id)
        return post
      }).pipe(
        Effect.catchTag('PostNotFoundError', () =>
          Effect.fail({ status: 404, error: 'Post not found' }),
        ),
        runtime.runPromise,
      ),
    onePostDto,
  )

  .post(
    '/',
    ({ body, runtime }) =>
      Effect.gen(function* () {
        const postService = yield* PostService

        const newId = yield* postService.create(body)
        return { id: newId }
      }).pipe(
        Effect.catchTag('PostCreationError', () =>
          Effect.fail({ status: 500, error: 'Failed to create post' }),
        ),
        runtime.runPromise,
      ),
    createPostDto,
  )

  .put(
    '/:id',
    ({ params, body, runtime }) =>
      Effect.gen(function* () {
        const postService = yield* PostService

        const updatedId = yield* postService.update({
          id: params.id,
          ...body,
        })
        return { id: updatedId }
      }).pipe(
        Effect.catchTag('PostNotFoundError', () =>
          Effect.fail({ status: 404, error: 'Post not found' }),
        ),
        Effect.catchTag('PostUpdateError', () =>
          Effect.fail({ status: 500, error: 'Failed to update post' }),
        ),
        runtime.runPromise,
      ),
    updatePostDto,
  )

  .delete(
    '/:id',
    ({ params, runtime }) =>
      Effect.gen(function* () {
        const postService = yield* PostService

        const deletedId = yield* postService.delete(params.id)
        return { id: deletedId }
      }).pipe(
        Effect.catchTag('PostNotFoundError', () =>
          Effect.fail({ status: 404, error: 'Post not found' }),
        ),
        Effect.catchTag('PostDeletionError', () =>
          Effect.fail({ status: 500, error: 'Failed to delete post' }),
        ),
        runtime.runPromise,
      ),
    onePostDto,
  )
