import { createDehydrator } from '@repo/query-utils'
import { serverQueryClient } from './query-client.server'

export const { getDehydratedQuery, getDehydratedQueries, Hydrate } =
  createDehydrator({ getQueryClient: serverQueryClient })
