'use client'

import { Slot } from 'radix-ui'
import { useCallback, useRef } from 'react'
import {
  type AriaButtonProps,
  chain,
  mergeProps,
  type PressEvent,
  useButton,
} from 'react-aria'
import { useScaleAnimation } from '../../animations/use-scale-animation'
import type { AsChild } from '../../types'
import { swClsx } from '../../utils/clsx'
import { mergeRefs } from '../../utils/merge-refs'
import { Ripple } from '../ripple'
import { useRipple } from '../ripple/use-ripple'
import { Spinner, type SpinnerProps } from '../spinner'
import { type ButtonVariants, buttonVariants } from './variants'

type Props = Omit<
  React.ComponentProps<'button'>,
  keyof ButtonVariants | 'onClick' | 'onDrag' | 'onDragStart' | 'onDragEnd'
> &
  ButtonVariants &
  AriaButtonProps &
  AsChild

export interface ButtonProps extends Props {
  fullWidth?: boolean
  onPress?: (event: PressEvent) => void
  disableRipple?: boolean
  disableAnimation?: boolean
  isDisabled?: boolean
  isLoading?: boolean
  startContent?: React.ReactNode
  endContent?: React.ReactNode
  spinnerProps?: SpinnerProps
}

export function Button(props: ButtonProps) {
  const {
    ref,
    asChild = false,
    children,
    color,
    variant,
    size,
    className,
    isDisabled = false,
    isLoading = false,
    fullWidth,
    disableRipple = false,
    disableAnimation = false,
    startContent: startContentProp,
    endContent,
    onPress,
    onFocusChange,
    spinnerProps,
    ...otherProps
  } = props

  const innerRef = useRef<HTMLButtonElement>(null)

  const { ripples, onClear, onPress: onRipplePressHandler } = useRipple()

  const handleRipplePress = useCallback(
    (e: PressEvent) => {
      if (isDisabled) {
        return
      }

      if (innerRef.current) {
        onRipplePressHandler(e)
      }
    },
    [isDisabled, onRipplePressHandler],
  )

  // const { pressProps, isPressed } = usePress({
  //   isDisabled: isDisabled || isLoading,
  //   onPress: chain(onPress, handlePress),
  //   ref: innerRef,
  // })

  const { buttonProps, isPressed } = useButton(
    {
      ...props,
      isDisabled: isDisabled || isLoading,
      onPress: chain(onPress, handleRipplePress),
      onFocusChange,
      elementType: asChild ? 'span' : 'button',
    },
    innerRef,
  )

  const { scope } = useScaleAnimation({
    isPressed,
    duration: 0.2,
    scale: 0.97,
    disableAnimation,
  })

  const styles = buttonVariants({
    color,
    variant,
    size,
    fullWidth,
    className: swClsx(className),
  })

  const startContent = isLoading ? (
    <Spinner size="sm" {...spinnerProps} />
  ) : (
    startContentProp
  )

  const Comp = asChild ? Slot.Root : 'button'

  // asChild가 true면 Ripple을 렌더링하지 않음 (Slot은 단일 자식만 허용)
  const shouldRenderRipple = !disableRipple && !isDisabled && !asChild

  return (
    <Comp
      {...mergeProps(buttonProps, otherProps)}
      ref={mergeRefs([innerRef, scope, ref])}
      className={styles}
      data-slot="button"
      data-pressed={isPressed ? 'true' : 'false'} // 스타일링용 data 속성
      data-loading={isLoading ? 'true' : 'false'}
    >
      {asChild ? (
        children
      ) : (
        <>
          {startContent}
          {children}
          {endContent}
        </>
      )}

      {shouldRenderRipple && <Ripple ripples={ripples} onClear={onClear} />}
    </Comp>
  )
}
