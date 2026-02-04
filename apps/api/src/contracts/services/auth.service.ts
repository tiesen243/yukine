import type { DatabaseInfra } from '@/shared/infras/database.infra'
import type { SignUpDTO } from '@yukine/validators/auth'

import { Context, Effect } from 'effect'

export class AuthService extends Context.Tag('@yukine/auth-service')<
  AuthService,
  {
    signUp: (
      data: SignUpDTO['body'],
    ) => Effect.Effect<void, Error, DatabaseInfra>
  }
>() {}
