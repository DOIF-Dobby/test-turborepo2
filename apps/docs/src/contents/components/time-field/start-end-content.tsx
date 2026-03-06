import { TimeField } from '@repo/ui/components/date-field'
import { ClockIcon, MetronomeIcon } from 'lucide-react'

export default function StartEndContent() {
  return (
    <TimeField
      label="Time"
      startContent={<ClockIcon />}
      endContent={<MetronomeIcon />}
    />
  )
}
