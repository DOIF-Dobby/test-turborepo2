import { skeletonVariants, type SkeletonVariants } from './variants'

type Props = Omit<React.ComponentProps<'div'>, keyof SkeletonVariants> &
  SkeletonVariants

export interface SkeletonProps extends Props {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return <div className={skeletonVariants({ className })} {...props} />
}
