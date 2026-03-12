import type { PropsWithChildren } from 'react'

export function DashboardContent({ children }: PropsWithChildren) {
  return (
    <main className="mx-auto max-w-desktop px-sw-md desktop:px-0">
      {children}
    </main>
  )
}
