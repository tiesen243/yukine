import type { ModuleProps, ClassLike, Metadata } from '@/types'
import type { Elysia, Context } from 'elysia'

import { container } from '@/container'
import {
  IMPORTS_METADATA_KEY,
  CONTROLLER_METADATA_KEY,
  INJECTABLE_METADATA_KEY,
  INITIALIZED_CONTROLLERS_KEY,
} from '@/decorators/keys'

const Module = ({ imports = [], controllers, services }: ModuleProps) => {
  return (target: ClassLike) => {
    Reflect.defineMetadata(IMPORTS_METADATA_KEY, imports, target)
    Reflect.defineMetadata(CONTROLLER_METADATA_KEY, controllers, target)

    services.forEach((service) => {
      if (!Reflect.getMetadata(INJECTABLE_METADATA_KEY, service))
        throw new Error(
          `Service ${service.name} is not marked as injectable. Please add @Injectable() decorator.`,
        )

      const instance = new service()
      container.register(service.name, instance)
    })
  }
}

const Controller = (prefix: string = '') => {
  if (!prefix.startsWith('/')) prefix = `/${prefix}`

  return (target: ClassLike) => {
    function initialize(app: Elysia): Elysia {
      const services = (
        Reflect.getMetadata('design:paramtypes', target) ?? []
      ).map((service: ClassLike) => container.resolve(service.name))

      const controller = new target(...services)
      const metadata: Metadata[] =
        Reflect.getMetadata(CONTROLLER_METADATA_KEY, target) ?? []

      metadata.forEach((meta) => {
        const getParams = (ctx: Context) => {
          const params: unknown[] = []

          if (meta.param) params[meta.param.index] = ctx.params
          if (meta.query) params[meta.query.index] = ctx.query
          if (meta.body) params[meta.body.index] = ctx.body
          if (meta.ctx) params[meta.ctx.index] = ctx

          return params
        }

        const bondedHandler = meta.handler.bind(controller)
        const isGenerator =
          bondedHandler.constructor.name.includes('GeneratorFunction')

        const handler = isGenerator
          ? async function* (ctx: Context) {
              try {
                for await (const eachValue of bondedHandler(
                  // @ts-expect-error - 2556: A spread argument must either have a tuple type or be passed to a rest parameter.
                  ...getParams(ctx),
                ) as AsyncGenerator<unknown>)
                  yield eachValue
              } catch (error) {
                yield error
              }
            }
          : function (ctx: Context) {
              // @ts-expect-error - 2556: A spread argument must either have a tuple type or be passed to a rest parameter.
              return bondedHandler(...getParams(ctx))
            }

        app.route(meta.method, `${prefix}${meta.path}`, handler, {
          params: meta.param?.schema,
          query: meta.query?.schema,
          body: meta.body?.schema,
          ...(meta.openapi ? { detail: meta.openapi } : {}),
        })
      })

      return app
    }

    Reflect.defineMetadata(INITIALIZED_CONTROLLERS_KEY, initialize, target)
  }
}

const Injectable = () => {
  return (target: ClassLike) => {
    Reflect.defineMetadata(INJECTABLE_METADATA_KEY, true, target)
  }
}

export { Module, Controller, Injectable }
