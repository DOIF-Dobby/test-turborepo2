import { create } from 'zustand'

export type Theme = 'switchui-light' | 'switchui-dark'
export type ThemeMode = 'light' | 'dark' | 'system'

type ThemeState = {
  theme: Theme // 실제 화면에 적용된 테마
  mode: ThemeMode // 사용자가 선택한 모드 (Dropdown 표시용)
  setTheme: (mode: ThemeMode) => void
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'switchui-light',
  mode: 'light', // 기본값

  setTheme: (mode) => {
    // 1. 모드 저장 (system, light, dark 문자열 그대로 저장)
    localStorage.setItem('app-theme', mode)

    // 2. 실제 적용할 테마 계산
    let resolvedTheme: Theme

    if (mode === 'system') {
      const isSystemDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches
      resolvedTheme = isSystemDark ? 'switchui-dark' : 'switchui-light'
    } else {
      resolvedTheme = mode === 'light' ? 'switchui-light' : 'switchui-dark'
    }

    // 3. DOM 적용 및 상태 업데이트
    document.documentElement.setAttribute('data-theme', resolvedTheme)
    set({ mode, theme: resolvedTheme })
  },
}))
