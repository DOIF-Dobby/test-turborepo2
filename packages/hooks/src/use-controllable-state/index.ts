import { useControllableState as useRadixControllableState } from '@radix-ui/react-use-controllable-state'

export interface UseControllableStateProps<T> {
  value?: T
  defaultValue?: T
  onChange?: (value: T) => void
}

export function useControllableState<T>(props: UseControllableStateProps<T>) {
  const { value, defaultValue, onChange } = props

  return useRadixControllableState({
    prop: value,
    defaultProp: defaultValue as T,
    onChange,
  })
}
