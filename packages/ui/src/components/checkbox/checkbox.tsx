'use client'

import { usePress } from '@react-aria/interactions'
import { useControllableState } from '@repo/hooks/use-controllable-state'
import { useFallbackId } from '@repo/hooks/use-fallback-id'
import { Minus } from 'lucide-react'
import { Checkbox as CheckboxPrimitive } from 'radix-ui'
import { useRef } from 'react'
import { useScaleAnimation } from '../../animations/use-scale-animation'
import { useUIContext } from '../../providers'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import { mergeRefs } from '../../utils/merge-refs'
import { AnimatedCheckIcon } from './animated-check-icon'
import { useCheckboxGroupContext } from './checkbox-group-context'
import {
  type CheckboxSlots,
  checkboxVariants,
  type CheckboxVariants,
} from './variants'

// Radix의 CheckedState는 boolean | 'indeterminate' 입니다.
export type CheckedState = CheckboxPrimitive.CheckedState

type Props = Omit<
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
  | keyof CheckboxVariants
  | 'className'
  | 'checked'
  | 'defaultChecked'
  | 'onCheckedChange'
> &
  CheckboxVariants

export interface CheckboxProps extends Props {
  checked?: CheckedState
  defaultChecked?: CheckedState
  onCheckedChange?: (checked: CheckedState) => void
  children?: React.ReactNode
  classNames?: SlotsToClasses<CheckboxSlots>
  isInvalid?: boolean
  isDisabled?: boolean
  value?: string
}

export function Checkbox(props: CheckboxProps) {
  const {
    checked: checkedProp,
    defaultChecked,
    onCheckedChange,
    children,
    classNames,
    size: sizeProp,
    isInvalid: isInvalidProp,
    isDisabled: isDisabledProp,
    disableAnimation: localDisableAnimation,
    id: idProp,
    name: nameProp,
    value,
    ...otherProps
  } = props

  // 1. ID 생성
  const id = useFallbackId(idProp)

  const groupContext = useCheckboxGroupContext()
  const isInGroup = !!groupContext

  const isCheckedInGroup =
    isInGroup && value ? groupContext.value.includes(value) : undefined

  const { disableAnimation: globalDisableAnimation } = useUIContext()
  const shouldDisableAnimation = localDisableAnimation || globalDisableAnimation

  const isDisabled = groupContext?.isDisabled || isDisabledProp
  const isInvalid = groupContext?.isInvalid || isInvalidProp
  const name = groupContext?.name || nameProp
  const size = groupContext?.size || sizeProp

  // 2. 상태 관리
  const [checked, setChecked] = useControllableState<CheckedState>({
    // 그룹 모드면 계산된 값(isCheckedInGroup) 사용
    value: isInGroup ? isCheckedInGroup : checkedProp,
    defaultValue: defaultChecked ?? false,
    onChange: (checkedState) => {
      const isChecked = checkedState === true

      if (isInGroup && value) {
        // 그룹 모드일 땐 Context 핸들러 실행
        groupContext.onCheckedChange(value, isChecked)
      }

      // 항상 외부 핸들러도 실행
      onCheckedChange?.(checkedState)
    },
  })

  const innerRef = useRef<HTMLButtonElement>(null)

  const { pressProps, isPressed } = usePress({
    isDisabled,
    ref: innerRef,
  })

  const { scope } = useScaleAnimation({
    isPressed,
    duration: 0.2,
    scale: 0.92,
    disableAnimation: localDisableAnimation,
  })

  // 3. 스타일 슬롯
  const slots = checkboxVariants({
    size,
    isInvalid,
    isDisabled,
    disableAnimation: shouldDisableAnimation,
  })

  return (
    <div
      className={swClsx(slots.container({ className: classNames?.container }))}
    >
      <CheckboxPrimitive.Root
        ref={mergeRefs([innerRef, scope])}
        suppressHydrationWarning
        id={id}
        disabled={isDisabled}
        checked={checked}
        onCheckedChange={setChecked}
        className={swClsx(slots.root({ className: classNames?.root }))}
        name={name}
        {...otherProps}
        {...pressProps}
      >
        <div
          className={swClsx(
            slots.indicator({ className: classNames?.indicator }),
          )}
        >
          {checked === 'indeterminate' ? (
            <Minus
              className={swClsx(slots.icon({ className: classNames?.icon }))}
            />
          ) : (
            <AnimatedCheckIcon
              checked={checked === true}
              disableAnimation={shouldDisableAnimation}
              className={swClsx(slots.icon({ className: classNames?.icon }))}
            />
          )}
        </div>
      </CheckboxPrimitive.Root>

      {children && (
        <label
          suppressHydrationWarning
          htmlFor={id}
          className={swClsx(slots.label({ className: classNames?.label }))}
        >
          {children}
        </label>
      )}
    </div>
  )
}
