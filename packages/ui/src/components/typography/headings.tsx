import { HTMLAttributes } from 'react'
import { swClsx } from '../../utils/clsx'

type Props = object

export type HeadingProps = Omit<
  HTMLAttributes<HTMLHeadingElement>,
  keyof Props
> &
  Props

export function Heading0(props: HeadingProps) {
  const { children, className, ...otherProps } = props
  return (
    <h1
      {...otherProps}
      role="heading"
      aria-level={0}
      className={swClsx(
        [
          'text-heading-0',
          'font-heading-0',
          'leading-heading-0',
          'text-base-700',
        ],
        className,
      )}
    >
      {children}
    </h1>
  )
}
