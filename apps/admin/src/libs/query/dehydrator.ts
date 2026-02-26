import { createDehydrator } from '@repo/query-utils'
import { getQueryClient } from './get-query-client'

export const { getDehydratedQuery, getDehydratedQueries, Hydrate } =
  createDehydrator({ getQueryClient })
