'use client'

import { useEffect, useRef, useState } from 'react'

export function useScrollSpy(ids: string[]) {
  const [activeId, setActiveId] = useState<string>('')

  // 무한 루프 방지용 (옵저버가 너무 자주 상태를 바꾸는 것 방지)
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // 1. 관찰할 요소가 없으면 리턴
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (elements.length === 0) return

    // 2. 기존 옵저버 해제
    if (observer.current) {
      observer.current.disconnect()
    }

    // 3. 새 옵저버 생성
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 화면에 들어왔을 때(isIntersecting)만 해당 ID를 활성화
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        // ⭐️ 핵심 설정: 화면 상단 10% 지점 ~ 80% 지점 사이를 "감지 영역"으로 설정
        // 이렇게 해야 스크롤해서 헤딩이 화면 윗부분에 닿을 때쯤 딱 바뀝니다.
        rootMargin: '-10% 0px -80% 0px',
        threshold: 0,
      },
    )

    // 4. 모든 헤딩 요소 관찰 시작 (1개의 옵저버가 다 관리함)
    elements.forEach((el) => {
      if (el) observer.current?.observe(el)
    })

    return () => observer.current?.disconnect()
  }, [ids]) // id 목록이 바뀌면 재실행

  return activeId
}
