/**
 * Runtime environment access. All env vars must be declared here —
 * never read import.meta.env directly from feature code.
 */
export const env = {
  apiBaseUrl: (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? '/api/v1',
  isDev: import.meta.env.DEV,
} as const
