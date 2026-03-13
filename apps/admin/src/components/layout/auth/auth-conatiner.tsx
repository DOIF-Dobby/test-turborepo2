import type { PropsWithChildren } from 'react'

export function AuthContainer({ children }: PropsWithChildren) {
  return <div className="min-h-dvh bg-base-0">{children}</div>
}
