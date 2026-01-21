'use client'

import { useControllableState } from '@repo/hooks/use-controllable-state'
import { useFallbackId } from '@repo/hooks/use-fallback-id'
import { domMax, LazyMotion, m } from 'motion/react'
import { Switch as SwitchPrimitive } from 'radix-ui'
import { useUIContext } from '../../providers'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import {
  type SwitchSlots,
  switchVariants,
  type SwitchVariants,
} from './variants'

type Props = Omit<
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
  | keyof SwitchVariants
  | 'className'
  | 'checked'
  | 'defaultChecked'
  | 'onCheckedChange'
  | 'asChild'
> &
  SwitchVariants

export interface SwitchProps extends Props {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  children?: React.ReactNode
  classNames?: SlotsToClasses<SwitchSlots>
  isDisabled?: boolean
  disableAnimation?: boolean // ✨ 애니메이션 제어 Prop
}

export function Switch(props: SwitchProps) {
  const {
    checked: checkedProp,
    defaultChecked,
    onCheckedChange,
    children,
    classNames,
    size,
    color,
    disableAnimation: localDisableAnimation,
    isDisabled,
    id: idProp,
    ...otherProps
  } = props

  const id = useFallbackId(idProp)

  const { disableAnimation: globalDisableAnimation } = useUIContext()
  const shouldDisableAnimation = localDisableAnimation || globalDisableAnimation

  const [checked, setChecked] = useControllableState<boolean>({
    value: checkedProp,
    defaultValue: defaultChecked ?? false,
    onChange: onCheckedChange,
  })

  const slots = switchVariants({ size, color })

  return (
    <div
      className={swClsx(slots.container({ className: classNames?.container }))}
    >
      <SwitchPrimitive.Root
        suppressHydrationWarning
        id={id}
        checked={checked}
        onCheckedChange={setChecked}
        disabled={isDisabled}
        className={swClsx(slots.root({ className: classNames?.root }))}
        {...otherProps}
      >
        <LazyMotion features={domMax}>
          <SwitchPrimitive.Thumb asChild>
            <m.span
              className={swClsx(slots.thumb({ className: classNames?.thumb }))}
              layout={!shouldDisableAnimation}
              transition={{
                type: 'spring',
                stiffness: 600,
                damping: 30,
                duration: shouldDisableAnimation ? 0 : undefined,
              }}
            />
          </SwitchPrimitive.Thumb>
        </LazyMotion>
      </SwitchPrimitive.Root>

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
