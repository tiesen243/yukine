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
      runtime.runPromise(
        Effect.gen(function* () {
          const postService = yield* PostService
          const newPost = yield* postService.create(body.title, body.content)
          return newPost
        }),
      ),
    createPostDto,
  )

  .put(
    '/:id',
    ({ params, body, runtime }) =>
      runtime.runPromise(
        Effect.gen(function* () {
          const postService = yield* PostService
          const updatedPost = yield* postService.update(
            params.id,
            body.title,
            body.content,
          )
          return updatedPost
        }),
      ),
    updatePostDto,
  )

  .delete(
    '/:id',
    ({ params, runtime }) =>
      runtime.runPromise(
        Effect.gen(function* () {
          const postService = yield* PostService
          yield* postService.delete(params.id)
          return { success: true }
        }),
      ),
    onePostDto,
  )
