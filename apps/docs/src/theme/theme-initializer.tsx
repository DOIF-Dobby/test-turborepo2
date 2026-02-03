'use client'

import { useEffect } from 'react'
import { useThemeStore, type ThemeMode } from './theme-store'

export function ThemeInitializer() {
  const { setTheme } = useThemeStore()

  useEffect(() => {
    // 1. 초기값 동기화
    const localTheme = localStorage.getItem('app-theme') as ThemeMode | null
    if (localTheme) {
      setTheme(localTheme)
    }

    // 2. 시스템 테마 변경 감지 리스너
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = () => {
      const currentMode = useThemeStore.getState().mode
      // 현재 설정이 'System'일 때만 OS 변화에 반응
      if (currentMode === 'system') {
        setTheme('system') // 재호출하면 내부 로직이 알아서 갱신함
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [setTheme])

  return null
}
