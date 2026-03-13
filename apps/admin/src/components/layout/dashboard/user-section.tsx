import { UserIcon } from '@/components/icon/user-icon'
import { LogoutButton } from '@/features/auth/components/logout-button'
import type { TokenPayload } from '@/types/auth'

interface UserSectionProps {
  tokenPayload: TokenPayload
}

export function UserSection({ tokenPayload }: UserSectionProps) {
  const { name, roleName } = tokenPayload

  return (
    <div className="flex items-center gap-sw-xs">
      <div className="flex items-center gap-1 rounded-full border border-base-200 px-2.5 py-1.5">
        <UserIcon />
        <span className="line-clamp-2 text-sm leading-[135%] font-semibold text-base-700">
          {name}
        </span>
        <span className="line-clamp-2 text-sm leading-[135%] text-base-700">
          {roleName}
        </span>
      </div>
      <LogoutButton />
    </div>
  )
}
