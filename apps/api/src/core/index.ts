import 'reflect-metadata'

import type { ClassLike } from '@/core/types'
import type { AnyElysia, ElysiaConfig } from 'elysia'

import { Elysia } from 'elysia'

import {
  getControllers,
  getImports,
  getInitializedControllers,
} from '@/core/decorators'

export const createApp = <T extends string>(
  module: ClassLike,
  { plugins = [], ...opts }: ElysiaConfig<T> & { plugins?: AnyElysia[] },
): Elysia<T> => {
  const app = new Elysia<T>(opts)
  for (const plugin of plugins) app.use(plugin)

  getImports(module).forEach((module) => {
    const importedApp = createApp(module, opts)
    app.use(importedApp)
  })

  const controllers = getControllers(module)
  if (!controllers) {
    console.error('Invalid class module')
    process.exit(-1)
  }

  let injectedAppWithControllers = app
  controllers.forEach((controller) => {
    const initializeController = getInitializedControllers<T>(controller)
    if (!initializeController) {
      console.error(
        `Controller ${controller.name} is not properly initialized.`,
      )
      process.exit(-1)
    }

    injectedAppWithControllers = initializeController(app)
  })

  return injectedAppWithControllers
}
