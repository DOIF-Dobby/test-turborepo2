import type { ClassValue } from 'tailwind-variants'

export type AsChild = {
  asChild?: boolean
}

export type MakeRequired<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>

export type SlotsToClasses<S extends string> = {
  [key in S]?: Exclude<ClassValue, 0n>
}
