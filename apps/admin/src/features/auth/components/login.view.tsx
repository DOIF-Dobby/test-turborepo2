'use client'

import { AppLogo } from '@/components/icon/app-logo'
import { Frame } from '@repo/ui/components/frame'
import { LoginForm } from './login.form'

export function LoginView() {
  return (
    <div className="flex h-full justify-center bg-blue-200 pt-sw-4xl">
      <div className="w-120 bg-violet-200 py-sw-sm">
        <Frame>
          <AppLogo />
        </Frame>
        <Frame>
          <LoginForm />
        </Frame>
      </div>
    </div>
  )
}
