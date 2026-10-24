import { createFileRoute } from '@tanstack/react-router'
import { useSession } from '@/features/auth/api/session'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Skeleton } from '@/shared/ui/skeleton'

/**
 * Placeholder home page. Replace with the real dashboard
 * (features/presentations) once the design direction is set.
 */
export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const { data: user, isPending } = useSession()

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl">void-ppt</CardTitle>
          <CardDescription>Frontend setup complete. Sign in to begin.</CardDescription>
        </CardHeader>
        <CardContent>
          {isPending ? (
            <Skeleton className="h-5 w-40" />
          ) : user ? (
            <p data-testid="session-user">
              Signed in as <span className="font-medium">{user.email}</span>
            </p>
          ) : (
            <div className="flex gap-3">
              <Button>Sign in</Button>
              <Button variant="outline">Create account</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
