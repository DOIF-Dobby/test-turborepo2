import type { UseQueryResult } from '@tanstack/react-query'

interface QueryBoundaryProps<TData> {
  query: UseQueryResult<TData>
  fallback: React.ReactNode
  forceFallback?: boolean
  children: (data: TData) => React.ReactNode
  errorFallback?: (error: UseQueryResult<TData>['error']) => React.ReactNode
}

export function QueryBoundary<TData>(props: QueryBoundaryProps<TData>) {
  const {
    query,
    fallback,
    forceFallback = false,
    children,
    errorFallback,
  } = props

  const { isLoading, data, isError, error } = query

  if (isLoading || forceFallback) {
    return <>{fallback}</>
  }

  if (isError && errorFallback) {
    return <>{errorFallback(error)}</>
  }

  if (!data) {
    return null
  }

  return <>{children(data)}</>
}
