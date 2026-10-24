import type { ReactNode } from 'react'
import { Toaster } from '@/shared/ui/sonner'

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <main className="flex-1">{children}</main>
      <Toaster />
    </div>
  )
}
