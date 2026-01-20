import type { ElysiaConfig } from 'elysia'

import { ManagedRuntime } from 'effect'
import { Elysia } from 'elysia'

import { appLayer } from '@/app/layer'

const effectRuntime = new Elysia({ name: 'plugin.effect-runtime' })
  .decorate('runtime', ManagedRuntime.make(appLayer))
  .as('global')

export const controller = <TPrefix extends string>(
  config?: ElysiaConfig<TPrefix>,
) => new Elysia<TPrefix>(config).use(effectRuntime)
