import ky, { type Options } from 'ky'

export function createBaseClient(options: Options) {
  return ky.create({
    ...options,
  })
}
