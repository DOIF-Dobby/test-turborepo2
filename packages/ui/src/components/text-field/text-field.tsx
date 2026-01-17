'use client'

import type { PressEvent } from '@react-aria/interactions'
import { useMemo, useRef, useState } from 'react'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import { mergeRefs } from '../../utils/merge-refs'
import { Button } from '../button'
import { Input } from '../input'
import { Label } from '../label'
import { ClearIcon } from './clear-icon'
import {
  type TextFieldSlots,
  textFieldVariants,
  type TextFieldVariants,
} from './variants'

type Props = Omit<
  React.ComponentProps<'input'>,
  keyof TextFieldVariants | 'className' | 'disabled' | 'readOnly'
> &
  TextFieldVariants

export interface TextFieldProps extends Props {
  label?: React.ReactNode
  classNames?: SlotsToClasses<TextFieldSlots>
  isRequired?: boolean
  clearIcon?: React.ReactNode
  isClearable?: boolean
  isDisabled?: boolean
  isReadOnly?: boolean
  onClear?: () => void
  onValueChange?: (value: string) => void
  startContent?: React.ReactNode
  endContent?: React.ReactNode
  errorMessage?: React.ReactNode
}

export function TextField(props: TextFieldProps) {
  const {
    ref,
    size,
    label,
    classNames,
    isRequired = false,
    isClearable = true,
    clearIcon = <ClearIcon />,
    isDisabled = false,
    isReadOnly = false,
    onClear,
    onChange,
    onValueChange,
    value, // value와 defaultValue 모두 꺼냄
    defaultValue,
    startContent,
    endContent,
    errorMessage,
    ...otherProps
  } = props

  const inputRef = useRef<HTMLInputElement>(null)
  const mergedInputRef = mergeRefs([ref, inputRef])

  // 제어/비제어 모드 판단
  const isControlled = value !== undefined

  // 에러 상태 판단
  const isInvalid = errorMessage !== undefined

  // 비제어(Uncontrolled) 모드일 때만 내부 상태 사용
  const [internalHasValue, setInternalHasValue] = useState(() => {
    if (isControlled) return false // 제어 모드면 이 state 안 씀
    return defaultValue ? String(defaultValue).length > 0 : false
  })

  // 버튼 표시 여부를 렌더링 시점에 즉시 계산 (Derived State)
  const showClearIcon = useMemo(() => {
    if (!isClearable) return false
    if (isDisabled) return false
    if (isReadOnly) return false

    if (isControlled) {
      // 제어 모드: 부모가 준 value를 믿음
      return value !== '' && value !== null && String(value).length > 0
    } else {
      // 비제어 모드: 내부 state를 믿음
      return internalHasValue
    }
  }, [
    isClearable,
    isControlled,
    value,
    internalHasValue,
    isDisabled,
    isReadOnly,
  ])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalHasValue(e.target.value.length > 0)
    }
    onChange?.(e)
    onValueChange?.(e.target.value)
  }

  const handleClear = (e: PressEvent) => {
    // e.preventDefault() // 폼 제출 방지 등 안전장치
    // e.stopPropagation()

    const input = inputRef.current
    if (!input) return

    // React와 폼 라이브러리가 값을 인지하도록 네이티브 세터 호출
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value',
    )?.set
    nativeInputValueSetter?.call(input, '')

    // 강제로 input 이벤트 발송 (이걸 해야 react-hook-form이 감지함)
    input.dispatchEvent(new Event('input', { bubbles: true }))

    // 비제어 모드라면 내부 상태 즉시 갱신
    if (!isControlled) {
      setInternalHasValue(false)
    }

    // 부모 핸들러 호출 (Mock Event)
    // 주의: 실제 input 이벤트가 dispatch 되었으므로, onChange가 이미 한 번 실행됐을 수 있음.
    // 하지만 명시적으로 한 번 더 호출해 주는 것이 안전함 (중복 호출은 React가 보통 막아줌)
    const event = {
      ...e,
      target: { ...input, value: '' },
      currentTarget: { ...input, value: '' },
    } as unknown as React.ChangeEvent<HTMLInputElement>

    onChange?.(event)
    onClear?.()
    input.focus()
  }

  const slots = textFieldVariants({ size, isDisabled, isInvalid })

  return (
    <div
      className={swClsx(
        slots.container({
          className: classNames?.container,
        }),
      )}
    >
      <Label
        classNames={{
          label: slots.label({
            className: classNames?.label,
          }),
          indicator: slots.labelIndicator({
            className: classNames?.labelIndicator,
          }),
        }}
        size={size}
        requiredIndicator={isRequired}
      >
        {label}
      </Label>
      <div
        className={swClsx(
          slots.inputWrapper({
            className: classNames?.inputWrapper,
          }),
        )}
      >
        {startContent}
        <Input
          ref={mergedInputRef}
          disabled={isDisabled}
          readOnly={isReadOnly}
          className={swClsx(
            slots.input({
              className: classNames?.input,
            }),
          )}
          size={size}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          {...otherProps}
        />
        {showClearIcon && (
          <Button
            type="button"
            onPress={handleClear}
            tabIndex={-1}
            className={swClsx(
              slots.clearButton({
                className: classNames?.clearButton,
              }),
            )}
          >
            {clearIcon}
          </Button>
        )}
        {endContent}
      </div>
      {errorMessage && (
        <div
          className={swClsx(
            slots.errorMessage({
              className: classNames?.errorMessage,
            }),
          )}
        >
          {errorMessage}
        </div>
      )}
    </div>
  )
}
