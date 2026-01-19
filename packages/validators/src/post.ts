import * as z from 'zod'

const numeric = z.string().regex(/^\d+$/)

export const post = z.object({
  id: numeric,
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  publishedAt: z.string().optional(),
})
export type Post = z.infer<typeof post>

export const allPosts = z.array(post)
export type AllPosts = z.infer<typeof allPosts>

export const createPost = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
})
export type CreatePost = z.infer<typeof createPost>

export const updatePost = createPost.extend({ id: numeric })
export type UpdatePost = z.infer<typeof updatePost>

export const deletePost = z.object({ id: numeric })
export type DeletePost = z.infer<typeof deletePost>
