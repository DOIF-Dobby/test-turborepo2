'use client'

import { useControllableState } from '@repo/hooks/use-controllable-state'
import { useRef } from 'react'
import type { PressEvent } from 'react-aria'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import { mergeRefs } from '../../utils/merge-refs'
import { Button } from '../button'
import { Field } from '../field'
import { Input } from '../input'
import { ClearIcon } from './clear-icon'
import {
  type TextFieldSlots,
  textFieldVariants,
  type TextFieldVariants,
} from './variants'

type Props = Omit<
  React.ComponentProps<typeof Input>,
  keyof TextFieldVariants | 'className' | 'disabled' | 'readOnly' | 'onChange'
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

  startContent?: React.ReactNode
  endContent?: React.ReactNode
  description?: React.ReactNode
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
    description,
    onClear,
    onValueChange,
    value: valueProp,
    defaultValue,
    startContent,
    endContent,
    name,
    ...otherProps
  } = props

  const inputRef = useRef<HTMLInputElement>(null)
  const mergedInputRef = mergeRefs([ref, inputRef])

  const [value, setValue] = useControllableState({
    value: valueProp !== undefined ? String(valueProp) : undefined,
    defaultValue: defaultValue !== undefined ? String(defaultValue) : '',
  })

  // 3. Clear 아이콘 표시 여부 (value는 항상 string이므로 안전하게 체크)
  const showClearIcon =
    isClearable &&
    !isDisabled &&
    !isReadOnly &&
    value !== undefined &&
    value.length > 0

  // 5. Clear 핸들러
  const handleClear = (e: PressEvent) => {
    // 상태 비우기
    setValue('')
    onClear?.()

    // 포커스 유지
    inputRef.current?.focus()

    if (onValueChange) {
      onValueChange('', {
        reason: 'none',
        trigger: e.target,
        event: new Event('change'),
        allowPropagation: () => {},
        cancel: () => {},
        isCanceled: false,
        isPropagationAllowed: true,
      })
    }
  }

  const slots = textFieldVariants({ size, isDisabled })

  return (
    <Field
      name={name}
      className={swClsx(
        slots.container({
          className: classNames?.container,
        }),
      )}
    >
      {/* 라벨 영역 */}
      {label && (
        <Field.Label
          className={slots.label({
            className: classNames?.label,
          })}
          size={size}
          isRequired={isRequired}
        >
          {label}
        </Field.Label>
      )}

      {/* 인풋 래퍼 */}
      <div
        className={swClsx(
          slots.inputWrapper({
            className: classNames?.inputWrapper,
          }),
        )}
      >
        {startContent}

        <Input
          name={name}
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
          onValueChange={(value, eventDeatils) => {
            onValueChange?.(value, eventDeatils)
            setValue(value)
          }}
          {...otherProps}
        />

        {/* Clear 버튼 */}
        {showClearIcon && (
          <Button
            type="button"
            onPress={handleClear}
            tabIndex={-1} // 탭 이동 방지
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

      {description && (
        <Field.Description
          size={size}
          className={swClsx(
            slots.description({
              className: classNames?.description,
            }),
          )}
        >
          {description}
        </Field.Description>
      )}

      <Field.Error
        className={swClsx(
          slots.errorMessage({
            className: classNames?.errorMessage,
          }),
        )}
      />
    </Field>
  )
}
