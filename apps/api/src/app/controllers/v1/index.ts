import { Elysia } from 'elysia'

export const v1Controller = new Elysia({
  name: 'controller.v1',
  prefix: '/api/v1',
})
