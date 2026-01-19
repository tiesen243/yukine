import type { Handler } from 'elysia'
import type { AnySchema } from 'elysia/types'

// oxlint-disable-next-line no-explicit-any
export type ClassLike = new (...args: any[]) => any

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface Metadata {
  path: string
  method: HTTPMethod
  handler: Handler

  param?: { schema: AnySchema; index: number }
  query?: { schema: AnySchema; index: number }
  body?: { schema: AnySchema; index: number }
  ctx?: { index: number }

  openapi?: OpenAPIProps
}

export interface ModuleProps {
  imports?: ClassLike[]
  controllers: ClassLike[]
  services: ClassLike[]
}

export interface HttpMethodProps {
  controllerClass: ClassLike
  path: string
  method: HTTPMethod
  handler: Handler
}

export interface OpenAPIProps {
  tags?: string[]
  summary?: string
}
