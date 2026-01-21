import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const switchVariants = swTwVariants({
  slots: {
    container: ['group', 'flex', 'items-center', 'gap-sw-2xs'],
    root: [
      'peer',
      'inline-flex',
      'shrink-0',
      'cursor-pointer',
      'items-center',
      'rounded-full',
      'border-2',
      'border-transparent',
      'outline-none',
      'box-border',

      'data-[state=unchecked]:justify-start',
      'data-[state=checked]:justify-end',

      // Focus Base (색상은 variant에서 처리)
      'focus-visible:ring-2',
      'focus-visible:ring-offset-2',
      'focus-visible:ring-offset-background',

      // Disabled
      'disabled:cursor-not-allowed',

      // Unchecked Background (기본적으로 모두 동일)
      'not-disabled:data-[state=unchecked]:bg-base-500',
      'disabled:data-[state=unchecked]:bg-base-300',
    ],
    thumb: [
      'pointer-events-none',
      'block',
      'rounded-full',
      'bg-background',
      'shadow-lg',
      'ring-0',
    ],
    label: [
      'select-none',
      'cursor-pointer',
      'peer-disabled:cursor-not-allowed',
      'peer-disabled:text-base-500',
    ],
  },
  variants: {
    size: {
      xs: {
        root: ['h-4.5', 'w-8', 'px-0.5'],
        thumb: ['size-3'],
        label: ['text-xs'],
      },
      sm: {
        root: ['h-6', 'w-10', 'px-0.5'],
        thumb: ['size-4'],
        label: ['text-sm'],
      },
      md: {
        root: ['h-8', 'w-16', 'px-0.5'],
        thumb: ['size-6'],
        label: ['text-base'],
      },
      lg: {
        root: ['h-12', 'w-21.5', 'px-0.5'],
        thumb: ['size-9.5'],
        label: ['text-xl'],
      },
    },
    color: {
      cta1: {
        root: [
          'not-disabled:data-[state=checked]:bg-cta1',
          'not-disabled:focus-visible:ring-cta1-hover',
          'disabled:data-[state=checked]:bg-cta1-disabled',
        ],
      },
      cta2: {
        root: [
          'not-disabled:data-[state=checked]:bg-cta2',
          'not-disabled:focus-visible:ring-cta2-hover',
          'disabled:data-[state=checked]:bg-cta2-disabled',
        ],
      },
      destructive: {
        root: [
          'not-disabled:data-[state=checked]:bg-destructive',
          'not-disabled:focus-visible:ring-destructive',
          'disabled:data-[state=checked]:bg-destructive-disabled',
        ],
      },
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'cta1',
  },
})

export type SwitchVariants = VariantProps<typeof switchVariants>
export type SwitchSlots = keyof ReturnType<typeof switchVariants>
