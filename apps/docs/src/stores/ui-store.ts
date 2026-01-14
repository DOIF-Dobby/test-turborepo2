import { create } from 'zustand'

type UseUIStoreType = {
  disableAnimation: boolean
  toggleDisableAnimation: () => void
}

export const useUIStore = create<UseUIStoreType>((set, get) => ({
  disableAnimation: false,
  toggleDisableAnimation: () => {
    const { disableAnimation } = get()
    set({ disableAnimation: !disableAnimation })
  },
}))
