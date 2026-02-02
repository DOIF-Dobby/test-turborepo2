import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const modalVariants = swTwVariants({
  slots: {
    root: [],
    content: [
      'fixed',
      'left-1/2',
      'top-1/2',
      '-translate-x-1/2',
      '-translate-y-1/2',
      'bg-background',
      'py-sw-sm',
      'rounded-card-lg',
      'shadow-card-ml',
      'outline-none',
      'focus:outline-8',
      'focus-visible:outline-8',
      'z-50',
    ],
    overlay: ['fixed', 'inset-0', 'bg-black/60', 'z-50'],
    closeButton: ['absolute', 'top-2', 'right-2'],
  },
  variants: {
    size: {
      sm: {
        content: ['w-100'],
      },
      md: {
        content: ['w-120'],
      },
      lg: {
        content: ['w-140'],
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type ModalVariants = VariantProps<typeof modalVariants>
export type ModalSlots = keyof ReturnType<typeof modalVariants>
