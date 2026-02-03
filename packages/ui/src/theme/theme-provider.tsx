'use client'

import React, { createContext, use, useEffect, useState } from 'react'

const THEME_KEY = 'app-theme'
const LIGHT_THEME = 'switchui-light'
const DARK_THEME = 'switchui-dark'

export type Theme = typeof LIGHT_THEME | typeof DARK_THEME
export type ThemeMode = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  mode: ThemeMode
  setTheme: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(LIGHT_THEME)
  const [mode, setModeState] = useState<ThemeMode>('light')

  // 테마 적용 로직 (Zustand의 Action 역할)
  const applyTheme = (newMode: ThemeMode) => {
    let resolvedTheme: Theme

    if (newMode === 'system') {
      const isSystemDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches
      resolvedTheme = isSystemDark ? DARK_THEME : LIGHT_THEME
    } else {
      resolvedTheme = newMode === 'light' ? LIGHT_THEME : DARK_THEME
    }

    // DOM 업데이트
    document.documentElement.setAttribute('data-theme', resolvedTheme)
    // LocalStorage 업데이트
    localStorage.setItem(THEME_KEY, newMode)

    // 상태 업데이트
    setThemeState(resolvedTheme)
    setModeState(newMode)
  }

  // 초기화 및 시스템 감지 로직 (Initializer 역할)
  useEffect(() => {
    // 1. 초기값 로드
    const localTheme = localStorage.getItem(THEME_KEY) as ThemeMode | null
    if (localTheme) {
      applyTheme(localTheme)
    } else {
      // 값이 없으면 기본값(light) 혹은 system으로 처리
      applyTheme('light')
    }

    // 2. 시스템 변경 리스너
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      // 현재 모드가 system일 때만 반응
      // setState의 콜백을 사용하여 최신 mode 상태를 참조하거나, localStorage를 참조
      const currentMode = localStorage.getItem(THEME_KEY) as ThemeMode
      if (currentMode === 'system') {
        applyTheme('system')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // 외부 노출용 setTheme (Context value)
  const setTheme = (newMode: ThemeMode) => {
    applyTheme(newMode)
  }

  return (
    <ThemeContext value={{ theme, mode, setTheme }}>{children}</ThemeContext>
  )
}

export function useTheme() {
  const context = use(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
