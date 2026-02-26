import type {
  DataTag,
  DefaultError,
  DefinedInitialDataOptions,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UnusedSkipTokenOptions,
} from '@tanstack/react-query'
import { queryOptions } from '@tanstack/react-query'

type RequireQueryFn<T, TQueryFnData, TQueryKey extends QueryKey> = T & {
  queryFn: QueryFunction<TQueryFnData, TQueryKey>
}

export function strictQueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: RequireQueryFn<
    DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>,
    TQueryFnData,
    TQueryKey
  >,
): DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey> & {
  queryKey: DataTag<TQueryKey, TQueryFnData, TError>
}

export function strictQueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: RequireQueryFn<
    UnusedSkipTokenOptions<TQueryFnData, TError, TData, TQueryKey>,
    TQueryFnData,
    TQueryKey
  >,
): UnusedSkipTokenOptions<TQueryFnData, TError, TData, TQueryKey> & {
  queryKey: DataTag<TQueryKey, TQueryFnData, TError>
}

export function strictQueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: RequireQueryFn<
    UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>,
    TQueryFnData,
    TQueryKey
  >,
): UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey> & {
  queryKey: DataTag<TQueryKey, TQueryFnData, TError>
}

export function strictQueryOptions(
  options: Parameters<typeof queryOptions>[0],
) {
  return queryOptions(options as Parameters<typeof queryOptions>[0])
}
