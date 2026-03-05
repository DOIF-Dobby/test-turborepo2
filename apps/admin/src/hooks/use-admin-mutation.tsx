import { ApiError } from '@/libs/http/api-error'
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
  invalidateKeys?: QueryKey[] | ((variables: TVariables) => QueryKey[])
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
        const keys =
          typeof options.invalidateKeys === 'function'
            ? options.invalidateKeys(variables)
            : options.invalidateKeys

        await Promise.all(
          keys.map((key) => queryClient.invalidateQueries({ queryKey: key })),
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
      if (error instanceof ApiError) {
        const { errorData } = error

        toast.add({
          title: options.errorTitle ?? errorData.message ?? '요청 실패',
          description: (
            <span>
              <div>{errorData.message}</div>
              {errorData.data &&
                Object.entries(errorData.data).map(([key, value]) => (
                  <div key={key}>
                    {key}: {value as string}
                  </div>
                ))}
            </span>
          ),
          itemType: 'error',
        })
      } else {
        toast.add({
          title: options.errorTitle ?? '요청 실패',
          description:
            error instanceof Error
              ? error.message
              : '알 수 없는 에러가 발생했습니다.',
          itemType: 'error',
        })
      }

      options.onError?.(error, variables, onMutateResult, context)
    },
  })
}
