import { createContext, use } from 'react'

export type UIContextType = {
  disableAnimation?: boolean
  locale?: string
}

export const UIContext = createContext<UIContextType>({
  disableAnimation: false,
  locale: 'ko-KR',
})

export const useUIContext = () => use(UIContext)
