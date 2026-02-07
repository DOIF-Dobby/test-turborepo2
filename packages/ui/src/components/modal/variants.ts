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
    closeButtonWrapper: ['absolute', 'top-2', 'right-2'],
    closeButton: [
      'h-10',
      'min-h-10',
      'max-w-10',
      'min-w-10',
      'rounded-full',
      'px-0',
      'py-0',
    ],
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

export const modalTriggerVariants = swTwVariants({
  base: [],
  variants: {},
  defaultVariants: {},
})

export const modalTitleVariants = swTwVariants({
  base: [
    'font-heading-2',
    'text-heading-2',
    'leading-heading-2',
    'text-base-900',
  ],
  variants: {},
  defaultVariants: {},
})

export const modalDescriptionVariants = swTwVariants({
  base: [
    'font-paragraph-2',
    'text-paragraph-2',
    'leading-paragraph-2',
    'text-base-700',
  ],
  variants: {},
  defaultVariants: {},
})

export type ModalVariants = VariantProps<typeof modalVariants>
export type ModalSlots = keyof ReturnType<typeof modalVariants>

export type ModalTriggerVariants = VariantProps<typeof modalTriggerVariants>
export type ModalTriggerSlots = keyof ReturnType<typeof modalTriggerVariants>

export type ModalTitleVariants = VariantProps<typeof modalTitleVariants>
export type ModalTitleSlots = keyof ReturnType<typeof modalTitleVariants>

export type ModalDescriptionVariants = VariantProps<
  typeof modalDescriptionVariants
>
export type ModalDescriptionSlots = keyof ReturnType<
  typeof modalDescriptionVariants
>
