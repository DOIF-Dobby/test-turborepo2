import { Calendar } from '@repo/ui/components/calendar'

export default function DefaultValue() {
  return <Calendar defaultValue={new Date()} />
}
