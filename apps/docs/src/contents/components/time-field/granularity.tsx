import { TimeField } from '@repo/ui/components/date-field'

const granularities = ['hour', 'minute', 'second'] as const

export default function Granularity() {
  return (
    <div className="flex gap-sw-sm">
      {granularities.map((granularity) => (
        <TimeField
          key={granularity}
          granularity={granularity}
          label={granularity}
          classNames={{ container: 'w-full' }}
        />
      ))}
    </div>
  )
}
