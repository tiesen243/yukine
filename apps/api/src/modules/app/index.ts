import Elysia from 'elysia'

import { AppService } from '@/modules/app/app.service'

const service = new AppService()

export const appRouter = new Elysia()
  .get('/', () => service.index())
  .get('/health', () => service.healthCheck())
