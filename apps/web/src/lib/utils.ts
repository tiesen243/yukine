import type { ClassValue } from 'clsx'

import { env } from '@yukine/validators/env.vite'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getApiUrl() {
  if (import.meta.env.PROD) return env.VITE_API_URL
  return 'http://localhost:1337'
}

export function getBaseUrl(): string {
  if (typeof window !== 'undefined') return window.location.origin
  if (env.VITE_WEB_URL) return env.VITE_WEB_URL
  // oxlint-disable-next-line no-process-env
  return `http://localhost:${process.env.PORT ?? 5173}`
}
