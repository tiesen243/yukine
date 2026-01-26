import { Elysia } from 'elysia'

export const httpException = () =>
  new Elysia({ name: 'plugin.http-exception' })
    .onError(({ error, code, status }) => {
      if (code === 'VALIDATION')
        return status(422, { statu: 422, error: 'Validation Error' })

      if (code === 'UNKNOWN' && error.name.includes('FiberFailure')) {
        const statusCode = extractStatusCode(error)
        return status(statusCode ?? 500, {
          status: statusCode ?? 500,
          error: error.message ?? 'Internal Server Error',
        })
      }

      return error
    })
    .as('global')

function extractStatusCode(error: unknown): number | undefined {
  const errorString = String(error)
  const statusMatch = errorString.match(/\[cause\]: Error: (\d{3})/)

  if (statusMatch) return parseInt(statusMatch.at(1) ?? '', 10)
  return undefined
}
