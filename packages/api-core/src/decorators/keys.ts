import type { ClassLike } from '@/types'
import type { Elysia } from 'elysia'

export const IMPORTS_METADATA_KEY = Symbol('metadata:imports')
export const CONTROLLER_METADATA_KEY = Symbol('metadata:controller')
export const INJECTABLE_METADATA_KEY = Symbol('metadata:injectable')

export const BODY_METADATA_KEY = Symbol('metadata:body')
export const PARAM_METADATA_KEY = Symbol('metadata:param')
export const QUERY_METADATA_KEY = Symbol('metadata:query')
export const CTX_METADATA_KEY = Symbol('metadata:ctx')
export const OPENAPI_METADATA_KEY = Symbol('metadata:openapi')

export const INITIALIZED_CONTROLLERS_KEY = Symbol('initialized:controllers')

export const getImports = (module: ClassLike): ClassLike[] =>
  Reflect.getMetadata(IMPORTS_METADATA_KEY, module) ?? []

export const getControllers = (module: ClassLike): ClassLike[] =>
  Reflect.getMetadata(CONTROLLER_METADATA_KEY, module) ?? []

export const getInitializedControllers = <T extends string>(
  module: ClassLike,
): ((app: Elysia<T>) => Elysia<T>) =>
  Reflect.getMetadata(INITIALIZED_CONTROLLERS_KEY, module)
