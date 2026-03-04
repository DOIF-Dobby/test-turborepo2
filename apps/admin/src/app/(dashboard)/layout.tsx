import { DashboardContainer } from '@/components/layout/dashboard-container'
import { DashboardContent } from '@/components/layout/dashboard-content'
import { DashboardHeader } from '@/components/layout/dashboard-header'
import type { PropsWithChildren } from 'react'

export default async function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <DashboardContainer>
      <DashboardHeader />
      <DashboardContent>{children}</DashboardContent>
    </DashboardContainer>
  )
}
