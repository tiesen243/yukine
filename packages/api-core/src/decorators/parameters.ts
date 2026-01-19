import type { AnySchema } from 'elysia/types'

import {
  PARAM_METADATA_KEY,
  QUERY_METADATA_KEY,
  BODY_METADATA_KEY,
  CTX_METADATA_KEY,
} from '@/decorators/keys'

const Param = (schema?: AnySchema): ParameterDecorator => {
  return (
    target,
    propertyKey: string | symbol | undefined,
    parameterIndex: number,
  ) => {
    Reflect.defineMetadata(
      PARAM_METADATA_KEY,
      { schema, index: parameterIndex },
      target[propertyKey as keyof typeof target],
    )
  }
}

const Query = (schema?: AnySchema): ParameterDecorator => {
  return (
    target,
    propertyKey: string | symbol | undefined,
    parameterIndex: number,
  ) => {
    Reflect.defineMetadata(
      QUERY_METADATA_KEY,
      { schema, index: parameterIndex },
      target[propertyKey as keyof typeof target],
    )
  }
}

const Body = (schema?: AnySchema): ParameterDecorator => {
  return (
    target,
    propertyKey: string | symbol | undefined,
    parameterIndex: number,
  ) => {
    Reflect.defineMetadata(
      BODY_METADATA_KEY,
      { schema, index: parameterIndex },
      target[propertyKey as keyof typeof target],
    )
  }
}

const Ctx = (): ParameterDecorator => {
  return (
    target,
    propertyKey: string | symbol | undefined,
    parameterIndex: number,
  ) => {
    Reflect.defineMetadata(
      CTX_METADATA_KEY,
      { index: parameterIndex },
      target[propertyKey as keyof typeof target],
    )
  }
}

export { Param, Query, Body, Ctx }
