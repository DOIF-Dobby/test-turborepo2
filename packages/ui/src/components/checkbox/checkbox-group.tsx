'use client'

import { useControllableState } from '@repo/hooks/use-controllable-state'
import { Slot } from 'radix-ui'
import { swClsx } from '../../utils/clsx'
import type { CheckboxProps } from './checkbox'
import { CheckboxGroupContext } from './checkbox-group-context'
import { checkboxGroupVariants } from './variants'

export interface CheckboxGroupProps {
  /** 체크박스 그룹의 현재 값 (제어 모드) */
  value?: string[]
  /** 체크박스 그룹의 초기 값 (비제어 모드) */
  defaultValue?: string[]
  /** 값이 변경될 때 호출되는 콜백 */
  onValueChange?: (value: string[]) => void
  /** 그룹 내 모든 체크박스 비활성화 */
  isDisabled?: boolean
  /** 그룹 내 모든 체크박스 에러 상태 */
  isInvalid?: boolean
  /** 폼 전송용 이름 */
  name?: string
  /** 렌더링 방향 */
  orientation?: 'horizontal' | 'vertical'
  /** 체크박스 크기 */
  size?: CheckboxProps['size']

  children?: React.ReactNode
  className?: string
  asChild?: boolean
}

export function CheckboxGroup(props: CheckboxGroupProps) {
  const {
    value: valueProp,
    defaultValue,
    onValueChange,
    isDisabled,
    isInvalid,
    name,
    size,
    orientation,
    children,
    className,
    asChild,
  } = props

  // 1. 배열 상태 관리
  const [value, setValue] = useControllableState<string[]>({
    value: valueProp,
    defaultValue: defaultValue ?? [],
    onChange: onValueChange,
  })

  // 2. 자식이 클릭했을 때 배열 수정 로직
  const handleCheckedChange = (itemValue: string, isChecked: boolean) => {
    if (isChecked) {
      // 배열에 없으면 추가
      if (!value.includes(itemValue)) {
        setValue([...value, itemValue])
      }
    } else {
      // 배열에 있으면 제거
      setValue(value.filter((v) => v !== itemValue))
    }
  }

  const Component = asChild ? Slot.Root : 'div'

  const slots = checkboxGroupVariants({
    orientation,
  })

  return (
    <CheckboxGroupContext
      value={{
        value,
        onCheckedChange: handleCheckedChange,
        isDisabled,
        isInvalid,
        name,
        size,
      }}
    >
      <Component
        role="group"
        data-orientation={orientation}
        className={swClsx(slots.root({ className }))}
      >
        {children}
      </Component>
    </CheckboxGroupContext>
  )
}
