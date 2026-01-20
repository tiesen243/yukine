import { Elysia } from 'elysia'

import { postController } from '@/app/controllers/v1/post.controller'

export const v1Controller = new Elysia({
  name: 'controller.v1',
  prefix: '/api/v1',
}).use(postController)
