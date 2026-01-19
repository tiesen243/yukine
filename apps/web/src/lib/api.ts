import type server from '@yukine/api'

import { treaty } from '@elysiajs/eden'

import { getApiUrl } from '@/lib/utils'

export const { api } = treaty<typeof server>(getApiUrl())
