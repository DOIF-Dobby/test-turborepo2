import { MotionConfig } from 'motion/react'
import { Tooltip } from 'radix-ui'
import { I18nProvider } from 'react-aria'
import { UIContext, type UIContextType } from './ui-context'

export interface UIProviderProps extends UIContextType {
  children: React.ReactNode
  delayDuration?: Tooltip.TooltipProviderProps['delayDuration']
  disableHoverableContent?: Tooltip.TooltipProviderProps['disableHoverableContent']
  skipDelayDuration?: Tooltip.TooltipProviderProps['skipDelayDuration']
}

export function UIProvider({
  children,
  disableAnimation = false,
  locale = 'ko-KR',
  delayDuration = 0,
  disableHoverableContent = false,
  skipDelayDuration = 0,
}: UIProviderProps) {
  return (
    <UIContext
      value={{
        disableAnimation,
        locale,
      }}
    >
      <MotionConfig
        // 1. 선언적 애니메이션(<motion.div>)들이 즉시 완료되도록 설정
        transition={disableAnimation ? { duration: 0 } : undefined}
        // 2. 접근성 설정: 강제로 "동작 줄이기" 모드를 켜서
        //    모션 라이브러리 내부의 불필요한 연산을 방지할 수 있습니다.
        reducedMotion={disableAnimation ? 'always' : 'user'}
      >
        <I18nProvider locale={locale}>
          <Tooltip.Provider
            delayDuration={delayDuration}
            disableHoverableContent={disableHoverableContent}
            skipDelayDuration={skipDelayDuration}
          >
            {children}
          </Tooltip.Provider>
        </I18nProvider>
      </MotionConfig>
    </UIContext>
  )
}
