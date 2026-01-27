import { Popover as PopoverPrimitive } from 'radix-ui'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import {
  popoverContentVariants,
  type PopoverContentSlots,
  type PopoverContentVariants,
} from './variants'

export function Popover(props: PopoverPrimitive.PopoverProps) {
  return <PopoverPrimitive.Root {...props} />
}

export function PopoverTrigger(props: PopoverPrimitive.PopoverTriggerProps) {
  return <PopoverPrimitive.Trigger {...props} />
}

export function PopoverArrow(props: PopoverPrimitive.PopoverArrowProps) {
  return <PopoverPrimitive.Arrow {...props} />
}

export function PopoverClose(props: PopoverPrimitive.PopoverCloseProps) {
  return <PopoverPrimitive.Close {...props} />
}

export function PopoverAnchor(props: PopoverPrimitive.PopoverAnchorProps) {
  return <PopoverPrimitive.Anchor {...props} />
}

type ContentProps = Omit<
  PopoverPrimitive.PopoverContentProps,
  keyof PopoverContentVariants | 'className'
> &
  PopoverContentVariants &
  PopoverPrimitive.PopoverPortalProps

export interface PopoverContentProps extends ContentProps {
  showArrow?: boolean
  classNames?: SlotsToClasses<PopoverContentSlots>
}

export function PopoverContent(props: PopoverContentProps) {
  const {
    children,
    container,
    forceMount,
    showArrow = false,
    sideOffset = 5,
    classNames,
    ...contentProps
  } = props

  const slots = popoverContentVariants({})

  return (
    <PopoverPrimitive.Portal container={container} forceMount={forceMount}>
      <PopoverPrimitive.Content
        {...contentProps}
        sideOffset={sideOffset}
        className={swClsx(
          slots.content({
            className: classNames?.content,
          }),
        )}
      >
        {children}

        {showArrow && (
          <PopoverPrimitive.Arrow
            className={swClsx(
              slots.arrow({
                className: classNames?.arrow,
              }),
            )}
          />
        )}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
}
