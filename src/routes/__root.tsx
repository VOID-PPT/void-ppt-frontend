import { ErrorComponent, Outlet, createRootRoute } from '@tanstack/react-router'
import { ErrorBoundary } from 'react-error-boundary'
import { AppDevtools } from '@/app/providers/AppDevtools'
import { AppLayout } from '@/app/layouts/AppLayout'

function RootRouteError({ error }: { error: unknown }) {
  const message = error instanceof Error ? error.message : 'Unknown error'
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-muted-foreground">{message}</p>
      </div>
    </div>
  )
}

export const Route = createRootRoute({
  component: () => (
    <ErrorBoundary FallbackComponent={RootRouteError}>
      <AppLayout>
        <Outlet />
      </AppLayout>
      <AppDevtools />
    </ErrorBoundary>
  ),
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">404 — Page not found</h1>
        <p className="mt-2 text-muted-foreground">The page you are looking for does not exist.</p>
      </div>
    </div>
  ),
})
