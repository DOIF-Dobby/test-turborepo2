import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const fieldRootVariants = swTwVariants({
  base: ['flex', 'flex-col', 'gap-sw-2xs'],
})

export const fieldLabelVariants = swTwVariants({
  base: [
    'inline-flex',
    'w-fit',
    'gap-sw-4xs',
    'cursor-default',
    'peer-disabled:cursor-default peer-disabled:text-base-500',
  ],
  variants: {
    size: {
      md: ['text-paragraph-1 font-paragraph-1 leading-paragraph-1'],
      sm: ['text-paragraph-1 font-paragraph-1 leading-paragraph-1'],
      xs: ['text-paragraph-3 font-paragraph-3 leading-paragraph-3'],
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export const fieldDescriptionVariants = swTwVariants({
  base: ['text-base-600'],
  variants: {
    size: {
      md: ['text-paragraph-1 font-paragraph-1 leading-paragraph-1'],
      sm: ['text-paragraph-1 font-paragraph-1 leading-paragraph-1'],
      xs: ['text-paragraph-3 font-paragraph-3 leading-paragraph-3'],
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export const fieldErrorVariants = swTwVariants({
  base: ['text-destructive'],
  variants: {
    size: {
      md: ['text-paragraph-1 font-paragraph-1 leading-paragraph-1'],
      sm: ['text-paragraph-1 font-paragraph-1 leading-paragraph-1'],
      xs: ['text-paragraph-3 font-paragraph-3 leading-paragraph-3'],
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export const fieldItemVariants = swTwVariants({
  base: [],
})

export type FieldRootVariants = VariantProps<typeof fieldRootVariants>
export type FieldItemVariants = VariantProps<typeof fieldItemVariants>
export type FieldLabelVariants = VariantProps<typeof fieldLabelVariants>
export type FieldDescriptionVariants = VariantProps<
  typeof fieldDescriptionVariants
>
export type FieldErrorVariants = VariantProps<typeof fieldErrorVariants>
