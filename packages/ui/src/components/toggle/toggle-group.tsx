'use client'

import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group'
import { useControllableState } from '@repo/hooks/use-controllable-state'
import { useId } from 'react'
import { swClsx } from '../../utils/clsx'
import { ToggleGroupContext } from './toggle-group-context'
import { toggleGroupVariants, type ToggleGroupVariants } from './variants'

type Props = Omit<
  React.ComponentProps<typeof ToggleGroupPrimitive>,
  keyof ToggleGroupVariants | 'className'
> &
  ToggleGroupVariants

export interface ToggleGroupProps extends Props {
  className?: string
  motionAnimation?: boolean
  disallowEmpty?: boolean
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (
    value: string[],
    eventDetails: ToggleGroupPrimitive.ChangeEventDetails,
  ) => void
}

export function ToggleGroup(props: ToggleGroupProps) {
  const {
    children,
    className,
    motionAnimation = false,
    disallowEmpty = false,
    defaultValue,
    value: valueProp,
    onValueChange,
    ...ohterProps
  } = props

  const [value, setValue] = useControllableState<readonly string[]>({
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

    // 상태 업데이트 (uncontrolled일 때 동작)
    setValue(nextValue)

    // 부모에게 알림 (controlled일 때 동작)
    onValueChange?.(nextValue, eventDetails)
  }

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
        value={value}
        onValueChange={handleValueChange}
        {...ohterProps}
      >
        {children}
      </ToggleGroupPrimitive>
    </ToggleGroupContext>
  )
}
