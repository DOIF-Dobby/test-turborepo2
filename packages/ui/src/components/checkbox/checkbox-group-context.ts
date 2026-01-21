'use client'

import { createContext, use } from 'react'
import type { CheckboxProps } from './checkbox'

type CheckboxGroupContextType = {
  value: string[]
  onCheckedChange: (itemValue: string, checked: boolean) => void
  isDisabled?: boolean
  isInvalid?: boolean
  name?: string
  size?: CheckboxProps['size']
}

export const CheckboxGroupContext =
  createContext<CheckboxGroupContextType | null>(null)

export const useCheckboxGroupContext = () => use(CheckboxGroupContext)
