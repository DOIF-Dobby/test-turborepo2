import type { PropsWithChildren } from 'react'

export function AuthContent({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto max-w-desktop px-sw-md desktop:px-0">
      {children}
    </div>
  )
}
