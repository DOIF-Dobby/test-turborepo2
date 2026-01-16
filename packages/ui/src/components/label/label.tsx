import { Label as LabelPrimitive } from 'radix-ui'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import { type LabelSlots, labelVariants, type LabelVariants } from './variants'

type Props = Omit<React.ComponentProps<'label'>, keyof LabelVariants> &
  LabelVariants

export interface LabelProps extends Props {
  requiredIndicator?: boolean
  classNames?: SlotsToClasses<LabelSlots>
  indicatorValue?: React.ReactNode
}

export function Label(props: LabelProps) {
  const {
    ref,
    size,
    classNames,
    children,
    requiredIndicator = false,
    indicatorValue = '*',
    ...otherProps
  } = props

  const slots = labelVariants()

  const labelStyles = slots.label({
    size,
    className: classNames?.label,
  })

  const indicatorStyles = slots.indicator({
    className: classNames?.indicator,
  })

  return (
    <LabelPrimitive.Root
      ref={ref}
      className={swClsx(labelStyles)}
      {...otherProps}
    >
      {children}
      {requiredIndicator && (
        <span className={swClsx(indicatorStyles)}>{indicatorValue}</span>
      )}
    </LabelPrimitive.Root>
  )
}
