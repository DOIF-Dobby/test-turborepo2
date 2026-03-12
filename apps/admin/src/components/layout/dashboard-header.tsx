import { AppLogo } from '../icon/app-logo'
import { DashboardMenubar } from './dashboard-menubar'
import { UserSection } from './user-section'

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 h-18 border-b border-b-base-200 bg-background">
      <div className="mx-auto flex h-full max-w-desktop items-center justify-between px-sw-md desktop:px-0">
        <AppLogo />
        <DashboardMenubar />
        <UserSection />
      </div>
    </header>
  )
}
