'use client'

import { useControllableState } from '@repo/hooks/use-controllable-state'
import { Check, Minus } from 'lucide-react'
import { Checkbox as CheckboxPrimitive } from 'radix-ui'
import { useId } from 'react'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import {
  type CheckboxSlots,
  checkboxVariants,
  type CheckboxVariants,
} from './variants'

// Radix의 CheckedState는 boolean | 'indeterminate' 입니다.
type CheckedState = CheckboxPrimitive.CheckedState

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
}

export function Checkbox(props: CheckboxProps) {
  const {
    checked: checkedProp,
    defaultChecked,
    onCheckedChange,
    children,
    classNames,
    size,
    isInvalid,
    isDisabled,
    id: idProp,
    ...otherProps
  } = props

  // 1. ID 생성
  const generatedId = useId()
  const id = idProp || generatedId

  // 2. 상태 관리
  const [checked, setChecked] = useControllableState<CheckedState>({
    value: checkedProp,
    defaultValue: defaultChecked ?? false,
    onChange: onCheckedChange,
  })

  // 3. 스타일 슬롯
  const slots = checkboxVariants({ size, isInvalid, isDisabled })

  return (
    <div
      className={swClsx(slots.container({ className: classNames?.container }))}
    >
      <CheckboxPrimitive.Root
        suppressHydrationWarning
        id={id}
        disabled={isDisabled}
        checked={checked}
        onCheckedChange={setChecked}
        className={swClsx(slots.root({ className: classNames?.root }))}
        {...otherProps}
      >
        <CheckboxPrimitive.Indicator
          className={swClsx(
            slots.indicator({ className: classNames?.indicator }),
          )}
        >
          {checked === 'indeterminate' ? (
            <Minus
              className={swClsx(slots.icon({ className: classNames?.icon }))}
            />
          ) : (
            <Check
              className={swClsx(slots.icon({ className: classNames?.icon }))}
            />
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      {/* 불필요한 labelWrapper div 제거하고 바로 label 렌더링 */}
      {children && (
        <label
          suppressHydrationWarning
          htmlFor={id}
          className={swClsx(slots.label({ className: classNames?.label }))}
          // 라벨 클릭 시 텍스트 드래그 방지 및 커서 포인터
          style={{ userSelect: 'none', cursor: 'pointer' }}
        >
          {children}
        </label>
      )}
    </div>
  )
}
