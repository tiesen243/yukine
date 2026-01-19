import type {
  HttpMethodProps,
  Metadata,
  ClassLike,
  OpenAPIProps,
} from '@/types'

import {
  BODY_METADATA_KEY,
  PARAM_METADATA_KEY,
  QUERY_METADATA_KEY,
  CTX_METADATA_KEY,
  CONTROLLER_METADATA_KEY,
  OPENAPI_METADATA_KEY,
} from '@/decorators/keys'

const httpMethod = (props: HttpMethodProps) => {
  const body = Reflect.getMetadata(BODY_METADATA_KEY, props.handler)
  const param = Reflect.getMetadata(PARAM_METADATA_KEY, props.handler)
  const query = Reflect.getMetadata(QUERY_METADATA_KEY, props.handler)
  const ctx = Reflect.getMetadata(CTX_METADATA_KEY, props.handler)
  const openapi = Reflect.getMetadata(OPENAPI_METADATA_KEY, props.handler)

  const { method, handler, controllerClass } = props
  const controller: Metadata[] =
    Reflect.getMetadata(CONTROLLER_METADATA_KEY, controllerClass) ?? []

  const path = props.path.startsWith('/') ? props.path : `/${props.path}`
  controller.push({ path, method, handler, param, query, body, ctx, openapi })
  Reflect.defineMetadata(CONTROLLER_METADATA_KEY, controller, controllerClass)
}

const Get = (path: string): MethodDecorator => {
  return (target, _, descriptor: PropertyDescriptor) => {
    httpMethod({
      controllerClass: target.constructor as ClassLike,
      path,
      method: 'GET',
      handler: descriptor.value,
    })
  }
}

const Post = (path: string): MethodDecorator => {
  return (target, _, descriptor: PropertyDescriptor) => {
    httpMethod({
      controllerClass: target.constructor as ClassLike,
      path,
      method: 'POST',
      handler: descriptor.value,
    })
  }
}

const Put = (path: string): MethodDecorator => {
  return (target, _, descriptor: PropertyDescriptor) => {
    httpMethod({
      controllerClass: target.constructor as ClassLike,
      path,
      method: 'PUT',
      handler: descriptor.value,
    })
  }
}

const Delete = (path: string): MethodDecorator => {
  return (target, _, descriptor: PropertyDescriptor) => {
    httpMethod({
      controllerClass: target.constructor as ClassLike,
      path,
      method: 'DELETE',
      handler: descriptor.value,
    })
  }
}

const OpenAPI = (metadata: OpenAPIProps): MethodDecorator => {
  return (_target, _, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(OPENAPI_METADATA_KEY, metadata, descriptor.value)
  }
}

export { Get, Post, Put, Delete }
export { OpenAPI }
