'use client'

import { Popover as PopoverPrimitive } from 'radix-ui'
import { useCallback } from 'react'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import {
  popoverContentVariants,
  type PopoverContentSlots,
  type PopoverContentVariants,
} from './variants'

type ContentProps = Omit<
  PopoverPrimitive.PopoverContentProps,
  keyof PopoverContentVariants | 'className'
> &
  PopoverContentVariants &
  PopoverPrimitive.PopoverPortalProps

export interface PopoverContentProps extends ContentProps {
  showArrow?: boolean
  classNames?: SlotsToClasses<PopoverContentSlots>
  zIndex?: number
}

export function PopoverContent(props: PopoverContentProps) {
  const {
    children,
    container,
    forceMount,
    showArrow = false,
    sideOffset = 5,
    side = 'bottom',
    align = 'start',
    zIndex = 50,
    classNames,
    ...contentProps
  } = props

  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return

      const wrapper = node.closest(
        '[data-radix-popper-content-wrapper]',
      ) as HTMLElement | null

      if (wrapper) {
        wrapper.style.zIndex = zIndex.toString()
      }
    },
    [zIndex],
  )

  const slots = popoverContentVariants({})

  return (
    <PopoverPrimitive.Portal container={container} forceMount={forceMount}>
      <PopoverPrimitive.Content
        {...contentProps}
        ref={setRef}
        sideOffset={sideOffset}
        side={side}
        align={align}
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
