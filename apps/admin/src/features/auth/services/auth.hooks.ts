import { useAdminMutation } from '@/hooks/use-admin-mutation'
import { login, logout } from './auth.api'

/**
 * 로그인 훅
 */
export function useLogin() {
  return useAdminMutation({
    mutationFn: login,
    errorTitle: '로그인 실패',
  })
}

/**
 * 로그아웃 훅
 */
export function useLogout() {
  return useAdminMutation({
    mutationFn: logout,
    successTitle: '로그아웃 성공',
    errorTitle: '로그아웃 실패',
  })
}
