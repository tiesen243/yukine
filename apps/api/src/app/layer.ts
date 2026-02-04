import { Layer } from 'effect'

import { authService } from '@/app/services/auth.service'
import { databaseInfra } from '@/shared/infras/database.infra'

export const appLayer = Layer.mergeAll(databaseInfra, authService)
