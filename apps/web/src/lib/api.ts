import { env } from '@yukine/validators/env.vite'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

class API {
  private apiUrl: string

  constructor() {
    if (import.meta.env.PROD) this.apiUrl = env.VITE_API_URL
    else this.apiUrl = 'http://localhost:1337'
    this.apiUrl = `${this.apiUrl}/api`
  }

  private fetcher = async <
    TData extends Record<string, unknown>,
    TBody extends Record<string, unknown>,
  >(
    path: string,
    method: HttpMethod,
    body?: TBody,
  ): Promise<TData> => {
    const response = await fetch(`${this.apiUrl}${path}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    })
    const json = (await response.json()) as TData | { error: string }

    if (!response.ok)
      throw new Error(
        (json as { error: string }).error ?? 'An unknown error occurred',
      )

    return json as TData
  }

  public get = <TData extends Record<string, unknown>>(path: string) =>
    this.fetcher<TData, never>(path, 'GET')

  public post = <
    TData extends Record<string, unknown>,
    TBody extends Record<string, unknown>,
  >(
    path: string,
    body: TBody,
  ) => this.fetcher<TData, TBody>(path, 'POST', body)

  public put = <
    TData extends Record<string, unknown>,
    TBody extends Record<string, unknown>,
  >(
    path: string,
    body: TBody,
  ) => this.fetcher<TData, TBody>(path, 'PUT', body)

  public delete = <TData extends Record<string, unknown>>(path: string) =>
    this.fetcher<TData, never>(path, 'DELETE')
}

export const api = new API()
