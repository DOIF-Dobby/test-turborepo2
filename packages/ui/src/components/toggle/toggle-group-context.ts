import { createContext, use } from 'react'

type ToggleGroupContextType = {
  layoutId?: string
  motionAnimation?: boolean
}

export const ToggleGroupContext = createContext<ToggleGroupContextType>({})

export const useToggleGroupContext = () => use(ToggleGroupContext)
