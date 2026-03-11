interface FuturesSummarySectionItemProps {
  title: React.ReactNode
  value: React.ReactNode
  unit: string
  icon?: React.ReactNode
}

export function FuturesSummarySectionItem({
  title,
  value,
  unit,
  icon,
}: FuturesSummarySectionItemProps) {
  return (
    <div className="rounded-lg border border-base-200 bg-background p-sw-md">
      <p>{title}</p>
      <p>
        {value} {unit}
      </p>
      {icon}
    </div>
  )
}
