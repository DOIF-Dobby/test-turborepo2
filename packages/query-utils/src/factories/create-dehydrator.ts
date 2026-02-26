import {
  dehydrate,
  HydrationBoundary,
  type QueryClient,
  type QueryFunction,
  type QueryKey,
} from '@tanstack/react-query'

/**
 * 1. QueryProps 구조 수정
 * 라이브러리의 QueryKey는 Readonly를 포함할 수 있으므로
 * 제네릭 제약을 명시적으로 readonly를 포함하는 형태로 가져갑니다.
 */
export interface QueryProps<
  TQueryFnData = unknown,
  TQueryKey extends QueryKey = QueryKey,
> {
  queryKey: TQueryKey
  // queryOptions가 queryFn을 빼고 반환할 수도 있으므로 optional 처리합니다.
  queryFn?: QueryFunction<TQueryFnData, TQueryKey>
}

export interface DehydratorOptions {
  getQueryClient: () => QueryClient
}

export function createDehydrator({ getQueryClient }: DehydratorOptions) {
  /**
   * 단일 쿼리 prefetch
   */
  async function getDehydratedQuery<TQueryFnData, TQueryKey extends QueryKey>(
    options: QueryProps<TQueryFnData, TQueryKey>,
  ) {
    const qc = getQueryClient()
    // 분해해서 넘기지 말고 객체 통째로 넘겨야 내부 DataTag 심볼이 깨지지 않습니다.
    await qc.prefetchQuery(options)
    return dehydrate(qc)
  }

  /**
   * 복수 쿼리 prefetch
   * 가변 인자 튜플인 [...T]를 사용하여 각 요소의 Readonly 속성을 보존합니다.
   */
  async function getDehydratedQueries<
    // eslint-disable-next-line
    T extends readonly QueryProps<any, any>[],
  >(queries: [...T]) {
    const qc = getQueryClient()

    await Promise.all(queries.map((query) => qc.prefetchQuery(query)))

    return dehydrate(qc)
  }

  const Hydrate = HydrationBoundary

  return {
    getDehydratedQuery,
    getDehydratedQueries,
    Hydrate,
  }
}
