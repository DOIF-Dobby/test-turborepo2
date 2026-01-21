'use client'

import { createContext, use } from 'react'
import type { RadioProps } from './radio'

type RadioGroupContextType = {
  name?: string
  value?: string
  onValueChange?: (value: string) => void
  isDisabled?: boolean
  isInvalid?: boolean
  disableAnimation?: boolean
  size?: RadioProps['size']
}

export const RadioGroupContext = createContext<RadioGroupContextType | null>(
  null,
)

export const useRadioGroupContext = () => use(RadioGroupContext)
