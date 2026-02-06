'use client'

import {
  Tooltip as TooltipPrimitive,
  type TooltipPositionerProps,
  type TooltipTriggerProps,
} from '@base-ui/react/tooltip'
import { Slot } from '@radix-ui/react-slot'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import { DefaultTooltipArrow } from './default-arrow'
import {
  tooltipVariants,
  type TooltipSlots,
  type TooltipVariants,
} from './variants'

type Props = Omit<
  React.ComponentProps<typeof TooltipPrimitive.Root>,
  keyof TooltipVariants
> &
  TooltipVariants

export interface TooltipProps extends Props {
  children: React.ReactNode
  classNames?: SlotsToClasses<TooltipSlots>
  content?: React.ReactNode
  sideOffset?: TooltipPositionerProps['sideOffset']
  side?: TooltipPositionerProps['side']
  align?: TooltipPositionerProps['align']
  zIndex?: number
  showArrow?: boolean
  arrow?: React.ReactNode
  style?: React.CSSProperties
  render?: TooltipTriggerProps['render']
  delay?: TooltipTriggerProps['delay']
  closeDelay?: TooltipTriggerProps['closeDelay']
}

export function Tooltip(props: TooltipProps) {
  const {
    children,
    classNames,
    content,
    sideOffset = 8,
    side = 'top',
    align = 'center',
    zIndex = 50,
    showArrow = true,
    style,
    arrow = <DefaultTooltipArrow />,
    render,
    delay,
    closeDelay,
    ...otherProps
  } = props

  const slots = tooltipVariants({})

  return (
    <TooltipPrimitive.Root {...otherProps}>
      <TooltipPrimitive.Trigger
        delay={delay}
        closeDelay={closeDelay}
        suppressHydrationWarning
        render={
          render
            ? render
            : (props) => {
                if (typeof children === 'string') {
                  return <button {...props}>{children}</button>
                }

                return <Slot {...props}>{children}</Slot>
              }
        }
      >
        {children}
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal suppressHydrationWarning>
        <TooltipPrimitive.Positioner
          suppressHydrationWarning
          sideOffset={sideOffset}
          side={side}
          align={align}
          style={{ zIndex, ...style }}
          className={swClsx(slots.content({ className: classNames?.content }))}
        >
          <TooltipPrimitive.Popup
            suppressHydrationWarning
            className={swClsx(
              slots.content({ className: classNames?.content }),
            )}
          >
            {showArrow && (
              <TooltipPrimitive.Arrow
                className={swClsx(
                  slots.arrow({ className: classNames?.arrow }),
                )}
              >
                {arrow}
              </TooltipPrimitive.Arrow>
            )}
            {content}
          </TooltipPrimitive.Popup>
        </TooltipPrimitive.Positioner>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
}
