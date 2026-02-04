import { pgTable, uniqueIndex } from 'drizzle-orm/pg-core'

import { createId } from '@/shared/lib/create-id'

export const users = pgTable(
  'users',
  (t) => ({
    id: t.varchar({ length: 24 }).$default(createId).primaryKey(),
    email: t.varchar({ length: 255 }).notNull(),
    username: t.varchar({ length: 20 }).notNull(),
    avatarUrl: t.varchar({ length: 255 }),
    passwordHash: t.text().notNull(),
  }),
  (t) => [
    uniqueIndex('users_email_uq_idx').on(t.email),
    uniqueIndex('users_username_uq_idx').on(t.username),
  ],
)
