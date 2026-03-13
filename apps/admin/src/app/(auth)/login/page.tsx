import { AppLogo } from '@/components/icon/app-logo'
import { LoginForm } from '@/features/auth/components/login.form'
import { tokenManager } from '@/libs/token/token-manager'
import { Frame } from '@repo/ui/components/frame'
import { redirect } from 'next/navigation'

interface LoginPageProps {
  searchParams: Promise<{ callbackUrl?: string }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const token = await tokenManager.getAccessToken()
  const params = await searchParams

  if (token) {
    redirect(params.callbackUrl ?? '/')
  }

  return (
    <div className="flex h-full justify-center bg-blue-200 pt-sw-4xl">
      <div className="w-120 bg-violet-200 py-sw-sm">
        <Frame>
          <AppLogo />
        </Frame>
        <Frame>
          <LoginForm callbackUrl={params.callbackUrl ?? '/'} />
        </Frame>
      </div>
    </div>
  )
}
