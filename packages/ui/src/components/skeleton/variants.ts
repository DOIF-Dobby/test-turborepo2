import type { VariantProps } from 'tailwind-variants'
import { swTwVariants } from '../../utils/tw-variants'

export const skeletonVariants = swTwVariants({
  base: [
    'relative',
    'overflow-hidden',
    'rounded-md',
    'bg-base-200',
    'animate-pulse',

    'after:absolute',
    'after:inset-0',

    // 1. 시작 위치
    'after:-translate-x-full',

    // 2. ✨ [핵심] 빗각으로 기울이기 (역동적인 느낌)
    'after:-skew-x-12',

    // 3. 그라데이션 (부드럽게 퍼지도록 via 범위 조절 가능)
    'after:bg-linear-to-r',
    'after:from-transparent',
    'after:via-base-100',
    'after:to-transparent',

    'after:animate-[shimmer_2s_infinite]',
  ],
})

export type SkeletonVariants = VariantProps<typeof skeletonVariants>
