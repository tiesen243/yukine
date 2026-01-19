import { Elysia } from 'elysia'

import { HttpException } from '@/core/http'

export const httpException = () =>
  new Elysia({ name: 'plugin.http-exception' })
    .onError(({ error, code }) => {
      if (code === 'VALIDATION')
        return {
          statu: 422,
          message: 'Validation Error',
          details: JSON.parse(error.message).errors,
        }

      if (error instanceof HttpException)
        return {
          status: error.status,
          message: error.message,
          details: error.details,
        }

      return error
    })
    .as('global')
