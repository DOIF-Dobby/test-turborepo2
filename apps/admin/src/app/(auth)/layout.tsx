import { AuthContainer } from '@/components/layout/auth/auth-conatiner'
import { AuthContent } from '@/components/layout/auth/auth-content'
import type { PropsWithChildren } from 'react'

export default async function AuthLayout({ children }: PropsWithChildren) {
  return (
    <AuthContainer>
      <AuthContent>{children}</AuthContent>
    </AuthContainer>
  )
}
