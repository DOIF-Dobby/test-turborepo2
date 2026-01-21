import { useId } from 'react'

export function useFallbackId(id?: string) {
  const generatedId = useId()
  return id || generatedId
}
