import { Elysia } from 'elysia'

export const timming = (opts: { ignorePatterns: RegExp[] }) =>
  new Elysia({ name: 'plugin.timming' })
    .state('startTime', 0)
    .onBeforeHandle(({ store }) => {
      store.startTime = performance.now()
    })
    .onAfterResponse(({ request, set, path, store: { startTime } }) => {
      if (opts.ignorePatterns.some((pattern) => pattern.test(path))) return

      const formattedDate = new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(new Date())

      const duration = performance.now() - startTime
      console.log(
        `${formattedDate} - ${set.status} [${request.method}] ${path} - took ${duration.toFixed(2)}ms to execute`,
      )
    })
    .as('global')
