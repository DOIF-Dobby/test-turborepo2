import type { ApiResponse } from '@/types/api'
import { useToast } from '@repo/ui/components/toast'
import {
  type QueryKey,
  useMutation,
  type UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query'

interface AdminMutationOptions<
  TData extends ApiResponse<unknown> = ApiResponse<unknown>,
  TError = Error,
  TVariables = void,
  TOnMutateResult = unknown,
> extends UseMutationOptions<TData, TError, TVariables, TOnMutateResult> {
  successTitle?: string
  successMessage?: string | ((data: TData) => string)
  errorTitle?: string
  invalidateKeys?: QueryKey[]
}

export function useAdminMutation<
  TData extends ApiResponse<unknown> = ApiResponse<unknown>,
  TError = Error,
  TVariables = void,
  TOnMutateResult = unknown,
>(options: AdminMutationOptions<TData, TError, TVariables, TOnMutateResult>) {
  const toast = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    onSuccess: async (data, variables, onMutateResult, context) => {
      if (options.invalidateKeys) {
        await Promise.all(
          options.invalidateKeys.map((key) =>
            queryClient.invalidateQueries({ queryKey: key }),
          ),
        )
      }

      await options.onSuccess?.(data, variables, onMutateResult, context)

      if (options.successTitle) {
        const description =
          typeof options.successMessage === 'function'
            ? options.successMessage(data)
            : (options.successMessage ??
              data?.message ??
              '성공적으로 처리되었습니다.')

        toast.add({
          title: options.successTitle,
          description,
          itemType: 'success',
        })
      }
    },
    onError: (error, variables, onMutateResult, context) => {
      toast.add({
        title: options.errorTitle ?? '요청 실패',
        description:
          error instanceof Error
            ? error.message
            : '알 수 없는 에러가 발생했습니다.',
        itemType: 'error',
      })
      options.onError?.(error, variables, onMutateResult, context)
    },
  })
}
