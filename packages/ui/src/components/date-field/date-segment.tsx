'use client'

import { useRef } from 'react'
import { mergeProps, useDateSegment } from 'react-aria'
import type { DateFieldState, DateSegment } from 'react-stately'

type Props = React.ComponentPropsWithoutRef<'span'>

export interface DateSegmentProps extends Props {
  segment: DateSegment
  state: DateFieldState
}

export function DateSegment(props: DateSegmentProps) {
  const { className, segment, state, ...otherProps } = props

  const isLiteral = segment.type === 'literal'

  const ref = useRef(null)

  const { segmentProps } = useDateSegment(segment, state, ref)

  return (
    <span
      suppressHydrationWarning
      {...mergeProps(otherProps, segmentProps)}
      data-literal={isLiteral}
      ref={ref}
      className={className}
    >
      {isLiteral ? segment.text.trim() : segment.text}
    </span>
  )
}
