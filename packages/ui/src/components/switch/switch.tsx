'use client'

import { mergeProps } from '@base-ui/react'
import { Switch as SwitchPrimitive } from '@base-ui/react/switch'
import { useControllableState } from '@repo/hooks/use-controllable-state'
import { domMax, LazyMotion, motion, type MotionProps } from 'motion/react'
import { useRef } from 'react'
import { usePress } from 'react-aria'
import { useDisableAnimation } from '../../hooks/use-disable-animation'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import { mergeRefs } from '../../utils/merge-refs'
import {
  switchVariants,
  type SwitchSlots,
  type SwitchVariants,
} from './variants'

type Props = Omit<
  React.ComponentProps<typeof SwitchPrimitive.Root>,
  keyof SwitchVariants | 'className'
> &
  SwitchVariants

export interface SwitchProps extends Props {
  children?: React.ReactNode
  classNames?: SlotsToClasses<SwitchSlots>
  disableAnimation?: boolean
}

export function Switch(props: SwitchProps) {
  const {
    checked: checkedProp,
    defaultChecked,
    children,
    classNames,
    size,
    color,
    disableAnimation,
    isDisabled,
    ref,
    onCheckedChange,
    ...otherProps
  } = props

  const shouldDisableAnimation = useDisableAnimation(disableAnimation)

  const rootRef = useRef<HTMLButtonElement>(null)

  const [checked, setChecked] = useControllableState<boolean>({
    value: checkedProp,
    defaultValue: defaultChecked ?? false,
  })

  const { pressProps, isPressed } = usePress({
    isDisabled,
    ref: rootRef,
    onPress: () => setChecked((prev) => !prev),
  })

  const slots = switchVariants({
    size,
    color,
    isDisabled,
    isPressed: shouldDisableAnimation ? false : isPressed,
  })

  return (
    <label
      className={swClsx(slots.container({ className: classNames?.container }))}
    >
      <SwitchPrimitive.Root
        suppressHydrationWarning
        {...mergeProps(pressProps, otherProps)}
        ref={mergeRefs([ref, rootRef])}
        checked={checked}
        onCheckedChange={(checked, eventDetails) => {
          onCheckedChange?.(checked, eventDetails)
          setChecked(checked)
        }}
        disabled={isDisabled}
        className={swClsx(slots.root({ className: classNames?.root }))}
        nativeButton
        render={(props) => {
          const { children, ...rest } = props
          return <button {...rest}>{children}</button>
        }}
      >
        <SwitchPrimitive.Thumb
          render={(props) => {
            return (
              <LazyMotion features={domMax}>
                <motion.span
                  {...(props as MotionProps)}
                  suppressHydrationWarning
                  className={swClsx(
                    slots.thumb({ className: classNames?.thumb }),
                  )}
                  layout={!shouldDisableAnimation}
                  transition={{
                    type: 'spring',
                    stiffness: 600,
                    damping: 30,
                    duration: shouldDisableAnimation ? 0 : undefined,
                  }}
                />
              </LazyMotion>
            )
          }}
        />
      </SwitchPrimitive.Root>

      {children && (
        <span
          suppressHydrationWarning
          className={swClsx(slots.label({ className: classNames?.label }))}
        >
          {children}
        </span>
      )}
    </label>
  )
}
