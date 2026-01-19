import type { Route } from './+types/_index'

import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/api'

export default function IndexPage(_: Route.ComponentProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['health'],
    queryFn: () => api.health.get(),
  })

  return (
    <main className='container py-8'>
      <h1 className='text-3xl font-bold'>Hello, React Router!</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <pre className='mt-4 rounded bg-muted p-4'>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </main>
  )
}
