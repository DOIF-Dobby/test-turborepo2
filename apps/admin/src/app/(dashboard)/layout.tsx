import { DashboardContainer } from '@/components/layout/dashboard/dashboard-container'
import { DashboardContent } from '@/components/layout/dashboard/dashboard-content'
import { DashboardHeader } from '@/components/layout/dashboard/dashboard-header'
import { tokenManager } from '@/libs/token/token-manager'
import type { TokenPayload } from '@/types/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type { PropsWithChildren } from 'react'

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const accessToken = await tokenManager.getAccessToken()
  if (!accessToken) {
    const header = await headers()
    const pathname = header.get('x-pathname') ?? '/'
    if (pathname === '/') {
      redirect(`/login`)
    }

    redirect(`/login?callbackUrl=${encodeURIComponent(pathname)}`)
  }

  const tokenPayload = await tokenManager.getTokenPayload<TokenPayload>()

  return (
    <DashboardContainer>
      <DashboardHeader tokenPayload={tokenPayload!} />
      <DashboardContent>{children}</DashboardContent>
    </DashboardContainer>
  )
}
