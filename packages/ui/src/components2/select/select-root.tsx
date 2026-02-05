'use client'

import {
  Select as SelectPrimitive,
  type SelectRootChangeEventDetails,
} from '@base-ui/react/select'
import { useControllableState } from '@repo/hooks/use-controllable-state'
import { ChevronDown, XIcon } from 'lucide-react'
import { motion, type HTMLMotionProps, type MotionProps } from 'motion/react'
import { useDisableAnimation } from '../../hooks/use-disable-animation'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import {
  selectVariants,
  type SelectSlots,
  type SelectVariants,
} from './variants'

type Props = Omit<
  React.ComponentProps<typeof SelectPrimitive.Root<string>>,
  keyof SelectVariants | 'className' | 'disabled'
> &
  SelectVariants

export interface SelectRootProps extends Props {
  classNames?: SlotsToClasses<SelectSlots>
  placeholder?: string
  startContent?: React.ReactNode
  isClearable?: boolean
  disableAnimation?: boolean
  errorMessage?: React.ReactNode
  onClear?: () => void
}

export function SelectRoot(props: SelectRootProps) {
  const {
    children,
    classNames,
    placeholder = '선택없음',
    size,
    value: valueProp, // 외부 제어 값 (별칭 사용)
    defaultValue, // 초기 값
    isDisabled,
    isInvalid: isInvalidProp,
    disableAnimation,
    startContent,
    isClearable = true,
    errorMessage,
    onValueChange,
    onClear,
    ...otherProps
  } = props

  const [value, setValue] = useControllableState({
    value: valueProp,
    defaultValue: defaultValue ?? null,
    onChange: (value) => {
      onValueChange?.(value, {} as SelectRootChangeEventDetails)
    },
  })

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()

    setValue(null)
    onClear?.()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.stopPropagation() // 키보드 이벤트 전파 중단
      e.preventDefault() // 스크롤 등 브라우저 기본 동작 방지
      setValue(null)
      onClear?.()
    }
  }

  // 3. Clear 버튼 표시 여부 계산
  // value가 존재하고 빈 문자열이 아닐 때만 노출
  const hasValue = value !== undefined && value !== null
  const showClear = isClearable && hasValue

  const isInvalid = isInvalidProp || errorMessage !== undefined

  const shouldDisableAnimation = useDisableAnimation(disableAnimation)

  const slots = selectVariants({
    size,
    isDisabled,
    isInvalid,
    disableAnimation: shouldDisableAnimation,
  })

  return (
    <div
      className={swClsx(slots.container({ className: classNames?.container }))}
    >
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
              <SelectPrimitive.Value
                suppressHydrationWarning
                placeholder={placeholder}
              />
            </span>
          </div>

          {/* 아이콘 및 Clear 버튼 영역 */}
          <div className="flex items-center gap-1">
            {showClear && (
              <div
                role="button"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={handleClear}
                onKeyDown={handleKeyDown}
                className={swClsx(
                  slots.clearButton({
                    className: classNames?.clearButton,
                  }),
                )}
                tabIndex={0}
                aria-label="선택 초기화"
              >
                <XIcon
                  className={swClsx(
                    slots.clearIcon({ className: classNames?.clearIcon }),
                  )}
                />
              </div>
            )}

            <SelectPrimitive.Icon
              className={swClsx(
                slots.iconWrapper({ className: classNames?.iconWrapper }),
              )}
            >
              <ChevronDown
                className={swClsx(slots.icon({ className: classNames?.icon }))}
              />
            </SelectPrimitive.Icon>
          </div>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal suppressHydrationWarning>
          <SelectPrimitive.Positioner
            data-slot="positioner"
            suppressHydrationWarning
            alignItemWithTrigger={false}
            align="start"
            sideOffset={6}
          >
            <SelectPrimitive.Popup
              data-slot="popup"
              suppressHydrationWarning
              className={swClsx(
                slots.content({
                  className: classNames?.content,
                }),
              )}
              render={(props, state) => {
                const motionProps: HTMLMotionProps<'div'> = {
                  initial: false,
                  animate: state.open
                    ? {
                        opacity: 1,
                        y: 0,
                        x: 0,
                      }
                    : {
                        opacity: 0,
                        y: 'var(--y-initial, 0px)',
                        x: 'var(--x-initial, 0px)',
                      },
                  transition: {
                    duration: shouldDisableAnimation ? 0 : 0.15,
                  },
                }

                return (
                  <motion.div {...(props as MotionProps)} {...motionProps}>
                    <SelectPrimitive.ScrollUpArrow
                      data-slot="scroll-up-arrow"
                      suppressHydrationWarning
                    />
                    <SelectPrimitive.List
                      data-slot="list"
                      suppressHydrationWarning
                      tabIndex={-1}
                    >
                      {children}
                    </SelectPrimitive.List>
                    <SelectPrimitive.ScrollDownArrow
                      data-slot="scroll-down-arrow"
                      suppressHydrationWarning
                    />
                  </motion.div>
                )
              }}
            />
          </SelectPrimitive.Positioner>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </div>
  )
}
