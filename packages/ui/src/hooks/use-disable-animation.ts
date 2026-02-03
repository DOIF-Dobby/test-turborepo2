import { useUIContext } from '../providers'

export function useDisableAnimation(localDisableAnimation?: boolean) {
  const { disableAnimation: globalDisableAnimation } = useUIContext()
  const shouldDisableAnimation = localDisableAnimation || globalDisableAnimation

  return shouldDisableAnimation
}
