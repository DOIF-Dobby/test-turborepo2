import type { PropsWithChildren } from 'react'

export function AuthContainer({ children }: PropsWithChildren) {
  return <div className="min-h-dvh bg-red-200">{children}</div>
}
