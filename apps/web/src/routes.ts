import { index, route, type RouteConfig } from '@react-router/dev/routes'

export default [
  index('./routes/_index.tsx'),
  route('/posts', './routes/post.tsx'),
] satisfies RouteConfig
