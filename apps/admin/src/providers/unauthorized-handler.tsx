'use client'

import { useToast } from '@repo/ui/components/toast'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function UnauthorizedHandler() {
  const router = useRouter()
  const toast = useToast()

  useEffect(() => {
    const handler = () => {
      toast.add({
        title: '인증이 만료되었습니다.',
        description: '다시 로그인해주세요.',
        itemType: 'error',
      })

      const callbackUrl = encodeURIComponent(window.location.pathname)
      router.replace(`/login?callbackUrl=${callbackUrl}`)
    }

    window.addEventListener('unauthorized', handler)
    return () => window.removeEventListener('unauthorized', handler)
  }, [router, toast])

  return null
}
