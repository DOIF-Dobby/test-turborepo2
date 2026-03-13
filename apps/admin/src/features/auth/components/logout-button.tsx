'use client'

import { Button } from '@repo/ui/components/button'
import { Frame } from '@repo/ui/components/frame'
import { Modal } from '@repo/ui/components/modal'
import { safePromise } from '@repo/utils/promise'
import { useRouter } from 'next/navigation'
import { useLogout } from '../services/auth.hooks'

export function LogoutButton() {
  const router = useRouter()
  const logoutMutation = useLogout()

  const handleLogout = async () => {
    await safePromise(logoutMutation.mutateAsync())
    router.replace('/login')
  }

  return (
    <Modal
      trigger={
        <Modal.Trigger>
          <Button
            variant="bordered"
            className="h-[38px] min-h-[38px] truncate rounded-md border-base-300 px-3 py-2 text-base leading-[135%] text-base-800"
          >
            로그아웃
          </Button>
        </Modal.Trigger>
      }
    >
      <Frame>
        <Modal.Title>로그아웃 하시겠습니까?</Modal.Title>
      </Frame>
      <Frame direction="row">
        <Modal.Close
          render={
            <Button className="w-1/2" variant="light">
              취소
            </Button>
          }
        />
        <Button color="destructive" className="w-1/2" onPress={handleLogout}>
          로그아웃
        </Button>
      </Frame>
    </Modal>
  )
}
