import type { TokenPayload } from '@/types/auth'
import Link from 'next/link'
import { AppLogo } from '../../icon/app-logo'
import { DashboardMenubar } from './dashboard-menubar'
import { UserSection } from './user-section'

interface DashboardHeaderProps {
  tokenPayload: TokenPayload
}

export function DashboardHeader({ tokenPayload }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-10 h-18 border-b border-b-base-200 bg-background">
      <div className="mx-auto flex h-full max-w-desktop items-center justify-between px-sw-md desktop:px-0">
        <Link href="/">
          <AppLogo />
        </Link>
        <DashboardMenubar />
        <UserSection tokenPayload={tokenPayload} />
      </div>
    </header>
  )
}
