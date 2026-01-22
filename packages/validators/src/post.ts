import * as z from 'zod'

const numeric = z
  .string()
  .regex(/^\d+$/)
  .transform((val) => parseInt(val, 10))

export const allPostsDto = {
  query: z.object({
    page: z.union([numeric, z.number()]).default(1),
    limit: z.union([numeric, z.number()]).default(10),
  }),
}
export type AllPostsDto = {
  [K in keyof typeof allPostsDto]: z.infer<(typeof allPostsDto)[K]>
}

export const onePostDto = {
  params: z.object({ id: numeric }),
}
export type OnePostDto = {
  [K in keyof typeof onePostDto]: z.infer<(typeof onePostDto)[K]>
}

export const createPostDto = {
  body: z.object({
    title: z.string().min(1),
    content: z.string().min(1),
  }),
}
export type CreatePostDto = {
  [K in keyof typeof createPostDto]: z.infer<(typeof createPostDto)[K]>
}

export const updatePostDto = {
  params: onePostDto.params,
  body: createPostDto.body,
}
export type UpdatePostDto = {
  [K in keyof typeof updatePostDto]: z.infer<(typeof updatePostDto)[K]>
}
