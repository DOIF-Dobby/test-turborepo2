import { useAdminMutation } from '@/hooks/use-admin-mutation'
import { login } from './login.api'

export function useLogin() {
  return useAdminMutation({
    mutationFn: login,
    onSuccess: () => {
      console.log('success')
    },
    successTitle: '로그인 성공',
    errorTitle: '로그인 실패',
  })
}
