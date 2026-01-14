import { createContext, use } from 'react'

export type UIContextType = {
  disableAnimation?: boolean
}

export const UIContext = createContext<UIContextType>({
  disableAnimation: false,
})

export const useUIContext = () => use(UIContext)
