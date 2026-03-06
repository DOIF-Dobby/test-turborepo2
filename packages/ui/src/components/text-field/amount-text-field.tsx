'use client'

import { onInputAmount, onKeyDownAmount } from '@repo/utils/mask'
import { useMemo } from 'react'
import { TextField, type TextFieldProps } from './text-field'

export interface AmountTextFieldProps extends Omit<
  TextFieldProps,
  'onInput' | 'onKeyDown'
> {
  integerPartLength?: number
  allowDecimals?: boolean
  allowMinus?: boolean
  unit?: React.ReactNode
}

export function AmountTextField(props: AmountTextFieldProps) {
  const {
    integerPartLength,
    allowDecimals,
    allowMinus,
    textAlign = 'right',
    isClearable = false,
    endContent: endContentProp,
    unit,
    ...otherProps
  } = props

  const endContent = useMemo(() => {
    if (unit) {
      return <span className="min-w-fit text-sm text-base-700">{unit}</span>
    }
    return endContentProp
  }, [endContentProp, unit])

  return (
    <TextField
      {...otherProps}
      textAlign={textAlign}
      isClearable={isClearable}
      endContent={endContent}
      onInput={(e) =>
        onInputAmount(e, integerPartLength, allowDecimals, allowMinus)
      }
      onKeyDown={(e) =>
        onKeyDownAmount(e, integerPartLength, allowDecimals, allowMinus)
      }
    />
  )
}
