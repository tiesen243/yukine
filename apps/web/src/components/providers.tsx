'use client'

import { QueryClientProvider, type QueryClient } from '@tanstack/react-query'
import { createQueryClient } from '@yukine/lib/create-query-client'
import { ThemeProvider } from '@yukine/ui'
import { StackedToastProvider } from '@yukine/ui/toast'

let clientQueryClientSingleton: QueryClient | undefined
export const getQueryClient = () => {
  if (typeof window === 'undefined') return createQueryClient()
  return (clientQueryClientSingleton ??= createQueryClient())
}

export function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute='class' disableTransitionOnChange enableSystem>
        <StackedToastProvider>{children}</StackedToastProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
