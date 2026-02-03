'use client'

import { CheckboxGroup as CheckboxGroupPrimitive } from '@base-ui/react/checkbox-group'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import {
  type CheckboxGroupSlots,
  checkboxGroupVariants,
  type CheckboxGroupVariants,
} from './variants'

type Props = Omit<
  React.ComponentProps<typeof CheckboxGroupPrimitive>,
  keyof CheckboxGroupVariants
> &
  CheckboxGroupVariants

export interface CheckboxGroupProps extends Props {
  classNames?: SlotsToClasses<CheckboxGroupSlots>
}

export function CheckboxGroup(props: CheckboxGroupProps) {
  const { children, classNames, orientation, ...otherProps } = props

  const slots = checkboxGroupVariants({ orientation })

  return (
    <CheckboxGroupPrimitive {...otherProps}>
      <div className={swClsx(slots.root({ className: classNames?.root }))}>
        {children}
      </div>
    </CheckboxGroupPrimitive>
  )
}
