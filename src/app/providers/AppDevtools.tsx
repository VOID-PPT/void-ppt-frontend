import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { env } from '@/shared/config/env'

/**
 * Dev-only tooling overlay. Tree-shaken from production builds via
 * the isDev guard + Vite define replacement.
 */
export function AppDevtools() {
  if (!env.isDev) return null
  return (
    <>
      <TanStackRouterDevtools position="bottom-right" />
      <ReactQueryDevtools initialIsOpen={false} position="left" />
    </>
  )
}
