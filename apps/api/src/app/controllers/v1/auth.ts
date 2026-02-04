import { signUpDTO } from '@yukine/validators/auth'
import { Effect } from 'effect'

import { AuthService } from '@/contracts/services/auth.service'
import { controller } from '@/shared/controller'

export const authController = controller({
  name: 'controller.v1.auth',
  prefix: '/auth',
}).post(
  '/sign-up',
  ({ runtime, body, status }) =>
    runtime.runPromise(
      Effect.gen(function* () {
        const authService = yield* AuthService
        yield* authService.signUp(body)
        return status(201)
      }),
    ),
  signUpDTO,
)
