import { DateField, type DateFieldProps } from './date-field'

type Props = DateFieldProps

export interface DateTimeFieldProps extends Props {}

export function DateTimeField(props: DateTimeFieldProps) {
  const { granularity = 'second', hourCycle = 24, ...otherProps } = props
  return (
    <DateField
      granularity={granularity}
      hourCycle={hourCycle}
      {...otherProps}
    />
  )
}
