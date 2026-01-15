import { createStore } from 'zustand/vanilla'

export type DocsState = {
  disableAnimation: boolean
}

export type DocsActions = {
  toggleDisableAnimation: () => void
}

export type DocsStore = DocsState & DocsActions

export const defaultInitState: DocsState = {
  disableAnimation: false,
}

export const createDocsStore = (initState: DocsState = defaultInitState) => {
  return createStore<DocsStore>()((set) => ({
    ...initState,
    toggleDisableAnimation: () =>
      set((state) => ({ disableAnimation: !state.disableAnimation })),
  }))
}
