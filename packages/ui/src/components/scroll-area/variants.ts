import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const scrollAreaVariants = swTwVariants({
  slots: {
    root: ['relative'],
    viewport: [
      'focus-visible:ring-ring/50',
      'size-full',
      'rounded-[inherit]',
      'transition-[color,box-shadow]',
      'outline-none',
      'focus-visible:ring-[3px]',
      'focus-visible:outline-1',
    ],
  },
})

export const scrollBarVariants = swTwVariants({
  slots: {
    bar: [
      'flex',
      'touch-none',
      'p-px',
      'transition-colors',
      'select-none',
      'data-[orientation=horizontal]:h-2.5',
      'data-[orientation=horizontal]:flex-col',
      'data-[orientation=horizontal]:border-t',
      'data-[orientation=horizontal]:border-t-transparent',
      'data-[orientation=vertical]:h-full',
      'data-[orientation=vertical]:w-2.5',
      'data-[orientation=vertical]:border-l',
      'data-[orientation=vertical]:border-l-transparent',
    ],
    thumb: ['bg-base-300', 'relative', 'flex-1', 'rounded-full'],
  },
})

export type ScrollAreaVariants = VariantProps<typeof scrollAreaVariants>
export type ScrollAreaSlots = keyof ReturnType<typeof scrollAreaVariants>

export type ScrollBarVariants = VariantProps<typeof scrollBarVariants>
export type ScrollBarSlots = keyof ReturnType<typeof scrollBarVariants>
