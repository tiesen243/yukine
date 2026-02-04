import { eq, or } from 'drizzle-orm'
import { Effect, Layer } from 'effect'

import { users } from '@/app/entities/user.entity'
import { AuthService } from '@/contracts/services/auth.service'
import { DatabaseInfra } from '@/shared/infras/database.infra'
import { Password } from '@/shared/lib/password'

export const authService = Layer.succeed(
  AuthService,
  AuthService.of({
    signUp: ({ email, username, password }) =>
      Effect.gen(function* () {
        const { runQuery } = yield* DatabaseInfra

        const [existingUser] = yield* runQuery((db) =>
          db
            .select()
            .from(users)
            .where(or(eq(users.email, email), eq(users.username, username)))
            .limit(1),
        )
        if (existingUser)
          return yield* Effect.fail(
            new Error('User already exists', { cause: 409 }),
          )

        const passwordHash = yield* Effect.promise(() =>
          new Password().hash(password),
        )
        const [newUser] = yield* runQuery((db) =>
          db
            .insert(users)
            .values({ email, username, passwordHash })
            .returning({ id: users.id }),
        )
        if (!newUser)
          return yield* Effect.fail(
            new Error('Failed to create new user', { cause: 500 }),
          )
      }),
  }),
)
