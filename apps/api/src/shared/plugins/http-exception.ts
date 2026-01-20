import { Elysia } from 'elysia'

export const httpException = () =>
  new Elysia({ name: 'plugin.http-exception' })
    .onError(({ error, code, status }) => {
      if (code === 'VALIDATION')
        return {
          statu: 422,
          error: 'Validation Error',
          details: JSON.parse(error.message).errors,
        }

      if (code === 'UNKNOWN' && error.name.includes('FiberFailure')) {
        const parsed = JSON.parse(error.message)
        return status(parsed.status, parsed)
      }

      return error
    })
    .as('global')
