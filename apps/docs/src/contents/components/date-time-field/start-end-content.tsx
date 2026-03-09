import { DateTimeField } from '@repo/ui/components/date-field'
import { CalendarIcon, ChevronDownIcon } from 'lucide-react'

export default function StartEndContent() {
  return (
    <DateTimeField
      label="Start end content"
      startContent={<CalendarIcon />}
      endContent={<ChevronDownIcon />}
    />
  )
}
