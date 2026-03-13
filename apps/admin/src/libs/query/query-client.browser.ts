import { browserApiClient } from '../http/api-client.browser'
import { createQueryClient } from './create-query-client'

export const browserQueryClient = createQueryClient(browserApiClient)
