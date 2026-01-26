import { Layer } from 'effect'

import { DatabaseInfraLive } from '@/shared/infras/database.infra'

export const appLayer = Layer.mergeAll(DatabaseInfraLive)
