export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 h-18 border-b border-b-base-200 bg-background">
      <div className="mx-auto flex h-full max-w-desktop items-center justify-between">
        <div>로고</div>
        <div>메뉴</div>
        <div>로그아웃</div>
      </div>
    </header>
  )
}
