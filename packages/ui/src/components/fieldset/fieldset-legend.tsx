import { Fieldset as FieldsetPrimitive } from '@base-ui/react/fieldset'

type Props = React.ComponentProps<typeof FieldsetPrimitive.Legend>

export interface FieldsetLegendProps extends Props {}

export function FieldsetLegend(props: FieldsetLegendProps) {
  return <FieldsetPrimitive.Legend suppressHydrationWarning {...props} />
}
