import type { PropsWithChildren } from 'react'

export function DashboardContainer({ children }: PropsWithChildren) {
  return <div className="min-h-dvh bg-base-0">{children}</div>
}
