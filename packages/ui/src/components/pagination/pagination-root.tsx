'use client'

import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import type { ButtonProps } from '../button'
import { PaginationContext } from './pagination-context'
import {
  paginationVariants,
  type PaginationSlots,
  type PaginationVariants,
} from './variants'

type Props = Omit<
  React.ComponentProps<'nav'>,
  keyof PaginationVariants | 'className'
> &
  PaginationVariants

export interface PaginationProps extends Props {
  classNames?: SlotsToClasses<PaginationSlots>
  size?: ButtonProps['size']
}

export function PaginationRoot(props: PaginationProps) {
  const { classNames, children, size = 'md', ...otherProps } = props

  const slots = paginationVariants({ size })

  return (
    <PaginationContext value={{ slots, size }}>
      <nav
        {...otherProps}
        className={swClsx(
          slots.container({ className: classNames?.container }),
        )}
      >
        {children}
      </nav>
    </PaginationContext>
  )
}
