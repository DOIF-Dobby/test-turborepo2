import { Calendar } from '@repo/ui/components/calendar'
import { addDays, subDays } from 'date-fns'

export default function MinMaxDate() {
  return (
    <Calendar
      minValue={subDays(new Date(), 7)}
      maxValue={addDays(new Date(), 14)}
    />
  )
}
