interface DashboardPageHeaderProps {
  title: React.ReactNode
  children?: React.ReactNode
}

export function DashboardPageHeader({
  title,
  children,
}: DashboardPageHeaderProps) {
  return (
    <div className="flex items-center justify-between py-8">
      <h1 className="text-2xl leading-9 font-bold text-base-700">{title}</h1>
      {children && (
        <div className="flex items-center gap-sw-2xs">{children}</div>
      )}
    </div>
  )
}
