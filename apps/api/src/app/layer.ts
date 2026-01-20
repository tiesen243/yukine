import { Layer } from 'effect'

import { PostRepositoryLive } from '@/app/repositories/post.repository'
import { PostServiceLive } from '@/app/services/post.service'
import { DatabaseInfraLive } from '@/shared/infras/database.infra'

export const appLayer = Layer.mergeAll(
  DatabaseInfraLive,
  PostRepositoryLive,
  PostServiceLive,
)
