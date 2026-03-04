import { swClsx } from '@repo/ui/utils/clsx'
import type { PropsWithChildren } from 'react'

export default async function DashboardLayout({ children }: PropsWithChildren) {
  return <div className={swClsx('bg-red-200 px-sw-md')}>{children}</div>
}
