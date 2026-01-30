'use client'

import { ScrollArea as ScrollAreaPrimitive } from 'radix-ui'

import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import {
  scrollAreaVariants,
  scrollBarVariants,
  type ScrollAreaSlots,
  type ScrollBarSlots,
} from './variants'

export interface ScrollAreaProps extends ScrollAreaPrimitive.ScrollAreaProps {
  classNames?: SlotsToClasses<ScrollAreaSlots>
  orientation?: 'vertical' | 'horizontal' | 'both'
}

export function ScrollArea({
  classNames,
  children,
  orientation = 'vertical',
  ...props
}: ScrollAreaProps) {
  const slots = scrollAreaVariants()

  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={swClsx(
        slots.root({
          className: classNames?.root,
        }),
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className={swClsx(
          slots.viewport({
            className: classNames?.viewport,
          }),
        )}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      {orientation === 'vertical' && <ScrollBar orientation="vertical" />}
      {orientation === 'horizontal' && <ScrollBar orientation="horizontal" />}
      {orientation === 'both' && (
        <>
          <ScrollBar orientation="vertical" />
          <ScrollBar orientation="horizontal" />
        </>
      )}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

export interface ScrollBarProps
  extends ScrollAreaPrimitive.ScrollAreaScrollbarProps {
  classNames?: SlotsToClasses<ScrollBarSlots>
}

export function ScrollBar({
  orientation,
  classNames,
  ...props
}: ScrollBarProps) {
  const slots = scrollBarVariants()

  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      orientation={orientation}
      className={swClsx(
        slots.bar({
          className: classNames?.bar,
        }),
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className={swClsx(
          slots.thumb({
            className: classNames?.thumb,
          }),
        )}
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}
