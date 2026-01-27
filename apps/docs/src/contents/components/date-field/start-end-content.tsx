import { DateField } from '@repo/ui/components/date-field'
import { CalendarIcon, ChevronDownIcon } from 'lucide-react'

export default function StartEndContent() {
  return (
    <DateField
      label="Start end content"
      startContent={<CalendarIcon />}
      endContent={<ChevronDownIcon />}
    />
  )
}
