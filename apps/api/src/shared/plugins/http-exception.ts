import { Elysia } from 'elysia'

import { HttpException } from '@/shared/http'

export const httpException = () =>
  new Elysia({ name: 'plugin.http-exception' })
    .onError(({ error, code }) => {
      if (code === 'VALIDATION')
        return {
          statu: 422,
          error: 'Validation Error',
          details: JSON.parse(error.message).errors,
        }

      if (error instanceof HttpException)
        return {
          status: error.status,
          error: error.message,
          details: error.details,
        }

      return error
    })
    .as('global')
