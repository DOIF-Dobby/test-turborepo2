import { Tooltip as TooltipPrimitive } from 'radix-ui'
import { isValidElement } from 'react'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
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
  classNames?: SlotsToClasses<TooltipSlots>
  content?: React.ReactNode
  sideOffset?: TooltipPrimitive.TooltipContentProps['sideOffset']
  side?: TooltipPrimitive.TooltipContentProps['side']
  align?: TooltipPrimitive.TooltipContentProps['align']
  zIndex?: number
}

export function Tooltip(props: TooltipProps) {
  const {
    children,
    classNames,
    content,
    sideOffset = 5,
    side = 'top',
    align = 'center',
    zIndex = 50,
    ...otherProps
  } = props

  const slots = tooltipVariants({})

  const isChildElement = isValidElement(children)

  return (
    <TooltipPrimitive.Root {...otherProps}>
      <TooltipPrimitive.Trigger asChild={isChildElement}>
        {children}
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          sideOffset={sideOffset}
          side={side}
          align={align}
          style={{ zIndex }}
          className={swClsx(slots.content({ className: classNames?.content }))}
        >
          {content}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
}
