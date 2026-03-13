import { LogoutButton } from '../../../features/auth/components/logout-button'
import { UserIcon } from '../../icon/user-icon'

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
