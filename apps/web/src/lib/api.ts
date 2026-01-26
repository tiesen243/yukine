import type { Server } from '@yukine/api'

import { treaty } from '@elysiajs/eden'
import { env } from '@yukine/validators/env.vite'

export const { api } = treaty<Server>(env.VITE_API_URL)
