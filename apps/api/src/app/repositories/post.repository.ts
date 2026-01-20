import type { IPost } from '@/contracts/repositories/post.repository'

import { Effect, Layer } from 'effect'

import { PostRepository } from '@/contracts/repositories/post.repository'
import { DatabaseInfra } from '@/shared/infras/database.infra'

const posts: IPost[] = [
  {
    id: '1',
    title: 'First Post',
    content: 'This is the content of the first post.',
  },
]

export const PostRepositoryLive = Layer.succeed(
  PostRepository,
  PostRepository.of({
    all: () =>
      Effect.gen(function* () {
        const { db } = yield* DatabaseInfra
        db.query('SELECT * FROM posts')
        return posts
      }),

    findOne: (id: string) =>
      Effect.gen(function* () {
        const { db } = yield* DatabaseInfra
        db.query('SELECT * FROM posts WHERE id = ?', [id])

        const post = posts.find((p) => p.id === id) ?? null
        return post
      }),

    create: (title: string, content: string) =>
      Effect.gen(function* () {
        const { db } = yield* DatabaseInfra
        db.query('INSERT INTO posts (title, content) VALUES (?, ?)', [
          title,
          content,
        ])

        const newPost: IPost = {
          id: crypto.randomUUID(),
          title,
          content,
        }
        posts.push(newPost)
        return newPost
      }),

    update: (id: string, title: string, content: string) =>
      Effect.gen(function* () {
        const { db } = yield* DatabaseInfra
        db.query('UPDATE posts SET title = ?, content = ? WHERE id = ?', [
          title,
          content,
          id,
        ])

        const postIndex = posts.findIndex((p) => p.id === id)
        const updatedPost: IPost = {
          id,
          title,
          content,
        }
        posts[postIndex] = updatedPost
        return updatedPost
      }),

    delete: (id: string) =>
      Effect.gen(function* () {
        const { db } = yield* DatabaseInfra
        db.query('DELETE FROM posts WHERE id = ?', [id])

        const postIndex = posts.findIndex((p) => p.id === id)
        posts.splice(postIndex, 1)
        return id
      }),
  }),
)
