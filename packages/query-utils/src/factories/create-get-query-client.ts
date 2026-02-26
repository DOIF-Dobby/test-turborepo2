import {
  QueryClient,
  type QueryClientConfig,
  defaultShouldDehydrateQuery,
  isServer,
} from '@tanstack/react-query'

export function createGetQueryClient(initialConfig?: QueryClientConfig) {
  const { defaultOptions, ...restIntialConfig } = initialConfig
    ? initialConfig
    : {}

  const config: QueryClientConfig = {
    defaultOptions: {
      ...defaultOptions,
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
        ...defaultOptions?.dehydrate,
      },
    },
    ...restIntialConfig,
  }

  let browserQueryClient: QueryClient | undefined = undefined

  return () => {
    // 매번 이 옵션으로 새 QueryClient를 만들거나, 브라우저에선 한 번만 만들어 재사용
    if (isServer) {
      return new QueryClient(config)
    }

    if (!browserQueryClient) {
      browserQueryClient = new QueryClient(config)
    }
    return browserQueryClient
  }
}
