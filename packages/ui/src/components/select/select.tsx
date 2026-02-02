'use client'

import { useControllableState } from '@repo/hooks/use-controllable-state'
import { ChevronDown, X } from 'lucide-react'
import { Select as SelectPrimitive } from 'radix-ui'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import { Label } from '../label'
import {
  type SelectSlots,
  selectVariants,
  type SelectVariants,
} from './variants'

type Props = Omit<
  React.ComponentProps<typeof SelectPrimitive.Root>,
  keyof SelectVariants | 'className' | 'disabled'
> &
  SelectVariants

export interface SelectProps extends Props {
  label?: React.ReactNode
  classNames?: SlotsToClasses<SelectSlots>
  isRequired?: boolean
  isClearable?: boolean
  isDisabled?: boolean
  errorMessage?: React.ReactNode
  placeholder?: string
  startContent?: React.ReactNode
  onClear?: () => void
}

export function Select(props: SelectProps) {
  const {
    children,
    size,
    label,
    classNames,
    isRequired = false,
    errorMessage,
    placeholder = '선택없음',
    value: valueProp, // 외부 제어 값 (별칭 사용)
    defaultValue, // 초기 값
    isClearable = true,
    isDisabled = false,
    startContent,
    onValueChange, // 변경 핸들러
    onClear,
    ...otherProps
  } = props

  // 1. ✨ Radix 공식 훅을 사용해 제어/비제어 로직 통합
  const [value, setValue] = useControllableState({
    value: valueProp,
    defaultValue: defaultValue ?? '',
    onChange: onValueChange,
  })

  // 2. Clear 핸들러
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()

    // 훅에서 제공하는 setValue를 사용하면 제어/비제어 상관없이 처리됨
    setValue('')
    onClear?.()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.stopPropagation() // 키보드 이벤트 전파 중단
      e.preventDefault() // 스크롤 등 브라우저 기본 동작 방지
      setValue('')
      onClear?.()
    }
  }

  // 3. Clear 버튼 표시 여부 계산
  // value가 존재하고 빈 문자열이 아닐 때만 노출
  const hasValue = value !== undefined && value !== ''
  const showClear = isClearable && hasValue

  // 에러 상태 판단
  const isInvalid = errorMessage !== undefined

  // 스타일 슬롯 생성
  const slots = selectVariants({
    size,
    isInvalid,
    isDisabled,
  })

  return (
    <div
      className={swClsx(
        slots.container({
          className: classNames?.container,
        }),
      )}
    >
      {/* 라벨 영역 */}
      {label && (
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
      )}

      {/* Radix Select Root */}
      <SelectPrimitive.Root
        value={value}
        onValueChange={setValue}
        disabled={isDisabled}
        {...otherProps}
      >
        <SelectPrimitive.Trigger
          suppressHydrationWarning
          className={swClsx(
            slots.trigger({
              className: classNames?.trigger,
            }),
          )}
        >
          <div className="gap-sw-2xs flex flex-1 items-center overflow-hidden">
            {/* startContent */}
            {startContent && <span className="shrink-0">{startContent}</span>}

            {/* 선택된 값 표시 영역 */}
            <span
              className={swClsx(slots.value({ className: classNames?.value }))}
            >
              <SelectPrimitive.Value placeholder={placeholder} />
            </span>
          </div>

          {/* 아이콘 및 Clear 버튼 영역 */}
          <div className="flex items-center gap-1">
            {showClear && (
              <div
                role="button"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={handleClear}
                onKeyDown={handleKeyDown}
                className={swClsx(
                  slots.clearButton({
                    className: classNames?.clearButton,
                  }),
                )}
                tabIndex={0} // 탭 포커스 방지
                aria-label="선택 초기화"
              >
                <X
                  className={swClsx(
                    slots.clearIcon({ className: classNames?.clearIcon }),
                  )}
                />
              </div>
            )}

            <SelectPrimitive.Icon asChild>
              <ChevronDown
                className={swClsx(slots.icon({ className: classNames?.icon }))}
              />
            </SelectPrimitive.Icon>
          </div>
        </SelectPrimitive.Trigger>

        {/* 팝업 컨텐츠 영역 */}
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            sideOffset={6}
            className={swClsx(
              slots.content({
                className: classNames?.content,
              }),
            )}
          >
            <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

      {/* 에러 메시지 영역 */}
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
