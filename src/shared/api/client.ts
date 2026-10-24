import { env } from '@/shared/config/env'

export class ApiError extends Error {
  readonly status: number

  constructor(status: number, body: string) {
    super(`API error ${String(status)}: ${body}`)
    this.status = status
  }
}

/**
 * Thin typed-fetch client shell over the FastAPI backend.
 *
 * Response types come from OpenAPI-generated types (src/shared/types/api.d.ts),
 * regenerated via `npm run api:types` while the backend serves /openapi.json.
 *
 * The feature layer consumes this through TanStack Query hooks
 * (features/<feature>/api/), never directly from components.
 */
async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers)
  headers.set('Content-Type', 'application/json')

  const res = await fetch(`${env.apiBaseUrl}${path}`, {
    ...init,
    headers,
    method: init?.method ?? 'GET',
  })
  if (!res.ok) {
    throw new ApiError(res.status, await res.text())
  }
  return (await res.json()) as T
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
}
