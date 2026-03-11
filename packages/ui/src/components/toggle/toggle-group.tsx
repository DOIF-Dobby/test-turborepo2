'use client'

import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group'
import { useControllableState } from '@repo/hooks/use-controllable-state'
import { useId } from 'react'
import { swClsx } from '../../utils/clsx'
import { ToggleGroupContext } from './toggle-group-context'
import { toggleGroupVariants, type ToggleGroupVariants } from './variants'

type Props = Omit<
  React.ComponentProps<typeof ToggleGroupPrimitive>,
  | keyof ToggleGroupVariants
  | 'className'
  | 'value'
  | 'defaultValue'
  | 'onValueChange'
  | 'multiple'
> &
  ToggleGroupVariants

type ToggleGroupValue<Multiple extends boolean> = Multiple extends true
  ? string[]
  : string

export interface ToggleGroupProps<Multiple extends boolean> extends Props {
  multiple?: Multiple
  className?: string
  motionAnimation?: boolean
  disallowEmpty?: boolean
  value?: ToggleGroupValue<Multiple>
  defaultValue?: ToggleGroupValue<Multiple>
  onValueChange?: (
    value: ToggleGroupValue<Multiple>,
    eventDetails: ToggleGroupPrimitive.ChangeEventDetails,
  ) => void
}

export function ToggleGroup<Multiple extends boolean = false>(
  props: ToggleGroupProps<Multiple>,
) {
  const {
    multiple = false as Multiple,
    children,
    className,
    motionAnimation = false,
    disallowEmpty = false,
    defaultValue,
    value: valueProp,
    onValueChange,
    ...ohterProps
  } = props

  const [value, setValue] = useControllableState<ToggleGroupValue<Multiple>>({
    defaultValue,
    value: valueProp,
  })

  const styles = toggleGroupVariants({ className, motionAnimation })

  const layoutId = useId()

  const handleValueChange = (
    nextValue: string[],
    eventDetails: ToggleGroupPrimitive.ChangeEventDetails,
  ) => {
    // disallowEmpty 로직 적용
    if (disallowEmpty && nextValue.length === 0) {
      return
    }

    const resultValue = (
      multiple ? nextValue : (nextValue[0] ?? '')
    ) as ToggleGroupValue<Multiple>

    setValue(resultValue)
    onValueChange?.(resultValue, eventDetails)
  }

  const primitiveValue = (() => {
    if (Array.isArray(value)) return value
    if (value) return [value] // '', undefined, null 모두 빈 배열로
    return []
  })()

  return (
    <ToggleGroupContext
      value={{
        layoutId,
        motionAnimation,
      }}
    >
      <ToggleGroupPrimitive
        suppressHydrationWarning
        className={swClsx(styles)}
        multiple={multiple}
        value={primitiveValue}
        onValueChange={handleValueChange}
        {...ohterProps}
      >
        {children}
      </ToggleGroupPrimitive>
    </ToggleGroupContext>
  )
}
