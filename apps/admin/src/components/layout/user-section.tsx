import { Button } from '@repo/ui/components/button'
import { Frame } from '@repo/ui/components/frame'
import { Modal } from '@repo/ui/components/modal'
import { UserIcon } from '../icon/user-icon'

export function UserSection() {
  return (
    <div className="flex items-center gap-4">
      <UserInfo />
      <LogoutButton />
    </div>
  )
}

function UserInfo() {
  return (
    <div className="flex items-center gap-1 rounded-full border border-base-200 px-2.5 py-1.5">
      <UserIcon />
      <span className="line-clamp-2 text-sm leading-[135%] font-semibold text-base-700">
        김수환
      </span>
      <span className="line-clamp-2 text-sm leading-[135%] text-base-700">
        외환담당자
      </span>
    </div>
  )
}

function LogoutButton() {
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
        <Button color="destructive" className="w-1/2">
          로그아웃
        </Button>
      </Frame>
    </Modal>
  )
}
