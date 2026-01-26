import { env } from '@yukine/validators/env.vite'

export function getBaseUrl(): string {
  if (typeof window !== 'undefined') return window.location.origin
  if (env.VITE_WEB_URL) return env.VITE_WEB_URL
  // oxlint-disable-next-line no-process-env
  return `http://localhost:${process.env.PORT ?? 5173}`
}
