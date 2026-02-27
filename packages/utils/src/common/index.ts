export function getUniqueID(prefix: string) {
  return `${prefix}-${Math.floor(Math.random() * 1000000)}`
}

export const isServer = typeof window === 'undefined' || 'Deno' in globalThis
