import { serverApiClient } from '../http/api-client.server'
import { createQueryClient } from './create-query-client'

export const serverQueryClient = createQueryClient(serverApiClient)
