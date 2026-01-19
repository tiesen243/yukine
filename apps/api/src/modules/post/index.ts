import Elysia, { t } from 'elysia'

import { PostService } from '@/modules/post/post.service'

const postService = new PostService()

export const postRouter = new Elysia({ prefix: '/posts' })
  .get('/', () => postService.all())
  .get(
    '/:id',
    ({ params: { id } }) => {
      // oxlint-disable-next-line no-array-callback-reference
      const post = postService.find(id)
      if (!post) return { status: 404, body: { message: 'Post not found' } }
      return post
    },
    { params: t.Object({ id: t.Numeric() }) },
  )
  .post('/', ({ body }) => {
    const { title, content } = body as { title: string; content: string }
    const newPost = postService.create(title, content)
    return { status: 201, body: newPost }
  })
  .put('/:id', ({ params, body }) => {
    const { title, content } = body as { title: string; content: string }
    const updatedPost = postService.update(Number(params.id), title, content)
    if (!updatedPost)
      return { status: 404, body: { message: 'Post not found' } }
    return updatedPost
  })
  .delete('/:id', ({ params }) => {
    const deletedPost = postService.delete(Number(params.id))
    if (!deletedPost)
      return { status: 404, body: { message: 'Post not found' } }
    return deletedPost
  })
