'use client'

import { ScrollArea as ScrollAreaPrimitive } from '@base-ui/react/scroll-area'
import type { SlotsToClasses } from '../../types'
import { swClsx } from '../../utils/clsx'
import {
  scrollAreaVariants,
  scrollBarVariants,
  type ScrollAreaSlots,
  type ScrollBarSlots,
} from './variants'

export interface ScrollAreaProps extends React.ComponentProps<
  typeof ScrollAreaPrimitive.Root
> {
  classNames?: SlotsToClasses<ScrollAreaSlots>
  orientation?: 'vertical' | 'horizontal' | 'both'
}

export function ScrollArea({
  classNames,
  children,
  orientation = 'vertical',
  ref,
  ...props
}: ScrollAreaProps) {
  const slots = scrollAreaVariants()

  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      suppressHydrationWarning
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
        suppressHydrationWarning
        className={swClsx(
          slots.viewport({
            className: classNames?.viewport,
          }),
        )}
      >
        <ScrollAreaPrimitive.Content>{children}</ScrollAreaPrimitive.Content>
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

export interface ScrollBarProps extends React.ComponentProps<
  typeof ScrollAreaPrimitive.Scrollbar
> {
  classNames?: SlotsToClasses<ScrollBarSlots>
}

export function ScrollBar({
  orientation,
  classNames,
  ref,
  ...props
}: ScrollBarProps) {
  const slots = scrollBarVariants()

  return (
    <ScrollAreaPrimitive.Scrollbar
      suppressHydrationWarning
      ref={ref}
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
      <ScrollAreaPrimitive.Thumb
        data-slot="scroll-area-thumb"
        className={swClsx(
          slots.thumb({
            className: classNames?.thumb,
          }),
        )}
      />
    </ScrollAreaPrimitive.Scrollbar>
  )
}
