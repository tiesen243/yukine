import type { InvertedStatusMap } from 'elysia'

import { StatusMap } from 'elysia'

interface IHttpException {
  status: StatusMap[keyof StatusMap]
  message: string
  details?: unknown
}

export class HttpException extends Error implements IHttpException {
  status: StatusMap[keyof StatusMap]
  details?: unknown

  constructor(
    status: InvertedStatusMap[keyof InvertedStatusMap],
    message: string,
    details?: unknown,
  ) {
    super(message)
    this.name = this.constructor.name
    this.status = StatusMap[status]
    this.details = details
    Error.captureStackTrace(this, this.constructor)
  }
}
