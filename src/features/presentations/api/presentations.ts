import { useQuery } from '@tanstack/react-query'
import { api } from '@/shared/api/client'

/**
 * Domain types — placeholder until the presentations router exists in the
 * backend. Shape follows the backend's pagination envelope
 * (PaginatedResponse<T> from src/pagination.py).
 */
export interface PresentationSummary {
  id: string
  title: string
  updated_at: string
}

export interface Paginated<T> {
  items: T[]
  total: number
  page: number
  page_size: number
  pages: number
}

export const presentationKeys = {
  all: ['presentations'] as const,
  list: (page: number) => [...presentationKeys.all, 'list', page] as const,
}

/** Paginated presentation list for the dashboard. */
export function usePresentations(page = 1) {
  return useQuery({
    queryKey: presentationKeys.list(page),
    queryFn: () => api.get<Paginated<PresentationSummary>>('/presentations'),
    staleTime: 60_000,
  })
}
