import { useQuery } from '@tanstack/react-query'
import { ApiError, api } from '@/shared/api/client'

/**
 * Domain types — to be replaced by generated OpenAPI types once
 * `npm run api:types` has been run against the live backend.
 */
export interface UserRead {
  id: string
  email: string
  name: string | null
  is_active: boolean
  is_superuser: boolean
}

const sessionKey = ['session'] as const

/** Returns the current user, or null when unauthenticated. */
export function useSession() {
  return useQuery({
    queryKey: sessionKey,
    queryFn: async (): Promise<UserRead | null> => {
      try {
        return await api.get<UserRead>('/auth/me')
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) return null
        throw error
      }
    },
    staleTime: 5 * 60_000,
  })
}
